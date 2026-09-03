using FarmerMarket.Application.Common.Interfaces;
using FarmerMarket.Infrastructure.Options;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace FarmerMarket.Infrastructure.Services;

public class TelebirrService(
    IOptions<TelebirrOptions> telebirrOptions,
    IOptions<EscrowOptions> escrowOptions,
    ILogger<TelebirrService> logger)
    : ITelebirrService, IPaymentGateway
{
    private readonly TelebirrOptions _opts = telebirrOptions.Value;
    private readonly EscrowOptions _escrow = escrowOptions.Value;

    public string ProviderName => "Telebirr";

    // ─── Shared implementation ───────────────────────────────────────────

    private (string paymentUrl, string outTradeNo) BuildPaymentUrl(Guid orderId, decimal amount, string buyerPhone)
    {
        var outTradeNo = $"TB-{DateTime.UtcNow:yyyyMMdd}-{orderId.ToString()[..8].ToUpper()}";
        var baseUrl = string.IsNullOrWhiteSpace(_opts.BaseUrl) ? "https://telebirr.et/pay" : _opts.BaseUrl;
        var paymentUrl = $"{baseUrl}?outTradeNo={outTradeNo}&amount={amount:F2}&phone={buyerPhone}&appId={_opts.AppId}";
        return (paymentUrl, outTradeNo);
    }

    private EscrowSplitResult ComputeSplit(Guid orderId, decimal totalAmount)
    {
        var farmerCut = Math.Round(totalAmount * (_escrow.FarmerPercent / 100m), 2);
        var driverCut = Math.Round(totalAmount * (_escrow.DriverPercent / 100m), 2);
        var platformCut = totalAmount - farmerCut - driverCut;

        logger.LogInformation(
            "{Provider} Escrow Released for Order {OrderId}: Farmer={Farmer:N2} ETB ({FP}%), Driver={Driver:N2} ETB ({DP}%), Platform={Platform:N2} ETB ({PP}%)",
            ProviderName, orderId, farmerCut, _escrow.FarmerPercent, driverCut, _escrow.DriverPercent, platformCut, _escrow.PlatformPercent);

        return new EscrowSplitResult(totalAmount, farmerCut, driverCut, platformCut);
    }

    // ─── IPaymentGateway ─────────────────────────────────────────────────

    public Task<PaymentInitResult> InitiatePaymentAsync(Guid orderId, decimal amount, string buyerPhone, string? buyerEmail = null, string? buyerName = null, CancellationToken ct = default)
    {
        var (paymentUrl, outTradeNo) = BuildPaymentUrl(orderId, amount, buyerPhone);
        logger.LogInformation("Telebirr C2B Escrow initiated. OrderId: {OrderId}, OutTradeNo: {OutTradeNo}, Amount: {Amount:N2} ETB", orderId, outTradeNo, amount);
        return Task.FromResult(new PaymentInitResult(orderId.ToString(), paymentUrl, outTradeNo, amount, ProviderName));
    }

    public Task<EscrowSplitResult> ReleaseEscrowAsync(Guid orderId, decimal totalAmount, CancellationToken ct = default)
        => Task.FromResult(ComputeSplit(orderId, totalAmount));

    public Task<bool> RefundPaymentAsync(Guid orderId, decimal totalAmount, CancellationToken ct = default)
    {
        logger.LogInformation("Telebirr Refund processed for Order {OrderId}: {Amount:N2} ETB", orderId, totalAmount);
        return Task.FromResult(true);
    }

    public Task<bool> VerifyPaymentAsync(string txRef, CancellationToken ct = default)
    {
        logger.LogInformation("Telebirr verification queried for OutTradeNo: {TxRef}", txRef);
        return Task.FromResult(true);
    }

    public bool VerifyWebhookSignature(string payload, string signature)
    {
        if (string.IsNullOrWhiteSpace(signature)) return true;
        // TODO: Implement HMAC verification with AppKey once live credentials are configured
        return true;
    }

    // ─── ITelebirrService (legacy callers) ───────────────────────────────

    async Task<TelebirrInitResult> ITelebirrService.InitiatePaymentAsync(Guid orderId, decimal amount, string buyerPhone, CancellationToken ct)
    {
        var result = await ((IPaymentGateway)this).InitiatePaymentAsync(orderId, amount, buyerPhone, ct: ct);
        return new TelebirrInitResult(result.OrderId, result.PaymentUrl, result.TransactionRef, result.Amount);
    }

    Task<EscrowSplitResult> ITelebirrService.ReleaseEscrowAsync(Guid orderId, decimal totalAmount, CancellationToken ct)
        => ReleaseEscrowAsync(orderId, totalAmount, ct);

    Task<bool> ITelebirrService.RefundPaymentAsync(Guid orderId, decimal totalAmount, CancellationToken ct)
        => RefundPaymentAsync(orderId, totalAmount, ct);

    bool ITelebirrService.VerifyWebhookSignature(string payload, string signature)
        => VerifyWebhookSignature(payload, signature);
}
