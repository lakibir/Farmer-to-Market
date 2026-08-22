using FarmerMarket.Application.DTOs;
using FarmerMarket.Application.Features.Admin;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FarmerMarket.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "admin")]
public class AdminController(IMediator mediator) : ControllerBase
{
    [HttpGet("stats")]
    public async Task<IActionResult> GetStats(CancellationToken ct)
    {
        var result = await mediator.Send(new GetPlatformStatsQuery(), ct);
        return Ok(result.Value);
    }

    [HttpPut("users/{id:guid}/verify")]
    public async Task<IActionResult> VerifyUser(Guid id, [FromQuery] bool verified = true, CancellationToken ct = default)
    {
        var result = await mediator.Send(new VerifyUserCommand(id, verified), ct);
        if (!result.IsSuccess) return BadRequest(new { error = result.Error });

        return Ok(new { message = $"User verification status updated to {verified}." });
    }

    [HttpPost("orders/{id:guid}/resolve-dispute")]
    public async Task<IActionResult> ResolveDispute(Guid id, [FromBody] ResolveDisputeDto dto, CancellationToken ct)
    {
        var result = await mediator.Send(new ResolveDisputeCommand(id, dto), ct);
        if (!result.IsSuccess) return BadRequest(new { error = result.Error });

        return Ok(new { message = $"Dispute for order {id} resolved successfully: {dto.Resolution}" });
    }

    [HttpPost("broadcast-sms")]
    public async Task<IActionResult> BroadcastSms([FromBody] BroadcastSmsRequestDto dto, CancellationToken ct)
    {
        var result = await mediator.Send(new BroadcastSmsCommand(dto), ct);
        return Ok(new { message = $"Broadcast SMS queued successfully to {result.Value} recipients." });
    }
}
