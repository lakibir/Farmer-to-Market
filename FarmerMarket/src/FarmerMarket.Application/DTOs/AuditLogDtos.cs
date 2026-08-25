namespace FarmerMarket.Application.DTOs;

public record AuditLogDto(
    Guid Id,
    Guid ActorId,
    string ActorName,
    string ActorRole,
    string Action,
    string Category,
    string? TargetResource,
    Guid? TargetId,
    string Detail,
    string? IpAddress,
    DateTimeOffset Timestamp);

public record AuditLogPageDto(
    IReadOnlyList<AuditLogDto> Items,
    int TotalCount,
    int Page,
    int PageSize);

public record CreateAdminDto(string Phone, string Name, string? NameAm, string Region);

