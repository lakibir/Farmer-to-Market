namespace FarmerMarket.Application.Common.Interfaces;

public interface IEmailService
{
    Task<bool> SendOtpEmailAsync(string email, string code, string userName, string lang = "en", CancellationToken ct = default);
    Task<bool> SendWelcomeEmailAsync(string email, string userName, string role, CancellationToken ct = default);
    Task<bool> SendOrderStatusEmailAsync(string email, string userName, string productName, string status, decimal qtyKg, decimal totalEtb, string lang = "en", CancellationToken ct = default);
    Task<bool> SendNotificationEmailAsync(string email, string subject, string messageEn, string messageAm, CancellationToken ct = default);
}
