namespace FarmerMarket.Application.Common.Interfaces;

public interface ISmsService
{
    Task<bool> SendOtpAsync(string phone, string code, string lang = "en", CancellationToken ct = default);
    Task<bool> NotifyFarmerNewOrderAsync(string phone, string productName, decimal qtyKg, decimal totalEtb, string lang = "am", CancellationToken ct = default);
    Task<bool> NotifyBuyerOrderStatusAsync(string phone, string productName, string status, string lang = "en", CancellationToken ct = default);
    Task<bool> SendVerificationNotificationAsync(string phone, string messageEn, string messageAm, CancellationToken ct = default);
    Task<int> BroadcastAnnouncementAsync(string messageEn, string messageAm, string targetRole, CancellationToken ct = default);
}
