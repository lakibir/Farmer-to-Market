using FarmerMarket.Application.Common.Interfaces;
using FarmerMarket.Application.Common.Models;
using FarmerMarket.Application.DTOs;
using FarmerMarket.Domain.Entities;
using FarmerMarket.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace FarmerMarket.Application.Features.Orders;

// 1. Place Order Command (Buyer)
public record PlaceOrderCommand(Guid BuyerId, PlaceOrderDto Dto) : IRequest<Result<PlaceOrderResultDto>>;

public class PlaceOrderHandler(
    IAppDbContext db,
    IPaymentGateway payment,
    ISmsService sms,
    ISignalRNotifier signalR,
    IOptions<EscrowOptions>? escrowOptions = null,
    ISuperAdminGovernanceStore? governanceStore = null) : IRequestHandler<PlaceOrderCommand, Result<PlaceOrderResultDto>>
{
    private readonly EscrowOptions _escrow = escrowOptions?.Value ?? new EscrowOptions();
    private readonly ISuperAdminGovernanceStore? _store = governanceStore;

    public async Task<Result<PlaceOrderResultDto>> Handle(PlaceOrderCommand req, CancellationToken ct)
    {
        var config = _store?.GetPlatformConfig();
        if (config?.EmergencyEscrowFrozen == true)
            return Result<PlaceOrderResultDto>.Failure("Platform marketplace transactions and escrow disbursements are temporarily frozen by administration.");

        var buyer = await db.Users.FirstOrDefaultAsync(u => u.Id == req.BuyerId, ct);
        if (buyer == null)
            return Result<PlaceOrderResultDto>.Failure("Buyer account not found.");

        if (req.Dto.PaymentMethodId.HasValue && !await db.PaymentMethods.AnyAsync(x => x.Id == req.Dto.PaymentMethodId.Value && x.UserId == req.BuyerId, ct))
            return Result<PlaceOrderResultDto>.Failure("Selected payment method was not found for this buyer.");

        var listing = await db.Listings
            .Include(l => l.Farmer)
            .FirstOrDefaultAsync(l => l.Id == req.Dto.ListingId, ct);

        if (listing == null || listing.Status != ListingStatus.Active)
            return Result<PlaceOrderResultDto>.Failure("Listing is not available for orders.");

        if (req.Dto.QtyKg <= 0)
            return Result<PlaceOrderResultDto>.Failure("Order quantity must be greater than 0 kg.");

        if (req.Dto.QtyKg > listing.QtyKg)
            return Result<PlaceOrderResultDto>.Failure($"Only {listing.QtyKg} kg available in stock.");

        // Calculate amount and dynamic escrow split from active configuration
        var farmerPercent = config?.FarmerSharePercent ?? _escrow.FarmerPercent;
        var driverPercent = config?.DriverSharePercent ?? _escrow.DriverPercent;

        var totalEtb = Math.Round(req.Dto.QtyKg * listing.PricePerKg, 2);
        var farmerCut = Math.Round(totalEtb * (farmerPercent / 100m), 2);
        var driverCut = Math.Round(totalEtb * (driverPercent / 100m), 2);
        var platformCut = totalEtb - farmerCut - driverCut;

        // Reduce inventory
        listing.QtyKg -= req.Dto.QtyKg;
        if (listing.QtyKg <= 0)
        {
            listing.QtyKg = 0;
            listing.Status = ListingStatus.SoldOut;
        }

        var orderId = Guid.NewGuid();

        // Initiate payment via configured gateway (Telebirr or Chapa)
        var paymentInit = await payment.InitiatePaymentAsync(orderId, totalEtb, buyer.Phone, buyer.Email, buyer.Name, ct);

        var order = new Order
        {
            Id = orderId,
            ListingId = listing.Id,
            BuyerId = buyer.Id,
            QtyKg = req.Dto.QtyKg,
            TotalEtb = totalEtb,
            Status = OrderStatus.Pending,
            EscrowHeld = true,
            PaymentRef = paymentInit?.TransactionRef ?? $"FM-{orderId.ToString().ToUpperInvariant()[..8]}-{DateTime.UtcNow:yyyyMMddHHmmss}",
            DeliveryAddress = req.Dto.DeliveryAddress ?? buyer.Region,
            DeliveryNotes = req.Dto.DeliveryNotes,
            IsRecurring = req.Dto.IsRecurring,
            RecurringFrequency = req.Dto.RecurringFrequency,
            DriverSubsidyEtb = _escrow.DriverSubsidyEtb,
            CreatedAt = DateTimeOffset.UtcNow
        };

        var payment2 = new Payment
        {
            Id = Guid.NewGuid(),
            OrderId = order.Id,
            PaymentMethodId = req.Dto.PaymentMethodId,
            AmountEtb = totalEtb,
            FarmerCut = farmerCut,
            DriverCut = driverCut,
            PlatformCut = platformCut,
            TelebirrRef = paymentInit?.TransactionRef ?? order.PaymentRef,
            Status = "Held",
            CreatedAt = DateTimeOffset.UtcNow
        };

        db.Orders.Add(order);
        db.Payments.Add(payment2);

        // Record Notification for Farmer
        db.Notifications.Add(new Notification
        {
            UserId = listing.FarmerId,
            Type = "new_order",
            Channel = "sms",
            MessageEn = $"New order: {order.QtyKg}kg of {listing.ProductName}. Total: {totalEtb:N2} ETB.",
            MessageAm = $"አዲስ ትዕዛዝ: {order.QtyKg} ኪ.ግ {listing.NameAm ?? listing.ProductName}. ድምር: {totalEtb:N2} ብር."
        });

        await db.SaveChangesAsync(ct);

        var farmerPhone = listing.Farmer?.Phone
            ?? (await db.Users.FirstOrDefaultAsync(u => u.Id == listing.FarmerId, ct))?.Phone
            ?? "+251911000000";

        // Trigger SMS and SignalR
        _ = sms.NotifyFarmerNewOrderAsync(farmerPhone, listing.ProductName, order.QtyKg, totalEtb, "am", ct);
        _ = signalR.NotifyNewOrderForFarmerAsync(listing.FarmerId, order.Id, listing.ProductName, order.QtyKg, ct);

        return Result<PlaceOrderResultDto>.Success(new PlaceOrderResultDto(
            order.Id,
            totalEtb,
            paymentInit?.PaymentUrl ?? string.Empty,
            paymentInit?.TransactionRef ?? order.PaymentRef
        ));
    }
}

