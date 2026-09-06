using System.Collections.Concurrent;
using System.Security.Cryptography;
using System.Text;
using FarmerMarket.Application.Common.Interfaces;
using Microsoft.Extensions.Logging;

namespace FarmerMarket.Infrastructure.Services;

public class OtpService(ILogger<OtpService> logger) : IOtpService
{
    private record OtpEntry(string HashedCode, DateTimeOffset ExpiresAt, int FailedAttempts, DateTimeOffset? LockedUntil);

    private readonly ConcurrentDictionary<string, OtpEntry> _otpStore = new();
    private const int MaxFailedAttempts = 5;
    private static readonly TimeSpan LockoutDuration = TimeSpan.FromMinutes(15);

    public void StoreOtp(string phone, string code, TimeSpan? expiry = null)
    {
        var normalizedPhone = NormalizePhone(phone);
        var expiresAt = DateTimeOffset.UtcNow.Add(expiry ?? TimeSpan.FromMinutes(5));
        var hashedCode = HashOtp(normalizedPhone, code.Trim());

        // Preserve lockout status if user is currently locked out
        DateTimeOffset? lockedUntil = null;
        if (_otpStore.TryGetValue(normalizedPhone, out var current) && current.LockedUntil.HasValue && DateTimeOffset.UtcNow < current.LockedUntil.Value)
        {
            lockedUntil = current.LockedUntil;
        }

        _otpStore[normalizedPhone] = new OtpEntry(hashedCode, expiresAt, 0, lockedUntil);
        logger.LogInformation("[OTP DISPATCHED] Phone: {Phone}, ExpiresAt: {ExpiresAt}", normalizedPhone, expiresAt);
    }

    public bool ValidateOtp(string phone, string code)
    {
        if (string.IsNullOrWhiteSpace(code)) return false;

        var normalizedPhone = NormalizePhone(phone);
        var inputCode = code.Trim();

        if (!_otpStore.TryGetValue(normalizedPhone, out var entry))
        {
            logger.LogWarning("[OTP VALIDATION FAILED] No active OTP session for {Phone}", normalizedPhone);
            return false;
        }

        // Check if locked out due to excessive failed attempts
        if (entry.LockedUntil.HasValue && DateTimeOffset.UtcNow < entry.LockedUntil.Value)
        {
            logger.LogWarning("[OTP LOCKED] Phone {Phone} is locked out until {LockedUntil}", normalizedPhone, entry.LockedUntil.Value);
            return false;
        }

        // Check expiration
        if (DateTimeOffset.UtcNow > entry.ExpiresAt)
        {
            logger.LogWarning("[OTP EXPIRED] OTP for {Phone} expired at {ExpiresAt}", normalizedPhone, entry.ExpiresAt);
            _otpStore.TryRemove(normalizedPhone, out _);
            return false;
        }

        var inputHash = HashOtp(normalizedPhone, inputCode);
        var isMatch = CryptographicOperations.FixedTimeEquals(
            Encoding.UTF8.GetBytes(inputHash),
            Encoding.UTF8.GetBytes(entry.HashedCode));

        if (isMatch)
        {
            // Remove on successful verification (single-use token)
            _otpStore.TryRemove(normalizedPhone, out _);
            logger.LogInformation("[OTP VERIFIED] Phone {Phone} successfully verified OTP", normalizedPhone);
            return true;
        }

        // Increment failed attempts
        var newFailedAttempts = entry.FailedAttempts + 1;
        DateTimeOffset? newLockout = null;
        if (newFailedAttempts >= MaxFailedAttempts)
        {
            newLockout = DateTimeOffset.UtcNow.Add(LockoutDuration);
            logger.LogWarning("[OTP LOCKOUT TRIGGERED] Phone {Phone} exceeded {Max} attempts. Locked for {Minutes} mins.", normalizedPhone, MaxFailedAttempts, LockoutDuration.TotalMinutes);
        }
        else
        {
            logger.LogWarning("[OTP ATTEMPT FAILED] Phone {Phone} failed attempt {Attempt}/{Max}", normalizedPhone, newFailedAttempts, MaxFailedAttempts);
        }

        _otpStore[normalizedPhone] = entry with { FailedAttempts = newFailedAttempts, LockedUntil = newLockout };
        return false;
    }

    public string? GetStoredOtp(string phone)
    {
        // For security, raw OTP is never exposed from memory.
        return null;
    }

    private static string HashOtp(string phone, string code)
    {
        using var sha = SHA256.Create();
        var bytes = Encoding.UTF8.GetBytes($"{phone}:{code}:fm_salt_2026");
        return Convert.ToHexString(sha.ComputeHash(bytes));
    }

    private static string NormalizePhone(string phone)
    {
        var clean = phone.Replace(" ", "").Replace("-", "").Trim();
        if (clean.StartsWith("09")) return "+251" + clean[1..];
        if (clean.StartsWith("9") && clean.Length == 9) return "+251" + clean;
        return clean;
    }
}
