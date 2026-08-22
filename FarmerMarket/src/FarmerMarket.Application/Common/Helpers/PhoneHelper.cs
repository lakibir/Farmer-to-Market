namespace FarmerMarket.Application.Common.Helpers;

public static class PhoneHelper
{
    public static string Normalize(string? rawPhone)
    {
        if (string.IsNullOrWhiteSpace(rawPhone)) return "";

        // Keep only digits
        var digits = new string(rawPhone.Where(char.IsDigit).ToArray());

        if (digits.StartsWith("251"))
        {
            return "+" + digits;
        }

        if (digits.StartsWith("0"))
        {
            digits = digits.TrimStart('0');
        }

        return "+251" + digits;
    }
}
