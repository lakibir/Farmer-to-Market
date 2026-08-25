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

    // Onboarding & Multi-Channel Registration Method
    public string RegistrationMethod { get; set; } = "Self"; // Self, Agent
    public Guid? RegisteredByAgentId { get; set; }
    public User? RegisteredByAgent { get; set; }

    // Verification Status Lifecycle & Rejection Feedback
    public VerificationStatus VerificationStatus { get; set; } = VerificationStatus.Approved;
    public string? RejectionReason { get; set; }
    public string? TinNumber { get; set; }

    // Driver Vehicle & Capacity Profile
    public string? VehicleType { get; set; } = "Isuzu 5-Ton"; // Isuzu 5-Ton, Pickup 1.5-Ton, Sino 10-Ton, Bajaj
    public string? RefrigerationType { get; set; } = "Ventilated"; // Refrigerated, Ventilated, Standard
    public decimal? VehicleCapacityKg { get; set; } = 5000;

    // KYC & Identity Verification
    public string? KycDocumentType { get; set; } // National ID (Fayda), Kebele ID, Vehicle Logbook
    public string? KycDocumentNumber { get; set; }
    public string? KycStatus { get; set; } = "Verified"; // Verified, Pending, Rejected

    // Farmer & Driver Credibility Metrics
    public int? RepeatBuyerCount { get; set; } = 12;
    public int? OnTimeDeliveryRate { get; set; } = 99; // Percentage e.g. 99%
    public decimal? WalletBalanceEtb { get; set; } = 0;

    // Account Governance & Lifecycle
    public string Status { get; set; } = "active"; // active, suspended, deleted
    public string? PrimaryCrop { get; set; }
    public string? Kebele { get; set; }
    public string? FaydaId { get; set; }
    public string? BusinessLicenseNumber { get; set; }

    // Authentication
    /// <summary>BCrypt/PBKDF2 hash of the user's password. Null if OTP-only auth is used.</summary>
    public string? PasswordHash { get; set; }

    // Profile & Preferences
    public string? Email { get; set; }
    /// <summary>Preferred UI language. "en" or "am". Defaults to "am".</summary>
    public string LanguagePreference { get; set; } = "am";
    /// <summary>Saved delivery address for checkout pre-fill.</summary>
    public string? SavedDeliveryAddress { get; set; }
    public double? DefaultDeliveryLat { get; set; }
    public double? DefaultDeliveryLng { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

    // Navigation properties
    public ICollection<Listing> Listings { get; set; } = new List<Listing>();
    public ICollection<Order> OrdersAsBuyer { get; set; } = new List<Order>();
    public ICollection<Order> OrdersAsDriver { get; set; } = new List<Order>();
    public ICollection<Review> ReviewsGiven { get; set; } = new List<Review>();
    public ICollection<Review> ReviewsReceived { get; set; } = new List<Review>();
    public ICollection<Notification> Notifications { get; set; } = new List<Notification>();
    public ICollection<UserDocument> Documents { get; set; } = new List<UserDocument>();
    public ICollection<VerificationReview> VerificationReviews { get; set; } = new List<VerificationReview>();
}
