using FarmerMarket.API.Extensions;
using FarmerMarket.Application.DTOs;
using FarmerMarket.Application.Features.Listings;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FarmerMarket.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ListingsController(IMediator mediator) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] string? category,
        [FromQuery] string? region,
        [FromQuery] decimal? minPrice,
        [FromQuery] decimal? maxPrice,
        [FromQuery] string? search,
        [FromQuery] double? lat,
        [FromQuery] double? lng,
        [FromQuery] double? maxDistanceKm,
        [FromQuery] string? grade,
        [FromQuery] string? ripeness,
        [FromQuery] bool? isOrganic,
        [FromQuery] bool? isAdvanceHarvest,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        CancellationToken ct = default)
    {
        var filters = new ListingFilters(
            Category: category,
            Region: region,
            MinPrice: minPrice,
            MaxPrice: maxPrice,
            Search: search,
            Lat: lat,
            Lng: lng,
            MaxDistanceKm: maxDistanceKm,
            Grade: grade,
            Ripeness: ripeness,
            IsOrganic: isOrganic,
            IsAdvanceHarvest: isAdvanceHarvest,
            Page: page,
            PageSize: pageSize
        );
        var result = await mediator.Send(new GetListingsQuery(filters), ct);
        return Ok(result);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id, [FromQuery] double? lat, [FromQuery] double? lng, CancellationToken ct)
    {
        var result = await mediator.Send(new GetListingByIdQuery(id, lat, lng), ct);
        if (!result.IsSuccess) return NotFound(new { error = result.Error });

        return Ok(result.Value);
    }

    [HttpGet("nearby")]
    public async Task<IActionResult> GetNearby(
        [FromQuery] double lat,
        [FromQuery] double lng,
        [FromQuery] double km = 30,
        CancellationToken ct = default)
    {
        var result = await mediator.Send(new GetNearbyListingsQuery(lat, lng, km), ct);
        return Ok(result);
    }

    [HttpPost]
    [Authorize(Roles = "farmer,admin")]
    public async Task<IActionResult> Create([FromBody] CreateListingDto dto, CancellationToken ct)
    {
        var farmerId = User.GetUserId();
        var result = await mediator.Send(new CreateListingCommand(farmerId, dto), ct);
        if (!result.IsSuccess) return BadRequest(new { error = result.Error });

        return CreatedAtAction(nameof(GetById), new { id = result.Value!.Id }, result.Value);
    }

    [HttpPut("{id:guid}")]
    [Authorize(Roles = "farmer,admin")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateListingDto dto, CancellationToken ct)
    {
        var farmerId = User.GetUserId();
        var result = await mediator.Send(new UpdateListingCommand(id, farmerId, dto), ct);
        if (!result.IsSuccess) return BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Roles = "farmer,admin")]
    public async Task<IActionResult> Deactivate(Guid id, CancellationToken ct)
    {
        var farmerId = User.GetUserId();
        var result = await mediator.Send(new DeactivateListingCommand(id, farmerId), ct);
        if (!result.IsSuccess) return BadRequest(new { error = result.Error });

        return NoContent();
    }
}
