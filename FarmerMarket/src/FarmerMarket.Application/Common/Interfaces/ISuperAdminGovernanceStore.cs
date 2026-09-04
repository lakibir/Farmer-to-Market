using FarmerMarket.Application.DTOs;

namespace FarmerMarket.Application.Common.Interfaces;

public interface ISuperAdminGovernanceStore
{
    // Platform Config
    SuperAdminPlatformConfigDto GetPlatformConfig();
    SuperAdminPlatformConfigDto UpdatePlatformConfig(SuperAdminPlatformConfigDto config);
    bool FreezeEscrow();
    bool UnfreezeEscrow();

    // Payouts
    List<SuperAdminPayoutDto> GetPayouts();
    SuperAdminPayoutDto CreatePayout(CreatePayoutRequestDto dto);
    SuperAdminPayoutDto? ApprovePayout(string id, string reviewerName);
    List<SuperAdminPayoutDto> BatchApprovePayouts(List<string> ids, string reviewerName);
    SuperAdminPayoutDto? RejectPayout(string id, string reviewerName, string reason);
    void ResetPayoutsToDefault();

    // Audit Logs
    List<SuperAdminAuditLogDto> GetAuditLogs(string? category = null);
    SuperAdminAuditLogDto AddAuditLog(CreateAuditLogRequestDto dto);

    // Delivery Zones
    List<DeliveryZoneDto> GetDeliveryZones();
    DeliveryZoneDto AddDeliveryZone(DeliveryZoneDto zone);
    DeliveryZoneDto? UpdateDeliveryZone(string id, DeliveryZoneDto zone);
    bool DeleteDeliveryZone(string id);
    void ResetDeliveryZonesToDefault();

    // Feature Flags
    List<FeatureFlagDto> GetFeatureFlags();
    FeatureFlagDto? ToggleFeatureFlag(string key, bool? enabled, int? rolloutPercentage = null);
    void ResetFeatureFlagsToDefault();

    // Blacklist
    List<BlacklistEntryDto> GetBlacklist();
    BlacklistEntryDto AddBlacklistEntry(CreateBlacklistEntryDto dto);
    bool RemoveBlacklistEntry(string id);

    // Global Business Rules
    GlobalBusinessRulesDto GetBusinessRules();
    GlobalBusinessRulesDto UpdateBusinessRules(GlobalBusinessRulesDto rules);

    // Database & Health Ops
    DatabaseHealthDto GetDatabaseHealth();
    DatabaseBackupResultDto TriggerDatabaseBackup();
    bool OptimizeDatabase();
}
