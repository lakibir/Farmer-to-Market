using FarmerMarket.API.Authorization;
using FarmerMarket.API.Extensions;
using FarmerMarket.Application.Common.Interfaces;
using FarmerMarket.Application.DTOs;
using FarmerMarket.Application.Features.Admin;
using FarmerMarket.Application.Features.Auth;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FarmerMarket.API.Controllers;

/// <summary>
/// SuperAdmin-exclusive endpoints. All actions here are restricted to the SuperAdmin role only.
/// Includes comprehensive governance for Platform Config, Escrow Multi-Sig Payouts, Audit Logs,
/// Delivery Zones (PostGIS), Feature Flags, Emergency & Blacklist, Global Rules, and DB Operations.
/// </summary>
[ApiController]
[Route("api/superadmin")]
[Authorize(Policy = AuthorizationPolicies.SuperAdminOnly)]
public class SuperAdminController(IMediator mediator, ISuperAdminGovernanceStore store) : ControllerBase
{
    // ─── 1. Admin Account Management (SuperAdmin Only) ───────────────────────────

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

    // ─── 2. Platform Config & Escrow ─────────────────────────────────────────────

    /// <summary>Returns the current platform-wide configuration and escrow parameters.</summary>
    [HttpGet("platform-config")]
    public IActionResult GetPlatformConfig()
    {
        var config = store.GetPlatformConfig();
        return Ok(config);
    }

    /// <summary>Updates platform escrow splits, tax percentages, and gateway configurations.</summary>
    [HttpPut("platform-config")]
    public IActionResult UpdatePlatformConfig([FromBody] SuperAdminPlatformConfigDto config)
    {
        var updated = store.UpdatePlatformConfig(config);
        return Ok(updated);
    }

    /// <summary>Emergency killswitch to immediately freeze platform escrow disbursements.</summary>
    [HttpPost("emergency/freeze-escrow")]
    public IActionResult FreezeEscrow()
    {
        store.FreezeEscrow();
        return Ok(new { message = "Escrow disbursements frozen across platform." });
    }

    /// <summary>Deactivates emergency killswitch and resumes normal escrow processing.</summary>
    [HttpPost("emergency/unfreeze-escrow")]
    public IActionResult UnfreezeEscrow()
    {
        store.UnfreezeEscrow();
        return Ok(new { message = "Escrow disbursements resumed." });
    }

    // ─── 3. Financials & Payouts (4 initial Pending) ───────────────────────────

    /// <summary>Returns the full multi-sig payout queue.</summary>
    [HttpGet("payouts")]
    public IActionResult GetPayouts()
    {
        var payouts = store.GetPayouts();
        return Ok(payouts);
    }

    /// <summary>Submits a new high-value payout request into the multi-sig authorization queue.</summary>
    [HttpPost("payouts")]
    public IActionResult CreatePayout([FromBody] CreatePayoutRequestDto dto)
    {
        var item = store.CreatePayout(dto);
        return Ok(item);
    }

    /// <summary>SuperAdmin approves a high-value payout and authorizes Telebirr disbursement.</summary>
    [HttpPost("payouts/{id}/approve")]
    public IActionResult ApprovePayout(string id, [FromBody] ApprovePayoutRequestDto? dto)
    {
        var reviewer = dto?.ReviewerName ?? "Dr. Dawit Haile (Super Admin)";
        var approved = store.ApprovePayout(id, reviewer);
        if (approved == null) return NotFound(new { error = "Payout request not found." });
        return Ok(approved);
    }

    /// <summary>SuperAdmin batch authorizes multiple pending high-value payouts.</summary>
    [HttpPost("payouts/batch-approve")]
    public IActionResult BatchApprovePayouts([FromBody] BatchApprovePayoutsRequestDto dto)
    {
        var reviewer = dto.ReviewerName ?? "Dr. Dawit Haile (Super Admin)";
        var list = store.BatchApprovePayouts(dto.Ids, reviewer);
        return Ok(new { approvedCount = list.Count, items = list });
    }

    /// <summary>SuperAdmin declines/holds a high-value payout with reason code.</summary>
    [HttpPost("payouts/{id}/reject")]
    public IActionResult RejectPayout(string id, [FromBody] RejectPayoutRequestDto dto)
    {
        var reviewer = dto.ReviewerName ?? "Dr. Dawit Haile (Super Admin)";
        var rejected = store.RejectPayout(id, reviewer, dto.Reason);
        if (rejected == null) return NotFound(new { error = "Payout request not found." });
        return Ok(rejected);
    }

    /// <summary>Resets the payout queue back to default 4 pending requests.</summary>
    [HttpPost("payouts/reset-defaults")]
    public IActionResult ResetPayoutsToDefault()
    {
        store.ResetPayoutsToDefault();
        return Ok(new { message = "Payout queue reset to default 4 pending approvals." });
    }

    // ─── 4. System Audit Logs (5 initial) ────────────────────────────────────────

    /// <summary>Returns system audit logs with optional category filter.</summary>
    [HttpGet("audit-logs")]
    public IActionResult GetAuditLogs([FromQuery] string? category = null)
    {
        var logs = store.GetAuditLogs(category);
        return Ok(logs);
    }

    /// <summary>Creates a new audit log record.</summary>
    [HttpPost("audit-logs")]
    public IActionResult AddAuditLog([FromBody] CreateAuditLogRequestDto dto)
    {
        var log = store.AddAuditLog(dto);
        return Ok(log);
    }

