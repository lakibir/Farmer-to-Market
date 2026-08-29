namespace FarmerMarket.Domain.Entities;

public class SavedAddress
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
    public string Name { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Street { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string Region { get; set; } = string.Empty;
    public string? PostalCode { get; set; }
    public string Country { get; set; } = "Ethiopia";
    public bool IsDefaultShipping { get; set; }
    public bool IsDefaultBilling { get; set; }
}

public class PaymentMethod
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
    public string Provider { get; set; } = string.Empty;
    public string ProviderToken { get; set; } = string.Empty;
    public string? MaskedDisplay { get; set; }
    public string? Brand { get; set; }
    public int? ExpiryMonth { get; set; }
    public int? ExpiryYear { get; set; }
    public bool IsPrimary { get; set; }
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
}

public class Coupon
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid? UserId { get; set; }
    public User? User { get; set; }
    public string Code { get; set; } = string.Empty;
    public string Source { get; set; } = "Platform";
    public decimal Value { get; set; }
    public string DiscountType { get; set; } = "Percent";
    public decimal MinimumSpendEtb { get; set; }
    public string ApplicableScope { get; set; } = "All produce";
    public DateTimeOffset ExpiresAt { get; set; }
    public DateTimeOffset? UsedAt { get; set; }
}

public class NotificationPreference
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
    public string EventType { get; set; } = string.Empty;
    public bool SmsEnabled { get; set; } = true;
    public bool InAppEnabled { get; set; } = true;
    public bool EmailEnabled { get; set; }
}

public class UserSession
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
    public string Device { get; set; } = string.Empty;
    public string Browser { get; set; } = string.Empty;
    public string OperatingSystem { get; set; } = string.Empty;
    public string IpAddress { get; set; } = string.Empty;
    public DateTimeOffset LastActiveAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? RevokedAt { get; set; }
}

public class TwoFactorSetting
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
    public string Method { get; set; } = "Sms";
    public bool IsEnabled { get; set; }
    public string? SecretReference { get; set; }
    public DateTimeOffset? EnabledAt { get; set; }
}