using FarmerMarket.Domain.Enums;

namespace FarmerMarket.Application.DTOs;

public record RequestOtpDto(string Phone);

public record RequestOtpResponseDto(
    string Message,
    string? DemoCode,
    string Phone,
    string? UserName,
    UserRole? Role
);

public record VerifyOtpDto(string Phone, string Code);

public record RegisterUserDto(
    string Phone,
    string Name,
    string? NameAm,
    UserRole Role,
    string Region
);

public record AuthResponseDto(
    string Token,
    UserDto User
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
    DateTimeOffset CreatedAt
);

public record UpdateProfileDto(
    string Name,
    string? NameAm,
    string Region
);

public record DemoUserDto(
    string Phone,
    string Name,
    string? NameAm,
    UserRole Role,
    string Region
);
