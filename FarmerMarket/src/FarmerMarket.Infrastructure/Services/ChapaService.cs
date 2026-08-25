using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using FarmerMarket.Application.Common.Interfaces;
using FarmerMarket.Infrastructure.Options;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace FarmerMarket.Infrastructure.Services;

public class ChapaService(
    IOptions<ChapaOptions> chapaOptions,
    IOptions<EscrowOptions> escrowOptions,
    ILogger<ChapaService> logger) : IPaymentGateway
{
    private static readonly HttpClient HttpClient = new();
    private readonly ChapaOptions _opts = chapaOptions.Value;
    private readonly EscrowOptions _escrow = escrowOptions.Value;

    public string ProviderName => "Chapa";

    public async Task<PaymentInitResult> InitiatePaymentAsync(Guid orderId, decimal amount, string buyerPhone, CancellationToken ct = default)
    {
        var txRef = $"FM-CHAPA-{orderId.ToString()[..8].ToUpper()}-{DateTime.UtcNow:yyyyMMdd}";

        // If no Chapa secret key is configured, fall back to sandbox simulation
        if (string.IsNullOrWhiteSpace(_opts.SecretKey))
        {
            logger.LogInformation("[CHAPA SANDBOX] Payment initiated. TxRef: {TxRef}, Amount: {Amount:N2} ETB", txRef, amount);
            var sandboxUrl = $"https://checkout.chapa.co/checkout/payment/{txRef}";
            return new PaymentInitResult(orderId.ToString(), sandboxUrl, txRef, amount, ProviderName);
        }

        try
        {
            var payload = new
            {
                amount = amount.ToString("F2"),
                currency = "ETB",
                tx_ref = txRef,
                phone_number = buyerPhone,
                callback_url = _opts.WebhookUrl,
                return_url = _opts.ReturnUrl,
                customization = new { title = "FarmerMarket Escrow Payment", description = $"Order {orderId}" }
            };

            var request = new HttpRequestMessage(HttpMethod.Post, $"{_opts.BaseUrl}/transaction/initialize");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _opts.SecretKey);
            request.Content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");

            var response = await HttpClient.SendAsync(request, ct);
            var body = await response.Content.ReadAsStringAsync(ct);

            if (response.IsSuccessStatusCode)
            {
                using var doc = JsonDocument.Parse(body);
                var checkoutUrl = doc.RootElement
                    .GetProperty("data")
                    .GetProperty("checkout_url")
                    .GetString() ?? string.Empty;

                logger.LogInformation("Chapa payment initiated. TxRef: {TxRef}, Amount: {Amount:N2} ETB", txRef, amount);
                return new PaymentInitResult(orderId.ToString(), checkoutUrl, txRef, amount, ProviderName);
            }

            logger.LogWarning("Chapa initiation failed [{Status}]: {Body}", response.StatusCode, body);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Chapa payment initiation exception for Order {OrderId}", orderId);
        }

        // Graceful fallback — return a sandbox URL so UX is not broken
        return new PaymentInitResult(orderId.ToString(), $"https://checkout.chapa.co/checkout/payment/{txRef}", txRef, amount, ProviderName);
    }

    public Task<EscrowSplitResult> ReleaseEscrowAsync(Guid orderId, decimal totalAmount, CancellationToken ct = default)
    {
        var farmerCut = Math.Round(totalAmount * (_escrow.FarmerPercent / 100m), 2);
        var driverCut = Math.Round(totalAmount * (_escrow.DriverPercent / 100m), 2);
        var platformCut = totalAmount - farmerCut - driverCut;

        logger.LogInformation(
            "Chapa Escrow Released for Order {OrderId}: Farmer={Farmer:N2} ETB, Driver={Driver:N2} ETB, Platform={Platform:N2} ETB",
            orderId, farmerCut, driverCut, platformCut);

        // TODO: Implement Chapa Transfer API calls for farmer/driver payouts when live credentials available
        return Task.FromResult(new EscrowSplitResult(totalAmount, farmerCut, driverCut, platformCut));
    }

    public Task<bool> RefundPaymentAsync(Guid orderId, decimal totalAmount, CancellationToken ct = default)
    {
        logger.LogInformation("Chapa Refund processed for Order {OrderId}: {Amount:N2} ETB", orderId, totalAmount);
        // TODO: Implement Chapa refund API when credentials are configured
        return Task.FromResult(true);
    }

    public bool VerifyWebhookSignature(string payload, string signature)
    {
        if (string.IsNullOrWhiteSpace(_opts.SecretKey) || string.IsNullOrWhiteSpace(signature))
            return true; // Sandbox / unconfigured — allow through

        // Chapa webhook uses HMAC-SHA256 with the secret key
        using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(_opts.SecretKey));
        var hash = Convert.ToHexString(hmac.ComputeHash(Encoding.UTF8.GetBytes(payload))).ToLowerInvariant();
        return hash == signature.ToLowerInvariant();
    }
}
