namespace FarmerMarket.Application.DTOs;

public record FarmerSummaryDto(
    decimal TotalEarnedEtb,
    decimal PendingEscrowEtb,
    decimal ReleasedEtb,
    int CompletedOrdersCount,
    int PendingOrdersCount
);

public record DriverSummaryDto(
    decimal TotalEarnedEtb,
    decimal PendingEtb,
    int DeliveredTripsCount
);

public record PaymentDto(
    Guid Id,
    Guid OrderId,
    decimal AmountEtb,
    decimal FarmerCut,
    decimal DriverCut,
    decimal PlatformCut,
    string? TelebirrRef,
    string Status,
    DateTimeOffset? ReleasedAt,
    DateTimeOffset CreatedAt
);

public record TelebirrWebhookDto(
    string OutTradeNo,
    string TotalAmount,
    string TradeStatus,
    string TransactionNo,
    string Sign
);
