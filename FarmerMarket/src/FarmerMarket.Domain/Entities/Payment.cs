namespace FarmerMarket.Domain.Entities;

public class Payment
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid OrderId { get; set; }
    public Order Order { get; set; } = null!;
    public Guid? PaymentMethodId { get; set; }
    public PaymentMethod? PaymentMethod { get; set; }

    public decimal AmountEtb { get; set; }
    public decimal FarmerCut { get; set; } // 90%
    public decimal DriverCut { get; set; } // 5%
    public decimal PlatformCut { get; set; } // 5%
    public string? TelebirrRef { get; set; }
    public string Status { get; set; } = "Held"; // Held, Released, Refunded
    public DateTimeOffset? ReleasedAt { get; set; }
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
}
