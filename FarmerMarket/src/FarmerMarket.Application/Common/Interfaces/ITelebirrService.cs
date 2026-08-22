namespace FarmerMarket.Application.Common.Interfaces;

public record TelebirrInitResult(string OrderId, string PaymentUrl, string OutTradeNo, decimal Amount);
public record EscrowSplitResult(decimal TotalEtb, decimal FarmerCut, decimal DriverCut, decimal PlatformCut);

public interface ITelebirrService
{
    Task<TelebirrInitResult> InitiatePaymentAsync(Guid orderId, decimal amount, string buyerPhone, CancellationToken ct = default);
    Task<EscrowSplitResult> ReleaseEscrowAsync(Guid orderId, decimal totalAmount, CancellationToken ct = default);
    Task<bool> RefundPaymentAsync(Guid orderId, decimal totalAmount, CancellationToken ct = default);
    bool VerifyWebhookSignature(string payload, string signature);
}
