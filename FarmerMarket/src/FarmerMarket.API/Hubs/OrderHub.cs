using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace FarmerMarket.API.Hubs;

[Authorize]
public class OrderHub : Hub
{
    /// <summary>Subscribe to status updates for a specific order.</summary>
    public async Task JoinOrder(string orderId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, $"order_{orderId}");
    }

    /// <summary>Unsubscribe from a specific order's updates.</summary>
    public async Task LeaveOrder(string orderId)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"order_{orderId}");
    }

    /// <summary>Subscribe to all new order notifications for a farmer.</summary>
    public async Task JoinFarmerChannel(string farmerId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, $"farmer_{farmerId}");
    }

    /// <summary>Unsubscribe from farmer channel.</summary>
    public async Task LeaveFarmerChannel(string farmerId)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"farmer_{farmerId}");
    }

    /// <summary>Driver broadcasts their GPS location to order subscribers.</summary>
    public async Task UpdateLocation(string orderId, double lat, double lng, int estimatedMinutes = 0)
    {
        await Clients.Group($"order_{orderId}").SendAsync("DriverLocationUpdate", new
        {
            orderId,
            lat,
            lng,
            estimatedMinutes
        });
    }
}
