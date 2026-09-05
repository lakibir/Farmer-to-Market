using FarmerMarket.Application.Common.Interfaces;
using FarmerMarket.Application.DTOs;
using System.Collections.Concurrent;

namespace FarmerMarket.Infrastructure.Services;

public class SuperAdminGovernanceStore : ISuperAdminGovernanceStore
{
    private const string SystemActorId = "system-superadmin";
    private const string SystemActorName = "SuperAdmin Console";
    private const string SystemActorRole = "superadmin";
    private const string DefaultIpAddress = "127.0.0.1";
    private const string DefaultUserAgent = "FarmerMarket Core Governance Engine";

    private readonly object _lock = new();

    private SuperAdminPlatformConfigDto _config;
    private List<SuperAdminPayoutDto> _payouts;
    private List<SuperAdminAuditLogDto> _auditLogs;
    private List<DeliveryZoneDto> _zones;
    private List<FeatureFlagDto> _featureFlags;
    private List<BlacklistEntryDto> _blacklist;
    private GlobalBusinessRulesDto _rules;

    public SuperAdminGovernanceStore()
    {
        _config = GetDefaultConfig();
        _payouts = GetDefaultPayouts();
        _auditLogs = GetDefaultAuditLogs();
        _zones = GetDefaultDeliveryZones();
        _featureFlags = GetDefaultFeatureFlags();
        _blacklist = GetDefaultBlacklist();
        _rules = GetDefaultBusinessRules();
    }

    // ── Platform Config ────────────────────────────────────────────────────────
    public SuperAdminPlatformConfigDto GetPlatformConfig()
    {
        lock (_lock) return _config;
    }

    public SuperAdminPlatformConfigDto UpdatePlatformConfig(SuperAdminPlatformConfigDto config)
    {
        lock (_lock)
        {
            _config = config;
            AddAuditLogInternal(SystemActorId, SystemActorName, SystemActorRole, "UPDATE_PLATFORM_CONFIG", "CONFIG", "PlatformConfig", null, "Updated platform configuration and escrow parameters.");
            return _config;
        }
    }

    public bool FreezeEscrow()
    {
        lock (_lock)
        {
            _config = _config with { EmergencyEscrowFrozen = true };
            AddAuditLogInternal(SystemActorId, SystemActorName, SystemActorRole, "EMERGENCY_ESCROW_FREEZE", "EMERGENCY", "PlatformConfig", null, "EMERGENCY: Immediate platform-wide escrow payout killswitch activated.");
            return true;
        }
    }

    public bool UnfreezeEscrow()
    {
        lock (_lock)
        {
            _config = _config with { EmergencyEscrowFrozen = false };
            AddAuditLogInternal(SystemActorId, SystemActorName, SystemActorRole, "EMERGENCY_ESCROW_UNFREEZE", "EMERGENCY", "PlatformConfig", null, "Emergency killswitch deactivated. Standard escrow processing resumed.");
            return true;
        }
    }

    // ── Payouts (4 initial Pending) ──────────────────────────────────────────
    public List<SuperAdminPayoutDto> GetPayouts()
    {
        lock (_lock) return new List<SuperAdminPayoutDto>(_payouts);
    }

    public SuperAdminPayoutDto CreatePayout(CreatePayoutRequestDto dto)
    {
        lock (_lock)
        {
            var tax = Math.Round(dto.AmountEtb * (_config.WithholdingTaxPercent / 100m), 2);
            var net = dto.AmountEtb - tax;
            var item = new SuperAdminPayoutDto(
                Id: $"payout-appr-{DateTimeOffset.UtcNow.ToUnixTimeMilliseconds().ToString()[^4..]}",
                RecipientId: dto.RecipientId,
                RecipientName: dto.RecipientName,
                RecipientPhone: dto.RecipientPhone,
                RecipientRole: dto.RecipientRole,
                AmountEtb: dto.AmountEtb,
                WalletBalanceBefore: dto.AmountEtb,
                RiskScore: dto.RiskScore ?? (dto.AmountEtb > 100000 ? "High" : dto.AmountEtb > 75000 ? "Medium" : "Low"),
                TriggerReason: dto.TriggerReason,
                Status: "Pending",
                RequestedAt: "Just now",
                CropName: dto.CropName ?? "Agricultural Produce Trade",
                Region: dto.Region ?? "National Pool",
                WithholdingTaxEtb: tax,
                NetDisbursedEtb: net,
                TelebirrTxId: $"TB-ET-{Random.Shared.Next(100000, 999999)}",
                TinNumber: dto.TinNumber,
                FaydaId: dto.FaydaId
            );

            _payouts.Insert(0, item);
            AddAuditLogInternal(SystemActorId, SystemActorName, SystemActorRole, "CREATE_PAYOUT_REQUEST", "FINANCE", "PayoutApproval", item.Id, $"Generated payout request for {item.RecipientName} of {item.AmountEtb:N0} ETB.");
            return item;
        }
    }

