using FarmerMarket.Application.Common.Interfaces;
using FarmerMarket.Domain.Enums;
using Microsoft.Extensions.Logging;

namespace FarmerMarket.Infrastructure.Services;

public class FallbackSignalRNotifier(ILogger<FallbackSignalRNotifier> logger) : ISignalRNotifier
{
    public Task NotifyOrderStatusChangedAsync(Guid orderId, OrderStatus status, string? message = null, CancellationToken ct = default)
    {
        logger.LogInformation("[SignalR Event: OrderStatusChanged] Order: {OrderId}, Status: {Status}, Msg: {Message}", orderId, status, message);
        return Task.CompletedTask;
    }

    public Task NotifyDriverLocationUpdatedAsync(Guid orderId, double latitude, double longitude, CancellationToken ct = default)
    {
        logger.LogInformation("[SignalR Event: DriverLocationUpdated] Order: {OrderId}, Lat: {Lat}, Lng: {Lng}", orderId, latitude, longitude);
        return Task.CompletedTask;
    }

    public Task NotifyNewOrderForFarmerAsync(Guid farmerId, Guid orderId, string productName, decimal qtyKg, CancellationToken ct = default)
    {
        logger.LogInformation("[SignalR Event: NewOrder] Farmer: {FarmerId}, Order: {OrderId}, Product: {Product}, Qty: {Qty}kg", farmerId, orderId, productName, qtyKg);
        return Task.CompletedTask;
    }

    public Task NotifyDeliveryConfirmedAsync(Guid orderId, decimal farmerCut, decimal driverCut, CancellationToken ct = default)
    {
        logger.LogInformation("[SignalR Event: DeliveryConfirmed] Order: {OrderId}, Farmer: {Farmer} ETB, Driver: {Driver} ETB", orderId, farmerCut, driverCut);
        return Task.CompletedTask;
    }
}
