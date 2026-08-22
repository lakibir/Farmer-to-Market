using FarmerMarket.API.Hubs;
using FarmerMarket.Application.Common.Interfaces;
using FarmerMarket.Domain.Enums;
using Microsoft.AspNetCore.SignalR;

namespace FarmerMarket.API.Services;

public class SignalRNotifier(IHubContext<OrderHub> hubContext) : ISignalRNotifier
{
    public async Task NotifyOrderStatusChangedAsync(Guid orderId, OrderStatus status, string? message = null, CancellationToken ct = default)
    {
        await hubContext.Clients.Group($"order_{orderId}").SendAsync("OrderStatusChanged", new
        {
            orderId,
            status = status.ToString().ToLower(),
            message,
            timestamp = DateTimeOffset.UtcNow
        }, cancellationToken: ct);
    }

    public async Task NotifyDriverLocationUpdatedAsync(Guid orderId, double latitude, double longitude, CancellationToken ct = default)
    {
        await hubContext.Clients.Group($"order_{orderId}").SendAsync("DriverLocationUpdated", new
        {
            orderId,
            lat = latitude,
            lng = longitude,
            timestamp = DateTimeOffset.UtcNow
        }, cancellationToken: ct);
    }

    public async Task NotifyNewOrderForFarmerAsync(Guid farmerId, Guid orderId, string productName, decimal qtyKg, CancellationToken ct = default)
    {
        await hubContext.Clients.All.SendAsync("NewOrderPlaced", new
        {
            farmerId,
            orderId,
            productName,
            qtyKg,
            timestamp = DateTimeOffset.UtcNow
        }, cancellationToken: ct);
    }

    public async Task NotifyDeliveryConfirmedAsync(Guid orderId, decimal farmerCut, decimal driverCut, CancellationToken ct = default)
    {
        await hubContext.Clients.Group($"order_{orderId}").SendAsync("DeliveryConfirmed", new
        {
            orderId,
            farmerCut,
            driverCut,
            timestamp = DateTimeOffset.UtcNow
        }, cancellationToken: ct);
    }
}