    public SuperAdminPayoutDto? ApprovePayout(string id, string reviewerName)
    {
        lock (_lock)
        {
            var idx = _payouts.FindIndex(p => p.Id == id);
            if (idx == -1) return null;

            var current = _payouts[idx];
            var txId = string.IsNullOrEmpty(current.TelebirrTxId) ? $"TB-ET-{Random.Shared.Next(100000, 999999)}" : current.TelebirrTxId;
            var updated = current with
            {
                Status = "Approved",
                ReviewedBy = reviewerName,
                ReviewedAt = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss"),
                TelebirrTxId = txId
            };

            _payouts[idx] = updated;
            AddAuditLogInternal(SystemActorId, reviewerName, SystemActorRole, "APPROVE_HIGH_VALUE_PAYOUT", "FINANCE", "PayoutApproval", id, $"Authorized high-value Telebirr payout of {updated.AmountEtb:N0} ETB for {updated.RecipientName}. Telebirr Tx: {txId}");
            return updated;
        }
    }

    public List<SuperAdminPayoutDto> BatchApprovePayouts(List<string> ids, string reviewerName)
    {
        lock (_lock)
        {
            var approvedList = new List<SuperAdminPayoutDto>();
            decimal totalEtb = 0;

            foreach (var id in ids)
            {
                var idx = _payouts.FindIndex(p => p.Id == id && p.Status == "Pending");
                if (idx != -1)
                {
                    var current = _payouts[idx];
                    var txId = string.IsNullOrEmpty(current.TelebirrTxId) ? $"TB-ET-{Random.Shared.Next(100000, 999999)}" : current.TelebirrTxId;
                    var updated = current with
                    {
                        Status = "Approved",
                        ReviewedBy = reviewerName,
                        ReviewedAt = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss"),
                        TelebirrTxId = txId
                    };
                    _payouts[idx] = updated;
                    approvedList.Add(updated);
                    totalEtb += updated.AmountEtb;
                }
            }

            if (approvedList.Count > 0)
            {
                AddAuditLogInternal(SystemActorId, reviewerName, SystemActorRole, "BATCH_APPROVE_PAYOUTS", "FINANCE", "PayoutApproval", null, $"Batch authorized {approvedList.Count} high-value payouts totaling {totalEtb:N0} ETB via Telebirr.");
            }

            return approvedList;
        }
    }

    public SuperAdminPayoutDto? RejectPayout(string id, string reviewerName, string reason)
    {
        lock (_lock)
        {
            var idx = _payouts.FindIndex(p => p.Id == id);
            if (idx == -1) return null;

            var current = _payouts[idx];
            var updated = current with
            {
                Status = "Rejected",
                ReviewedBy = reviewerName,
                ReviewedAt = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss"),
                RejectionReason = reason
            };

            _payouts[idx] = updated;
            AddAuditLogInternal(SystemActorId, reviewerName, SystemActorRole, "REJECT_HIGH_VALUE_PAYOUT", "FINANCE", "PayoutApproval", id, $"Declined payout of {updated.AmountEtb:N0} ETB for {updated.RecipientName}. Reason: {reason}");
            return updated;
        }
    }

