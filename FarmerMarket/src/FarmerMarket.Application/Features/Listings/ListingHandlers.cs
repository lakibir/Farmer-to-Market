using FarmerMarket.Application.Common.Interfaces;
using FarmerMarket.Application.Common.Models;
using FarmerMarket.Application.DTOs;
using FarmerMarket.Domain.Entities;
using FarmerMarket.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FarmerMarket.Application.Features.Listings;

// 1. Get Listings Query (with filtering & pagination)
public record GetListingsQuery(ListingFilters Filters) : IRequest<PagedResult<ListingDto>>;

public class GetListingsHandler(IAppDbContext db) : IRequestHandler<GetListingsQuery, PagedResult<ListingDto>>
{
    public async Task<PagedResult<ListingDto>> Handle(GetListingsQuery req, CancellationToken ct)
    {
        var f = req.Filters;
        var query = db.Listings.AsNoTracking()
            .Include(l => l.Farmer)
            .Include(l => l.Farmer.ReviewsReceived)
            .Where(l => l.Status == ListingStatus.Active);

        if (!string.IsNullOrWhiteSpace(f.Category) && f.Category != "All")
            query = query.Where(l => l.Category == f.Category);

        if (!string.IsNullOrWhiteSpace(f.Region) && f.Region != "All")
            query = query.Where(l => l.Farmer.Region.Contains(f.Region));

        if (f.MinPrice.HasValue)
            query = query.Where(l => l.PricePerKg >= f.MinPrice.Value);

        if (f.MaxPrice.HasValue)
            query = query.Where(l => l.PricePerKg <= f.MaxPrice.Value);

        if (!string.IsNullOrWhiteSpace(f.Grade) && f.Grade != "All")
            query = query.Where(l => l.Grade == f.Grade);

        if (!string.IsNullOrWhiteSpace(f.Ripeness) && f.Ripeness != "All")
            query = query.Where(l => l.Ripeness == f.Ripeness);

        if (f.IsOrganic.HasValue)
            query = query.Where(l => l.IsOrganic == f.IsOrganic.Value);

        if (f.IsAdvanceHarvest.HasValue)
            query = query.Where(l => l.IsAdvanceHarvest == f.IsAdvanceHarvest.Value);

        if (f.RequiresColdChain.HasValue)
            query = query.Where(l => l.RequiresColdChain == f.RequiresColdChain.Value);

        if (f.IsAggregatedLot.HasValue)
            query = query.Where(l => l.IsAggregatedLot == f.IsAggregatedLot.Value);

        if (!string.IsNullOrWhiteSpace(f.CooperativeName) && f.CooperativeName != "All")
            query = query.Where(l => l.CooperativeName != null && l.CooperativeName.ToLower().Contains(f.CooperativeName.ToLower()));

        if (!string.IsNullOrWhiteSpace(f.Search))
        {
            var search = f.Search.ToLower();
            query = query.Where(l =>
                l.ProductName.ToLower().Contains(search) ||
                (l.NameAm != null && l.NameAm.ToLower().Contains(search)) ||
                l.Farmer.Name.ToLower().Contains(search) ||
                (l.Farmer.NameAm != null && l.Farmer.NameAm.ToLower().Contains(search)) ||
                l.Farmer.Region.ToLower().Contains(search) ||
                (l.CooperativeName != null && l.CooperativeName.ToLower().Contains(search)));
        }

        var total = await query.CountAsync(ct);

        var rawItems = await query
            .OrderByDescending(l => l.CreatedAt)
            .Skip((f.Page - 1) * f.PageSize)
            .Take(f.PageSize)
            .ToListAsync(ct);

        var items = rawItems.Select(l =>
        {
            double? distance = null;
            if (f.Lat.HasValue && f.Lng.HasValue)
            {
                distance = GeoUtils.CalculateDistanceKm(f.Lat.Value, f.Lng.Value, l.Latitude, l.Longitude);
            }

            var rating = l.Farmer.ReviewsReceived.Any()
                ? Math.Round(l.Farmer.ReviewsReceived.Average(r => r.Rating), 1)
                : 4.8;

            return new ListingDto(
                l.Id,
                l.FarmerId,
                l.Farmer.Name,
                l.Farmer.NameAm,
                l.Farmer.Phone,
                l.Farmer.Region,
                l.ProductName,
                l.NameAm,
                l.Category,
                l.QtyKg,
                l.PricePerKg,
                l.MinOrderKg,
                l.Latitude,
                l.Longitude,
                distance,
                l.Photos ?? new List<string>(),
                l.AvailableFrom,
                l.Status,
                l.Grade ?? "Grade 1",
                l.Ripeness ?? "Ready Today",
                l.IsOrganic ?? true,
                l.IsAdvanceHarvest ?? false,
                l.ExpectedHarvestDate,
                l.VoiceNoteUrl,
                l.VoiceNoteTranscript,
                l.MarketBenchmarkPrice,
                l.ModerationStatus ?? "Approved",
                l.RequiresColdChain,
                l.TargetTempMinCelsius,
                l.TargetTempMaxCelsius,
                l.CooperativeName,
                l.IsAggregatedLot ?? false,
                l.AggregatedFarmerCount ?? 0,
                l.CooperativeLotId,
                rating,
                l.Farmer.ReviewsReceived.Count,
                l.CreatedAt
            );
        }).ToList();

        if (f.MaxDistanceKm.HasValue && f.Lat.HasValue && f.Lng.HasValue)
        {
            items = items.Where(i => i.DistanceKm == null || i.DistanceKm <= f.MaxDistanceKm.Value).ToList();
        }

        return new PagedResult<ListingDto>(items, total, f.Page, f.PageSize);
    }
}

