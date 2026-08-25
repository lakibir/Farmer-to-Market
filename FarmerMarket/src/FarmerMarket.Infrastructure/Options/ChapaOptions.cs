namespace FarmerMarket.Infrastructure.Options;
using System.ComponentModel.DataAnnotations;

public class ChapaOptions
{
    public const string SectionName = "Chapa";

    [Required(ErrorMessage = "Chapa:SecretKey is required. Get yours from dashboard.chapa.co")]
    [MinLength(10, ErrorMessage = "Chapa:SecretKey appears invalid (too short)")]
    public string SecretKey { get; set; } = string.Empty;
    public string BaseUrl { get; set; } = "https://api.chapa.co/v1";
    public string WebhookUrl { get; set; } = string.Empty;
    public string ReturnUrl { get; set; } = string.Empty;
}