    // ─── 5. Delivery Zones & PostGIS (6 initial) ─────────────────────────────────

    /// <summary>Returns the list of 6 regional delivery zones and transport corridors.</summary>
    [HttpGet("zones")]
    public IActionResult GetDeliveryZones()
    {
        var zones = store.GetDeliveryZones();
        return Ok(zones);
    }

    /// <summary>Adds a new delivery zone.</summary>
    [HttpPost("zones")]
    public IActionResult AddDeliveryZone([FromBody] DeliveryZoneDto zone)
    {
        var created = store.AddDeliveryZone(zone);
        return Ok(created);
    }

    /// <summary>Updates an existing delivery zone.</summary>
    [HttpPut("zones/{id}")]
    public IActionResult UpdateDeliveryZone(string id, [FromBody] DeliveryZoneDto zone)
    {
        var updated = store.UpdateDeliveryZone(id, zone);
        if (updated == null) return NotFound(new { error = "Delivery zone not found." });
        return Ok(updated);
    }

    /// <summary>Deletes a delivery zone.</summary>
    [HttpDelete("zones/{id}")]
    public IActionResult DeleteDeliveryZone(string id)
    {
        var success = store.DeleteDeliveryZone(id);
        if (!success) return NotFound(new { error = "Delivery zone not found." });
        return Ok(new { message = "Delivery zone deleted successfully." });
    }

    /// <summary>Resets delivery zones to the 6 default Ethiopian corridors.</summary>
    [HttpPost("zones/reset-defaults")]
    public IActionResult ResetDeliveryZonesToDefault()
    {
        store.ResetDeliveryZonesToDefault();
        return Ok(new { message = "Delivery zones reset to default 6 regional corridors." });
    }

    // ─── 6. Feature Flags (5 initial) ────────────────────────────────────────────

    /// <summary>Returns platform feature flags.</summary>
    [HttpGet("feature-flags")]
    public IActionResult GetFeatureFlags()
    {
        var flags = store.GetFeatureFlags();
        return Ok(flags);
    }

    /// <summary>Toggles or updates rollout percentage for a feature flag.</summary>
    [HttpPut("feature-flags/{key}")]
    public IActionResult ToggleFeatureFlag(string key, [FromBody] ToggleFeatureFlagDto dto)
    {
        var updated = store.ToggleFeatureFlag(key, dto.Enabled, dto.RolloutPercentage);
        if (updated == null) return NotFound(new { error = "Feature flag not found." });
        return Ok(updated);
    }

    /// <summary>Resets feature flags to defaults.</summary>
    [HttpPost("feature-flags/reset-defaults")]
    public IActionResult ResetFeatureFlagsToDefault()
    {
        store.ResetFeatureFlagsToDefault();
        return Ok(new { message = "Feature flags reset to defaults." });
    }

    // ─── 7. Emergency & Blacklist ────────────────────────────────────────────────

    /// <summary>Returns all active blacklist entries.</summary>
    [HttpGet("blacklist")]
    public IActionResult GetBlacklist()
    {
        var entries = store.GetBlacklist();
        return Ok(entries);
    }

    /// <summary>Adds a phone, TIN, or ID to the blacklist.</summary>
    [HttpPost("blacklist")]
    public IActionResult AddToBlacklist([FromBody] CreateBlacklistEntryDto dto)
    {
        var created = store.AddBlacklistEntry(dto);
        return Ok(created);
    }

    /// <summary>Removes an entry from the blacklist.</summary>
    [HttpDelete("blacklist/{id}")]
    public IActionResult RemoveFromBlacklist(string id)
    {
        var success = store.RemoveBlacklistEntry(id);
        if (!success) return NotFound(new { error = "Blacklist entry not found." });
        return Ok(new { message = "Entry removed from blacklist." });
    }

    // ─── 8. Global Rules ─────────────────────────────────────────────────────────

    /// <summary>Returns global business rules and price corridors.</summary>
    [HttpGet("business-rules")]
    public IActionResult GetBusinessRules()
    {
        var rules = store.GetBusinessRules();
        return Ok(rules);
    }

    /// <summary>Updates global business rules and price corridors.</summary>
    [HttpPut("business-rules")]
    public IActionResult UpdateBusinessRules([FromBody] GlobalBusinessRulesDto rules)
    {
        var updated = store.UpdateBusinessRules(rules);
        return Ok(updated);
    }

    // ─── 9. Database & Health (DB Ops) ───────────────────────────────────────────

    /// <summary>Returns real-time PostgreSQL and PostGIS health telemetry.</summary>
    [HttpGet("db/health")]
    public IActionResult GetDatabaseHealth()
    {
        var health = store.GetDatabaseHealth();
        return Ok(health);
    }

    /// <summary>Triggers an encrypted database snapshot backup.</summary>
    [HttpPost("db/backup")]
    public IActionResult TriggerBackup()
    {
        var result = store.TriggerDatabaseBackup();
        return Ok(result);
    }

    /// <summary>Runs VACUUM ANALYZE and PostGIS spatial re-indexing.</summary>
    [HttpPost("db/optimize")]
    public IActionResult OptimizeDatabase()
    {
        store.OptimizeDatabase();
        return Ok(new { message = "VACUUM ANALYZE and spatial index optimization completed successfully." });
    }
}
