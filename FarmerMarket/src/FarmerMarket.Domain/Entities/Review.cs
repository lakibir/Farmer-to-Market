namespace FarmerMarket.Domain.Entities;

public class Review
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid OrderId { get; set; }
    public Order Order { get; set; } = null!;

    public Guid ReviewerId { get; set; }
    public User Reviewer { get; set; } = null!;

    public Guid RevieweeId { get; set; }
    public User Reviewee { get; set; } = null!;

    public int Rating { get; set; } // 1-5
    public string? Comment { get; set; }
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
}
