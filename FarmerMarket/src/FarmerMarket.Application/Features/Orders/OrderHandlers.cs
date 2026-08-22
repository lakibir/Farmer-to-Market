using FarmerMarket.Application.Common.Interfaces;
using FarmerMarket.Application.Common.Models;
using FarmerMarket.Application.DTOs;
using FarmerMarket.Domain.Entities;
using FarmerMarket.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FarmerMarket.Application.Features.Orders;

// 1. Place Order Command (Buyer)
public record PlaceOrderCommand(Guid BuyerId, PlaceOrderDto Dto) : IRequest<Result<PlaceOrderResultDto>>;

public class PlaceOrderHandler(
    IAppDbContext db,
    ITelebirrService telebirr,
    ISmsService sms,
    ISignalRNotifier signalR) : IRequestHandler<PlaceOrderCommand, Result<PlaceOrderResultDto>>
{
    public async Task<Result<PlaceOrderResultDto>> Handle(PlaceOrderCommand req, CancellationToken ct)
    {
        var buyer = await db.Users.FirstOrDefaultAsync(u => u.Id == req.BuyerId, ct);
        if (buyer == null)
            return Result<PlaceOrderResultDto>.Failure("Buyer account not found.");

        var listing = await db.Listings
            .Include(l => l.Farmer)
            .FirstOrDefaultAsync(l => l.Id == req.Dto.ListingId, ct);

        if (listing == null || listing.Status != ListingStatus.Active)
            return Result<PlaceOrderResultDto>.Failure("Listing is not available for orders.");

        if (req.Dto.QtyKg < listing.MinOrderKg)
            return Result<PlaceOrderResultDto>.Failure($"Minimum order quantity is {listing.MinOrderKg} kg.");

        if (req.Dto.QtyKg > listing.QtyKg)
            return Result<PlaceOrderResultDto>.Failure($"Only {listing.QtyKg} kg available in stock.");

        // Calculate amount and 90 / 5 / 5 split
        var totalEtb = Math.Round(req.Dto.QtyKg * listing.PricePerKg, 2);
        var farmerCut = Math.Round(totalEtb * 0.90m, 2);
        var driverCut = Math.Round(totalEtb * 0.05m, 2);
        var platformCut = totalEtb - farmerCut - driverCut;

        // Reduce inventory
        listing.QtyKg -= req.Dto.QtyKg;
        if (listing.QtyKg <= 0)
        {
            listing.QtyKg = 0;
            listing.Status = ListingStatus.SoldOut;
        }

        var orderId = Guid.NewGuid();

        // Initiate Telebirr Escrow Payment
        var telebirrInit = await telebirr.InitiatePaymentAsync(orderId, totalEtb, buyer.Phone, ct);

        var order = new Order
        {
            Id = orderId,
            ListingId = listing.Id,
            BuyerId = buyer.Id,
            QtyKg = req.Dto.QtyKg,
            TotalEtb = totalEtb,
            Status = OrderStatus.Pending,
            EscrowHeld = true,
            PaymentRef = telebirrInit.OutTradeNo,
            DeliveryAddress = req.Dto.DeliveryAddress ?? buyer.Region,
            DeliveryNotes = req.Dto.DeliveryNotes,
            CreatedAt = DateTimeOffset.UtcNow
        };

        var payment = new Payment
        {
            Id = Guid.NewGuid(),
            OrderId = order.Id,
            AmountEtb = totalEtb,
            FarmerCut = farmerCut,
            DriverCut = driverCut,
            PlatformCut = platformCut,
            TelebirrRef = telebirrInit.OutTradeNo,
            Status = "Held",
            CreatedAt = DateTimeOffset.UtcNow
        };

        db.Orders.Add(order);
        db.Payments.Add(payment);

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

        // Trigger SMS and SignalR
        _ = sms.NotifyFarmerNewOrderAsync(listing.Farmer.Phone, listing.ProductName, order.QtyKg, totalEtb, "am", ct);
        _ = signalR.NotifyNewOrderForFarmerAsync(listing.FarmerId, order.Id, listing.ProductName, order.QtyKg, ct);

        return Result<PlaceOrderResultDto>.Success(new PlaceOrderResultDto(
            order.Id,
            totalEtb,
            telebirrInit.PaymentUrl,
            telebirrInit.OutTradeNo
        ));
    }
}

// 2. Get Orders Query
public record GetOrdersQuery(Guid UserId, UserRole Role, OrderStatus? Status = null) : IRequest<List<OrderDto>>;

public class GetOrdersHandler(IAppDbContext db) : IRequestHandler<GetOrdersQuery, List<OrderDto>>
{
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
                // Drivers see orders assigned to them, OR confirmed orders available for pickup
                q = q.Where(o => o.DriverId == req.UserId || (o.DriverId == null && o.Status == OrderStatus.Confirmed));
                break;
            case UserRole.Admin:
                // Admins see all orders
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
            o.Payment?.FarmerCut ?? (o.TotalEtb * 0.90m),
            o.Payment?.DriverCut ?? (o.TotalEtb * 0.05m),
            o.Payment?.PlatformCut ?? (o.TotalEtb * 0.05m),
            o.Status,
            o.EscrowHeld,
            o.PaymentRef,
            o.PickupPhoto,
            o.DeliveryAddress,
            o.DeliveryNotes,
            o.ConfirmedAt,
            o.CreatedAt
        )).ToList();
    }
}

