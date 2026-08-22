namespace FarmerMarket.Application.DTOs;

public record PlatformStatsDto(
    int TotalUsers,
    int TotalFarmers,
    int TotalBuyers,
    int TotalDrivers,
    int TotalListings,
    int TotalOrders,
    decimal TotalTransactionVolumeEtb,
    decimal TotalPlatformCommissionEtb,
    decimal ActiveEscrowHeldEtb,
    int DisputedOrdersCount
);

public record AdminUserDto(
    Guid Id,
    string Phone,
    string Name,
    string? NameAm,
    string Role,
    string? Region,
    bool Verified,
    DateTimeOffset CreatedAt
);

public record UpdateUserRoleDto(
    string Role,
    bool? Verified
);

public record AdminPaymentDto(
    Guid Id,
    Guid OrderId,
    decimal AmountEtb,
    decimal FarmerCut,
    decimal DriverCut,
    decimal PlatformCut,
    string TelebirrRef,
    string Status,
    DateTimeOffset? ReleasedAt,
    DateTimeOffset CreatedAt
);

public record ResolveDisputeDto(
    string Resolution, // "ReleaseToFarmer" or "RefundBuyer"
    string Notes
);

public record BroadcastSmsRequestDto(
    string MessageEn,
    string MessageAm,
    string TargetRole // "all", "farmer", "buyer", "driver"
);
