namespace FarmerMarket.Application.Common.Interfaces;

public interface IOtpService
{
    void StoreOtp(string phone, string code, TimeSpan? expiry = null);
    bool ValidateOtp(string phone, string code);
    string? GetStoredOtp(string phone);
}
