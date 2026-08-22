using Microsoft.AspNetCore.SignalR;

namespace FarmerMarket.API.Hubs;

public class OrderHub : Hub
{
    public async Task JoinOrder(string orderId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, $"order_{orderId}");
    }

    public async Task LeaveOrder(string orderId)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"order_{orderId}");
    }

    public async Task UpdateLocation(string orderId, double lat, double lng)
    {
        await Clients.Group($"order_{orderId}").SendAsync("DriverLocationUpdated", new { orderId, lat, lng });
    }
}
