using FarmerMarket.Application.Common.Interfaces;
using FarmerMarket.Application.Common.Models;
using FarmerMarket.Application.DTOs;
using FarmerMarket.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FarmerMarket.Application.Features.Payments;

// 1. Get Farmer Summary Query
public record GetFarmerSummaryQuery(Guid FarmerId) : IRequest<Result<FarmerSummaryDto>>;

public class GetFarmerSummaryHandler(IAppDbContext db) : IRequestHandler<GetFarmerSummaryQuery, Result<FarmerSummaryDto>>
{
    public async Task<Result<FarmerSummaryDto>> Handle(GetFarmerSummaryQuery req, CancellationToken ct)
    {
        var orders = await db.Orders.AsNoTracking()
            .Include(o => o.Payment)
            .Where(o => o.Listing.FarmerId == req.FarmerId)
            .ToListAsync(ct);

        var totalEarned = orders
            .Where(o => o.Status == OrderStatus.Delivered && o.Payment != null)
            .Sum(o => o.Payment!.FarmerCut);

        var pendingEscrow = orders
            .Where(o => o.Status != OrderStatus.Delivered && o.Status != OrderStatus.Cancelled && o.Payment != null)
            .Sum(o => o.Payment!.FarmerCut);

        var released = orders
            .Where(o => o.Payment != null && o.Payment.Status == "Released")
            .Sum(o => o.Payment!.FarmerCut);

        var completedCount = orders.Count(o => o.Status == OrderStatus.Delivered);
        var pendingCount = orders.Count(o => o.Status != OrderStatus.Delivered && o.Status != OrderStatus.Cancelled);

        return Result<FarmerSummaryDto>.Success(new FarmerSummaryDto(
            totalEarned,
            pendingEscrow,
            released,
            completedCount,
            pendingCount
        ));
    }
}

// 2. Get Driver Summary Query
public record GetDriverSummaryQuery(Guid DriverId) : IRequest<Result<DriverSummaryDto>>;

public class GetDriverSummaryHandler(IAppDbContext db) : IRequestHandler<GetDriverSummaryQuery, Result<DriverSummaryDto>>
{
    public async Task<Result<DriverSummaryDto>> Handle(GetDriverSummaryQuery req, CancellationToken ct)
    {
        var orders = await db.Orders.AsNoTracking()
            .Include(o => o.Payment)
            .Where(o => o.DriverId == req.DriverId)
            .ToListAsync(ct);

        var totalEarned = orders
            .Where(o => o.Status == OrderStatus.Delivered && o.Payment != null)
            .Sum(o => o.Payment!.DriverCut);

        var pending = orders
            .Where(o => o.Status != OrderStatus.Delivered && o.Status != OrderStatus.Cancelled && o.Payment != null)
            .Sum(o => o.Payment!.DriverCut);

        var deliveredTrips = orders.Count(o => o.Status == OrderStatus.Delivered);

        return Result<DriverSummaryDto>.Success(new DriverSummaryDto(
            totalEarned,
            pending,
            deliveredTrips
        ));
    }
}

// 3. Get Payment By Order Id Query
public record GetPaymentByOrderIdQuery(Guid OrderId, Guid UserId, UserRole Role) : IRequest<Result<PaymentDto>>;

public class GetPaymentByOrderIdHandler(IAppDbContext db) : IRequestHandler<GetPaymentByOrderIdQuery, Result<PaymentDto>>
{
    public async Task<Result<PaymentDto>> Handle(GetPaymentByOrderIdQuery req, CancellationToken ct)
    {
        var p = await db.Payments.AsNoTracking().FirstOrDefaultAsync(x => x.OrderId == req.OrderId, ct);
        if (p == null) return Result<PaymentDto>.Failure("Payment not found.");

        var order = await db.Orders.AsNoTracking()
            .Include(x => x.Listing)
            .FirstOrDefaultAsync(x => x.Id == req.OrderId, ct);
        if (order == null) return Result<PaymentDto>.Failure("Payment not found.");

        var isAdministrator = req.Role is UserRole.Admin or UserRole.SuperAdmin;
        var isParticipant = order.BuyerId == req.UserId
            || order.Listing.FarmerId == req.UserId
            || order.DriverId == req.UserId;
        if (!isAdministrator && !isParticipant)
            return Result<PaymentDto>.Failure("Payment not found.");

        return Result<PaymentDto>.Success(new PaymentDto(
            p.Id,
            p.OrderId,
            p.AmountEtb,
            p.FarmerCut,
            p.DriverCut,
            p.PlatformCut,
            p.TelebirrRef,
            p.Status,
            p.ReleasedAt,
            p.CreatedAt
        ));
    }
}

