using FarmerMarket.Domain.Enums;

namespace FarmerMarket.Application.DTOs;

public record OrderDto(
    Guid Id,
    Guid ListingId,
    string ProductName,
    string? ProductNameAm,
    string Category,
    Guid FarmerId,
    string FarmerName,
    string? FarmerNameAm,
    string FarmerPhone,
    string FarmerRegion,
    Guid BuyerId,
    string BuyerName,
    string BuyerPhone,
    Guid? DriverId,
    string? DriverName,
    string? DriverPhone,
    decimal QtyKg,
    decimal PricePerKg,
    decimal TotalEtb,
    decimal FarmerCut,
    decimal DriverCut,
    decimal PlatformCut,
    decimal DriverSubsidyEtb,
    OrderStatus Status,
    bool EscrowHeld,
    string? PaymentRef,
    string? PickupPhoto,
    string? DeliveryPhoto,
    double? DeliveryGpsLat,
    double? DeliveryGpsLng,
    DateTimeOffset? DeliveredAt,
    string? DeliveryAddress,
    string? DeliveryNotes,
    string? DisputeReason,
    string? DisputePhoto,
    int RequestedRefundPercent,
    string DisputeStatus,
    string? DisputeResolutionNotes,
    bool IsRecurring,
    string? RecurringFrequency,
    DateTimeOffset? ConfirmedAt,
    DateTimeOffset CreatedAt
);

public record PlaceOrderDto(
    Guid ListingId,
    decimal QtyKg,
    string? DeliveryAddress = null,
    string? DeliveryNotes = null,
    bool IsRecurring = false,
    string? RecurringFrequency = null
);

public record PlaceOrderResultDto(
    Guid OrderId,
    decimal TotalEtb,
    string TelebirrPaymentUrl,
    string OutTradeNo
);

public record PickupOrderDto(
    string? PickupPhoto
);

public record DeliverOrderDto(
    string? DeliveryPhoto,
    double? DeliveryGpsLat,
    double? DeliveryGpsLng
);

public record DisputeOrderDto(
    string Reason,
    string? DisputePhoto = null,
    int RequestedRefundPercent = 100
);

public record StandingOrderDto(
    Guid Id,
    Guid ListingId,
    string ProductName,
    string? ProductNameAm,
    Guid FarmerId,
    string FarmerName,
    decimal QtyKg,
    decimal PricePerKg,
    string Frequency, // "Weekly", "Bi-Weekly", "Monthly"
    string NextDeliveryDate,
    bool Active,
    DateTimeOffset CreatedAt
);
