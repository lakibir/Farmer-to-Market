using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using FarmerMarket.Application.Common.Interfaces;
using FarmerMarket.Domain.Enums;
using FarmerMarket.Infrastructure.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace FarmerMarket.Infrastructure.Services;

/// <summary>
/// SMS service backed by AfroMessage — an Ethiopian-native SMS API with
/// full support for Ethio Telecom and Safaricom Ethiopia subscribers.
/// API docs: https://afromessage.com/developers/api
/// </summary>
public class AfroMessageSmsService(
    IOptions<SmsOptions> smsOptions,
    ILogger<AfroMessageSmsService> logger,
    IAppDbContext db) : ISmsService
{
    private static readonly HttpClient HttpClient = new();
    private readonly AfroMessageSmsConfig _cfg = smsOptions.Value.AfroMessage;

    private async Task<bool> SendRawAsync(string toPhone, string body, CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(_cfg.ApiKey))
        {
            logger.LogInformation("[LOG SMS SIMULATOR (AfroMessage not configured) → {Phone}] {Body}", toPhone, body);
            return true;
        }

        try
        {
            // AfroMessage REST API — https://api.afromessage.com/api/send
            var payload = new
            {
                from = _cfg.From,
                sender = _cfg.From,
                to = toPhone,
                message = body
            };

            var request = new HttpRequestMessage(HttpMethod.Post, _cfg.BaseUrl);
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _cfg.ApiKey);
            request.Content = new StringContent(
                JsonSerializer.Serialize(payload),
                Encoding.UTF8,
                "application/json");

            var response = await HttpClient.SendAsync(request, ct);
            var responseBody = await response.Content.ReadAsStringAsync(ct);

            if (response.IsSuccessStatusCode)
            {
                logger.LogInformation("[AFROMESSAGE SMS SENT → {Phone}]", toPhone);
                return true;
            }

            logger.LogWarning("[AFROMESSAGE ERROR {Status}] {Body}", response.StatusCode, responseBody);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "AfroMessage SMS failed to {Phone}", toPhone);
        }

        // Don't block OTP flow on SMS failure — OTP is still in the DB
        return false;
    }

    public Task<bool> SendOtpAsync(string phone, string code, string lang = "am", CancellationToken ct = default)
    {
        var msg = lang == "am"
            ? $"የFarmerMarket ማረጋገጫ ቁጥር: {code}። ለ5 ደቂቃ ብቻ ያገለግላል።"
            : $"Your FarmerMarket verification code is: {code}. Valid for 5 minutes.";
        return SendRawAsync(phone, msg, ct);
    }

    public Task<bool> NotifyFarmerNewOrderAsync(string phone, string productName, decimal qtyKg, decimal totalEtb, string lang = "am", CancellationToken ct = default)
    {
        var msg = lang == "am"
            ? $"አዲስ ትዕዛዝ ደርሶዎታል: {qtyKg} ኪ.ግ {productName} በ {totalEtb:N2} ብር።"
            : $"New order received: {qtyKg}kg of {productName} for {totalEtb:N2} ETB.";
        return SendRawAsync(phone, msg, ct);
    }

    public Task<bool> NotifyBuyerOrderStatusAsync(string phone, string productName, string status, string lang = "en", CancellationToken ct = default)
    {
        var msg = lang == "am"
            ? $"የ{productName} ትዕዛዝዎ '{status}' ደረጃ ላይ ይገኛል።"
            : $"Your order for {productName} is now '{status}'.";
        return SendRawAsync(phone, msg, ct);
    }

    public Task<bool> SendVerificationNotificationAsync(string phone, string messageEn, string messageAm, CancellationToken ct = default)
        => SendRawAsync(phone, $"{messageEn}\n{messageAm}", ct);

    public async Task<int> BroadcastAnnouncementAsync(string messageEn, string messageAm, string targetRole, CancellationToken ct = default)
    {
        var query = db.Users.AsQueryable();
        if (targetRole != "all" && Enum.TryParse<UserRole>(targetRole, true, out var role))
            query = query.Where(u => u.Role == role);

        var users = await query.ToListAsync(ct);
        foreach (var u in users)
        {
            var msg = string.IsNullOrWhiteSpace(u.NameAm) ? messageEn : messageAm;
            await SendRawAsync(u.Phone, msg, ct);
            db.Notifications.Add(new Domain.Entities.Notification
            {
                UserId = u.Id,
                Type = "broadcast_sms",
                Channel = "sms",
                MessageEn = messageEn,
                MessageAm = messageAm
            });
        }

        await db.SaveChangesAsync(ct);
        return users.Count;
    }
}
