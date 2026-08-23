using FarmerMarket.Domain.Enums;

namespace FarmerMarket.Domain.Entities;

public class VerificationReview
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public User? User { get; set; }

    public Guid ReviewerId { get; set; }
    public User? Reviewer { get; set; }

    public Guid? DocumentId { get; set; }
    public UserDocument? Document { get; set; }

    public string ActionTaken { get; set; } = "Approved"; // Approved, Rejected, RequestedChanges
    public string? Notes { get; set; }
    public DateTimeOffset Timestamp { get; set; } = DateTimeOffset.UtcNow;
}
