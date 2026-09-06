using System.ComponentModel.DataAnnotations;

namespace FarmerMarket.Application.Common.Models;

/// <summary>
/// Authoritative business & escrow configuration model.
/// Enforces financial integrity and platform trading parameters.
/// </summary>
public class EscrowOptions : IValidatableObject
{
    public const string SectionName = "Escrow";

    // ── Escrow Splits (Must sum to exactly 100%) ──────────────────────────────
    [Range(0, 100, ErrorMessage = "Farmer percentage must be between 0 and 100.")]
    public decimal FarmerPercent { get; set; } = 90m;

    [Range(0, 100, ErrorMessage = "Driver percentage must be between 0 and 100.")]
    public decimal DriverPercent { get; set; } = 5m;

    [Range(0, 100, ErrorMessage = "Platform percentage must be between 0 and 100.")]
    public decimal PlatformPercent { get; set; } = 5m;

    // ── Tax & Subsidies ───────────────────────────────────────────────────────
    [Range(0, 100, ErrorMessage = "Withholding tax percentage must be between 0 and 100.")]
    public decimal WithholdingTaxPercent { get; set; } = 2m;

    [Range(0, 100, ErrorMessage = "VAT on platform commission must be between 0 and 100.")]
    public decimal VatOnCommissionPercent { get; set; } = 15m;

    [Range(0, 10000000, ErrorMessage = "Driver subsidy must be non-negative.")]
    public decimal DriverSubsidyEtb { get; set; } = 150m;

    // ── Governance & Safety Thresholds ────────────────────────────────────────
    [Range(100, 100000000, ErrorMessage = "High value payout threshold must be at least 100 ETB.")]
    public decimal HighValuePayoutThresholdEtb { get; set; } = 50000m;

    [Range(1, 1000000, ErrorMessage = "Minimum order kg must be at least 1.")]
    public decimal MinOrderKg { get; set; } = 10m;

    [Range(1, 10000000, ErrorMessage = "Maximum order kg must be greater than 1.")]
    public decimal MaxOrderKg { get; set; } = 50000m;

    [Range(1, 10000, ErrorMessage = "Maximum delivery distance must be positive.")]
    public decimal MaxDistanceKm { get; set; } = 450m;

    public decimal RequireFaydaForOrdersAboveKg { get; set; } = 500m;
    public int AutoArbitrateAfterHours { get; set; } = 48;

    public string PaymentProvider { get; set; } = "Chapa"; // Chapa | Telebirr

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (FarmerPercent + DriverPercent + PlatformPercent != 100m)
        {
            yield return new ValidationResult(
                $"Escrow split percentages must sum to exactly 100. Current sum: {FarmerPercent + DriverPercent + PlatformPercent} (Farmer: {FarmerPercent}%, Driver: {DriverPercent}%, Platform: {PlatformPercent}%).",
                new[] { nameof(FarmerPercent), nameof(DriverPercent), nameof(PlatformPercent) }
            );
        }

        if (MinOrderKg > MaxOrderKg)
        {
            yield return new ValidationResult(
                $"MinOrderKg ({MinOrderKg}) cannot be greater than MaxOrderKg ({MaxOrderKg}).",
                new[] { nameof(MinOrderKg), nameof(MaxOrderKg) }
            );
        }
    }
}