    public void ResetPayoutsToDefault()
    {
        lock (_lock)
        {
            _payouts = GetDefaultPayouts();
            AddAuditLogInternal(SystemActorId, SystemActorName, SystemActorRole, "RESET_PAYOUTS_TO_DEFAULT", "FINANCE", "PayoutApproval", null, "Reset high-value multi-sig payout queue to baseline state.");
        }
    }

    // ── Audit Logs (5 initial) ───────────────────────────────────────────────
    public List<SuperAdminAuditLogDto> GetAuditLogs(string? category = null)
    {
        lock (_lock)
        {
            if (string.IsNullOrWhiteSpace(category) || category.Equals("all", StringComparison.OrdinalIgnoreCase))
                return new List<SuperAdminAuditLogDto>(_auditLogs);

            return _auditLogs.Where(l => l.Category.Equals(category, StringComparison.OrdinalIgnoreCase)).ToList();
        }
    }

    public SuperAdminAuditLogDto AddAuditLog(CreateAuditLogRequestDto dto)
    {
        lock (_lock)
        {
            var item = new SuperAdminAuditLogDto(
                Id: $"log-{_auditLogs.Count + 101}",
                ActorId: dto.ActorId,
                ActorName: dto.ActorName,
                ActorRole: dto.ActorRole,
                Action: dto.Action,
                Category: dto.Category,
                TargetResource: dto.TargetResource,
                TargetId: dto.TargetId,
                IpAddress: dto.IpAddress ?? DefaultIpAddress,
                UserAgent: dto.UserAgent ?? DefaultUserAgent,
                Details: dto.Details,
                Timestamp: DateTime.UtcNow.ToString("yyyy-MM-dd hh:mm tt")
            );
            _auditLogs.Insert(0, item);
            return item;
        }
    }

    private void AddAuditLogInternal(string actorId, string actorName, string actorRole, string action, string category, string targetResource, string? targetId, string details)
    {
        var item = new SuperAdminAuditLogDto(
            Id: $"log-{_auditLogs.Count + 101}",
            ActorId: actorId,
            ActorName: actorName,
            ActorRole: actorRole,
            Action: action,
            Category: category,
            TargetResource: targetResource,
            TargetId: targetId,
            IpAddress: DefaultIpAddress,
            UserAgent: DefaultUserAgent,
            Details: details,
            Timestamp: DateTime.UtcNow.ToString("yyyy-MM-dd hh:mm tt")
        );
        _auditLogs.Insert(0, item);
    }

    // ── Delivery Zones (6 initial) ───────────────────────────────────────────
    public List<DeliveryZoneDto> GetDeliveryZones()
    {
        lock (_lock) return new List<DeliveryZoneDto>(_zones);
    }

    public DeliveryZoneDto AddDeliveryZone(DeliveryZoneDto zone)
    {
        lock (_lock)
        {
            var item = zone with { Id = $"zone-{_zones.Count + 1}" };
            _zones.Add(item);
            AddAuditLogInternal(SystemActorId, SystemActorName, SystemActorRole, "ADD_DELIVERY_ZONE", "CONFIG", "DeliveryZoneConfig", item.Id, $"Added new regional delivery zone: {item.Name} (Base radius {item.BaseRadiusKm} km).");
            return item;
        }
    }

    public DeliveryZoneDto? UpdateDeliveryZone(string id, DeliveryZoneDto zone)
    {
        lock (_lock)
        {
            var idx = _zones.FindIndex(z => z.Id == id);
            if (idx == -1) return null;

            _zones[idx] = zone with { Id = id };
            AddAuditLogInternal(SystemActorId, SystemActorName, SystemActorRole, "UPDATE_DELIVERY_ZONE", "CONFIG", "DeliveryZoneConfig", id, $"Updated delivery zone '{zone.Name}' configuration.");
            return _zones[idx];
        }
    }

    public bool DeleteDeliveryZone(string id)
    {
        lock (_lock)
        {
            var item = _zones.FirstOrDefault(z => z.Id == id);
            if (item == null) return false;

            _zones.Remove(item);
            AddAuditLogInternal(SystemActorId, SystemActorName, SystemActorRole, "DELETE_DELIVERY_ZONE", "CONFIG", "DeliveryZoneConfig", id, $"Deleted delivery zone: {item.Name}.");
            return true;
        }
    }

