using FarmerMarket.API.Extensions;
using FarmerMarket.Application.DTOs;
using FarmerMarket.Application.Features.Payments;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FarmerMarket.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PaymentsController(IMediator mediator) : ControllerBase
{
    [HttpGet("farmer-summary")]
    [Authorize(Roles = "farmer,admin")]
    public async Task<IActionResult> GetFarmerSummary(CancellationToken ct)
    {
        var farmerId = User.GetUserId();
        var result = await mediator.Send(new GetFarmerSummaryQuery(farmerId), ct);
        if (!result.IsSuccess) return BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    [HttpGet("driver-summary")]
    [Authorize(Roles = "driver,admin")]
    public async Task<IActionResult> GetDriverSummary(CancellationToken ct)
    {
        var driverId = User.GetUserId();
        var result = await mediator.Send(new GetDriverSummaryQuery(driverId), ct);
        if (!result.IsSuccess) return BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    [HttpGet("{orderId:guid}")]
    [Authorize]
    public async Task<IActionResult> GetByOrderId(Guid orderId, CancellationToken ct)
    {
        var result = await mediator.Send(
            new GetPaymentByOrderIdQuery(orderId, User.GetUserId(), User.GetUserRole()), ct);
        if (!result.IsSuccess) return NotFound(new { error = result.Error });

        return Ok(result.Value);
    }

    [HttpPost("telebirr/webhook")]
    [AllowAnonymous]
    public async Task<IActionResult> TelebirrWebhook([FromBody] TelebirrWebhookDto dto, CancellationToken ct)
    {
        var result = await mediator.Send(new ProcessTelebirrWebhookCommand(dto), ct);
        if (!result.IsSuccess) return BadRequest(new { error = result.Error });

        return Ok(new { code = 0, message = "SUCCESS" });
    }
}
