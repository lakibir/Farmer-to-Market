using FarmerMarket.Application.Common;
using FarmerMarket.Application.Common.Interfaces;
using FarmerMarket.Application.Common.Models;
using FarmerMarket.Application.DTOs;
using FarmerMarket.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FarmerMarket.Application.Features.Admin;

// ─── Query + Handler ────────────────────────────────────────────────────────

public record GetAuditLogsQuery(int Page, int PageSize, string? ActorRole) : IRequest<Result<AuditLogPageDto>>;

public class GetAuditLogsQueryHandler(IAppDbContext db) : IRequestHandler<GetAuditLogsQuery, Result<AuditLogPageDto>>
{
    public async Task<Result<AuditLogPageDto>> Handle(GetAuditLogsQuery request, CancellationToken ct)
    {
        var query = db.AuditLogs.AsQueryable();

        if (!string.IsNullOrWhiteSpace(request.ActorRole))
            query = query.Where(a => a.ActorRole == request.ActorRole);

        var total = await query.CountAsync(ct);
        var items = await query
            .OrderByDescending(a => a.Timestamp)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(a => new AuditLogDto(
                a.Id, a.ActorId, a.ActorName, a.ActorRole,
                a.Action, a.Category, a.TargetResource, a.TargetId,
                a.Detail, a.IpAddress, a.Timestamp))
            .ToListAsync(ct);

        return Result<AuditLogPageDto>.Success(new AuditLogPageDto(items, total, request.Page, request.PageSize));
    }
}

// ─── Command: Write an Audit Log Entry ────────────────────────────────────

public record WriteAuditLogCommand(
    Guid ActorId,
    string ActorName,
    string ActorRole,
    string Action,
    string Category,
    string Detail,
    string? TargetResource = null,
    Guid? TargetId = null,
    string? IpAddress = null) : IRequest<Unit>;

public class WriteAuditLogCommandHandler(IAppDbContext db) : IRequestHandler<WriteAuditLogCommand, Unit>
{
    public async Task<Unit> Handle(WriteAuditLogCommand request, CancellationToken ct)
    {
        db.AuditLogs.Add(new AuditLog
        {
            ActorId = request.ActorId,
            ActorName = request.ActorName,
            ActorRole = request.ActorRole,
            Action = request.Action,
            Category = request.Category,
            Detail = request.Detail,
            TargetResource = request.TargetResource,
            TargetId = request.TargetId,
            IpAddress = request.IpAddress
        });

        await db.SaveChangesAsync(ct);
        return Unit.Value;
    }
}
