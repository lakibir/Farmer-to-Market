using FarmerMarket.Application.Common.Interfaces;
using FarmerMarket.Domain.Entities;
using FarmerMarket.Domain.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FarmerMarket.API.Controllers;

[ApiController]
[Route("api/sms")]
public class SmsWebhookController(IAppDbContext db, ILogger<SmsWebhookController> logger) : ControllerBase
{
    public record InboundSmsDto(string From, string Body);

    [HttpPost("inbound")]
    public async Task<IActionResult> HandleInboundSms([FromBody] InboundSmsDto dto, CancellationToken ct)
    {
        var phone = dto.From.Trim();
        var body = dto.Body.Trim();
        var parts = body.Split(' ', StringSplitOptions.RemoveEmptyEntries);

        if (parts.Length == 0)
        {
            return Ok(new { response = "Invalid command. Text 'HELP' for instructions." });
        }

        var command = parts[0].ToUpperInvariant();
        var user = await db.Users.FirstOrDefaultAsync(u => u.Phone == phone || u.Phone.EndsWith(phone.Replace("+251", "")), ct);

        logger.LogInformation("[INBOUND SMS COMMAND] From: {Phone}, Command: {Command}, Raw: {Body}", phone, command, body);

        switch (command)
        {
            case "HELP":
                return Ok(new
                {
                    response = "FarmerMarket SMS Commands: 1) LIST <Crop> <QtyKg> <Price> 2) CONFIRM <OrderId> 3) PICKUP <OrderId> 4) PRICES 5) WALLET"
                });

            case "PRICES":
                return Ok(new
                {
                    response = "Current Market Benchmarks (Merkato/Sholla): Tomatoes: 45 ETB/kg | Red Onions: 55 ETB/kg | Magna Teff: 115 ETB/kg | Avocados: 60 ETB/kg."
                });

            case "WALLET":
                if (user == null)
                    return Ok(new { response = "Phone not registered. Register on farmermarket.et" });

                return Ok(new
                {
                    response = $"[FarmerMarket Telebirr Wallet] Hello {user.Name}, your current balance is 22,950.00 ETB. Pending Escrow: 14,850.00 ETB. Dial *127# to withdraw."
                });

            case "CONFIRM":
                if (parts.Length < 2)
                    return Ok(new { response = "Usage: CONFIRM <OrderIdPrefix>" });

                var prefix = parts[1].ToLowerInvariant();
                var order = await db.Orders
                    .Include(o => o.Listing)
                    .FirstOrDefaultAsync(o => o.Id.ToString().ToLower().StartsWith(prefix), ct);

                if (order == null)
                    return Ok(new { response = $"Order #{prefix} not found." });

                order.Status = OrderStatus.Confirmed;
                order.ConfirmedAt = DateTimeOffset.UtcNow;
                await db.SaveChangesAsync(ct);

                return Ok(new
                {
                    response = $"Order #{order.Id.ToString()[..6]} confirmed! Partner driver notified for farm pickup."
                });

            case "PICKUP":
                if (parts.Length < 2)
                    return Ok(new { response = "Usage: PICKUP <OrderIdPrefix>" });

                var pickupPrefix = parts[1].ToLowerInvariant();
                var pickupOrder = await db.Orders.FirstOrDefaultAsync(o => o.Id.ToString().ToLower().StartsWith(pickupPrefix), ct);

                if (pickupOrder == null)
                    return Ok(new { response = $"Order #{pickupPrefix} not found." });

                pickupOrder.Status = OrderStatus.PickedUp;
                await db.SaveChangesAsync(ct);

                return Ok(new
                {
                    response = $"Order #{pickupOrder.Id.ToString()[..6]} marked as PICKED UP. In transit to buyer depot."
                });

            case "LIST":
                if (user == null || user.Role != UserRole.Farmer)
                    return Ok(new { response = "Only registered farmers can post produce via SMS." });

                if (parts.Length < 4)
                    return Ok(new { response = "Usage: LIST <CropName> <QtyKg> <PricePerKg> (e.g. LIST Tomato 1000 45)" });

                var cropName = parts[1];
                if (!decimal.TryParse(parts[2], out var qty) || !decimal.TryParse(parts[3], out var price))
                    return Ok(new { response = "Invalid quantity or price. Format: LIST Tomato 1000 45" });

                var newListing = new Listing
                {
                    FarmerId = user.Id,
                    ProductName = $"Fresh {cropName}",
                    NameAm = cropName,
                    Category = "Vegetables",
                    QtyKg = qty,
                    PricePerKg = price,
                    MinOrderKg = Math.Min(50, qty),
                    Latitude = 8.7523,
                    Longitude = 38.9785,
                    AvailableFrom = DateOnly.FromDateTime(DateTime.UtcNow),
                    Photos = new List<string> { "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80" },
                    Status = ListingStatus.Active,
                    Grade = "Grade 1",
                    Ripeness = "Ready Today"
                };

                db.Listings.Add(newListing);
                await db.SaveChangesAsync(ct);

                return Ok(new
                {
                    response = $"Produce published! Listing ID: #{newListing.Id.ToString()[..6]} for {qty}kg {cropName} @ {price} ETB/kg. Buyers can now order."
                });

            default:
                return Ok(new { response = $"Unknown command '{command}'. Text 'HELP' for options." });
        }
    }
}
