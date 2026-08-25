namespace FarmerMarket.Application.Common.Interfaces;

/// <summary>
/// Unified result returned by any payment gateway on initiation.
/// Replaces the Telebirr-specific TelebirrInitResult for gateway-agnostic code.
/// </summary>
public record PaymentInitResult(
    string OrderId,
    string PaymentUrl,
    string TransactionRef,
    decimal Amount,
    string ProviderName);

/// <summary>
/// Abstraction over all payment gateways (Telebirr, Chapa, future providers).
/// Handlers should depend on this interface, not on concrete provider services.
/// </summary>
public interface IPaymentGateway
{
    string ProviderName { get; }

    Task<PaymentInitResult> InitiatePaymentAsync(Guid orderId, decimal amount, string buyerPhone, CancellationToken ct = default);
    Task<EscrowSplitResult> ReleaseEscrowAsync(Guid orderId, decimal totalAmount, CancellationToken ct = default);
    Task<bool> RefundPaymentAsync(Guid orderId, decimal totalAmount, CancellationToken ct = default);
    bool VerifyWebhookSignature(string payload, string signature);
}
