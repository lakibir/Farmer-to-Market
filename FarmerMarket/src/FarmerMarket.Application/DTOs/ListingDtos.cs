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
    DateOnly AvailableFrom
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
    ListingStatus? Status
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
    int Page = 1,
    int PageSize = 20
);
