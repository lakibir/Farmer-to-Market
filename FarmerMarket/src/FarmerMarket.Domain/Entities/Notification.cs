namespace FarmerMarket.Domain.Entities;

public class Notification
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid UserId { get; set; }
    public User User { get; set; } = null!;

    public string Type { get; set; } = string.Empty; // new_order, order_confirmed, driver_assigned, picked_up, delivered, payment_released, dispute_raised
    public string Channel { get; set; } = "push"; // push / sms
    public string MessageEn { get; set; } = string.Empty;
    public string MessageAm { get; set; } = string.Empty;
    public bool Read { get; set; } = false;
    public DateTimeOffset SentAt { get; set; } = DateTimeOffset.UtcNow;
}
