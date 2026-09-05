using FarmerMarket.Domain.Enums;

namespace FarmerMarket.Application.DTOs;

public record RequestOtpDto(string Phone);

public record RequestOtpResponseDto(
    string Message,
    string? DemoCode,
    string Phone,
    string? UserName,
    UserRole? Role,
    string? Email = null
);

public record VerifyOtpDto(string Phone, string Code);

public record RegisterUserDto(
    string Phone,
    string Name,
    string? NameAm,
    UserRole Role,
    string Region,
    string? Password = null,
    string? Email = null
);

public record AuthResponseDto(
    string Token,
    UserDto User,
    string? DemoCode = null,
    string? Message = null
);

public record UserDto(
    Guid Id,
    string Phone,
    string Name,
    string? NameAm,
    UserRole Role,
    string Region,
    bool Verified,
    VerificationStatus VerificationStatus,
    string? TinNumber,
    string? KycDocumentNumber,
    string? RejectionReason,
    decimal? WalletBalanceEtb,
    DateTimeOffset CreatedAt,
    string? Email = null
);

public record UpdateProfileDto(
    string Name,
    string? NameAm,
    string Region,
    string? Email = null,
    string? LanguagePreference = null,
    string? SavedDeliveryAddress = null,
    double? DefaultDeliveryLat = null,
    double? DefaultDeliveryLng = null
);

public record DemoUserDto(
    string Phone,
    string Name,
    string? NameAm,
    UserRole Role,
    string Region
);

public record ChangePasswordDto(string CurrentPassword, string NewPassword);

public record ResetPasswordDto(string Phone, string OtpCode, string NewPassword);