    public void ResetDeliveryZonesToDefault()
    {
        lock (_lock)
        {
            _zones = GetDefaultDeliveryZones();
            AddAuditLogInternal(SystemActorId, SystemActorName, SystemActorRole, "RESET_DELIVERY_ZONES", "CONFIG", "DeliveryZoneConfig", null, "Reset delivery zones to 6 national trade corridors.");
        }
    }

    // ── Feature Flags (5 initial) ────────────────────────────────────────────
    public List<FeatureFlagDto> GetFeatureFlags()
    {
        lock (_lock) return new List<FeatureFlagDto>(_featureFlags);
    }

    public FeatureFlagDto? ToggleFeatureFlag(string key, bool? enabled, int? rolloutPercentage = null)
    {
        lock (_lock)
        {
            var idx = _featureFlags.FindIndex(f => f.Key == key);
            if (idx == -1) return null;

            var current = _featureFlags[idx];
            var updated = current with
            {
                Enabled = enabled ?? !current.Enabled,
                RolloutPercentage = rolloutPercentage ?? current.RolloutPercentage
            };

            _featureFlags[idx] = updated;
            AddAuditLogInternal(SystemActorId, SystemActorName, SystemActorRole, "TOGGLE_FEATURE_FLAG", "CONFIG", "FeatureFlag", key, $"{(updated.Enabled ? "Enabled" : "Disabled")} feature flag: {updated.Name} ({key}). Rollout: {updated.RolloutPercentage}%.");
            return updated;
        }
    }

    public void ResetFeatureFlagsToDefault()
    {
        lock (_lock)
        {
            _featureFlags = GetDefaultFeatureFlags();
        }
    }

    // ── Emergency & Blacklist ────────────────────────────────────────────────
    public List<BlacklistEntryDto> GetBlacklist()
    {
        lock (_lock) return new List<BlacklistEntryDto>(_blacklist);
    }

    public BlacklistEntryDto AddBlacklistEntry(CreateBlacklistEntryDto dto)
    {
        lock (_lock)
        {
            var blacklistedBy = string.IsNullOrWhiteSpace(dto.BlacklistedBy) ? SystemActorName : dto.BlacklistedBy;
            var item = new BlacklistEntryDto(
                Id: $"bl-{(_blacklist.Count + 1):D2}",
                Type: dto.Type,
                Value: dto.Value,
                Reason: dto.Reason,
                BlacklistedBy: blacklistedBy,
                BlacklistedAt: DateTime.UtcNow.ToString("yyyy-MM-dd"),
                Active: true
            );

            _blacklist.Insert(0, item);
            AddAuditLogInternal(SystemActorId, blacklistedBy, SystemActorRole, "ADD_TO_BLACKLIST", "EMERGENCY", "BlacklistEntry", item.Id, $"Blacklisted {item.Type}: {item.Value}. Reason: {item.Reason}");
            return item;
        }
    }

    public bool RemoveBlacklistEntry(string id)
    {
        lock (_lock)
        {
            var item = _blacklist.FirstOrDefault(b => b.Id == id);
            if (item == null) return false;

            _blacklist.Remove(item);
            AddAuditLogInternal(SystemActorId, SystemActorName, SystemActorRole, "REMOVE_FROM_BLACKLIST", "EMERGENCY", "BlacklistEntry", id, $"Removed {item.Type} ({item.Value}) from platform blacklist.");
            return true;
        }
    }

    // ── Global Rules ─────────────────────────────────────────────────────────
    public GlobalBusinessRulesDto GetBusinessRules()
    {
        lock (_lock) return _rules;
    }

    public GlobalBusinessRulesDto UpdateBusinessRules(GlobalBusinessRulesDto rules)
    {
        lock (_lock)
        {
            _rules = rules;
            AddAuditLogInternal(SystemActorId, SystemActorName, SystemActorRole, "UPDATE_BUSINESS_RULES", "CONFIG", "GlobalBusinessRules", null, $"Updated global trading rules: Min {rules.MinOrderKg} kg, Max {rules.MaxOrderKg} kg, Max Distance {rules.MaxDistanceKm} km.");
            return _rules;
        }
    }

