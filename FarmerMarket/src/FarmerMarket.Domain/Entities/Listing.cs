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

    // Quality, Grade & Organic classification
    public string? Grade { get; set; } = "Grade 1"; // Grade 1, Grade 2, Export Grade
    public string? Ripeness { get; set; } = "Ready Today"; // Ready Today, Semi-Ripe, Green / Storable
    public bool? IsOrganic { get; set; } = true;

    // Harvest Calendar & Advance Listing
    public bool? IsAdvanceHarvest { get; set; } = false;
    public DateOnly? ExpectedHarvestDate { get; set; }

    // Voice-note listing memo & speech-to-text transcript
    public string? VoiceNoteUrl { get; set; }
    public string? VoiceNoteTranscript { get; set; }

    // Regional Market Price Benchmarking (ETB/kg)
    public decimal? MarketBenchmarkPrice { get; set; }

    // Content moderation status
    public string? ModerationStatus { get; set; } = "Approved"; // Approved, PendingReview, Flagged

    // Cold-Chain Logistics & Temperature Control
    public bool RequiresColdChain { get; set; } = false;
    public decimal? TargetTempMinCelsius { get; set; }
    public decimal? TargetTempMaxCelsius { get; set; }

    // Agricultural Cooperative & Union Aggregation Hub
    public string? CooperativeName { get; set; }
    public bool? IsAggregatedLot { get; set; } = false;
    public int? AggregatedFarmerCount { get; set; } = 0;
    public string? CooperativeLotId { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

    public ICollection<Order> Orders { get; set; } = new List<Order>();
}
