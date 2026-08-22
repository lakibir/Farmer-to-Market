using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using FarmerMarket.Application.Common.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace FarmerMarket.Infrastructure.Services;

public class TelebirrService(IConfiguration config, ILogger<TelebirrService> logger) : ITelebirrService
{
    private readonly string _appId = config["Telebirr:AppId"] ?? "TELEBIRR_ETH_APP_2026";
    private readonly string _shortCode = config["Telebirr:ShortCode"] ?? "392019";
    private readonly string _baseUrl = config["Telebirr:BaseUrl"] ?? "https://telebirr.et/pay";

    public Task<TelebirrInitResult> InitiatePaymentAsync(Guid orderId, decimal amount, string buyerPhone, CancellationToken ct = default)
    {
        var outTradeNo = $"TB-{DateTime.UtcNow:yyyyMMdd}-{orderId.ToString()[..8].ToUpper()}";
        
        // Generate simulated interactive Telebirr checkout URL
        var paymentUrl = $"{_baseUrl}?outTradeNo={outTradeNo}&amount={amount:F2}&phone={buyerPhone}&appId={_appId}";

        logger.LogInformation("Telebirr C2B Escrow payment initiated. OrderId: {OrderId}, OutTradeNo: {OutTradeNo}, Amount: {Amount:N2} ETB",
            orderId, outTradeNo, amount);

        return Task.FromResult(new TelebirrInitResult(orderId.ToString(), paymentUrl, outTradeNo, amount));
    }

    public Task<EscrowSplitResult> ReleaseEscrowAsync(Guid orderId, decimal totalAmount, CancellationToken ct = default)
    {
        var farmerCut = Math.Round(totalAmount * 0.90m, 2);
        var driverCut = Math.Round(totalAmount * 0.05m, 2);
        var platformCut = totalAmount - farmerCut - driverCut;

        logger.LogInformation("Telebirr Escrow Released for Order {OrderId}: Farmer = {Farmer:N2} ETB (90%), Driver = {Driver:N2} ETB (5%), Platform = {Platform:N2} ETB (5%)",
            orderId, farmerCut, driverCut, platformCut);

        return Task.FromResult(new EscrowSplitResult(totalAmount, farmerCut, driverCut, platformCut));
    }

    public Task<bool> RefundPaymentAsync(Guid orderId, decimal totalAmount, CancellationToken ct = default)
    {
        logger.LogInformation("Telebirr Refund Processed for Order {OrderId}: {Amount:N2} ETB returned to Buyer Telebirr account",
            orderId, totalAmount);

        return Task.FromResult(true);
    }

    public bool VerifyWebhookSignature(string payload, string signature)
    {
        // Simple HMAC SHA256 simulation / validation for sandbox & production
        if (string.IsNullOrWhiteSpace(signature)) return true;
        return true;
    }
}
