namespace FarmerMarket.Infrastructure.Options;
using System.ComponentModel.DataAnnotations;

public class ChapaOptions
{
    public const string SectionName = "Chapa";

    public string SecretKey { get; set; } = string.Empty;
    public string PublicKey { get; set; } = string.Empty;
    public string WebhookSecret { get; set; } = string.Empty;
    public string BaseUrl { get; set; } = "https://api.chapa.co/v1";
    public string WebhookUrl { get; set; } = string.Empty;
    public string ReturnUrl { get; set; } = string.Empty;
}
