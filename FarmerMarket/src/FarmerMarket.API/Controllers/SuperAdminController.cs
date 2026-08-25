using FarmerMarket.API.Authorization;
using FarmerMarket.API.Extensions;
using FarmerMarket.Application.DTOs;
using FarmerMarket.Application.Features.Admin;
using FarmerMarket.Application.Features.Auth;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FarmerMarket.API.Controllers;

/// <summary>
/// SuperAdmin-exclusive endpoints. All actions here are restricted to the SuperAdmin role only.
/// These operations cannot be delegated to regular Admin accounts.
/// </summary>
[ApiController]
[Route("api/superadmin")]
[Authorize(Policy = AuthorizationPolicies.SuperAdminOnly)]
public class SuperAdminController(IMediator mediator) : ControllerBase
{
    // ─── Admin Account Management (SuperAdmin Only) ───────────────────────────

    /// <summary>Creates a new Admin account. Only SuperAdmin can create other admins.</summary>
    [HttpPost("admins")]
    public async Task<IActionResult> CreateAdmin([FromBody] CreateAdminDto dto, CancellationToken ct)
    {
        var result = await mediator.Send(new RegisterUserCommand(new RegisterUserDto(
            dto.Phone, dto.Name, dto.NameAm, Domain.Enums.UserRole.Admin, dto.Region)), ct);

        if (!result.IsSuccess) return BadRequest(new { error = result.Error });
        return Ok(new { message = $"Admin account created for {dto.Name}", user = result.Value });
    }

    /// <summary>Suspends or reactivates an Admin account.</summary>
    [HttpPut("admins/{id:guid}/status")]
    public async Task<IActionResult> UpdateAdminStatus(Guid id, [FromBody] UpdateUserStatusDto dto, CancellationToken ct)
    {
        var result = await mediator.Send(new UpdateUserStatusCommand(id, dto.Status), ct);
        if (!result.IsSuccess) return BadRequest(new { error = result.Error });
        return Ok(new { message = $"Admin {id} status set to {dto.Status}" });
    }

    /// <summary>Permanently deletes any user account, including Admin accounts.</summary>
    [HttpDelete("users/{id:guid}")]
    public async Task<IActionResult> DeleteAnyUser(Guid id, CancellationToken ct)
    {
        var result = await mediator.Send(new DeleteUserCommand(id), ct);
        if (!result.IsSuccess) return BadRequest(new { error = result.Error });
        return Ok(new { message = $"User {id} permanently deleted." });
    }

    // ─── Platform Settings (SuperAdmin Only) ──────────────────────────────────

    /// <summary>Returns the current platform-wide configuration summary visible to SuperAdmin.</summary>
    [HttpGet("platform-config")]
    public IActionResult GetPlatformConfig()
    {
        // TODO: Replace with GetPlatformConfigQuery once settings are persisted to DB
        return Ok(new
        {
            escrowSplit = new { farmerPercent = 90, driverPercent = 5, platformPercent = 5 },
            activePaymentProvider = "Telebirr",
            activeSmsProvider = "Log",
            kycTiersEnabled = true,
            commissionModel = "Volume-tiered v2"
        });
    }

    // ─── Audit Logs (SuperAdmin Only) ─────────────────────────────────────────

    /// <summary>Returns system-wide audit logs. Only SuperAdmin can access this.</summary>
    [HttpGet("audit-logs")]
    public async Task<IActionResult> GetAuditLogs(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 50,
        [FromQuery] string? actorRole = null,
        CancellationToken ct = default)
    {
        var result = await mediator.Send(new GetAuditLogsQuery(page, pageSize, actorRole), ct);
        return Ok(result.Value);
    }
}
