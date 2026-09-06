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
    [Authorize(Roles = "farmer,admin,superadmin")]
    public async Task<IActionResult> GetFarmerSummary(CancellationToken ct)
    {
        var farmerId = User.GetUserId();
        var result = await mediator.Send(new GetFarmerSummaryQuery(farmerId), ct);
        if (!result.IsSuccess) return BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    [HttpGet("driver-summary")]
    [Authorize(Roles = "driver,admin,superadmin")]
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

    [HttpPost("chapa/webhook")]
    [AllowAnonymous]
    public async Task<IActionResult> ChapaWebhook([FromBody] System.Text.Json.JsonElement payload, CancellationToken ct)
    {
        var signature = Request.Headers["x-chapa-signature"].FirstOrDefault()
            ?? Request.Headers["Chapa-Signature"].FirstOrDefault()
            ?? string.Empty;

        var result = await mediator.Send(new ProcessChapaWebhookCommand(payload, signature), ct);
        if (!result.IsSuccess) return BadRequest(new { error = result.Error });

        return Ok(new { status = "success" });
    }

    [HttpGet("chapa/verify/{txRef}")]
    [AllowAnonymous]
    public async Task<IActionResult> VerifyChapaPayment(string txRef, CancellationToken ct)
    {
        var result = await mediator.Send(new VerifyChapaPaymentCommand(txRef), ct);
        if (!result.IsSuccess) return BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }
}
