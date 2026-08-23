using System.Net.Http.Headers;
using System.Text;
using FarmerMarket.Application.Common.Interfaces;
using FarmerMarket.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace FarmerMarket.Infrastructure.Services;

public class TwilioSmsService(IConfiguration config, ILogger<TwilioSmsService> logger, IAppDbContext db) : ISmsService
{
    private static readonly HttpClient HttpClient = new();
    private readonly string _accountSid = config["Twilio:AccountSid"] ?? "";
    private readonly string _authToken = config["Twilio:AuthToken"] ?? "";
    private readonly string _fromNumber = config["Twilio:From"] ?? "+251911000000";

    private async Task<bool> SendTwilioSmsRawAsync(string toPhone, string body, CancellationToken ct = default)
    {
        // Check if real Twilio credentials are provided
        if (!string.IsNullOrWhiteSpace(_accountSid) && 
            !string.IsNullOrWhiteSpace(_authToken) && 
            !_accountSid.Contains("MOCK") && 
            !_authToken.Contains("MOCK"))
        {
            try
            {
                var requestUrl = $"https://api.twilio.com/2010-04-01/Accounts/{_accountSid}/Messages.json";
                var request = new HttpRequestMessage(HttpMethod.Post, requestUrl);

                var authValue = Convert.ToBase64String(Encoding.ASCII.GetBytes($"{_accountSid}:{_authToken}"));
                request.Headers.Authorization = new AuthenticationHeaderValue("Basic", authValue);

                var parameters = new List<KeyValuePair<string, string>>
                {
                    new("To", toPhone),
                    new("From", _fromNumber),
                    new("Body", body)
                };

                request.Content = new FormUrlEncodedContent(parameters);

                var response = await HttpClient.SendAsync(request, ct);
                if (response.IsSuccessStatusCode)
                {
                    logger.LogInformation("[TWILIO REAL SMS SUCCESS -> {Phone}] {Body}", toPhone, body);
                    return true;
                }

                var errorContent = await response.Content.ReadAsStringAsync(ct);
                logger.LogWarning("[TWILIO SMS ERROR {StatusCode}] {Error}", response.StatusCode, errorContent);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Failed to send real SMS via Twilio API to {Phone}", toPhone);
            }
        }

        // Fallback log for local development & sandbox
        logger.LogInformation("[LOCAL SMS SIMULATOR -> {Phone}] {Body}", toPhone, body);
        return true;
    }

    public async Task<bool> SendOtpAsync(string phone, string code, string lang = "am", CancellationToken ct = default)
    {
        var msg = lang == "am"
            ? $"የFarmerMarket ማረጋገጫ ቁጥር: {code}። ለ5 ደቂቃ ብቻ ያገለግላል።"
            : $"Your FarmerMarket verification code is: {code}. Valid for 5 minutes.";

        return await SendTwilioSmsRawAsync(phone, msg, ct);
    }

    public async Task<bool> NotifyFarmerNewOrderAsync(string phone, string productName, decimal qtyKg, decimal totalEtb, string lang = "am", CancellationToken ct = default)
    {
        var msg = lang == "am"
            ? $"አዲስ ትዕዛዝ ደርሶዎታል: {qtyKg} ኪ.ግ {productName} በ {totalEtb:N2} ብር። ለማረጋገጥ FarmerMarket ይክፈቱ።"
            : $"New order received: {qtyKg}kg of {productName} for {totalEtb:N2} ETB. Open FarmerMarket to confirm.";

        return await SendTwilioSmsRawAsync(phone, msg, ct);
    }

    public async Task<bool> NotifyBuyerOrderStatusAsync(string phone, string productName, string status, string lang = "en", CancellationToken ct = default)
    {
        var msg = lang == "am"
            ? $"የትዕዛዝዎ ሁኔታ: የ{productName} ትዕዛዝዎ '{status}' ደረጃ ላይ ይገኛል።"
            : $"Your order for {productName} is now '{status}'. Track live in FarmerMarket.";

        return await SendTwilioSmsRawAsync(phone, msg, ct);
    }

    public async Task<bool> SendVerificationNotificationAsync(string phone, string messageEn, string messageAm, CancellationToken ct = default)
    {
        var msg = $"{messageEn}\n{messageAm}";
        return await SendTwilioSmsRawAsync(phone, msg, ct);
    }

    public async Task<int> BroadcastAnnouncementAsync(string messageEn, string messageAm, string targetRole, CancellationToken ct = default)
    {
        var query = db.Users.AsQueryable();
        if (targetRole != "all" && Enum.TryParse<UserRole>(targetRole, true, out var role))
        {
            query = query.Where(u => u.Role == role);
        }

        var users = await query.ToListAsync(ct);
        foreach (var u in users)
        {
            var msg = string.IsNullOrWhiteSpace(u.NameAm) ? messageEn : messageAm;
            await SendTwilioSmsRawAsync(u.Phone, msg, ct);

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
