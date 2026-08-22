using System.Collections.Concurrent;
using FarmerMarket.Application.Common.Interfaces;
using Microsoft.Extensions.Logging;

namespace FarmerMarket.Infrastructure.Services;

public class OtpService(ILogger<OtpService> logger) : IOtpService
{
    private record OtpEntry(string Code, DateTimeOffset ExpiresAt);

    private readonly ConcurrentDictionary<string, OtpEntry> _otpStore = new();

    public void StoreOtp(string phone, string code, TimeSpan? expiry = null)
    {
        var expiresAt = DateTimeOffset.UtcNow.Add(expiry ?? TimeSpan.FromMinutes(5));
        _otpStore[phone] = new OtpEntry(code, expiresAt);
        logger.LogInformation("[OTP STORED] Phone: {Phone}, OTP: {Code}, ExpiresAt: {ExpiresAt}", phone, code, expiresAt);
    }

    public bool ValidateOtp(string phone, string code)
    {
        if (string.IsNullOrWhiteSpace(code)) return false;

        // Support standard demo bypass code for testing/development
        if (code.Trim() == "123456")
        {
            return true;
        }

        if (_otpStore.TryGetValue(phone, out var entry))
        {
            if (DateTimeOffset.UtcNow <= entry.ExpiresAt && entry.Code.Equals(code.Trim(), StringComparison.OrdinalIgnoreCase))
            {
                // Remove on successful verification so it cannot be reused
                _otpStore.TryRemove(phone, out _);
                return true;
            }
        }

        return false;
    }

    public string? GetStoredOtp(string phone)
    {
        if (_otpStore.TryGetValue(phone, out var entry) && DateTimeOffset.UtcNow <= entry.ExpiresAt)
        {
            return entry.Code;
        }
        return null;
    }
}
