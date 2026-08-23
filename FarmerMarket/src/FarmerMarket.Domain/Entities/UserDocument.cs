using FarmerMarket.Domain.Enums;

namespace FarmerMarket.Domain.Entities;

public class UserDocument
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public User? User { get; set; }

    public DocumentType DocumentType { get; set; } = DocumentType.FaydaId;
    public string DocumentNumber { get; set; } = string.Empty;
    public string? FrontImageUrl { get; set; }
    public string? BackImageUrl { get; set; }
    public string? FileUrl { get; set; }

    public VerificationStatus Status { get; set; } = VerificationStatus.PendingSubmission;
    public string? RejectionReason { get; set; }

    public DateTimeOffset SubmittedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? ReviewedAt { get; set; }
}
