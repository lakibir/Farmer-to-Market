using System.Net.Http.Headers;
using System.Text;
using FarmerMarket.Application.Common.Interfaces;
using FarmerMarket.Domain.Enums;
using FarmerMarket.Infrastructure.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace FarmerMarket.Infrastructure.Services;

public class TwilioSmsService(IOptions<SmsOptions> smsOptions, ILogger<TwilioSmsService> logger, IAppDbContext db) : ISmsService
{
    private static readonly HttpClient HttpClient = new();
    private readonly TwilioSmsConfig _cfg = smsOptions.Value.Twilio;

    private async Task<bool> SendRawAsync(string toPhone, string body, CancellationToken ct = default)
    {
        if (!string.IsNullOrWhiteSpace(_cfg.AccountSid) && !string.IsNullOrWhiteSpace(_cfg.AuthToken))
        {
            try
            {
                var requestUrl = $"https://api.twilio.com/2010-04-01/Accounts/{_cfg.AccountSid}/Messages.json";
                var request = new HttpRequestMessage(HttpMethod.Post, requestUrl);
                var authValue = Convert.ToBase64String(Encoding.ASCII.GetBytes($"{_cfg.AccountSid}:{_cfg.AuthToken}"));
                request.Headers.Authorization = new AuthenticationHeaderValue("Basic", authValue);
                request.Content = new FormUrlEncodedContent(new List<KeyValuePair<string, string>>
                {
                    new("To", toPhone), new("From", _cfg.From), new("Body", body)
                });

                var response = await HttpClient.SendAsync(request, ct);
                if (response.IsSuccessStatusCode)
                {
                    logger.LogInformation("[TWILIO SMS SENT → {Phone}]", toPhone);
                    return true;
                }

                var err = await response.Content.ReadAsStringAsync(ct);
                logger.LogWarning("[TWILIO SMS ERROR {Status}] {Error}", response.StatusCode, err);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Twilio SMS failed to {Phone}", toPhone);
            }
        }

        logger.LogInformation("[LOG SMS SIMULATOR → {Phone}] {Body}", toPhone, body);
        return true;
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
            ? $"አዲስ ትዕዛዝ ደርሶዎታል: {qtyKg} ኪ.ግ {productName} በ {totalEtb:N2} ብር። ለማረጋገጥ FarmerMarket ይክፈቱ።"
            : $"New order received: {qtyKg}kg of {productName} for {totalEtb:N2} ETB. Open FarmerMarket to confirm.";
        return SendRawAsync(phone, msg, ct);
    }

    public Task<bool> NotifyBuyerOrderStatusAsync(string phone, string productName, string status, string lang = "en", CancellationToken ct = default)
    {
        var msg = lang == "am"
            ? $"የትዕዛዝዎ ሁኔታ: የ{productName} ትዕዛዝዎ '{status}' ደረጃ ላይ ይገኛል።"
            : $"Your order for {productName} is now '{status}'. Track live in FarmerMarket.";
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
