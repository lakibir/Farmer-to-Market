using System.ComponentModel.DataAnnotations;

namespace FarmerMarket.Infrastructure.Options;

public class JwtOptions
{
    public const string SectionName = "Jwt";

    [Required(ErrorMessage = "Jwt:Key is required. Set it in appsettings or environment variable Jwt__Key.")]
    [MinLength(32, ErrorMessage = "Jwt:Key must be at least 32 characters long.")]
    public string Key { get; set; } = string.Empty;

    [Required]
    public string Issuer { get; set; } = "FarmerMarket.API";

    [Required]
    public string Audience { get; set; } = "FarmerMarket.Client";

    /// <summary>Token validity duration in days. Default: 30.</summary>
    public int ExpiryDays { get; set; } = 30;
}
