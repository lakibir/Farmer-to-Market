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

    // Driver Pickup & Proof-of-delivery GPS details
    public string? PickupPhoto { get; set; }
    public string? DeliveryPhoto { get; set; }
    public double? DeliveryGpsLat { get; set; }
    public double? DeliveryGpsLng { get; set; }
    public DateTimeOffset? DeliveredAt { get; set; }

    public string? DeliveryAddress { get; set; }
    public string? DeliveryNotes { get; set; }
    public DateTimeOffset? ConfirmedAt { get; set; }

    // Dispute & Partial Refund Arbitration
    public string? DisputeReason { get; set; }
    public string? DisputePhoto { get; set; }
    public int? RequestedRefundPercent { get; set; } = 100; // 25, 50, 100%
    public string? DisputeStatus { get; set; } = "None"; // None, PendingReview, ResolvedReleaseFarmer, ResolvedRefundBuyer, ResolvedPartialSplit
    public string? DisputeResolutionNotes { get; set; }

    // Recurring / Standing Order Link
    public bool? IsRecurring { get; set; } = false;
    public string? RecurringFrequency { get; set; } // Weekly, Bi-Weekly

    // Driver Rural Distance Incentive
    public decimal? DriverSubsidyEtb { get; set; } = 0;

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

    public Payment? Payment { get; set; }
    public Review? Review { get; set; }
}
