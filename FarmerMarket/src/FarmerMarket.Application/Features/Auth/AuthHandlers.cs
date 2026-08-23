using System.Security.Cryptography;
using FarmerMarket.Application.Common.Helpers;
using FarmerMarket.Application.Common.Interfaces;
using FarmerMarket.Application.Common.Models;
using FarmerMarket.Application.DTOs;
using FarmerMarket.Domain.Entities;
using FarmerMarket.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FarmerMarket.Application.Features.Auth;

// 1. Request OTP Command
public record RequestOtpCommand(string Phone) : IRequest<Result<RequestOtpResponseDto>>;

public class RequestOtpHandler(IAppDbContext db, ISmsService sms, IOtpService otpService) : IRequestHandler<RequestOtpCommand, Result<RequestOtpResponseDto>>
{
    public async Task<Result<RequestOtpResponseDto>> Handle(RequestOtpCommand req, CancellationToken ct)
    {
        var phone = PhoneHelper.Normalize(req.Phone);
        if (string.IsNullOrWhiteSpace(phone) || phone.Length < 10)
            return Result<RequestOtpResponseDto>.Failure("Please enter a valid Ethiopian mobile phone number (e.g. 0911223344).");

        // STRICT DATABASE CHECK: Only allow existing registered users to log in
        var user = await db.Users.FirstOrDefaultAsync(u => u.Phone == phone, ct);
        if (user == null)
        {
            return Result<RequestOtpResponseDto>.Failure($"No account found for mobile number '{phone}'. Please switch to 'Join Free' to register your account first.");
        }

        // Generate 6-digit OTP
        var code = RandomNumberGenerator.GetInt32(100000, 999999).ToString();

        // Store in OTP verification service with 5-minute expiry
        otpService.StoreOtp(phone, code, TimeSpan.FromMinutes(5));

        // Dispatch SMS via Twilio or local SMS simulator
        await sms.SendOtpAsync(phone, code, "am", ct);

        // Return success response with demo code for seamless developer/testing experience
        var response = new RequestOtpResponseDto(
            Message: "Verification code dispatched successfully via SMS.",
            DemoCode: code,
            Phone: phone,
            UserName: user.Name,
            Role: user.Role
        );

        return Result<RequestOtpResponseDto>.Success(response);
    }
}

// 2. Verify OTP Command
public record VerifyOtpCommand(string Phone, string Code) : IRequest<Result<AuthResponseDto>>;

public class VerifyOtpHandler(IAppDbContext db, IJwtService jwt, IOtpService otpService) : IRequestHandler<VerifyOtpCommand, Result<AuthResponseDto>>
{
    public async Task<Result<AuthResponseDto>> Handle(VerifyOtpCommand req, CancellationToken ct)
    {
        var phone = PhoneHelper.Normalize(req.Phone);
        var user = await db.Users.FirstOrDefaultAsync(u => u.Phone == phone, ct);
        if (user == null)
            return Result<AuthResponseDto>.Failure("User account not found for this phone number. Please register first.");

        if (string.IsNullOrWhiteSpace(req.Code) || req.Code.Trim().Length < 4)
            return Result<AuthResponseDto>.Failure("Please enter a valid verification code.");

        // Validate code against OtpService or sandbox fallback
        var isValid = otpService.ValidateOtp(phone, req.Code.Trim());
        if (!isValid)
        {
            return Result<AuthResponseDto>.Failure("Invalid or expired verification code. Please check your SMS or click Resend.");
        }

        var token = jwt.GenerateToken(user);
        var userDto = new UserDto(
            user.Id,
            user.Phone,
            user.Name,
            user.NameAm,
            user.Role,
            user.Region,
            user.Verified,
            user.VerificationStatus,
            user.TinNumber,
            user.KycDocumentNumber,
            user.RejectionReason,
            user.WalletBalanceEtb,
            user.CreatedAt
        );

        return Result<AuthResponseDto>.Success(new AuthResponseDto(token, userDto));
    }
}

// 3. Register New User Command
public record RegisterUserCommand(RegisterUserDto Dto) : IRequest<Result<AuthResponseDto>>;

