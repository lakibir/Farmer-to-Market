using FarmerMarket.Domain.Enums;

namespace FarmerMarket.Domain.Entities;

public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Phone { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? NameAm { get; set; }
    public UserRole Role { get; set; } = UserRole.Farmer;
    public string Region { get; set; } = "Addis Ababa";
    public bool Verified { get; set; } = false;
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

    // Navigation properties
    public ICollection<Listing> Listings { get; set; } = new List<Listing>();
    public ICollection<Order> OrdersAsBuyer { get; set; } = new List<Order>();
    public ICollection<Order> OrdersAsDriver { get; set; } = new List<Order>();
    public ICollection<Review> ReviewsGiven { get; set; } = new List<Review>();
    public ICollection<Review> ReviewsReceived { get; set; } = new List<Review>();
    public ICollection<Notification> Notifications { get; set; } = new List<Notification>();
}