// 2. Get Orders Query
public record GetOrdersQuery(Guid UserId, UserRole Role, OrderStatus? Status = null) : IRequest<List<OrderDto>>;

public class GetOrdersHandler(IAppDbContext db, IOptions<EscrowOptions>? escrowOptions = null) : IRequestHandler<GetOrdersQuery, List<OrderDto>>
{
    private readonly EscrowOptions _escrow = escrowOptions?.Value ?? new EscrowOptions();

    public async Task<List<OrderDto>> Handle(GetOrdersQuery req, CancellationToken ct)
    {
        var q = db.Orders.AsNoTracking()
            .Include(o => o.Listing)
            .Include(o => o.Listing.Farmer)
            .Include(o => o.Buyer)
            .Include(o => o.Driver)
            .Include(o => o.Payment)
            .AsQueryable();

        switch (req.Role)
        {
            case UserRole.Farmer:
                q = q.Where(o => o.Listing.FarmerId == req.UserId);
                break;
            case UserRole.Buyer:
                q = q.Where(o => o.BuyerId == req.UserId);
                break;
            case UserRole.Driver:
                q = q.Where(o => o.DriverId == req.UserId || (o.DriverId == null && o.Status == OrderStatus.Confirmed));
                break;
            case UserRole.Admin:
            case UserRole.SuperAdmin:
                break;
        }

        if (req.Status.HasValue)
        {
            q = q.Where(o => o.Status == req.Status.Value);
        }

        var list = await q.OrderByDescending(o => o.CreatedAt).ToListAsync(ct);

        return list.Select(o => new OrderDto(
            o.Id,
            o.ListingId,
            o.Listing.ProductName,
            o.Listing.NameAm,
            o.Listing.Category,
            o.Listing.FarmerId,
            o.Listing.Farmer.Name,
            o.Listing.Farmer.NameAm,
            o.Listing.Farmer.Phone,
            o.Listing.Farmer.Region,
            o.BuyerId,
            o.Buyer.Name,
            o.Buyer.Phone,
            o.DriverId,
            o.Driver?.Name,
            o.Driver?.Phone,
            o.QtyKg,
            o.Listing.PricePerKg,
            o.TotalEtb,
            o.Payment?.FarmerCut ?? Math.Round(o.TotalEtb * (_escrow.FarmerPercent / 100m), 2),
            o.Payment?.DriverCut ?? Math.Round(o.TotalEtb * (_escrow.DriverPercent / 100m), 2),
            o.Payment?.PlatformCut ?? Math.Round(o.TotalEtb * (_escrow.PlatformPercent / 100m), 2),
            o.DriverSubsidyEtb ?? _escrow.DriverSubsidyEtb,
            o.Status,
            o.EscrowHeld,
            o.PaymentRef,
            o.PickupPhoto,
            o.DeliveryPhoto,
            o.DeliveryGpsLat,
            o.DeliveryGpsLng,
            o.DeliveredAt,
            o.DeliveryAddress,
            o.DeliveryNotes,
            o.DisputeReason,
            o.DisputePhoto,
            o.RequestedRefundPercent ?? 100,
            o.DisputeStatus ?? "None",
            o.DisputeResolutionNotes,
            o.IsRecurring ?? false,
            o.RecurringFrequency,
            o.ConfirmedAt,
            o.CreatedAt
        )).ToList();
    }
}

