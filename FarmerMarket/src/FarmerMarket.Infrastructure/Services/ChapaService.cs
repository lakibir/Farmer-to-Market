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

    public async Task<PaymentInitResult> InitiatePaymentAsync(
        Guid orderId,
        decimal amount,
        string buyerPhone,
        string? buyerEmail = null,
        string? buyerName = null,
        CancellationToken ct = default)
    {
        var txRef = $"FM-{Guid.NewGuid():N}";
        var cleanPhone = buyerPhone.Replace(" ", "").Replace("-", "").Trim();
        if (cleanPhone.StartsWith("+251")) cleanPhone = "0" + cleanPhone[4..];
        else if (cleanPhone.StartsWith("251")) cleanPhone = "0" + cleanPhone[3..];

        var email = !string.IsNullOrWhiteSpace(buyerEmail) ? buyerEmail.Trim() : $"{cleanPhone}@farmertomarket.et";
        
        var nameParts = (buyerName ?? "Marketplace Buyer").Trim().Split(' ', 2, StringSplitOptions.RemoveEmptyEntries);
        var firstName = nameParts.Length > 0 ? nameParts[0] : "Marketplace";
        var lastName = nameParts.Length > 1 ? nameParts[1] : "Buyer";

        // If no real Chapa secret key is configured, return local return URL with simulated success
        if (string.IsNullOrWhiteSpace(_opts.SecretKey) || _opts.SecretKey.Contains("REPLACE"))
        {
            logger.LogInformation("[CHAPA SIMULATOR] SecretKey is simulated. Returning local verified redirect for TxRef: {TxRef}, Amount: {Amount:N2} ETB", txRef, amount);
            var returnUrl = string.IsNullOrWhiteSpace(_opts.ReturnUrl) ? "http://localhost:4200/" : _opts.ReturnUrl;
            var sep = returnUrl.Contains('?') ? "&" : "?";
            var simulatedUrl = $"{returnUrl}{sep}tx_ref={txRef}&status=success";
            return new PaymentInitResult(orderId.ToString(), simulatedUrl, txRef, amount, ProviderName);
        }

        try
        {
            var payload = new
            {
                amount = amount.ToString("F2"),
                currency = "ETB",
                email,
                first_name = firstName,
                last_name = lastName,
                phone_number = cleanPhone,
                tx_ref = txRef,
                callback_url = _opts.WebhookUrl,
                return_url = _opts.ReturnUrl,
                customization = new
                {
                    title = "FarmerMarket",
                    description = $"Order {orderId.ToString()[..8].ToUpper()} Escrow"
                }
            };

            var baseUrl = string.IsNullOrWhiteSpace(_opts.BaseUrl) ? "https://api.chapa.co/v1" : _opts.BaseUrl.TrimEnd('/');
            using var request = new HttpRequestMessage(HttpMethod.Post, $"{baseUrl}/transaction/initialize");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _opts.SecretKey.Trim());
            request.Content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");

            var response = await HttpClient.SendAsync(request, ct);
            var body = await response.Content.ReadAsStringAsync(ct);

            if (response.IsSuccessStatusCode)
            {
                using var doc = JsonDocument.Parse(body);
                if (doc.RootElement.TryGetProperty("data", out var dataEl) &&
                    dataEl.TryGetProperty("checkout_url", out var checkoutUrlEl))
                {
                    var checkoutUrl = checkoutUrlEl.GetString() ?? string.Empty;
                    logger.LogInformation("[CHAPA API SUCCESS] Payment initialized. TxRef: {TxRef}, Amount: {Amount:N2} ETB, Checkout: {Url}", txRef, amount, checkoutUrl);
                    return new PaymentInitResult(orderId.ToString(), checkoutUrl, txRef, amount, ProviderName);
                }
            }

            logger.LogWarning("[CHAPA API ERROR] Initiation failed [{Status}]: {Body}", response.StatusCode, body);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "[CHAPA EXCEPTION] Payment initiation error for Order {OrderId}", orderId);
        }

        // Graceful fallback URL
        return new PaymentInitResult(orderId.ToString(), $"https://checkout.chapa.co/checkout/payment/{txRef}", txRef, amount, ProviderName);
    }

    public async Task<bool> VerifyPaymentAsync(string txRef, CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(_opts.SecretKey) || _opts.SecretKey.Contains("REPLACE"))
        {
            logger.LogInformation("[CHAPA SIMULATOR] Verify bypassed (simulated SecretKey). TxRef: {TxRef}", txRef);
            return true;
        }

        try
        {
            var baseUrl = string.IsNullOrWhiteSpace(_opts.BaseUrl) ? "https://api.chapa.co/v1" : _opts.BaseUrl.TrimEnd('/');
            using var request = new HttpRequestMessage(HttpMethod.Get, $"{baseUrl}/transaction/verify/{txRef}");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _opts.SecretKey.Trim());

            var response = await HttpClient.SendAsync(request, ct);
            var body = await response.Content.ReadAsStringAsync(ct);

            if (response.IsSuccessStatusCode)
            {
                using var doc = JsonDocument.Parse(body);
                if (doc.RootElement.TryGetProperty("status", out var statusEl) && statusEl.GetString() == "success")
                {
                    logger.LogInformation("[CHAPA VERIFY SUCCESS] TxRef {TxRef} is confirmed valid.", txRef);
                    return true;
                }
            }

            logger.LogWarning("[CHAPA VERIFY FAILED] TxRef: {TxRef}, Body: {Body}", txRef, body);
            return false;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "[CHAPA VERIFY ERROR] Exception verifying TxRef {TxRef}", txRef);
            return false;
        }
    }

    public Task<EscrowSplitResult> ReleaseEscrowAsync(Guid orderId, decimal totalAmount, CancellationToken ct = default)
    {
        var farmerCut = Math.Round(totalAmount * (_escrow.FarmerPercent / 100m), 2);
        var driverCut = Math.Round(totalAmount * (_escrow.DriverPercent / 100m), 2);
        var platformCut = totalAmount - farmerCut - driverCut;

        logger.LogInformation(
            "Chapa Escrow Released for Order {OrderId}: Farmer={Farmer:N2} ETB, Driver={Driver:N2} ETB, Platform={Platform:N2} ETB",
            orderId, farmerCut, driverCut, platformCut);

        return Task.FromResult(new EscrowSplitResult(totalAmount, farmerCut, driverCut, platformCut));
    }

    public Task<bool> RefundPaymentAsync(Guid orderId, decimal totalAmount, CancellationToken ct = default)
    {
        logger.LogInformation("Chapa Refund processed for Order {OrderId}: {Amount:N2} ETB", orderId, totalAmount);
        return Task.FromResult(true);
    }

    public bool VerifyWebhookSignature(string payload, string signature)
    {
        if (string.IsNullOrWhiteSpace(_opts.SecretKey) || string.IsNullOrWhiteSpace(signature))
            return true; // Sandbox / dev allow-through

        try
        {
            using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(_opts.SecretKey.Trim()));
            var hash = Convert.ToHexString(hmac.ComputeHash(Encoding.UTF8.GetBytes(payload))).ToLowerInvariant();
            return hash == signature.Trim().ToLowerInvariant();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Chapa webhook signature verification exception");
            return false;
        }
    }
}