// 2. Get Listing By Id Query
public record GetListingByIdQuery(Guid Id, double? Lat = null, double? Lng = null) : IRequest<Result<ListingDto>>;

public class GetListingByIdHandler(IAppDbContext db) : IRequestHandler<GetListingByIdQuery, Result<ListingDto>>
{
    public async Task<Result<ListingDto>> Handle(GetListingByIdQuery req, CancellationToken ct)
    {
        var l = await db.Listings.AsNoTracking()
            .Include(x => x.Farmer)
            .Include(x => x.Farmer.ReviewsReceived)
            .FirstOrDefaultAsync(x => x.Id == req.Id, ct);

        if (l == null)
            return Result<ListingDto>.Failure("Listing not found.");

        double? distance = null;
        if (req.Lat.HasValue && req.Lng.HasValue)
        {
            distance = GeoUtils.CalculateDistanceKm(req.Lat.Value, req.Lng.Value, l.Latitude, l.Longitude);
        }

        var rating = l.Farmer.ReviewsReceived.Any()
            ? Math.Round(l.Farmer.ReviewsReceived.Average(r => r.Rating), 1)
            : 4.8;

        var dto = new ListingDto(
            l.Id,
            l.FarmerId,
            l.Farmer.Name,
            l.Farmer.NameAm,
            l.Farmer.Phone,
            l.Farmer.Region,
            l.ProductName,
            l.NameAm,
            l.Category,
            l.QtyKg,
            l.PricePerKg,
            l.MinOrderKg,
            l.Latitude,
            l.Longitude,
            distance,
            l.Photos ?? new List<string>(),
            l.AvailableFrom,
            l.Status,
            l.Grade ?? "Grade 1",
            l.Ripeness ?? "Ready Today",
            l.IsOrganic ?? true,
            l.IsAdvanceHarvest ?? false,
            l.ExpectedHarvestDate,
            l.VoiceNoteUrl,
            l.VoiceNoteTranscript,
            l.MarketBenchmarkPrice,
            l.ModerationStatus ?? "Approved",
            l.RequiresColdChain,
            l.TargetTempMinCelsius,
            l.TargetTempMaxCelsius,
            l.CooperativeName,
            l.IsAggregatedLot ?? false,
            l.AggregatedFarmerCount ?? 0,
            l.CooperativeLotId,
            rating,
            l.Farmer.ReviewsReceived.Count,
            l.CreatedAt
        );

        return Result<ListingDto>.Success(dto);
    }
}

// 3. Get Nearby Listings Query
public record GetNearbyListingsQuery(double Lat, double Lng, double RadiusKm = 30) : IRequest<List<ListingDto>>;

