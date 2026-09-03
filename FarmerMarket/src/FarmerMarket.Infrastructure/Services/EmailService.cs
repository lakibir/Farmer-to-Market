using System.Net;
using System.Net.Mail;
using FarmerMarket.Application.Common.Interfaces;
using FarmerMarket.Infrastructure.Options;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace FarmerMarket.Infrastructure.Services;

public class EmailService(
    IOptions<EmailOptions> emailOptions,
    ILogger<EmailService> logger) : IEmailService
{
    private readonly EmailOptions _cfg = emailOptions.Value;

    private async Task<bool> SendRawEmailAsync(string toEmail, string subject, string htmlBody, string plainTextBody, CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(toEmail)) return false;

        // If no SMTP credentials or in simulator mode, log email cleanly
        if (string.IsNullOrWhiteSpace(_cfg.Username) || string.IsNullOrWhiteSpace(_cfg.Password) || string.IsNullOrWhiteSpace(_cfg.Host))
        {
            logger.LogInformation("[EMAIL SIMULATOR → {Email}] Subject: {Subject}\nContent: {Body}", toEmail, subject, plainTextBody);
            return true;
        }

        try
        {
            var senderEmail = (!string.IsNullOrWhiteSpace(_cfg.Username) && _cfg.Username.Contains('@'))
                ? _cfg.Username.Trim()
                : _cfg.FromEmail.Trim();

            using var message = new MailMessage
            {
                From = new MailAddress(senderEmail, _cfg.FromName),
                Subject = subject,
                Body = htmlBody,
                IsBodyHtml = true
            };
            message.To.Add(new MailAddress(toEmail));

            using var client = new SmtpClient(_cfg.Host, _cfg.Port)
            {
                EnableSsl = _cfg.EnableSsl,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(_cfg.Username.Trim(), _cfg.Password.Trim()),
                DeliveryMethod = SmtpDeliveryMethod.Network,
                Timeout = 15000
            };

            await client.SendMailAsync(message, ct);
            logger.LogInformation("[SMTP EMAIL SENT → {Email}] Subject: {Subject}", toEmail, subject);
            return true;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to deliver SMTP email to {Email}. Falling back to simulation log.", toEmail);
            logger.LogInformation("[EMAIL SIMULATOR FALLBACK → {Email}] Subject: {Subject}\nContent: {Body}", toEmail, subject, plainTextBody);
            return false;
        }
    }

    public Task<bool> SendOtpEmailAsync(string email, string code, string userName, string lang = "am", CancellationToken ct = default)
    {
        var subject = lang == "am"
            ? $"[{code}] የFarmer-to-Market ማረጋገጫ ኮድ (Verification Code)"
            : $"[{code}] Your Farmer-to-Market Verification Code";

        var plainText = $@"Hello {userName},

Your 6-digit Farmer-to-Market authentication code is: {code}

This code is valid for 5 minutes. If you did not request this code, please ignore this email.

Farmer-to-Market Ethiopian Agricultural Exchange
Telebirr Escrow Automated";

        var html = $@"<!DOCTYPE html>
<html>
<head>
<meta charset='utf-8'>
<style>
  body {{ font-family: 'Segoe UI', Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #1e293b; }}
  .card {{ max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }}
  .header {{ background: linear-gradient(135deg, #064e3b 0%, #047857 100%); padding: 24px; text-align: center; color: #ffffff; }}
  .header h1 {{ margin: 0; font-size: 20px; font-weight: 800; }}
  .header p {{ margin: 4px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #6ee7b7; }}
  .content {{ padding: 32px 24px; text-align: center; }}
  .greeting {{ font-size: 15px; font-weight: 600; color: #334155; margin-bottom: 16px; }}
  .code-box {{ background: #ecfdf5; border: 2px dashed #059669; border-radius: 12px; padding: 18px; margin: 20px 0; }}
  .code {{ font-size: 32px; font-weight: 900; font-family: 'Courier New', monospace; letter-spacing: 6px; color: #065f46; }}
  .expiry {{ font-size: 12px; color: #64748b; margin-top: 8px; font-weight: 500; }}
  .footer {{ background: #f1f5f9; padding: 16px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; }}
</style>
</head>
<body>
  <div class='card'>
    <div class='header'>
      <p>Ethiopian Agricultural Exchange</p>
      <h1>Farmer-to-Market</h1>
    </div>
    <div class='content'>
      <div class='greeting'>Hello {WebUtility.HtmlEncode(userName)},</div>
      <p style='font-size: 14px; color: #475569; margin: 0;'>Use the following 6-digit verification code to complete your authentication:</p>
      <div class='code-box'>
        <div class='code'>{code}</div>
        <div class='expiry'>⏱ Valid for 5 minutes</div>
      </div>
      <p style='font-size: 12px; color: #94a3b8; margin: 0;'>If you did not make this request, you can safely ignore this email.</p>
    </div>
    <div class='footer'>
      🛡️ 256-Bit SSL Secured · Telebirr Escrow Protection · Addis Ababa, Ethiopia
    </div>
  </div>
</body>
</html>";

        return SendRawEmailAsync(email, subject, html, plainText, ct);
    }

    public Task<bool> SendWelcomeEmailAsync(string email, string userName, string role, CancellationToken ct = default)
    {
        var subject = $"Welcome to Farmer-to-Market Exchange, {userName}!";

        var plainText = $@"Welcome to Farmer-to-Market, {userName}!

Your account has been registered with the role: {role.ToUpper()}.

You can now participate directly in Ethiopia's leading transparent agricultural wholesale exchange powered by Telebirr Escrow.

Log in anytime using your registered phone number at https://farmertomarket.et

Farmer-to-Market Ethiopian Agricultural Exchange";

        var html = $@"<!DOCTYPE html>
<html>
<head>
<meta charset='utf-8'>
<style>
  body {{ font-family: 'Segoe UI', Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #1e293b; }}
  .card {{ max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }}
  .header {{ background: linear-gradient(135deg, #064e3b 0%, #047857 100%); padding: 24px; text-align: center; color: #ffffff; }}
  .header h1 {{ margin: 0; font-size: 20px; font-weight: 800; }}
  .badge {{ display: inline-block; background: #dcfce7; color: #15803d; font-weight: 800; font-size: 12px; padding: 4px 12px; border-radius: 9999px; margin-top: 12px; text-transform: uppercase; }}
  .content {{ padding: 28px 24px; text-align: left; }}
  .feature-item {{ display: flex; align-items: center; gap: 10px; margin-bottom: 12px; font-size: 13px; color: #334155; }}
  .footer {{ background: #f1f5f9; padding: 16px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; }}
</style>
</head>
<body>
  <div class='card'>
    <div class='header'>
      <h1 style='color: white;'>🌾 Welcome to Farmer-to-Market!</h1>
      <p style='color: #6ee7b7; margin: 4px 0 0 0; font-size: 11px;'>Empowering Ethiopian Agriculture</p>
    </div>
    <div class='content'>
      <p style='font-size: 15px; font-weight: bold;'>Hello {WebUtility.HtmlEncode(userName)},</p>
      <p style='font-size: 13px; color: #475569;'>Your account has been successfully created. You are registered as:</p>
      <div style='text-align: center; margin: 16px 0;'><span class='badge'>{WebUtility.HtmlEncode(role)}</span></div>
      <div style='background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin: 16px 0;'>
        <div style='font-size: 12px; font-weight: bold; margin-bottom: 8px; color: #0f172a;'>Key Platform Benefits:</div>
        <div style='font-size: 12px; color: #475569; line-height: 1.6;'>
          ⚡ <strong>Telebirr Automated Escrow:</strong> 100% payout security on every transaction.<br>
          🌱 <strong>Direct Farm-to-Buyer Access:</strong> Fair market pricing with zero middleman exploitation.<br>
          🚚 <strong>Integrated Logistics:</strong> Verified drivers with real-time GPS tracking.
        </div>
      </div>
      <p style='font-size: 12px; color: #64748b;'>You can now log in anytime using your registered phone number via SMS/Email OTP.</p>
    </div>
    <div class='footer'>
      Farmer-to-Market Exchange · Addis Ababa, Ethiopia
    </div>
  </div>
</body>
</html>";

        return SendRawEmailAsync(email, subject, html, plainText, ct);
    }

    public Task<bool> SendOrderStatusEmailAsync(string email, string userName, string productName, string status, decimal qtyKg, decimal totalEtb, string lang = "en", CancellationToken ct = default)
    {
        var subject = $"Order Update: {productName} is now '{status}'";

        var plainText = $@"Hello {userName},

Your order for {qtyKg}kg of {productName} is currently: {status.ToUpper()}.
Total Order Value: {totalEtb:N2} ETB.

Farmer-to-Market Ethiopian Agricultural Exchange";

        var html = $@"<!DOCTYPE html>
<html>
<head>
<meta charset='utf-8'>
<style>
  body {{ font-family: 'Segoe UI', Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #1e293b; }}
  .card {{ max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; }}
  .header {{ background: #064e3b; padding: 20px; text-align: center; color: #ffffff; }}
  .content {{ padding: 24px; }}
  .status-badge {{ display: inline-block; background: #e0f2fe; color: #0369a1; font-weight: 800; font-size: 12px; padding: 4px 12px; border-radius: 6px; text-transform: uppercase; }}
  .footer {{ background: #f1f5f9; padding: 14px; text-align: center; font-size: 11px; color: #64748b; }}
</style>
</head>
<body>
  <div class='card'>
    <div class='header'>
      <h2 style='margin:0; font-size: 18px;'>📦 Order Status Notification</h2>
    </div>
    <div class='content'>
      <p>Hello <strong>{WebUtility.HtmlEncode(userName)}</strong>,</p>
      <p>Your order for <strong>{qtyKg}kg of {WebUtility.HtmlEncode(productName)}</strong> has been updated:</p>
      <p style='text-align:center;'><span class='status-badge'>{WebUtility.HtmlEncode(status)}</span></p>
      <p style='font-size: 13px; color: #475569;'>Total Order Value: <strong>{totalEtb:N2} ETB</strong></p>
    </div>
    <div class='footer'>
      Farmer-to-Market Exchange · Escrow Protected
    </div>
  </div>
</body>
</html>";

        return SendRawEmailAsync(email, subject, html, plainText, ct);
    }

    public Task<bool> SendNotificationEmailAsync(string email, string subject, string messageEn, string messageAm, CancellationToken ct = default)
    {
        var plainText = $"{messageEn}\n\n{messageAm}";
        var html = $@"<!DOCTYPE html>
<html>
<head><meta charset='utf-8'></head>
<body style='font-family: Arial, sans-serif; padding: 20px; color: #1e293b;'>
  <div style='max-width: 500px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px;'>
    <h3 style='color: #064e3b; margin-top: 0;'>{WebUtility.HtmlEncode(subject)}</h3>
    <p style='font-size: 14px;'>{WebUtility.HtmlEncode(messageEn)}</p>
    <hr style='border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;'>
    <p style='font-size: 14px; color: #475569;'>{WebUtility.HtmlEncode(messageAm)}</p>
  </div>
</body>
</html>";

        return SendRawEmailAsync(email, subject, html, plainText, ct);
    }
}
