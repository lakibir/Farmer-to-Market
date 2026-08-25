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