public class GetNearbyListingsHandler(IAppDbContext db) : IRequestHandler<GetNearbyListingsQuery, List<ListingDto>>
{
    public async Task<List<ListingDto>> Handle(GetNearbyListingsQuery req, CancellationToken ct)
    {
        var list = await db.Listings.AsNoTracking()
            .Include(l => l.Farmer)
            .Include(l => l.Farmer.ReviewsReceived)
            .Where(l => l.Status == ListingStatus.Active)
            .ToListAsync(ct);

        return list.Select(l =>
        {
            var distance = GeoUtils.CalculateDistanceKm(req.Lat, req.Lng, l.Latitude, l.Longitude);
            var rating = l.Farmer.ReviewsReceived.Any()
                ? Math.Round(l.Farmer.ReviewsReceived.Average(r => r.Rating), 1)
                : 4.8;

            return new ListingDto(
                l.Id,
                l.FarmerId,
                l.Farmer.Name,
                l.Farmer.NameAm,
                l.Farmer.Phone,
                l.Farmer.Region,
                l.ProductName,
                l.NameAm,
                l.Category,
                l.QtyKg,
                l.PricePerKg,
                l.MinOrderKg,
                l.Latitude,
                l.Longitude,
                distance,
                l.Photos ?? new List<string>(),
                l.AvailableFrom,
                l.Status,
                l.Grade ?? "Grade 1",
                l.Ripeness ?? "Ready Today",
                l.IsOrganic ?? true,
                l.IsAdvanceHarvest ?? false,
                l.ExpectedHarvestDate,
                l.VoiceNoteUrl,
                l.VoiceNoteTranscript,
                l.MarketBenchmarkPrice,
                l.ModerationStatus ?? "Approved",
                l.RequiresColdChain,
                l.TargetTempMinCelsius,
                l.TargetTempMaxCelsius,
                l.CooperativeName,
                l.IsAggregatedLot ?? false,
                l.AggregatedFarmerCount ?? 0,
                l.CooperativeLotId,
                rating,
                l.Farmer.ReviewsReceived.Count,
                l.CreatedAt
            );
        })
        .Where(x => x.DistanceKm <= req.RadiusKm)
        .OrderBy(x => x.DistanceKm)
        .ToList();
    }
}

// 4. Create Listing Command
public record CreateListingCommand(Guid FarmerId, CreateListingDto Dto) : IRequest<Result<ListingDto>>;

public class CreateListingHandler(IAppDbContext db) : IRequestHandler<CreateListingCommand, Result<ListingDto>>
{
    public async Task<Result<ListingDto>> Handle(CreateListingCommand req, CancellationToken ct)
    {
        var farmer = await db.Users.FirstOrDefaultAsync(u => u.Id == req.FarmerId, ct);
        if (farmer == null)
            return Result<ListingDto>.Failure("Farmer profile not found.");

        var d = req.Dto;
        var listing = new Listing
        {
            FarmerId = req.FarmerId,
            ProductName = d.ProductName,
            NameAm = d.NameAm,
            Category = d.Category,
            QtyKg = d.QtyKg,
            PricePerKg = d.PricePerKg,
            MinOrderKg = d.MinOrderKg,
            Latitude = d.Latitude,
            Longitude = d.Longitude,
            Photos = d.Photos ?? new List<string>(),
            AvailableFrom = d.AvailableFrom,
            Status = ListingStatus.Active,
            Grade = d.Grade ?? "Grade 1",
            Ripeness = d.Ripeness ?? "Ready Today",
            IsOrganic = d.IsOrganic,
            IsAdvanceHarvest = d.IsAdvanceHarvest,
            ExpectedHarvestDate = d.ExpectedHarvestDate,
            VoiceNoteUrl = d.VoiceNoteUrl,
            VoiceNoteTranscript = d.VoiceNoteTranscript,
            MarketBenchmarkPrice = d.MarketBenchmarkPrice,
            ModerationStatus = "Approved",
            RequiresColdChain = d.RequiresColdChain,
            TargetTempMinCelsius = d.TargetTempMinCelsius,
            TargetTempMaxCelsius = d.TargetTempMaxCelsius,
            CooperativeName = d.CooperativeName ?? farmer.CooperativeName,
            IsAggregatedLot = d.IsAggregatedLot,
            AggregatedFarmerCount = d.AggregatedFarmerCount,
            CooperativeLotId = d.CooperativeLotId
        };

        db.Listings.Add(listing);
        await db.SaveChangesAsync(ct);

        var dto = new ListingDto(
            listing.Id,
            listing.FarmerId,
            farmer.Name,
            farmer.NameAm,
            farmer.Phone,
            farmer.Region,
            listing.ProductName,
            listing.NameAm,
            listing.Category,
            listing.QtyKg,
            listing.PricePerKg,
            listing.MinOrderKg,
            listing.Latitude,
            listing.Longitude,
            null,
            listing.Photos,
            listing.AvailableFrom,
            listing.Status,
            listing.Grade ?? "Grade 1",
            listing.Ripeness ?? "Ready Today",
            listing.IsOrganic ?? true,
            listing.IsAdvanceHarvest ?? false,
            listing.ExpectedHarvestDate,
            listing.VoiceNoteUrl,
            listing.VoiceNoteTranscript,
            listing.MarketBenchmarkPrice,
            listing.ModerationStatus ?? "Approved",
            listing.RequiresColdChain,
            listing.TargetTempMinCelsius,
            listing.TargetTempMaxCelsius,
            listing.CooperativeName,
            listing.IsAggregatedLot ?? false,
            listing.AggregatedFarmerCount ?? 0,
            listing.CooperativeLotId,
            5.0,
            0,
            listing.CreatedAt
        );

        return Result<ListingDto>.Success(dto);
    }
}

