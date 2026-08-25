using FarmerMarket.API.Extensions;
using FarmerMarket.Application.DTOs;
using FarmerMarket.Application.Features.Auth;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FarmerMarket.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(IMediator mediator) : ControllerBase
{
    [HttpPost("request-otp")]
    public async Task<IActionResult> RequestOtp([FromBody] RequestOtpDto dto, CancellationToken ct)
    {
        var result = await mediator.Send(new RequestOtpCommand(dto.Phone), ct);
        if (!result.IsSuccess) return BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    [HttpPost("verify-otp")]
    public async Task<IActionResult> VerifyOtp([FromBody] VerifyOtpDto dto, CancellationToken ct)
    {
        var result = await mediator.Send(new VerifyOtpCommand(dto.Phone, dto.Code), ct);
        if (!result.IsSuccess) return BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterUserDto dto, CancellationToken ct)
    {
        var result = await mediator.Send(new RegisterUserCommand(dto), ct);
        if (!result.IsSuccess) return BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    [HttpGet("demo-users")]
    public async Task<IActionResult> GetDemoUsers(CancellationToken ct)
    {
        var result = await mediator.Send(new GetDemoUsersQuery(), ct);
        return Ok(result);
    }

    [HttpGet("me")]
    [Authorize]
    public async Task<IActionResult> GetMe(CancellationToken ct)
    {
        var userId = User.GetUserId();
        var result = await mediator.Send(new GetMeQuery(userId), ct);
        if (!result.IsSuccess) return NotFound(new { error = result.Error });

        return Ok(result.Value);
    }

    [HttpPut("profile")]
    [Authorize]
    public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileDto dto, CancellationToken ct)
    {
        var userId = User.GetUserId();
        var result = await mediator.Send(new UpdateProfileCommand(userId, dto), ct);
        if (!result.IsSuccess) return BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    [HttpPost("change-password")]
    [Authorize]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto, CancellationToken ct)
    {
        var userId = User.GetUserId();
        var result = await mediator.Send(new ChangePasswordCommand(userId, dto.CurrentPassword, dto.NewPassword), ct);
        if (!result.IsSuccess) return BadRequest(new { error = result.Error });
        return Ok(new { message = "Password updated successfully." });
    }

    /// <summary>Sends a password-reset OTP to the given phone number.</summary>
    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword([FromBody] RequestOtpDto dto, CancellationToken ct)
    {
        var result = await mediator.Send(new RequestOtpCommand(dto.Phone), ct);
        if (!result.IsSuccess) return BadRequest(new { error = result.Error });
        // Don't leak OTP demo code in forgot-password flow
        return Ok(new { message = "If an account exists with this number, a reset code has been sent." });
    }

    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto dto, CancellationToken ct)
    {
        var result = await mediator.Send(new ResetPasswordCommand(dto.Phone, dto.OtpCode, dto.NewPassword), ct);
        if (!result.IsSuccess) return BadRequest(new { error = result.Error });
        return Ok(new { message = "Password reset successfully. You can now sign in with your new password." });
    }
}
