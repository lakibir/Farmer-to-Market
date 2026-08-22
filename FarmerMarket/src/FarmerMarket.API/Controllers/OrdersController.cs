using FarmerMarket.API.Extensions;
using FarmerMarket.Application.DTOs;
using FarmerMarket.Application.Features.Orders;
using FarmerMarket.Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FarmerMarket.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class OrdersController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    [Authorize(Roles = "buyer,admin")]
    public async Task<IActionResult> PlaceOrder([FromBody] PlaceOrderDto dto, CancellationToken ct)
    {
        var buyerId = User.GetUserId();
        var result = await mediator.Send(new PlaceOrderCommand(buyerId, dto), ct);
        if (!result.IsSuccess) return Conflict(new { error = result.Error });

        return Ok(result.Value);
    }

    [HttpGet]
    public async Task<IActionResult> GetMyOrders([FromQuery] OrderStatus? status, CancellationToken ct)
    {
        var userId = User.GetUserId();
        var role = User.GetUserRole();
        var result = await mediator.Send(new GetOrdersQuery(userId, role, status), ct);
        return Ok(result);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id, CancellationToken ct)
    {
        var userId = User.GetUserId();
        var role = User.GetUserRole();
        var result = await mediator.Send(new GetOrderByIdQuery(id, userId, role), ct);
        if (!result.IsSuccess) return NotFound(new { error = result.Error });

        return Ok(result.Value);
    }

    [HttpPut("{id:guid}/confirm")]
    [Authorize(Roles = "farmer,admin")]
    public async Task<IActionResult> ConfirmOrder(Guid id, CancellationToken ct)
    {
        var farmerId = User.GetUserId();
        var result = await mediator.Send(new ConfirmOrderCommand(id, farmerId), ct);
        if (!result.IsSuccess) return BadRequest(new { error = result.Error });

        return Ok(new { message = "Order confirmed. Assigned to drivers for pickup." });
    }

    [HttpPut("{id:guid}/pickup")]
    [Authorize(Roles = "driver,admin")]
    public async Task<IActionResult> PickupOrder(Guid id, [FromBody] PickupOrderDto dto, CancellationToken ct)
    {
        var driverId = User.GetUserId();
        var result = await mediator.Send(new PickupOrderCommand(id, driverId, dto.PickupPhoto), ct);
        if (!result.IsSuccess) return BadRequest(new { error = result.Error });

        return Ok(new { message = "Order marked as picked up. Out for delivery." });
    }

    [HttpPut("{id:guid}/deliver")]
    [Authorize(Roles = "buyer,admin")]
    public async Task<IActionResult> DeliverOrder(Guid id, [FromBody] DeliverOrderDto? proof, CancellationToken ct)
    {
        var buyerId = User.GetUserId();
        var result = await mediator.Send(new DeliverOrderCommand(id, buyerId, proof), ct);
        if (!result.IsSuccess) return BadRequest(new { error = result.Error });

        return Ok(new { message = "Delivery confirmed! Escrow funds released to farmer and driver." });
    }

    [HttpPut("{id:guid}/dispute")]
    public async Task<IActionResult> DisputeOrder(Guid id, [FromBody] DisputeOrderDto dto, CancellationToken ct)
    {
        var userId = User.GetUserId();
        var result = await mediator.Send(new DisputeOrderCommand(id, userId, dto), ct);
        if (!result.IsSuccess) return BadRequest(new { error = result.Error });

        return Ok(new { message = "Dispute registered. Platform admin will review the claim." });
    }
}