// 4. Process Telebirr Webhook Command
public record ProcessTelebirrWebhookCommand(TelebirrWebhookDto Dto) : IRequest<Result>;

public class ProcessTelebirrWebhookHandler(IAppDbContext db) : IRequestHandler<ProcessTelebirrWebhookCommand, Result>
{
    public async Task<Result> Handle(ProcessTelebirrWebhookCommand req, CancellationToken ct)
    {
        var order = await db.Orders
            .Include(o => o.Payment)
            .FirstOrDefaultAsync(o => o.PaymentRef == req.Dto.OutTradeNo, ct);

        if (order == null) return Result.Failure("Order not found for transaction reference.");

        if (req.Dto.TradeStatus == "Completed" || req.Dto.TradeStatus == "Success")
        {
            order.EscrowHeld = true;
            if (order.Payment != null)
            {
                order.Payment.Status = "Held";
                order.Payment.TelebirrRef = req.Dto.TransactionNo;
            }
            await db.SaveChangesAsync(ct);
        }

        return Result.Success();
    }
}

// 5. Process Chapa Webhook Command
public record ProcessChapaWebhookCommand(System.Text.Json.JsonElement Payload, string Signature) : IRequest<Result>;

public class ProcessChapaWebhookHandler(
    IAppDbContext db,
    IPaymentGateway paymentGateway,
    ISignalRNotifier signalR) : IRequestHandler<ProcessChapaWebhookCommand, Result>
{
    public async Task<Result> Handle(ProcessChapaWebhookCommand req, CancellationToken ct)
    {
        var rawJson = req.Payload.GetRawText();
        if (!paymentGateway.VerifyWebhookSignature(rawJson, req.Signature))
        {
            return Result.Failure("Invalid Chapa webhook signature.");
        }

        string? txRef = null;
        string? chapaRef = null;
        string? status = null;

        if (req.Payload.TryGetProperty("tx_ref", out var txRefEl)) txRef = txRefEl.GetString();
        if (req.Payload.TryGetProperty("reference", out var refEl)) chapaRef = refEl.GetString();
        if (req.Payload.TryGetProperty("status", out var statusEl)) status = statusEl.GetString();

        if (string.IsNullOrWhiteSpace(txRef))
            return Result.Failure("Missing tx_ref in Chapa webhook payload.");

        var order = await db.Orders
            .Include(o => o.Payment)
            .Include(o => o.Listing)
            .FirstOrDefaultAsync(o => o.PaymentRef == txRef, ct);

        if (order == null)
            return Result.Failure($"Order not found for Chapa tx_ref '{txRef}'.");

        if (status?.Equals("success", StringComparison.OrdinalIgnoreCase) == true)
        {
            order.EscrowHeld = true;
            if (order.Payment != null)
            {
                order.Payment.Status = "Held";
                order.Payment.TelebirrRef = chapaRef ?? txRef;
            }
            await db.SaveChangesAsync(ct);
            _ = signalR.NotifyOrderStatusChangedAsync(order.Id, OrderStatus.Pending, "Chapa escrow payment confirmed.", ct);
        }

        return Result.Success();
    }
}

// 6. Verify Chapa Payment Query
public record VerifyChapaPaymentCommand(string TxRef) : IRequest<Result<object>>;

public class VerifyChapaPaymentHandler(
    IAppDbContext db,
    IPaymentGateway paymentGateway,
    ISignalRNotifier signalR) : IRequestHandler<VerifyChapaPaymentCommand, Result<object>>
{
    public async Task<Result<object>> Handle(VerifyChapaPaymentCommand req, CancellationToken ct)
    {
        var order = await db.Orders
            .Include(o => o.Payment)
            .Include(o => o.Listing)
            .FirstOrDefaultAsync(o => o.PaymentRef == req.TxRef, ct);

        if (order == null)
            return Result<object>.Failure($"Order not found for transaction '{req.TxRef}'.");

        var isValid = await paymentGateway.VerifyPaymentAsync(req.TxRef, ct);
        if (!isValid)
            return Result<object>.Failure("Chapa transaction verification failed or is not yet complete.");

        order.EscrowHeld = true;
        if (order.Payment != null)
        {
            order.Payment.Status = "Held";
        }
        await db.SaveChangesAsync(ct);
        _ = signalR.NotifyOrderStatusChangedAsync(order.Id, OrderStatus.Pending, "Chapa escrow payment confirmed.", ct);

        return Result<object>.Success(new
        {
            orderId = order.Id,
            status = order.Status.ToString(),
            escrowHeld = order.EscrowHeld,
            paymentRef = order.PaymentRef,
            amount = order.TotalEtb
        });
    }
}