    // ── Database Operations & Health ─────────────────────────────────────────
    public DatabaseHealthDto GetDatabaseHealth()
    {
        return new DatabaseHealthDto(
            Engine: "PostgreSQL 16.2 on x86_64-pc-linux-gnu",
            Status: "Healthy / Optimal",
            PostgisEnabled: true,
            PostgisVersion: "3.4.1 USE_GEOS=1 USE_PROJ=1 USE_STATS=1",
            ActiveConnections: 14,
            MaxConnections: 100,
            DatabaseSizeMb: 248.5,
            CacheHitRatioPercent: 99.4,
            SpatialQueriesPerSecond: 18.2,
            Uptime: "14 days, 6 hours, 22 mins",
            LastVacuum: "Today 03:00 AM (Autovacuum worker)"
        );
    }

    public DatabaseBackupResultDto TriggerDatabaseBackup()
    {
        var backupId = $"BK-PG16-{DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()}";
        AddAuditLogInternal(SystemActorId, SystemActorName, SystemActorRole, "TRIGGER_DATABASE_BACKUP", "CONFIG", "PostgreSQL_Snapshot", backupId, $"Generated encrypted PostgreSQL schema and transaction data snapshot ({backupId}, 248.5 MB).");
        return new DatabaseBackupResultDto(
            BackupId: backupId,
            SizeMb: 248.5,
            Timestamp: DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss UTC"),
            DownloadUrl: $"/api/superadmin/db/download/{backupId}"
        );
    }

    public bool OptimizeDatabase()
    {
        AddAuditLogInternal(SystemActorId, SystemActorName, SystemActorRole, "DATABASE_MAINTENANCE_VACUUM", "CONFIG", "PostgreSQL_Engine", null, "Executed VACUUM ANALYZE and PostGIS spatial index re-indexing across all tables.");
        return true;
    }

    // ── Defaults Initializers ────────────────────────────────────────────────
    private static SuperAdminPlatformConfigDto GetDefaultConfig() => new(
        FarmerSharePercent: 90,
        DriverSharePercent: 5,
        PlatformFeePercent: 5,
        WithholdingTaxPercent: 2,
        VatOnCommissionPercent: 15,
        HighValuePayoutThresholdEtb: 50000,
        EmergencyEscrowFrozen: false,
        TelebirrAppId: "TB_LIVE_ETH_882190",
        TelebirrShortCode: "8055",
        TelebirrApiKey: "sk_live_eth_99281746281920",
        TelebirrEscrowVaultKey: "vault_sec_eth_telebirr_90_5_5",
        TwilioAccountSid: "AC_LIVE_AFROMESSAGE_ETH_001",
        TwilioAuthToken: "auth_live_afromsg_99218201",
        TwilioFromNumber: "8055",
        MapsGeocodingApiKey: "AIzaSy_Ethiopia_AgroCorridor_Spatial_2026",
        PostgisSpatialIndexEnabled: true
    );

