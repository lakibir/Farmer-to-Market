using FarmerMarket.Domain.Enums;

namespace FarmerMarket.Domain.Entities;

public class Listing
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid FarmerId { get; set; }
    public User Farmer { get; set; } = null!;

    public string ProductName { get; set; } = string.Empty;
    public string? NameAm { get; set; }
    public string Category { get; set; } = "Vegetable"; // Vegetable, Fruit, Grain, Coffee, Spice, Tubers
    public decimal QtyKg { get; set; }
    public decimal PricePerKg { get; set; }
    public decimal MinOrderKg { get; set; } = 10;
    
    // Geolocation coordinates
    public double Latitude { get; set; } = 9.0300;
    public double Longitude { get; set; } = 38.7400;

    public List<string> Photos { get; set; } = new();
    public DateOnly AvailableFrom { get; set; } = DateOnly.FromDateTime(DateTime.UtcNow);
    public ListingStatus Status { get; set; } = ListingStatus.Active;
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

    public ICollection<Order> Orders { get; set; } = new List<Order>();
}