public class RegisterUserHandler(IAppDbContext db, IJwtService jwt) : IRequestHandler<RegisterUserCommand, Result<AuthResponseDto>>
{
    public async Task<Result<AuthResponseDto>> Handle(RegisterUserCommand req, CancellationToken ct)
    {
        var dto = req.Dto;
        var phone = PhoneHelper.Normalize(dto.Phone);

        if (string.IsNullOrWhiteSpace(phone) || phone.Length < 10)
            return Result<AuthResponseDto>.Failure("Please enter a valid Ethiopian mobile phone number.");

        if (string.IsNullOrWhiteSpace(dto.Name))
            return Result<AuthResponseDto>.Failure("Full legal name is required.");

        // Check if phone already exists
        var existingUser = await db.Users.FirstOrDefaultAsync(u => u.Phone == phone, ct);
        if (existingUser != null)
        {
            return Result<AuthResponseDto>.Failure($"An account with mobile number '{phone}' already exists. Please sign in with this number instead.");
        }

        var user = new User
        {
            Id = Guid.NewGuid(),
            Phone = phone,
            Name = dto.Name.Trim(),
            NameAm = string.IsNullOrWhiteSpace(dto.NameAm) ? null : dto.NameAm.Trim(),
            Role = dto.Role,
            Region = string.IsNullOrWhiteSpace(dto.Region) ? "Addis Ababa" : dto.Region.Trim(),
            Verified = false,
            VerificationStatus = VerificationStatus.PendingSubmission,
            RegistrationMethod = "Self",
            WalletBalanceEtb = 0,
            CreatedAt = DateTimeOffset.UtcNow
        };

        db.Users.Add(user);
        await db.SaveChangesAsync(ct);

        var token = jwt.GenerateToken(user);
        var userDto = new UserDto(
            user.Id,
            user.Phone,
            user.Name,
            user.NameAm,
            user.Role,
            user.Region,
            user.Verified,
            user.VerificationStatus,
            user.TinNumber,
            user.KycDocumentNumber,
            user.RejectionReason,
            user.WalletBalanceEtb,
            user.CreatedAt
        );

        return Result<AuthResponseDto>.Success(new AuthResponseDto(token, userDto));
    }
}

// 4. Get Current User Query
public record GetMeQuery(Guid UserId) : IRequest<Result<UserDto>>;

public class GetMeHandler(IAppDbContext db) : IRequestHandler<GetMeQuery, Result<UserDto>>
{
    public async Task<Result<UserDto>> Handle(GetMeQuery req, CancellationToken ct)
    {
        var user = await db.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == req.UserId, ct);
        if (user == null)
            return Result<UserDto>.Failure("User not found.");

        return Result<UserDto>.Success(new UserDto(
            user.Id,
            user.Phone,
            user.Name,
            user.NameAm,
            user.Role,
            user.Region,
            user.Verified,
            user.VerificationStatus,
            user.TinNumber,
            user.KycDocumentNumber,
            user.RejectionReason,
            user.WalletBalanceEtb,
            user.CreatedAt
        ));
    }
}

// 5. Update Profile Command
public record UpdateProfileCommand(Guid UserId, UpdateProfileDto Dto) : IRequest<Result<UserDto>>;

public class UpdateProfileHandler(IAppDbContext db) : IRequestHandler<UpdateProfileCommand, Result<UserDto>>
{
    public async Task<Result<UserDto>> Handle(UpdateProfileCommand req, CancellationToken ct)
    {
        var user = await db.Users.FirstOrDefaultAsync(u => u.Id == req.UserId, ct);
        if (user == null)
            return Result<UserDto>.Failure("User not found.");

        user.Name = req.Dto.Name.Trim();
        user.NameAm = req.Dto.NameAm?.Trim();
        user.Region = req.Dto.Region.Trim();

        await db.SaveChangesAsync(ct);

        return Result<UserDto>.Success(new UserDto(
            user.Id,
            user.Phone,
            user.Name,
            user.NameAm,
            user.Role,
            user.Region,
            user.Verified,
            user.VerificationStatus,
            user.TinNumber,
            user.KycDocumentNumber,
            user.RejectionReason,
            user.WalletBalanceEtb,
            user.CreatedAt
        ));
    }
}

// 6. Get Demo / Seeded Users Query (for instant UI testing)
public record GetDemoUsersQuery() : IRequest<List<DemoUserDto>>;

public class GetDemoUsersHandler(IAppDbContext db) : IRequestHandler<GetDemoUsersQuery, List<DemoUserDto>>
{
    public async Task<List<DemoUserDto>> Handle(GetDemoUsersQuery req, CancellationToken ct)
    {
        return await db.Users
            .AsNoTracking()
            .OrderBy(u => u.Role)
            .Select(u => new DemoUserDto(
                u.Phone,
                u.Name,
                u.NameAm,
                u.Role,
                u.Region
            ))
            .ToListAsync(ct);
    }
}