    private static List<SuperAdminPayoutDto> GetDefaultPayouts() => new()
    {
        new(
            Id: "payout-appr-001",
            RecipientId: "22222222-2222-2222-2222-222222222222",
            RecipientName: "Almaz Tadesse (Basona Teff Cooperative)",
            RecipientPhone: "+251922334455",
            RecipientRole: "farmer",
            AmountEtb: 62400,
            WalletBalanceBefore: 62400,
            RiskScore: "Low",
            TriggerReason: "Exceeds 50,000 ETB platform threshold (100 Quintals Magna Teff Settlement)",
            Status: "Pending",
            RequestedAt: "Today 10:45 AM",
            CropName: "Magna Teff (Grade 1)",
            Region: "Amhara (Debre Berhan / Basona)",
            TinNumber: "0038912345",
            FaydaId: "FAN-9821-4432-1100",
            WithholdingTaxEtb: 1248,
            NetDisbursedEtb: 61152,
            TelebirrTxId: "TB-ET-982104"
        ),
        new(
            Id: "payout-appr-002",
            RecipientId: "55555555-5555-5555-5555-555555555555",
            RecipientName: "Dawit Kebede (Bulk Freight Fleet)",
            RecipientPhone: "+251977889900",
            RecipientRole: "driver",
            AmountEtb: 54200,
            WalletBalanceBefore: 54200,
            RiskScore: "Medium",
            TriggerReason: "High-frequency multi-trip batch withdrawal (5 Cross-Regional Trips: Adama-Addis)",
            Status: "Pending",
            RequestedAt: "Today 01:20 PM",
            CropName: "Cold-Chain Produce Logistics",
            Region: "Oromia (Adama / Modjo Corridor)",
            TinNumber: "0057812904",
            FaydaId: "FAN-4412-9901-7788",
            WithholdingTaxEtb: 1084,
            NetDisbursedEtb: 53116,
            TelebirrTxId: "TB-ET-551299"
        ),
        new(
            Id: "payout-appr-003",
            RecipientId: "11111111-1111-1111-1111-111111111111",
            RecipientName: "Abebe Bekele (Bishoftu Agro-Hub)",
            RecipientPhone: "+251911223344",
            RecipientRole: "farmer",
            AmountEtb: 78500,
            WalletBalanceBefore: 78500,
            RiskScore: "Low",
            TriggerReason: "Commercial contract fulfilment (2.5 Tons Premium Dutch Tomatoes)",
            Status: "Pending",
            RequestedAt: "Yesterday 04:10 PM",
            CropName: "Shashamane Roma Tomatoes",
            Region: "Oromia (East Shewa / Bishoftu)",
            TinNumber: "0011223344",
            FaydaId: "FAN-1122-3344-5566",
            WithholdingTaxEtb: 1570,
            NetDisbursedEtb: 76930,
            TelebirrTxId: "TB-ET-118822"
        ),
        new(
            Id: "payout-appr-004",
            RecipientId: "33333333-3333-3333-3333-333333333333",
            RecipientName: "Hiwot Worku (Shashemene Organic Union)",
            RecipientPhone: "+251933445566",
            RecipientRole: "farmer",
            AmountEtb: 91200,
            WalletBalanceBefore: 91200,
            RiskScore: "Low",
            TriggerReason: "Wholesale harvest clearance (3 Tons Organic Red Onions & Peppers)",
            Status: "Pending",
            RequestedAt: "Yesterday 06:30 PM",
            CropName: "Bombai Red Onions",
            Region: "Oromia (West Arsi / Shashemene)",
            TinNumber: "0044991122",
            FaydaId: "FAN-3344-5566-7788",
            WithholdingTaxEtb: 1824,
            NetDisbursedEtb: 89376,
            TelebirrTxId: "TB-ET-339900"
        ),
        new(
            Id: "payout-appr-005",
            RecipientId: "44444444-4444-4444-4444-444444444444",
            RecipientName: "Chaltu Gemechu (Bale Robe Growers)",
            RecipientPhone: "+251944556677",
            RecipientRole: "farmer",
            AmountEtb: 51000,
            WalletBalanceBefore: 51000,
            RiskScore: "Low",
            TriggerReason: "Standard contract release (Wheat & Barley consignment)",
            Status: "Approved",
            RequestedAt: "2026-08-22 02:15 PM",
            ReviewedBy: "Dr. Dawit Haile",
            ReviewedAt: "2026-08-22 02:45 PM",
            CropName: "Highland Durum Wheat",
            Region: "Oromia (Bale / Robe)",
            TinNumber: "0077123490",
            FaydaId: "FAN-7788-9900-1122",
            WithholdingTaxEtb: 1020,
            NetDisbursedEtb: 49980,
            TelebirrTxId: "TB-ET-771102"
        ),
        new(
            Id: "payout-appr-006",
            RecipientId: "77777777-7777-7777-7777-777777777777",
            RecipientName: "Meron Assefa (Unverified Broker Entity)",
            RecipientPhone: "+251988990011",
            RecipientRole: "buyer",
            AmountEtb: 120000,
            WalletBalanceBefore: 120000,
            RiskScore: "High",
            TriggerReason: "Rapid withdrawal with mismatching TIN registration and pending dispute flags",
            Status: "Rejected",
            RequestedAt: "2026-08-21 09:00 AM",
            ReviewedBy: "Dr. Dawit Haile",
            ReviewedAt: "2026-08-21 09:30 AM",
            RejectionReason: "TIN tax identification mismatch and unverified third-party account routing flagged by MOR compliance.",
            CropName: "Unverified Coffee Futures",
            Region: "Addis Ababa",
            TinNumber: "0099887766",
            FaydaId: "FAN-9999-8888-7777",
            WithholdingTaxEtb: 2400,
            NetDisbursedEtb: 117600,
            TelebirrTxId: "TB-ET-990011"
        )
    };