// 5. Update Listing Command
public record UpdateListingCommand(Guid ListingId, Guid FarmerId, UpdateListingDto Dto, bool IsAdmin = false) : IRequest<Result<ListingDto>>;

public class UpdateListingHandler(IAppDbContext db) : IRequestHandler<UpdateListingCommand, Result<ListingDto>>
{
    public async Task<Result<ListingDto>> Handle(UpdateListingCommand req, CancellationToken ct)
    {
        var listing = await db.Listings
            .Include(l => l.Farmer)
            .Include(l => l.Farmer.ReviewsReceived)
            .FirstOrDefaultAsync(l => l.Id == req.ListingId, ct);

        if (listing == null)
            return Result<ListingDto>.Failure("Listing not found.");

        if (!req.IsAdmin && listing.FarmerId != req.FarmerId)
            return Result<ListingDto>.Failure("Unauthorized to modify this listing.");

        var d = req.Dto;
        if (!string.IsNullOrWhiteSpace(d.ProductName)) listing.ProductName = d.ProductName;
        if (d.NameAm != null) listing.NameAm = d.NameAm;
        if (!string.IsNullOrWhiteSpace(d.Category)) listing.Category = d.Category;
        if (d.QtyKg.HasValue) listing.QtyKg = d.QtyKg.Value;
        if (d.PricePerKg.HasValue) listing.PricePerKg = d.PricePerKg.Value;
        if (d.MinOrderKg.HasValue) listing.MinOrderKg = d.MinOrderKg.Value;
        if (d.Latitude.HasValue) listing.Latitude = d.Latitude.Value;
        if (d.Longitude.HasValue) listing.Longitude = d.Longitude.Value;
        if (d.Photos != null) listing.Photos = d.Photos;
        if (d.AvailableFrom.HasValue) listing.AvailableFrom = d.AvailableFrom.Value;
        if (d.Status.HasValue) listing.Status = d.Status.Value;
        if (d.Grade != null) listing.Grade = d.Grade;
        if (d.Ripeness != null) listing.Ripeness = d.Ripeness;
        if (d.IsOrganic.HasValue) listing.IsOrganic = d.IsOrganic.Value;
        if (d.IsAdvanceHarvest.HasValue) listing.IsAdvanceHarvest = d.IsAdvanceHarvest.Value;
        if (d.ExpectedHarvestDate.HasValue) listing.ExpectedHarvestDate = d.ExpectedHarvestDate.Value;
        if (d.VoiceNoteUrl != null) listing.VoiceNoteUrl = d.VoiceNoteUrl;
        if (d.VoiceNoteTranscript != null) listing.VoiceNoteTranscript = d.VoiceNoteTranscript;
        if (d.MarketBenchmarkPrice.HasValue) listing.MarketBenchmarkPrice = d.MarketBenchmarkPrice.Value;
        if (d.ModerationStatus != null) listing.ModerationStatus = d.ModerationStatus;
        if (d.RequiresColdChain.HasValue) listing.RequiresColdChain = d.RequiresColdChain.Value;
        if (d.TargetTempMinCelsius.HasValue) listing.TargetTempMinCelsius = d.TargetTempMinCelsius.Value;
        if (d.TargetTempMaxCelsius.HasValue) listing.TargetTempMaxCelsius = d.TargetTempMaxCelsius.Value;
        if (d.CooperativeName != null) listing.CooperativeName = d.CooperativeName;
        if (d.IsAggregatedLot.HasValue) listing.IsAggregatedLot = d.IsAggregatedLot.Value;
        if (d.AggregatedFarmerCount.HasValue) listing.AggregatedFarmerCount = d.AggregatedFarmerCount.Value;
        if (d.CooperativeLotId != null) listing.CooperativeLotId = d.CooperativeLotId;

        await db.SaveChangesAsync(ct);

        var rating = listing.Farmer.ReviewsReceived.Any()
            ? Math.Round(listing.Farmer.ReviewsReceived.Average(r => r.Rating), 1)
            : 4.8;

        var dto = new ListingDto(
            listing.Id,
            listing.FarmerId,
            listing.Farmer.Name,
            listing.Farmer.NameAm,
            listing.Farmer.Phone,
            listing.Farmer.Region,
            listing.ProductName,
            listing.NameAm,
            listing.Category,
            listing.QtyKg,
            listing.PricePerKg,
            listing.MinOrderKg,
            listing.Latitude,
            listing.Longitude,
            null,
            listing.Photos,
            listing.AvailableFrom,
            listing.Status,
            listing.Grade ?? "Grade 1",
            listing.Ripeness ?? "Ready Today",
            listing.IsOrganic ?? true,
            listing.IsAdvanceHarvest ?? false,
            listing.ExpectedHarvestDate,
            listing.VoiceNoteUrl,
            listing.VoiceNoteTranscript,
            listing.MarketBenchmarkPrice,
            listing.ModerationStatus ?? "Approved",
            listing.RequiresColdChain,
            listing.TargetTempMinCelsius,
            listing.TargetTempMaxCelsius,
            listing.CooperativeName,
            listing.IsAggregatedLot ?? false,
            listing.AggregatedFarmerCount ?? 0,
            listing.CooperativeLotId,
            rating,
            listing.Farmer.ReviewsReceived.Count,
            listing.CreatedAt
        );

        return Result<ListingDto>.Success(dto);
    }
}

