namespace FarmerMarket.Domain.Entities;

/// <summary>
/// Immutable audit trail for privileged actions.
/// Records who did what to whom and when.
/// </summary>
public class AuditLog
{
    public Guid Id { get; private set; } = Guid.NewGuid();

    /// <summary>ID of the user who performed the action.</summary>
    public Guid ActorId { get; set; }

    /// <summary>Display name of the actor at the time of the action.</summary>
    public string ActorName { get; set; } = string.Empty;

    /// <summary>Role of the actor at the time of the action.</summary>
    public string ActorRole { get; set; } = string.Empty;

    /// <summary>Machine-readable action code, e.g. USER_SUSPENDED, ORDER_CANCELLED.</summary>
    public string Action { get; set; } = string.Empty;

    /// <summary>Human-readable category, e.g. AUTH, PAYMENT, USER_MANAGEMENT.</summary>
    public string Category { get; set; } = string.Empty;

    /// <summary>Type of resource targeted, e.g. User, Order, Listing.</summary>
    public string? TargetResource { get; set; }

    /// <summary>ID of the targeted resource, if applicable.</summary>
    public Guid? TargetId { get; set; }

    /// <summary>Free-text detail of what happened.</summary>
    public string Detail { get; set; } = string.Empty;

    /// <summary>Client IP address at the time of the action.</summary>
    public string? IpAddress { get; set; }

    /// <summary>UTC timestamp of the action.</summary>
    public DateTimeOffset Timestamp { get; set; } = DateTimeOffset.UtcNow;
}