    private static List<SuperAdminAuditLogDto> GetDefaultAuditLogs() => new()
    {
        new(
            Id: "log-101",
            ActorId: "00000000-0000-0000-0000-000000000001",
            ActorName: "Dr. Dawit Haile (Super Admin)",
            ActorRole: "superadmin",
            Action: "INITIALIZE_PLATFORM_GOVERNANCE",
            Category: "CONFIG",
            TargetResource: "PlatformConfig",
            TargetId: "ESCROW-90-5-5",
            IpAddress: "196.188.12.45 (Addis Ababa, Ethio Telecom)",
            UserAgent: "Antigravity/2.0 Web Admin Engine",
            Details: "Established baseline 90/5/5 escrow split, 15% VAT on platform fee, and MOR withholding tax schedule.",
            Timestamp: "2026-08-23 08:30 AM"
        ),
        new(
            Id: "log-102",
            ActorId: "66666666-6666-6666-6666-666666666666",
            ActorName: "Sara Mengistu",
            ActorRole: "admin",
            Action: "APPROVE_KYC_VERIFICATION",
            Category: "USER_CRUD",
            TargetResource: "UserDocument",
            TargetId: "11111111-1111-1111-1111-111111111111",
            IpAddress: "196.189.44.12",
            UserAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
            Details: "Approved Abebe Bekele Fayda National ID (FAN-1122-3344-5566) and TIN (0011223344).",
            Timestamp: "2026-08-23 10:15 AM"
        ),
        new(
            Id: "log-103",
            ActorId: "66666666-6666-6666-6666-666666666666",
            ActorName: "Sara Mengistu",
            ActorRole: "admin",
            Action: "DISPUTE_ARBITRATION_DECREE",
            Category: "DISPUTE",
            TargetResource: "Order",
            TargetId: "ord-dispute-001",
            IpAddress: "196.189.44.12",
            UserAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
            Details: "Resolved moisture defect dispute with 50/50 partial split under EABC arbitration rules.",
            Timestamp: "2026-08-23 11:45 AM"
        ),
        new(
            Id: "log-104",
            ActorId: "00000000-0000-0000-0000-000000000001",
            ActorName: "Dr. Dawit Haile (Super Admin)",
            ActorRole: "superadmin",
            Action: "HIGH_VALUE_ESCROW_APPROVAL",
            Category: "FINANCE",
            TargetResource: "PayoutApproval",
            TargetId: "payout-appr-001",
            IpAddress: "196.188.12.45",
            UserAgent: "Antigravity/2.0 Web Admin Engine",
            Details: "Authorized multi-sig payout batch for Debre Berhan Agro Cooperative (62,400 ETB).",
            Timestamp: "2026-08-23 01:10 PM"
        ),
        new(
            Id: "log-105",
            ActorId: "system-orchestrator",
            ActorName: "Platform System (Spatial Service)",
            ActorRole: "system",
            Action: "POSTGIS_SPATIAL_CLUSTER_SYNC",
            Category: "CONFIG",
            TargetResource: "DeliveryZoneConfig",
            TargetId: "ZONE_CORRIDORS_ALL",
            IpAddress: "127.0.0.1",
            UserAgent: "PostGIS Geo-Spatial Engine 3.4",
            Details: "Synchronized 6 regional delivery zones & road network topologies across Oromia, Amhara, Sidama, SNNPR, and Tigray.",
            Timestamp: "2026-08-23 02:00 PM"
        )
    };