// 6. Deactivate Listing Command
public record DeactivateListingCommand(Guid ListingId, Guid FarmerId, bool IsAdmin = false) : IRequest<Result>;

public class DeactivateListingHandler(IAppDbContext db) : IRequestHandler<DeactivateListingCommand, Result>
{
    public async Task<Result> Handle(DeactivateListingCommand req, CancellationToken ct)
    {
        var listing = await db.Listings.FirstOrDefaultAsync(l => l.Id == req.ListingId, ct);
        if (listing == null)
            return Result.Failure("Listing not found.");

        if (!req.IsAdmin && listing.FarmerId != req.FarmerId)
            return Result.Failure("Unauthorized to modify this listing.");

        listing.Status = ListingStatus.Inactive;
        await db.SaveChangesAsync(ct);

        return Result.Success();
    }
}

// Helper utility for distance calculations
public static class GeoUtils
{
    public static double CalculateDistanceKm(double lat1, double lon1, double lat2, double lon2)
    {
        var r = 6371; // Earth radius in km
        var dLat = ToRad(lat2 - lat1);
        var dLon = ToRad(lon2 - lon1);
        var a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                Math.Cos(ToRad(lat1)) * Math.Cos(ToRad(lat2)) *
                Math.Sin(dLon / 2) * Math.Sin(dLon / 2);
        var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
        return Math.Round(r * c, 1);
    }

    private static double ToRad(double degrees) => degrees * Math.PI / 180;
}
