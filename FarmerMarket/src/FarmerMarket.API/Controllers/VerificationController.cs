using FarmerMarket.API.Extensions;
using FarmerMarket.Application.DTOs;
using FarmerMarket.Application.Features.Verification;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FarmerMarket.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class VerificationController(IMediator mediator) : ControllerBase
{
    private Guid GetCurrentUserId()
    {
        return User.GetUserId();
    }

    [HttpPost("submit")]
    public async Task<IActionResult> SubmitDocuments([FromBody] SubmitVerificationDocumentsDto dto, CancellationToken ct)
    {
        var userId = GetCurrentUserId();
        var result = await mediator.Send(new SubmitDocumentsCommand(userId, dto), ct);
        if (!result.IsSuccess) return BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    [HttpGet("my-status")]
    public async Task<IActionResult> GetMyStatus(CancellationToken ct)
    {
        var userId = GetCurrentUserId();
        var result = await mediator.Send(new GetMyVerificationStatusQuery(userId), ct);
        if (!result.IsSuccess) return NotFound(new { error = result.Error });

        return Ok(result.Value);
    }

    [HttpPost("agent-register")]
    [Authorize(Roles = "agent,admin,superadmin")]
    public async Task<IActionResult> AgentRegisterFarmer([FromBody] AgentRegisterFarmerDto dto, CancellationToken ct)
    {
        var agentId = GetCurrentUserId();
        var result = await mediator.Send(new AgentRegisterFarmerCommand(agentId, dto), ct);
        if (!result.IsSuccess) return BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    [HttpPost("{targetUserId:guid}/review")]
    [Authorize(Roles = "agent,admin,superadmin")]
    public async Task<IActionResult> ReviewVerification(Guid targetUserId, [FromBody] ReviewVerificationDto dto, CancellationToken ct)
    {
        var reviewerId = GetCurrentUserId();
        var result = await mediator.Send(new ReviewVerificationCommand(reviewerId, targetUserId, dto), ct);
        if (!result.IsSuccess) return BadRequest(new { error = result.Error });

        return Ok(new { message = $"User verification marked as {dto.Action}." });
    }

    [HttpGet("queue")]
    [Authorize(Roles = "agent,admin,superadmin")]
    public async Task<IActionResult> GetVerificationQueue([FromQuery] string? role = null, [FromQuery] string? status = null, CancellationToken ct = default)
    {
        var result = await mediator.Send(new GetVerificationQueueQuery(role, status), ct);
        return Ok(result.Value);
    }
}
