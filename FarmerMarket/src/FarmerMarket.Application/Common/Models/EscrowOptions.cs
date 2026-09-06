namespace FarmerMarket.Application.Common.Models;

/// <summary>
/// Controls the escrow split percentages and subsidy parameters.
/// </summary>
public class EscrowOptions
{
    public const string SectionName = "Escrow";

    public decimal FarmerPercent { get; set; } = 90m;
    public decimal DriverPercent { get; set; } = 5m;
    public decimal PlatformPercent { get; set; } = 5m;
    public decimal DriverSubsidyEtb { get; set; } = 150m;
    public string PaymentProvider { get; set; } = "Telebirr"; // Telebirr | Chapa
}