// 3. Get Order By Id Query
public record GetOrderByIdQuery(Guid OrderId, Guid UserId, UserRole Role) : IRequest<Result<OrderDto>>;

public class GetOrderByIdHandler(IAppDbContext db, IOptions<EscrowOptions>? escrowOptions = null) : IRequestHandler<GetOrderByIdQuery, Result<OrderDto>>
{
    private readonly EscrowOptions _escrow = escrowOptions?.Value ?? new EscrowOptions();

    public async Task<Result<OrderDto>> Handle(GetOrderByIdQuery req, CancellationToken ct)
    {
        var o = await db.Orders.AsNoTracking()
            .Include(x => x.Listing)
            .Include(x => x.Listing.Farmer)
            .Include(x => x.Buyer)
            .Include(x => x.Driver)
            .Include(x => x.Payment)
            .FirstOrDefaultAsync(x => x.Id == req.OrderId, ct);

        if (o == null)
            return Result<OrderDto>.Failure("Order not found.");

        return Result<OrderDto>.Success(new OrderDto(
            o.Id,
            o.ListingId,
            o.Listing.ProductName,
            o.Listing.NameAm,
            o.Listing.Category,
            o.Listing.FarmerId,
            o.Listing.Farmer.Name,
            o.Listing.Farmer.NameAm,
            o.Listing.Farmer.Phone,
            o.Listing.Farmer.Region,
            o.BuyerId,
            o.Buyer.Name,
            o.Buyer.Phone,
            o.DriverId,
            o.Driver?.Name,
            o.Driver?.Phone,
            o.QtyKg,
            o.Listing.PricePerKg,
            o.TotalEtb,
            o.Payment?.FarmerCut ?? Math.Round(o.TotalEtb * (_escrow.FarmerPercent / 100m), 2),
            o.Payment?.DriverCut ?? Math.Round(o.TotalEtb * (_escrow.DriverPercent / 100m), 2),
            o.Payment?.PlatformCut ?? Math.Round(o.TotalEtb * (_escrow.PlatformPercent / 100m), 2),
            o.DriverSubsidyEtb ?? _escrow.DriverSubsidyEtb,
            o.Status,
            o.EscrowHeld,
            o.PaymentRef,
            o.PickupPhoto,
            o.DeliveryPhoto,
            o.DeliveryGpsLat,
            o.DeliveryGpsLng,
            o.DeliveredAt,
            o.DeliveryAddress,
            o.DeliveryNotes,
            o.DisputeReason,
            o.DisputePhoto,
            o.RequestedRefundPercent ?? 100,
            o.DisputeStatus ?? "None",
            o.DisputeResolutionNotes,
            o.IsRecurring ?? false,
            o.RecurringFrequency,
            o.ConfirmedAt,
            o.CreatedAt
        ));
    }
}

// 4. Confirm Order Command (Farmer)
public record ConfirmOrderCommand(Guid OrderId, Guid FarmerId) : IRequest<Result>;

