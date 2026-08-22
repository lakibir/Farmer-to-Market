using FarmerMarket.Domain.Enums;

namespace FarmerMarket.Application.Common.Interfaces;

public interface ISignalRNotifier
{
    Task NotifyOrderStatusChangedAsync(Guid orderId, OrderStatus status, string? message = null, CancellationToken ct = default);
    Task NotifyDriverLocationUpdatedAsync(Guid orderId, double latitude, double longitude, CancellationToken ct = default);
    Task NotifyNewOrderForFarmerAsync(Guid farmerId, Guid orderId, string productName, decimal qtyKg, CancellationToken ct = default);
    Task NotifyDeliveryConfirmedAsync(Guid orderId, decimal farmerCut, decimal driverCut, CancellationToken ct = default);
}
