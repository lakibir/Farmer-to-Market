using FarmerMarket.Application.Features.Ussd;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace FarmerMarket.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UssdController(IMediator mediator) : ControllerBase
{
    /// <summary>
    /// Telco USSD Webhook (Africa's Talking / Ethio Telecom format)
    /// Accepts FormUrlEncoded or JSON payload.
    /// </summary>
    [HttpPost]
    [Consumes("application/x-www-form-urlencoded", "application/json")]
    public async Task<IActionResult> ProcessUssd(
        [FromForm] string? sessionId,
        [FromForm] string? phoneNumber,
        [FromForm] string? text,
        [FromForm] string? serviceCode,
        [FromBody] UssdRequest? jsonBody,
        CancellationToken ct = default)
    {
        var request = jsonBody ?? new UssdRequest(
            sessionId ?? Guid.NewGuid().ToString(),
            phoneNumber ?? "+251911223344",
            text ?? string.Empty,
            serviceCode ?? "*804#",
            "am"
        );

        var response = await mediator.Send(new ProcessUssdCommand(request), ct);

        // Standard telco plain text format: "CON <message>" or "END <message>"
        if (Request.ContentType?.Contains("form-urlencoded") == true)
        {
            return Content($"{response.Action} {response.Message}", "text/plain");
        }

        return Ok(response);
    }

    /// <summary>
    /// Interactive Simulator endpoint for the Web UI feature-phone dialer
    /// </summary>
    [HttpPost("simulate")]
    public async Task<IActionResult> SimulateUssd([FromBody] UssdRequest request, CancellationToken ct = default)
    {
        var response = await mediator.Send(new ProcessUssdCommand(request), ct);
        return Ok(response);
    }
}
