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
    OrderStatus Status,
    bool EscrowHeld,
    string? PaymentRef,
    string? PickupPhoto,
    string? DeliveryAddress,
    string? DeliveryNotes,
    DateTimeOffset? ConfirmedAt,
    DateTimeOffset CreatedAt
);

public record PlaceOrderDto(
    Guid ListingId,
    decimal QtyKg,
    string? DeliveryAddress = null,
    string? DeliveryNotes = null
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

public record DisputeOrderDto(
    string Reason
);
