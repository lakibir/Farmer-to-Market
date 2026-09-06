namespace FarmerMarket.Domain.Entities;

public class DeliveryZone
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string? NameAm { get; set; }
    public double CenterLatitude { get; set; }
    public double CenterLongitude { get; set; }
    public double BaseRadiusKm { get; set; }
    public double MaxRadiusKm { get; set; }
    public decimal RuralSubsidyEtb { get; set; }
    public bool Active { get; set; } = true;
    public string ClusterHubName { get; set; } = string.Empty;
    public int SmallholdersCount { get; set; }
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
}

public class FeatureFlag
{
    public string Key { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public bool Enabled { get; set; }
    public int RolloutPercentage { get; set; } = 100;
    public List<string> TargetRegions { get; set; } = new();
    public List<string> TargetRoles { get; set; } = new();
    public DateTimeOffset UpdatedAt { get; set; } = DateTimeOffset.UtcNow;
}

public class BlacklistEntry
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Type { get; set; } = "Phone"; // Phone | IP | TIN | Fayda
    public string Value { get; set; } = string.Empty;
    public string Reason { get; set; } = string.Empty;
    public string BlacklistedBy { get; set; } = "System";
    public DateTimeOffset BlacklistedAt { get; set; } = DateTimeOffset.UtcNow;
    public bool Active { get; set; } = true;
}

public class PayoutRecord
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string RecipientId { get; set; } = string.Empty;
    public string RecipientName { get; set; } = string.Empty;
    public string RecipientPhone { get; set; } = string.Empty;
    public string RecipientRole { get; set; } = string.Empty;
    public decimal AmountEtb { get; set; }
    public decimal WalletBalanceBefore { get; set; }
    public string RiskScore { get; set; } = "Low";
    public string TriggerReason { get; set; } = string.Empty;
    public string Status { get; set; } = "Pending"; // Pending | Approved | Rejected | Disbursed
    public DateTimeOffset RequestedAt { get; set; } = DateTimeOffset.UtcNow;
    public string? ReviewedBy { get; set; }
    public DateTimeOffset? ReviewedAt { get; set; }
    public string? RejectionReason { get; set; }
    public string? TelebirrTxId { get; set; }
    public string? OrderId { get; set; }
    public string? CropName { get; set; }
    public string? Region { get; set; }
    public decimal? WithholdingTaxEtb { get; set; }
    public decimal? NetDisbursedEtb { get; set; }
    public string? TinNumber { get; set; }
    public string? FaydaId { get; set; }
}

public class SystemSetting
{
    public string Key { get; set; } = string.Empty;
    public string ValueJson { get; set; } = string.Empty;
    public DateTimeOffset UpdatedAt { get; set; } = DateTimeOffset.UtcNow;
    public string UpdatedBy { get; set; } = "System";
}
