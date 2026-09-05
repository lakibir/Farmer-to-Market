namespace FarmerMarket.Application.DTOs;

public record SuperAdminPlatformConfigDto(
    decimal FarmerSharePercent,
    decimal DriverSharePercent,
    decimal PlatformFeePercent,
    decimal WithholdingTaxPercent,
    decimal VatOnCommissionPercent,
    decimal HighValuePayoutThresholdEtb,
    bool EmergencyEscrowFrozen,
    string TelebirrAppId,
    string TelebirrShortCode,
    string TelebirrApiKey,
    string TelebirrEscrowVaultKey,
    string TwilioAccountSid,
    string TwilioAuthToken,
    string TwilioFromNumber,
    string MapsGeocodingApiKey,
    bool PostgisSpatialIndexEnabled
);

public record SuperAdminPayoutDto(
    string Id,
    string RecipientId,
    string RecipientName,
    string RecipientPhone,
    string RecipientRole,
    decimal AmountEtb,
    decimal WalletBalanceBefore,
    string RiskScore,
    string TriggerReason,
    string Status,
    string RequestedAt,
    string? ReviewedBy = null,
    string? ReviewedAt = null,
    string? RejectionReason = null,
    string? TelebirrTxId = null,
    string? OrderId = null,
    string? CropName = null,
    string? Region = null,
    decimal? WithholdingTaxEtb = null,
    decimal? NetDisbursedEtb = null,
    string? TinNumber = null,
    string? FaydaId = null
);

public record CreatePayoutRequestDto(
    string RecipientId,
    string RecipientName,
    string RecipientPhone,
    string RecipientRole,
    decimal AmountEtb,
    string? RiskScore,
    string TriggerReason,
    string? CropName,
    string? Region,
    string? TinNumber,
    string? FaydaId
);

public record ApprovePayoutRequestDto(
    string? ReviewerName
);

public record RejectPayoutRequestDto(
    string? ReviewerName,
    string Reason
);

public record BatchApprovePayoutsRequestDto(
    List<string> Ids,
    string? ReviewerName
);

public record SuperAdminAuditLogDto(
    string Id,
    string ActorId,
    string ActorName,
    string ActorRole,
    string Action,
    string Category,
    string TargetResource,
    string? TargetId,
    string IpAddress,
    string UserAgent,
    string Details,
    string Timestamp,
    object? PreState = null,
    object? PostState = null
);

public record CreateAuditLogRequestDto(
    string ActorId,
    string ActorName,
    string ActorRole,
    string Action,
    string Category,
    string TargetResource,
    string? TargetId,
    string? IpAddress,
    string? UserAgent,
    string Details
);

public record DeliveryZoneDto(
    string Id,
    string Name,
    string? NameAm,
    double CenterLatitude,
    double CenterLongitude,
    double BaseRadiusKm,
    double MaxRadiusKm,
    decimal RuralSubsidyEtb,
    bool Active,
    string ClusterHubName,
    int SmallholdersCount
);

public record FeatureFlagDto(
    string Key,
    string Name,
    string Description,
    bool Enabled,
    int RolloutPercentage,
    List<string> TargetRegions,
    List<string> TargetRoles
);

public record ToggleFeatureFlagDto(
    bool? Enabled,
    int? RolloutPercentage
);

public record BlacklistEntryDto(
    string Id,
    string Type,
    string Value,
    string Reason,
    string BlacklistedBy,
    string BlacklistedAt,
    bool Active
);

public record CreateBlacklistEntryDto(
    string Type,
    string Value,
    string Reason,
    string? BlacklistedBy = null
);

public record GlobalBusinessRulesDto(
    double MinOrderKg,
    double MaxOrderKg,
    double MaxDistanceKm,
    double PriceFloorVariancePercent,
    double PriceCeilingVariancePercent,
    double RequireFaydaForOrdersAboveKg,
    double AutoArbitrateAfterHours
);

public record DatabaseHealthDto(
    string Engine,
    string Status,
    bool PostgisEnabled,
    string PostgisVersion,
    int ActiveConnections,
    int MaxConnections,
    double DatabaseSizeMb,
    double CacheHitRatioPercent,
    double SpatialQueriesPerSecond,
    string Uptime,
    string LastVacuum
);

public record DatabaseBackupResultDto(
    string BackupId,
    double SizeMb,
    string Timestamp,
    string DownloadUrl
);

public record CreateSuperAdminUserDto(
    string Phone,
    string Name,
    string? NameAm,
    Domain.Enums.UserRole Role,
    string Region,
    string? Password = null,
    string? Email = null,
    bool? Verified = true,
    string? PrimaryCrop = null,
    string? Kebele = null,
    string? FaydaId = null,
    string? TinNumber = null,
    string? BusinessLicenseNumber = null,
    string? VehicleType = null,
    decimal? VehicleCapacityKg = null,
    string? RefrigerationType = null
);
