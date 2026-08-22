using FarmerMarket.Application.Common.Interfaces;
using FarmerMarket.Application.Common.Models;
using FarmerMarket.Application.DTOs;
using FarmerMarket.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FarmerMarket.Application.Features.Admin;

// 1. Get Platform Stats Query
public record GetPlatformStatsQuery : IRequest<Result<PlatformStatsDto>>;

public class GetPlatformStatsHandler(IAppDbContext db) : IRequestHandler<GetPlatformStatsQuery, Result<PlatformStatsDto>>
{
    public async Task<Result<PlatformStatsDto>> Handle(GetPlatformStatsQuery req, CancellationToken ct)
    {
        var totalUsers = await db.Users.CountAsync(ct);
        var totalFarmers = await db.Users.CountAsync(u => u.Role == UserRole.Farmer, ct);
        var totalBuyers = await db.Users.CountAsync(u => u.Role == UserRole.Buyer, ct);
        var totalDrivers = await db.Users.CountAsync(u => u.Role == UserRole.Driver, ct);
        var totalListings = await db.Listings.CountAsync(ct);
        var totalOrders = await db.Orders.CountAsync(ct);

        var payments = await db.Payments.AsNoTracking().ToListAsync(ct);
        var totalVolume = payments.Sum(p => p.AmountEtb);
        var totalCommission = payments.Where(p => p.Status == "Released").Sum(p => p.PlatformCut);
        var activeEscrow = payments.Where(p => p.Status == "Held").Sum(p => p.AmountEtb);
        var disputedOrders = await db.Orders.CountAsync(o => o.Status == OrderStatus.Disputed, ct);

        return Result<PlatformStatsDto>.Success(new PlatformStatsDto(
            totalUsers,
            totalFarmers,
            totalBuyers,
            totalDrivers,
            totalListings,
            totalOrders,
            totalVolume,
            totalCommission,
            activeEscrow,
            disputedOrders,
            145.8m,
            480000m
        ));
    }
}

// 2. Verify User Command (Admin)
public record VerifyUserCommand(Guid UserId, bool Verified, string? KycStatus = "Verified") : IRequest<Result>;

public class VerifyUserHandler(IAppDbContext db) : IRequestHandler<VerifyUserCommand, Result>
{
    public async Task<Result> Handle(VerifyUserCommand req, CancellationToken ct)
    {
        var user = await db.Users.FirstOrDefaultAsync(u => u.Id == req.UserId, ct);
        if (user == null) return Result.Failure("User not found.");

        user.Verified = req.Verified;
        user.KycStatus = req.KycStatus ?? (req.Verified ? "Verified" : "Rejected");
        await db.SaveChangesAsync(ct);

        return Result.Success();
    }
}

// 3. Resolve Dispute Command (Admin - 3-Way arbitration)
public record ResolveDisputeCommand(Guid OrderId, ResolveDisputeDto Dto) : IRequest<Result>;

public class ResolveDisputeHandler(
    IAppDbContext db,
    ITelebirrService telebirr,
    ISignalRNotifier signalR) : IRequestHandler<ResolveDisputeCommand, Result>
{
    public async Task<Result> Handle(ResolveDisputeCommand req, CancellationToken ct)
    {
        var order = await db.Orders
            .Include(o => o.Payment)
            .FirstOrDefaultAsync(o => o.Id == req.OrderId, ct);

        if (order == null) return Result.Failure("Order not found.");

        order.DisputeResolutionNotes = req.Dto.Notes;

        if (req.Dto.Resolution == "ReleaseToFarmer")
        {
            order.Status = OrderStatus.Delivered;
            order.EscrowHeld = false;
            order.DisputeStatus = "ResolvedReleaseFarmer";
            if (order.Payment != null)
            {
                order.Payment.Status = "Released";
                order.Payment.ReleasedAt = DateTimeOffset.UtcNow;
                await telebirr.ReleaseEscrowAsync(order.Id, order.TotalEtb, ct);
            }
        }
        else if (req.Dto.Resolution == "RefundBuyer")
        {
            order.Status = OrderStatus.Cancelled;
            order.EscrowHeld = false;
            order.DisputeStatus = "ResolvedRefundBuyer";
            if (order.Payment != null)
            {
                order.Payment.Status = "Refunded";
                await telebirr.RefundPaymentAsync(order.Id, order.TotalEtb, ct);
            }
        }
        else if (req.Dto.Resolution == "PartialSplit")
        {
            order.Status = OrderStatus.Delivered;
            order.EscrowHeld = false;
            order.DisputeStatus = "ResolvedPartialSplit";
            if (order.Payment != null)
            {
                var farmerPortion = order.TotalEtb * (req.Dto.FarmerSharePercent / 100m);
                var buyerRefund = order.TotalEtb * (req.Dto.BuyerRefundPercent / 100m);

                order.Payment.FarmerCut = farmerPortion;
                order.Payment.Status = "ReleasedPartial";
                order.Payment.ReleasedAt = DateTimeOffset.UtcNow;

                await telebirr.ReleaseEscrowAsync(order.Id, farmerPortion, ct);
                await telebirr.RefundPaymentAsync(order.Id, buyerRefund, ct);
            }
        }

        await db.SaveChangesAsync(ct);

        _ = signalR.NotifyOrderStatusChangedAsync(order.Id, order.Status, $"Dispute resolved by Admin: {req.Dto.Resolution}. Notes: {req.Dto.Notes}", ct);

        return Result.Success();
    }
}

// 4. Broadcast SMS Command (Admin)
public record BroadcastSmsCommand(BroadcastSmsRequestDto Dto) : IRequest<Result<int>>;

public class BroadcastSmsHandler(ISmsService sms) : IRequestHandler<BroadcastSmsCommand, Result<int>>
{
    public async Task<Result<int>> Handle(BroadcastSmsCommand req, CancellationToken ct)
    {
        var count = await sms.BroadcastAnnouncementAsync(req.Dto.MessageEn, req.Dto.MessageAm, req.Dto.TargetRole, ct);
        return Result<int>.Success(count);
    }
}
