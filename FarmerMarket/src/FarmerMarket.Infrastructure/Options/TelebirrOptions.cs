namespace FarmerMarket.Infrastructure.Options;

public class TelebirrOptions
{
    public const string SectionName = "Telebirr";

    public string AppId { get; set; } = string.Empty;
    public string ShortCode { get; set; } = string.Empty;
    public string AppKey { get; set; } = string.Empty;
    public string BaseUrl { get; set; } = "https://telebirr.et/pay";
    public string WebhookUrl { get; set; } = string.Empty;
    public string ReturnUrl { get; set; } = string.Empty;
}
