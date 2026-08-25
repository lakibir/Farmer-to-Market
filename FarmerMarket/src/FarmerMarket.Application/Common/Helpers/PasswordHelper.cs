using System.Security.Cryptography;
using System.Text;

namespace FarmerMarket.Application.Common.Helpers;

/// <summary>
/// Secure password hashing using PBKDF2/SHA-512.
/// Pure .NET — no external dependency needed.
/// Format: "v1:<iterations>:<salt_base64>:<hash_base64>"
/// </summary>
public static class PasswordHelper
{
    private const int Iterations = 600_000; // OWASP 2024 recommendation for PBKDF2-SHA512
    private const int SaltSize = 32;
    private const int HashSize = 64;

    public static string HashPassword(string password)
    {
        var salt = RandomNumberGenerator.GetBytes(SaltSize);
        var hash = Rfc2898DeriveBytes.Pbkdf2(
            Encoding.UTF8.GetBytes(password),
            salt,
            Iterations,
            HashAlgorithmName.SHA512,
            HashSize);

        return $"v1:{Iterations}:{Convert.ToBase64String(salt)}:{Convert.ToBase64String(hash)}";
    }

    public static bool VerifyPassword(string password, string storedHash)
    {
        try
        {
            var parts = storedHash.Split(':');
            if (parts.Length != 4 || parts[0] != "v1") return false;

            var iterations = int.Parse(parts[1]);
            var salt = Convert.FromBase64String(parts[2]);
            var expectedHash = Convert.FromBase64String(parts[3]);

            var actualHash = Rfc2898DeriveBytes.Pbkdf2(
                Encoding.UTF8.GetBytes(password),
                salt,
                iterations,
                HashAlgorithmName.SHA512,
                expectedHash.Length);

            return CryptographicOperations.FixedTimeEquals(actualHash, expectedHash);
        }
        catch
        {
            return false;
        }
    }
}