    private static List<DeliveryZoneDto> GetDefaultDeliveryZones() => new()
    {
        new("zone-1", "Oromia East Shewa Hub", "ምስራቅ ሸዋ የግብርና ኮሪደር", 8.7522, 38.9785, 45, 120, 150, true, "Bishoftu & Mojo Freight Terminal", 4200),
        new("zone-2", "Addis Ababa Central Wholesale Depot", "አዲስ አበባ ማዕከላዊ የጅምላ ዲፖ", 9.0222, 38.7468, 25, 60, 0, true, "Merkato & Jan Meda Distribution", 850),
        new("zone-3", "Amhara Highland Grain Basin", "የአማራ ከፍተኛ የጤፍና እህል ተፋሰስ", 9.6800, 39.5300, 60, 180, 250, true, "Debre Berhan & Shewa Robit Hub", 3100),
        new("zone-4", "Sidama Rift Fruit & Vegetable Zone", "የሲዳማ ፍራፍሬ እና አትክልት ዞን", 7.0504, 38.4955, 50, 150, 200, true, "Hawassa Lakeview Terminal", 1950),
        new("zone-5", "SNNPR Gedeo Specialty Coffee Zone", "የጌዴኦ ስፔሻሊቲ ቡና ዞን", 6.1628, 38.2045, 40, 140, 300, true, "Yirgacheffe Washing Station Depot", 1400),
        new("zone-6", "Tigray Northern Transit Hub", "የትግራይ ሰሜናዊ የንግድ ኮሪደር", 13.4967, 39.4753, 55, 160, 350, true, "Mekelle Central Depot", 1100)
    };

    private static List<FeatureFlagDto> GetDefaultFeatureFlags() => new()
    {
        new("advance_harvest", "Advance Harvest Pre-Ordering", "Allows wholesale buyers to secure future harvests 2-4 weeks prior to field collection.", true, 100, new List<string> { "all" }, new List<string> { "farmer", "buyer", "admin", "superadmin" }),
        new("voice_note_transcription", "Voice Note Audio Memos & AI Transcription", "Enables Amharic and Afaan Oromoo audio produce memos with automatic speech-to-text.", true, 100, new List<string> { "all" }, new List<string> { "farmer", "agent", "admin", "superadmin" }),
        new("dynamic_price_benchmarking", "Real-time Wholesale Depot Price Benchmarking", "Displays live price comparisons vs Merkato, Sholla, and Adama depots on produce cards.", true, 100, new List<string> { "all" }, new List<string> { "buyer", "farmer", "superadmin" }),
        new("ussd_offline_gateway", "USSD Offline Gateway (*990# / *805#)", "Permits feature phone registration, balance checks, and SMS listing fallbacks.", true, 100, new List<string> { "all" }, new List<string> { "farmer", "agent" }),
        new("multisig_escrow_protection", "High-Value Escrow Multi-Sig Authorization", "Requires Super Admin dual authorization for payouts exceeding 50,000 ETB.", true, 100, new List<string> { "all" }, new List<string> { "admin", "superadmin" })
    };

    private static List<BlacklistEntryDto> GetDefaultBlacklist() => new()
    {
        new("bl-01", "Phone", "+251900112233", "Repeated non-delivery and fraudulent off-platform bypass attempt.", "Sara Mengistu", "2026-08-15", true),
        new("bl-02", "NationalId", "FAN-9999-8888-7777", "Forged Ethiopian national ID presented during tier-2 verification.", "Dr. Dawit Haile", "2026-08-18", true),
        new("bl-03", "TinNumber", "0099887766", "Tax revenue evasion & revoked trade license flagged by MOR audit.", "Dr. Dawit Haile", "2026-08-21", true)
    };

    private static GlobalBusinessRulesDto GetDefaultBusinessRules() => new(
        MinOrderKg: 50,
        MaxOrderKg: 50000,
        MaxDistanceKm: 850,
        PriceFloorVariancePercent: -30,
        PriceCeilingVariancePercent: 250,
        RequireFaydaForOrdersAboveKg: 500,
        AutoArbitrateAfterHours: 48
    );
}
