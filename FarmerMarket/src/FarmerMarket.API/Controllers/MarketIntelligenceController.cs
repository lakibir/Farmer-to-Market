using FarmerMarket.Application.Features.MarketIntelligence;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace FarmerMarket.API.Controllers;

[ApiController]
[Route("api/market-intelligence")]
public class MarketIntelligenceController(IMediator mediator) : ControllerBase
{
    [HttpGet("indices")]
    public async Task<IActionResult> GetIndices(
        [FromQuery] string? category,
        [FromQuery] string? region,
        CancellationToken ct = default)
    {
        var result = await mediator.Send(new GetCommodityPriceIndicesQuery(category, region), ct);
        return Ok(result);
    }

    [HttpPost("advisor")]
    public async Task<IActionResult> GetFairPriceRecommendation(
        [FromBody] FairPriceRecommendationRequest request,
        CancellationToken ct = default)
    {
        var result = await mediator.Send(new GetFairPriceRecommendationQuery(request), ct);
        return Ok(result);
    }
}