public class ConfirmOrderHandler(IAppDbContext db, ISignalRNotifier signalR, ISmsService sms) : IRequestHandler<ConfirmOrderCommand, Result>
{
    public async Task<Result> Handle(ConfirmOrderCommand req, CancellationToken ct)
    {
        var order = await db.Orders
            .Include(o => o.Listing)
            .Include(o => o.Buyer)
            .FirstOrDefaultAsync(o => o.Id == req.OrderId, ct);

        if (order == null) return Result.Failure("Order not found.");
        if (order.Listing.FarmerId != req.FarmerId) return Result.Failure("Unauthorized.");

        order.Status = OrderStatus.Confirmed;
        order.ConfirmedAt = DateTimeOffset.UtcNow;
        await db.SaveChangesAsync(ct);

        _ = signalR.NotifyOrderStatusChangedAsync(order.Id, OrderStatus.Confirmed, "Farmer confirmed order. Ready for driver pickup.", ct);
        _ = sms.NotifyBuyerOrderStatusAsync(order.Buyer.Phone, order.Listing.ProductName, "Confirmed", "en", ct);

        return Result.Success();
    }
}

// 5. Pickup Order Command (Driver accepts or picks up)
public record PickupOrderCommand(Guid OrderId, Guid DriverId, string? PickupPhoto) : IRequest<Result>;

public class PickupOrderHandler(IAppDbContext db, ISignalRNotifier signalR, ISmsService sms)
    : IRequestHandler<PickupOrderCommand, Result>
{
    public async Task<Result> Handle(PickupOrderCommand req, CancellationToken ct)
    {
        var order = await db.Orders
            .Include(o => o.Listing)
            .Include(o => o.Listing.Farmer)
            .Include(o => o.Buyer)
            .FirstOrDefaultAsync(o => o.Id == req.OrderId, ct);

        if (order == null) return Result.Failure("Order not found.");

        order.DriverId = req.DriverId;
        order.Status = OrderStatus.PickedUp;
        if (!string.IsNullOrWhiteSpace(req.PickupPhoto))
            order.PickupPhoto = req.PickupPhoto;

        await db.SaveChangesAsync(ct);

        // Broadcast status to buyer AND farmer via SignalR order group
        _ = signalR.NotifyOrderStatusChangedAsync(
            order.Id, OrderStatus.PickedUp,
            "Produce picked up from farm. Out for delivery.", ct);

        // Notify farmer their produce has left the farm
        _ = signalR.NotifyNewOrderForFarmerAsync(
            order.Listing.FarmerId, order.Id,
            order.Listing.ProductName, order.QtyKg, ct);

        // SMS notifications to both buyer and farmer
        _ = sms.NotifyBuyerOrderStatusAsync(
            order.Buyer.Phone, order.Listing.ProductName, "PickedUp", "en", ct);
        _ = sms.NotifyFarmerNewOrderAsync(
            order.Listing.Farmer.Phone, order.Listing.ProductName,
            order.QtyKg, order.TotalEtb, "am", ct);

        return Result.Success();
    }
}

// 6. Deliver Order Command (Proof of Delivery Photo + GPS enforced)
public record DeliverOrderCommand(Guid OrderId, Guid BuyerId, DeliverOrderDto? Proof = null) : IRequest<Result>;

