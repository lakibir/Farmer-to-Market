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
    public async Task<IActionResult> VerifyUser(Guid id, [FromQuery] bool verified = true, [FromQuery] string? kycStatus = "Verified", CancellationToken ct = default)
    {
        var result = await mediator.Send(new VerifyUserCommand(id, verified, kycStatus), ct);
        if (!result.IsSuccess) return BadRequest(new { error = result.Error });

        return Ok(new { message = $"User verification status updated to {verified} ({kycStatus})." });
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

    [HttpGet("anomalies")]
    public IActionResult GetAnomalies()
    {
        var alerts = new List<AnomalyAlertDto>
        {
            new("ANOM-101", "High", "PriceManipulation", "Unusual Price Spike Detected", "Tomato listing posted at 180 ETB/kg (290% above regional market average).", "Listing", "a1b2c3d4-0001-0000-0000-000000000001", DateTimeOffset.UtcNow.AddMinutes(-35)),
            new("ANOM-102", "Medium", "DuplicateProofPhoto", "Driver Proof Hash Collision", "Driver Dawit submitted a delivery photo identical to an order completed yesterday.", "Order", "b1b2c3d4-0002-0000-0000-000000000002", DateTimeOffset.UtcNow.AddHours(-2)),
            new("ANOM-103", "Low", "FakeAccount", "Rapid Registration from Same IP", "Three buyer accounts created within 90 seconds in Kaliti cluster.", "User", "44444444-4444-4444-4444-444444444444", DateTimeOffset.UtcNow.AddHours(-5))
        };
        return Ok(alerts);
    }

    [HttpGet("kyc-queue")]
    public IActionResult GetKycQueue()
    {
        var queue = new List<KycVerificationItemDto>
        {
            new(Guid.Parse("55555555-5555-5555-5555-555555555555"), "Dawit Kebede", "Driver", "+251977889900", "Addis Ababa (Kaliti)", "Commercial Vehicle Logbook", "ET-LOG-5T-98214", "Pending", DateTimeOffset.UtcNow.AddDays(-1)),
            new(Guid.Parse("11111111-1111-1111-1111-111111111111"), "Abebe Bekele", "Farmer", "+251911223344", "Oromia (Bishoftu)", "National ID (Fayda)", "FAYDA-ET-8829104", "Verified", DateTimeOffset.UtcNow.AddDays(-5)),
            new(Guid.Parse("33333333-3333-3333-3333-333333333333"), "Chala Gemechu", "Farmer", "+251933445566", "Sidama (Hawassa)", "Kebele ID", "HAW-KEB-4410", "Pending", DateTimeOffset.UtcNow.AddHours(-12))
        };
        return Ok(queue);
    }

    [HttpGet("regional-analytics")]
    public IActionResult GetRegionalAnalytics()
    {
        var analytics = new List<RegionalAnalyticsDto>
        {
            new("Oromia (East Shewa / Bishoftu)", 4200, 68.5m, 3850000m, "Tomatoes & Onions"),
            new("Amhara (Debre Berhan / Gojjam)", 3100, 42.0m, 4830000m, "Magna White Teff"),
            new("Sidama (Hawassa / Yirgalem)", 1950, 24.8m, 1488000m, "Hass Avocados & Fruits"),
            new("SNNPR (Gedeo / Yirgacheffe)", 1400, 10.5m, 3990000m, "Grade 1 Specialty Coffee")
        };
        return Ok(analytics);
    }

    [HttpGet("price-benchmarks")]
    [AllowAnonymous]
    public IActionResult GetPriceBenchmarks()
    {
        var benchmarks = new List<PriceBenchmarkDto>
        {
            new("Fresh Sholla Tomatoes", "ቀይ ቲማቲም", "Merkato Wholesale / Sholla", 38m, 45m, 52m, "Down", DateTimeOffset.UtcNow.AddHours(-2)),
            new("Organic Magna White Teff", "የማኛ ነጭ ጤፍ", "EABC / Addis Ababa Depot", 108m, 115m, 125m, "Up", DateTimeOffset.UtcNow.AddHours(-3)),
            new("Awash Red Onions", "ቀይ ሽንኩርት", "Adama Wholesale Market", 48m, 55m, 62m, "Stable", DateTimeOffset.UtcNow.AddHours(-1)),
            new("Hawassa Hass Avocados", "ሀስ አቮካዶ", "Hawassa Central / Merkato", 50m, 60m, 72m, "Up", DateTimeOffset.UtcNow.AddHours(-4)),
            new("Yirgacheffe Green Coffee", "ስፔሻሊቲ ቡና", "ECX Central Exchange", 340m, 380m, 420m, "Up", DateTimeOffset.UtcNow.AddHours(-6))
        };
        return Ok(benchmarks);
    }
}
