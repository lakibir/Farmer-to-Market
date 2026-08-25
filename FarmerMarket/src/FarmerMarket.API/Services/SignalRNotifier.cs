using FarmerMarket.API.Hubs;
using FarmerMarket.Application.Common.Interfaces;
using FarmerMarket.Domain.Enums;
using Microsoft.AspNetCore.SignalR;

namespace FarmerMarket.API.Services;

/// <summary>
/// Production ISignalRNotifier — pushes events to connected clients via OrderHub.
/// Registered as Scoped in Program.cs, overriding the Infrastructure fallback (log-only).
/// </summary>
public class SignalRNotifier(IHubContext<OrderHub> hubContext) : ISignalRNotifier
{
    public async Task NotifyOrderStatusChangedAsync(Guid orderId, OrderStatus status, string? message = null, CancellationToken ct = default)
    {
        await hubContext.Clients.Group($"order_{orderId}").SendAsync("OrderStatusChanged", new
        {
            orderId = orderId.ToString(),
            status = status.ToString(),
            message,
            timestamp = DateTimeOffset.UtcNow
        }, cancellationToken: ct);
    }

    public async Task NotifyDriverLocationUpdatedAsync(Guid orderId, double latitude, double longitude, CancellationToken ct = default)
    {
        await hubContext.Clients.Group($"order_{orderId}").SendAsync("DriverLocationUpdate", new
        {
            orderId = orderId.ToString(),
            lat = latitude,
            lng = longitude,
            estimatedMinutes = 0,
            timestamp = DateTimeOffset.UtcNow
        }, cancellationToken: ct);
    }

    public async Task NotifyNewOrderForFarmerAsync(Guid farmerId, Guid orderId, string productName, decimal qtyKg, CancellationToken ct = default)
    {
        // Push only to the farmer's personal channel — not all connected clients
        await hubContext.Clients.Group($"farmer_{farmerId}").SendAsync("NewOrderForFarmer", new
        {
            orderId = orderId.ToString(),
            productName,
            qtyKg,
            timestamp = DateTimeOffset.UtcNow
        }, cancellationToken: ct);
    }

    public async Task NotifyDeliveryConfirmedAsync(Guid orderId, decimal farmerCut, decimal driverCut, CancellationToken ct = default)
    {
        await hubContext.Clients.Group($"order_{orderId}").SendAsync("DeliveryConfirmed", new
        {
            orderId = orderId.ToString(),
            farmerCut,
            driverCut,
            timestamp = DateTimeOffset.UtcNow
        }, cancellationToken: ct);
    }
}
