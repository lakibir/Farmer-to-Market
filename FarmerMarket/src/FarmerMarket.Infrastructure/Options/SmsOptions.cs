namespace FarmerMarket.Infrastructure.Options;

public enum SmsProviderType
{
    /// <summary>Log-only — OTP code is printed to console/logs. Safe for local dev.</summary>
    Log,
    /// <summary>Twilio — broad global coverage, limited Ethio Telecom support.</summary>
    Twilio,
    /// <summary>AfroMessage — Ethiopian-native provider with full Ethio Telecom support.</summary>
    AfroMessage
}

public class SmsOptions
{
    public const string SectionName = "Sms";

    /// <summary>Which SMS provider to use. Options: Log, Twilio, AfroMessage.</summary>
    public SmsProviderType Provider { get; set; } = SmsProviderType.Log;

    public TwilioSmsConfig Twilio { get; set; } = new();
    public AfroMessageSmsConfig AfroMessage { get; set; } = new();
}

public class TwilioSmsConfig
{
    public string AccountSid { get; set; } = string.Empty;
    public string AuthToken { get; set; } = string.Empty;
    public string From { get; set; } = string.Empty;
}

public class AfroMessageSmsConfig
{
    /// <summary>AfroMessage API key from https://afromessage.com/developers/api</summary>
    public string ApiKey { get; set; } = string.Empty;
    /// <summary>Your sender ID / short code registered with AfroMessage.</summary>
    public string From { get; set; } = "FarmerMkt";
    public string BaseUrl { get; set; } = "https://api.afromessage.com/api/send";
}
