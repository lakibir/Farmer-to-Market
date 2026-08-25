namespace FarmerMarket.Infrastructure.Options;

/// <summary>
/// Controls the escrow split percentages for the 90/5/5 model.
/// Sum of Farmer + Driver + Platform must equal 100.
/// </summary>
public class EscrowOptions
{
    public const string SectionName = "Escrow";

    public decimal FarmerPercent { get; set; } = 90m;
    public decimal DriverPercent { get; set; } = 5m;
    public decimal PlatformPercent { get; set; } = 5m;

    public string PaymentProvider { get; set; } = "Telebirr"; // Telebirr | Chapa
}