public class DeliverOrderHandler(
    IAppDbContext db,
    IPaymentGateway payment,
    ISignalRNotifier signalR,
    ISmsService sms,
    IOptions<EscrowOptions>? escrowOptions = null,
    ISuperAdminGovernanceStore? governanceStore = null) : IRequestHandler<DeliverOrderCommand, Result>
{
    private readonly EscrowOptions _escrow = escrowOptions?.Value ?? new EscrowOptions();
    private readonly ISuperAdminGovernanceStore? _store = governanceStore;

    public async Task<Result> Handle(DeliverOrderCommand req, CancellationToken ct)
    {
        var config = _store?.GetPlatformConfig();
        if (config?.EmergencyEscrowFrozen == true)
            return Result.Failure("Escrow disbursements are temporarily frozen platform-wide by administration.");

        var order = await db.Orders
            .Include(o => o.Listing)
            .Include(o => o.Listing.Farmer)
            .Include(o => o.Driver)
            .Include(o => o.Payment)
            .FirstOrDefaultAsync(o => o.Id == req.OrderId, ct);

        if (order == null) return Result.Failure("Order not found.");
        if (order.BuyerId != req.BuyerId) return Result.Failure("Unauthorized.");

        // Mark delivered and release escrow
        order.Status = OrderStatus.Delivered;
        order.EscrowHeld = false;
        order.ConfirmedAt = DateTimeOffset.UtcNow;
        order.DeliveredAt = DateTimeOffset.UtcNow;

        if (req.Proof != null)
        {
            order.DeliveryPhoto = req.Proof.DeliveryPhoto;
            order.DeliveryGpsLat = req.Proof.DeliveryGpsLat ?? 9.0300;
            order.DeliveryGpsLng = req.Proof.DeliveryGpsLng ?? 38.7400;
        }

        if (order.Payment != null)
        {
            order.Payment.Status = "Released";
            order.Payment.ReleasedAt = DateTimeOffset.UtcNow;
            await payment.ReleaseEscrowAsync(order.Id, order.TotalEtb, ct);
        }

        await db.SaveChangesAsync(ct);

        var farmerCut = order.Payment?.FarmerCut ?? Math.Round(order.TotalEtb * (_escrow.FarmerPercent / 100m), 2);
        var driverCut = order.Payment?.DriverCut ?? Math.Round(order.TotalEtb * (_escrow.DriverPercent / 100m), 2);

        _ = signalR.NotifyDeliveryConfirmedAsync(order.Id, farmerCut, driverCut, ct);
        _ = signalR.NotifyOrderStatusChangedAsync(order.Id, OrderStatus.Delivered, "Delivery completed and payment released!", ct);

        // SMS notification to Farmer confirming payout
        _ = sms.NotifyBuyerOrderStatusAsync(order.Listing.Farmer.Phone, order.Listing.ProductName, "Delivered", "am", ct);

        return Result.Success();
    }
}

// 7. Dispute Order Command
public record DisputeOrderCommand(Guid OrderId, Guid UserId, DisputeOrderDto Dto) : IRequest<Result>;

public class DisputeOrderHandler(IAppDbContext db, ISignalRNotifier signalR) : IRequestHandler<DisputeOrderCommand, Result>
{
    public async Task<Result> Handle(DisputeOrderCommand req, CancellationToken ct)
    {
        var order = await db.Orders.FirstOrDefaultAsync(o => o.Id == req.OrderId, ct);
        if (order == null) return Result.Failure("Order not found.");

        order.Status = OrderStatus.Disputed;
        order.DisputeReason = req.Dto.Reason;
        order.DisputePhoto = req.Dto.DisputePhoto;
        order.RequestedRefundPercent = req.Dto.RequestedRefundPercent;
        order.DisputeStatus = "PendingReview";

        if (order.Payment != null)
        {
            order.Payment.Status = "Frozen";
        }

        await db.SaveChangesAsync(ct);

        _ = signalR.NotifyOrderStatusChangedAsync(order.Id, OrderStatus.Disputed, $"Dispute raised: {req.Dto.Reason}. Under Admin arbitration.", ct);

        return Result.Success();
    }
}

// 8. Cancel & Refund Order Command (Buyer / Admin)
public record CancelOrderCommand(Guid OrderId, Guid UserId, string Reason) : IRequest<Result>;

public class CancelOrderHandler(
    IAppDbContext db,
    ITelebirrService payment,
    ISignalRNotifier signalR) : IRequestHandler<CancelOrderCommand, Result>
{
    public async Task<Result> Handle(CancelOrderCommand req, CancellationToken ct)
    {
        var order = await db.Orders
            .Include(o => o.Payment)
            .Include(o => o.Listing)
            .FirstOrDefaultAsync(o => o.Id == req.OrderId, ct);

        if (order == null) return Result.Failure("Order not found.");
        if (order.Status == OrderStatus.Delivered) return Result.Failure("Cannot cancel a delivered order. Please open a dispute instead.");

        order.Status = OrderStatus.Cancelled;
        order.EscrowHeld = false;
        order.DisputeStatus = "ResolvedRefundBuyer";
        order.DisputeResolutionNotes = $"Cancelled and refunded: {req.Reason}";

        if (order.Payment != null)
        {
            order.Payment.Status = "Refunded";
            await payment.RefundPaymentAsync(order.Id, order.TotalEtb, ct);
        }

        if (order.Listing != null)
        {
            order.Listing.QtyKg += order.QtyKg;
        }

        await db.SaveChangesAsync(ct);

        _ = signalR.NotifyOrderStatusChangedAsync(order.Id, OrderStatus.Cancelled, $"Order cancelled and 100% refunded ({order.TotalEtb:N2} ETB) via Telebirr.", ct);

        return Result.Success();
    }
}
