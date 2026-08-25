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
    int DisputedOrdersCount,
    decimal TotalMetricTonsMoved = 145.8m,
    decimal MiddlemanMarginSavedEtb = 480000m
);

public record AdminUserDto(
    Guid Id,
    string Phone,
    string Name,
    string? NameAm,
    string Role,
    string? Region,
    bool Verified,
    string? KycDocumentType,
    string? KycDocumentNumber,
    string KycStatus,
    string? VehicleType,
    decimal VehicleCapacityKg,
    DateTimeOffset CreatedAt
);

public record UpdateUserRoleDto(
    string Role,
    bool? Verified
);

public record UpdateUserStatusDto(
    string Status
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
    string Resolution, // "ReleaseToFarmer", "RefundBuyer", or "PartialSplit"
    string Notes,
    int FarmerSharePercent = 50,
    int BuyerRefundPercent = 50
);

public record BroadcastSmsRequestDto(
    string MessageEn,
    string MessageAm,
    string TargetRole // "all", "farmer", "buyer", "driver"
);

public record AnomalyAlertDto(
    string Id,
    string Severity, // "High", "Medium", "Low"
    string Type, // "DuplicateProofPhoto", "PriceManipulation", "UnusualVolume", "FakeAccount"
    string Title,
    string Description,
    string EntityType,
    string EntityId,
    DateTimeOffset DetectedAt
);

public record KycVerificationItemDto(
    Guid UserId,
    string UserName,
    string UserRole,
    string Phone,
    string Region,
    string DocumentType, // "National ID (Fayda)", "Kebele ID", "Commercial Vehicle Logbook"
    string DocumentNumber,
    string Status, // "Pending", "Verified", "Rejected"
    DateTimeOffset SubmittedAt
);

public record RegionalAnalyticsDto(
    string Region,
    int SmallholdersCount,
    decimal VolumeMetricTons,
    decimal TotalGmvEtb,
    string TopCrop
);
