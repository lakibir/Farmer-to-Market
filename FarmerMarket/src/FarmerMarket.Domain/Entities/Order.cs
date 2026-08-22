using FarmerMarket.Domain.Enums;

namespace FarmerMarket.Domain.Entities;

public class Order
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid ListingId { get; set; }
    public Listing Listing { get; set; } = null!;

    public Guid BuyerId { get; set; }
    public User Buyer { get; set; } = null!;

    public Guid? DriverId { get; set; }
    public User? Driver { get; set; }

    public decimal QtyKg { get; set; }
    public decimal TotalEtb { get; set; }
    public OrderStatus Status { get; set; } = OrderStatus.Pending;
    public bool EscrowHeld { get; set; } = true;
    public string? PaymentRef { get; set; }
    public string? PickupPhoto { get; set; }
    public string? DeliveryAddress { get; set; }
    public string? DeliveryNotes { get; set; }
    public DateTimeOffset? ConfirmedAt { get; set; }
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

    public Payment? Payment { get; set; }
    public Review? Review { get; set; }
}
