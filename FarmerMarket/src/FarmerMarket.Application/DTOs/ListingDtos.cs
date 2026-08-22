using FarmerMarket.Domain.Enums;

namespace FarmerMarket.Application.DTOs;

public record ListingDto(
    Guid Id,
    Guid FarmerId,
    string FarmerName,
    string? FarmerNameAm,
    string FarmerPhone,
    string Region,
    string ProductName,
    string? NameAm,
    string Category,
    decimal QtyKg,
    decimal PricePerKg,
    decimal MinOrderKg,
    double Latitude,
    double Longitude,
    double? DistanceKm,
    List<string> Photos,
    DateOnly AvailableFrom,
    ListingStatus Status,
    string Grade,
    string Ripeness,
    bool IsOrganic,
    bool IsAdvanceHarvest,
    DateOnly? ExpectedHarvestDate,
    string? VoiceNoteUrl,
    string? VoiceNoteTranscript,
    decimal? MarketBenchmarkPrice,
    string ModerationStatus,
    double FarmerRating,
    int ReviewCount,
    DateTimeOffset CreatedAt
);

public record CreateListingDto(
    string ProductName,
    string? NameAm,
    string Category,
    decimal QtyKg,
    decimal PricePerKg,
    decimal MinOrderKg,
    double Latitude,
    double Longitude,
    List<string>? Photos,
    DateOnly AvailableFrom,
    string? Grade = "Grade 1",
    string? Ripeness = "Ready Today",
    bool IsOrganic = true,
    bool IsAdvanceHarvest = false,
    DateOnly? ExpectedHarvestDate = null,
    string? VoiceNoteUrl = null,
    string? VoiceNoteTranscript = null,
    decimal? MarketBenchmarkPrice = null
);

public record UpdateListingDto(
    string? ProductName,
    string? NameAm,
    string? Category,
    decimal? QtyKg,
    decimal? PricePerKg,
    decimal? MinOrderKg,
    double? Latitude,
    double? Longitude,
    List<string>? Photos,
    DateOnly? AvailableFrom,
    ListingStatus? Status,
    string? Grade,
    string? Ripeness,
    bool? IsOrganic,
    bool? IsAdvanceHarvest,
    DateOnly? ExpectedHarvestDate,
    string? VoiceNoteUrl,
    string? VoiceNoteTranscript,
    decimal? MarketBenchmarkPrice,
    string? ModerationStatus
);

public record ListingFilters(
    string? Category = null,
    string? Region = null,
    decimal? MinPrice = null,
    decimal? MaxPrice = null,
    string? Search = null,
    double? Lat = null,
    double? Lng = null,
    double? MaxDistanceKm = null,
    string? Grade = null,
    string? Ripeness = null,
    bool? IsOrganic = null,
    bool? IsAdvanceHarvest = null,
    int Page = 1,
    int PageSize = 20
);

public record PriceBenchmarkDto(
    string CropName,
    string CropNameAm,
    string MarketName,
    decimal MinPriceEtb,
    decimal AvgPriceEtb,
    decimal MaxPriceEtb,
    string Trend, // "Up", "Down", "Stable"
    DateTimeOffset LastUpdated
);