// 3. Get Order By Id Query
public record GetOrderByIdQuery(Guid OrderId, Guid UserId, UserRole Role) : IRequest<Result<OrderDto>>;

public class GetOrderByIdHandler(IAppDbContext db) : IRequestHandler<GetOrderByIdQuery, Result<OrderDto>>
{
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
            o.Payment?.FarmerCut ?? (o.TotalEtb * 0.90m),
            o.Payment?.DriverCut ?? (o.TotalEtb * 0.05m),
            o.Payment?.PlatformCut ?? (o.TotalEtb * 0.05m),
            o.Status,
            o.EscrowHeld,
            o.PaymentRef,
            o.PickupPhoto,
            o.DeliveryAddress,
            o.DeliveryNotes,
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
        await db.SaveChangesAsync(ct);

        _ = signalR.NotifyOrderStatusChangedAsync(order.Id, OrderStatus.Confirmed, "Farmer confirmed order. Ready for driver pickup.", ct);
        _ = sms.NotifyBuyerOrderStatusAsync(order.Buyer.Phone, order.Listing.ProductName, "Confirmed", "en", ct);

        return Result.Success();
    }
}

// 5. Pickup Order Command (Driver accepts or picks up)
public record PickupOrderCommand(Guid OrderId, Guid DriverId, string? PickupPhoto) : IRequest<Result>;

public class PickupOrderHandler(IAppDbContext db, ISignalRNotifier signalR) : IRequestHandler<PickupOrderCommand, Result>
{
    public async Task<Result> Handle(PickupOrderCommand req, CancellationToken ct)
    {
        var order = await db.Orders
            .Include(o => o.Listing)
            .FirstOrDefaultAsync(o => o.Id == req.OrderId, ct);

        if (order == null) return Result.Failure("Order not found.");

        order.DriverId = req.DriverId;
        order.Status = OrderStatus.PickedUp;
        if (!string.IsNullOrWhiteSpace(req.PickupPhoto))
            order.PickupPhoto = req.PickupPhoto;

        await db.SaveChangesAsync(ct);

        _ = signalR.NotifyOrderStatusChangedAsync(order.Id, OrderStatus.PickedUp, "Produce picked up from farm. Out for delivery.", ct);

        return Result.Success();
    }
}

// 6. Deliver Order Command (Buyer Confirms & Escrow is Released)
public record DeliverOrderCommand(Guid OrderId, Guid BuyerId) : IRequest<Result>;

public class DeliverOrderHandler(
    IAppDbContext db,
    ITelebirrService telebirr,
    ISignalRNotifier signalR,
    ISmsService sms) : IRequestHandler<DeliverOrderCommand, Result>
{
    public async Task<Result> Handle(DeliverOrderCommand req, CancellationToken ct)
    {
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

        if (order.Payment != null)
        {
            order.Payment.Status = "Released";
            order.Payment.ReleasedAt = DateTimeOffset.UtcNow;
            await telebirr.ReleaseEscrowAsync(order.Id, order.TotalEtb, ct);
        }

        await db.SaveChangesAsync(ct);

        var farmerCut = order.Payment?.FarmerCut ?? (order.TotalEtb * 0.90m);
        var driverCut = order.Payment?.DriverCut ?? (order.TotalEtb * 0.05m);

        _ = signalR.NotifyDeliveryConfirmedAsync(order.Id, farmerCut, driverCut, ct);
        _ = signalR.NotifyOrderStatusChangedAsync(order.Id, OrderStatus.Delivered, "Delivery completed and payment released!", ct);

        // SMS alert to Farmer
        _ = sms.SendOtpAsync(order.Listing.Farmer.Phone, $"{farmerCut:N2} ETB has been deposited to your Telebirr wallet for order #{order.Id.ToString()[..6]}.", "am", ct);

        return Result.Success();
    }
}

// 7. Dispute Order Command
public record DisputeOrderCommand(Guid OrderId, Guid UserId, string Reason) : IRequest<Result>;

public class DisputeOrderHandler(IAppDbContext db, ISignalRNotifier signalR) : IRequestHandler<DisputeOrderCommand, Result>
{
    public async Task<Result> Handle(DisputeOrderCommand req, CancellationToken ct)
    {
        var order = await db.Orders.FirstOrDefaultAsync(o => o.Id == req.OrderId, ct);
        if (order == null) return Result.Failure("Order not found.");

        order.Status = OrderStatus.Disputed;
        if (order.Payment != null)
        {
            order.Payment.Status = "Frozen";
        }

        await db.SaveChangesAsync(ct);

        _ = signalR.NotifyOrderStatusChangedAsync(order.Id, OrderStatus.Disputed, $"Dispute raised: {req.Reason}. Under Admin arbitration.", ct);

        return Result.Success();
    }
}
