using FarmerMarket.API.Extensions;
using FarmerMarket.Application.DTOs;
using FarmerMarket.Application.Features.Reviews;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FarmerMarket.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReviewsController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create([FromBody] CreateReviewDto dto, CancellationToken ct)
    {
        var reviewerId = User.GetUserId();
        var result = await mediator.Send(new CreateReviewCommand(reviewerId, dto), ct);
        if (!result.IsSuccess) return BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    [HttpGet("user/{userId:guid}")]
    public async Task<IActionResult> GetReviewsForUser(Guid userId, CancellationToken ct)
    {
        var result = await mediator.Send(new GetReviewsByUserQuery(userId), ct);
        return Ok(result);
    }
}
