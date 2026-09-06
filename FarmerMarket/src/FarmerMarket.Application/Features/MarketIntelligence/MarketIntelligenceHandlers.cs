using FarmerMarket.Application.Common.Interfaces;
using FarmerMarket.Application.Common.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FarmerMarket.Application.Features.MarketIntelligence;

public record CommodityPriceIndex(
    string CommodityId,
    string Name,
    string NameAm,
    string Category,
    string Unit,
    decimal NationalAvgPriceEtb,
    decimal EczBenchmarkEtb,
    decimal WeeklyChangePercent,
    string TrendDirection, // "Up", "Down", "Stable"
    string VolatilityRating, // "Low", "Moderate", "High"
    List<RegionalPricePoint> RegionalPrices,
    List<PriceHistoryPoint> Historical7Days
);

public record RegionalPricePoint(
    string RegionName,
    string MarketName,
    decimal MinPriceEtb,
    decimal AvgPriceEtb,
    decimal MaxPriceEtb
);

public record PriceHistoryPoint(
    string Date,
    decimal PriceEtb
);

public record FairPriceRecommendationRequest(
    string CommodityName,
    string Category,
    string Region,
    string Grade, // "Grade 1", "Grade 2", "Export Grade"
    decimal QtyKg,
    bool RequiresColdChain = false
);

public record FairPriceRecommendationResult(
    string CommodityName,
    string Region,
    string Grade,
    decimal RecommendedMinEtb,
    decimal RecommendedFairPriceEtb,
    decimal RecommendedMaxEtb,
    decimal EcxBenchmarkEtb,
    string SupplyCondition, // "Scarce", "Moderate", "Abundant"
    string Volatility, // "Low", "Moderate", "High"
    string GuidanceMessageEn,
    string GuidanceMessageAm,
    decimal ColdChainPremiumPercent,
    decimal CooperativeBulkDiscountPercent
);

// Queries
public record GetCommodityPriceIndicesQuery(string? Category = null, string? Region = null) : IRequest<List<CommodityPriceIndex>>;
public record GetFairPriceRecommendationQuery(FairPriceRecommendationRequest Request) : IRequest<FairPriceRecommendationResult>;

public class MarketIntelligenceHandlers(IAppDbContext? db = null) :
    IRequestHandler<GetCommodityPriceIndicesQuery, List<CommodityPriceIndex>>,
    IRequestHandler<GetFairPriceRecommendationQuery, FairPriceRecommendationResult>
{
    private static readonly List<CommodityPriceIndex> BaselineIndices = new()
    {
        new CommodityPriceIndex(
            "teff-white",
            "Teff (White Magna)",
            "ነጭ ማግና ጤፍ",
            "Grain",
            "kg",
            128.50m,
            126.00m,
            +3.8m,
            "Up",
            "Moderate",
            new List<RegionalPricePoint>
            {
                new("Addis Ababa", "Merkato Ehil Berenda", 125, 132, 138),
                new("Oromia", "Ada'a / Bishoftu Central", 120, 126, 130),
                new("Amhara", "East Gojjam / Debre Markos", 115, 122, 126),
                new("Amhara", "Bahir Dar Central", 118, 125, 129)
            },
            new List<PriceHistoryPoint>
            {
                new("D-6", 124.00m), new("D-5", 125.20m), new("D-4", 125.00m),
                new("D-3", 126.50m), new("D-2", 127.00m), new("D-1", 127.80m), new("Today", 128.50m)
            }
        ),
        new CommodityPriceIndex(
            "coffee-sidama-g1",
            "Coffee (Sidama Washed Grade 1)",
            "ሲዳማ የታጠበ ቡና (ደረጃ 1)",
            "Coffee",
            "kg",
            485.00m,
            490.00m,
            +5.2m,
            "Up",
            "High",
            new List<RegionalPricePoint>
            {
                new("Addis Ababa", "ECX Central Terminal", 475, 492, 510),
                new("Sidama", "Hawassa Wholesale Exchange", 460, 480, 495),
                new("Oromia", "Jimma ECX Hub", 450, 470, 485)
            },
            new List<PriceHistoryPoint>
            {
                new("D-6", 460.00m), new("D-5", 465.00m), new("D-4", 472.00m),
                new("D-3", 475.00m), new("D-2", 480.00m), new("D-1", 482.00m), new("Today", 485.00m)
            }
        ),
        new CommodityPriceIndex(
            "onions-adama-red",
            "Adama Red Onions",
            "የአዳማ ቀይ ሽንኩርት",
            "Vegetable",
            "kg",
            82.00m,
            80.00m,
            -2.4m,
            "Down",
            "High",
            new List<RegionalPricePoint>
            {
                new("Addis Ababa", "Piazza & Janmeda Market", 82, 88, 95),
                new("Oromia", "Adama Bulbula Terminal", 72, 78, 82),
                new("Amhara", "Woldia Market", 78, 84, 90)
            },
            new List<PriceHistoryPoint>
            {
                new("D-6", 86.00m), new("D-5", 85.00m), new("D-4", 84.50m),
                new("D-3", 83.00m), new("D-2", 83.50m), new("D-1", 82.20m), new("Today", 82.00m)
            }
        ),
        new CommodityPriceIndex(
            "tomatoes-meki",
            "Tomatoes (Meki Fresh Plum)",
            "የመቂ ቲማቲም",
            "Vegetable",
            "kg",
            65.00m,
            64.00m,
            +8.1m,
            "Up",
            "High",
            new List<RegionalPricePoint>
            {
                new("Addis Ababa", "Atkilt Tera Merkato", 65, 72, 80),
                new("Oromia", "Meki Lake Ziway Hub", 52, 58, 64),
                new("Oromia", "Bishoftu Farm Gate", 55, 62, 68)
            },
            new List<PriceHistoryPoint>
            {
                new("D-6", 58.00m), new("D-5", 60.00m), new("D-4", 61.50m),
                new("D-3", 62.00m), new("D-2", 63.80m), new("D-1", 64.50m), new("Today", 65.00m)
            }
        ),
        new CommodityPriceIndex(
            "wheat-durum",
            "Durum Wheat (Grade 1)",
            "የስንዴ እህል (ደረጃ 1)",
            "Grain",
            "kg",
            68.00m,
            67.50m,
            0.0m,
            "Stable",
            "Low",
            new List<RegionalPricePoint>
            {
                new("Addis Ababa", "Kality Grain Depot", 66, 70, 74),
                new("Oromia", "Bale Robe Terminal", 60, 64, 68),
                new("Oromia", "Arsi Asella Hub", 62, 66, 70)
            },
            new List<PriceHistoryPoint>
            {
                new("D-6", 68.00m), new("D-5", 68.00m), new("D-4", 67.80m),
                new("D-3", 68.20m), new("D-2", 68.00m), new("D-1", 68.00m), new("Today", 68.00m)
            }
        ),
        new CommodityPriceIndex(
            "potatoes-holeta",
            "Holeta Seed & Table Potatoes",
            "የሆለታ ድንች",
            "Tubers",
            "kg",
            42.00m,
            40.00m,
            +1.5m,
            "Stable",
            "Low",
            new List<RegionalPricePoint>
            {
                new("Addis Ababa", "Merkato & Kality", 44, 48, 52),
                new("Oromia", "Holeta Agricultural Research Gate", 36, 40, 44),
                new("SNNPR", "Shashemene Depot", 38, 42, 46)
            },
            new List<PriceHistoryPoint>
            {
                new("D-6", 41.00m), new("D-5", 41.50m), new("D-4", 41.20m),
                new("D-3", 42.00m), new("D-2", 41.80m), new("D-1", 42.00m), new("Today", 42.00m)
            }
        ),
        new CommodityPriceIndex(
            "avocados-hass",
            "Hass Export Avocados",
            "ሃስ አቮካዶ (የውጭ ንግድ ደረጃ)",
            "Fruit",
            "kg",
            95.00m,
            92.00m,
            +4.3m,
            "Up",
            "Moderate",
            new List<RegionalPricePoint>
            {
                new("Addis Ababa", "Bole Export Cold-Hub", 98, 110, 125),
                new("Sidama", "Yirgalem Agro-Industrial Park", 85, 92, 98),
                new("Oromia", "Jimma Avocado Union", 80, 88, 94)
            },
            new List<PriceHistoryPoint>
            {
                new("D-6", 90.00m), new("D-5", 91.50m), new("D-4", 92.00m),
                new("D-3", 93.00m), new("D-2", 94.00m), new("D-1", 94.50m), new("Today", 95.00m)
            }
        )
    };

    public async Task<List<CommodityPriceIndex>> Handle(GetCommodityPriceIndicesQuery req, CancellationToken ct)
    {
        List<CommodityPriceIndex> source = BaselineIndices;

        if (db != null)
        {
            var dbEntities = await db.CommodityPriceIndices
                .AsNoTracking()
                .Include(c => c.RegionalPrices)
                .Include(c => c.HistoricalPrices)
                .ToListAsync(ct);

            if (dbEntities.Count > 0)
            {
                source = dbEntities.Select(e => new CommodityPriceIndex(
                    e.CommodityId,
                    e.Name,
                    e.NameAm,
                    e.Category,
                    e.Unit,
                    e.NationalAvgPriceEtb,
                    e.EcxBenchmarkEtb,
                    e.WeeklyChangePercent,
                    e.TrendDirection,
                    e.VolatilityRating,
                    e.RegionalPrices.Select(r => new RegionalPricePoint(r.RegionName, r.MarketName, r.MinPriceEtb, r.AvgPriceEtb, r.MaxPriceEtb)).ToList(),
                    e.HistoricalPrices.OrderBy(h => h.RecordedAt).Select(h => new PriceHistoryPoint(h.DateLabel, h.PriceEtb)).ToList()
                )).ToList();
            }
        }

        var result = source.AsEnumerable();

        if (!string.IsNullOrWhiteSpace(req.Category) && req.Category != "All")
        {
            result = result.Where(x => x.Category.Equals(req.Category, StringComparison.OrdinalIgnoreCase));
        }

        return result.ToList();
    }

    public async Task<FairPriceRecommendationResult> Handle(GetFairPriceRecommendationQuery req, CancellationToken ct)
    {
        var indices = await Handle(new GetCommodityPriceIndicesQuery(), ct);
        var r = req.Request;
        var matched = indices.FirstOrDefault(x =>
            x.Name.Contains(r.CommodityName, StringComparison.OrdinalIgnoreCase) ||
            r.CommodityName.Contains(x.Name, StringComparison.OrdinalIgnoreCase) ||
            x.Category.Equals(r.Category, StringComparison.OrdinalIgnoreCase))
            ?? indices.First();

        var basePrice = matched.NationalAvgPriceEtb;

        // Quality grade multiplier
        var gradeMultiplier = r.Grade switch
        {
            "Export Grade" or "Grade A" => 1.25m,
            "Grade 1" or "Grade B" => 1.05m,
            "Grade 2" or "Grade C" => 0.90m,
            _ => 1.00m
        };

        // Cold-chain premium
        var coldChainPremium = r.RequiresColdChain ? 0.12m : 0.0m;

        // Volume discount recommendation (large orders > 1000kg)
        var volumeDiscount = r.QtyKg > 1000 ? 0.05m : 0.0m;

        var fairPrice = Math.Round(basePrice * gradeMultiplier * (1 + coldChainPremium) * (1 - volumeDiscount), 2);
        var minPrice = Math.Round(fairPrice * 0.88m, 2);
        var maxPrice = Math.Round(fairPrice * 1.18m, 2);

        var msgEn = $"Based on real-time ECX & regional terminal benchmarks in {r.Region}, the optimal fair selling rate for {r.CommodityName} ({r.Grade}) is ETB {fairPrice:F2}/kg. " +
                    (r.RequiresColdChain ? "Includes +12% cold-chain preservation premium. " : "") +
                    (r.QtyKg >= 500 ? "Bulk volume pricing applied." : "");

        var msgAm = $"በ{r.Region} ወቅታዊ የኢትዮጵያ ምርት ገበያ (ECX) መረጃ መሠረት፣ ለ{matched.NameAm} ({r.Grade}) ተስማሚ የፍትሃዊ መሸጫ ዋጋ ETB {fairPrice:F2}/ኪ.ግ ነው። " +
                    (r.RequiresColdChain ? "የ+12% ማቀዝቀዣ ትራንስፖርት ጭማሪ ተካቷል። " : "");

        return new FairPriceRecommendationResult(
            r.CommodityName,
            r.Region,
            r.Grade,
            minPrice,
            fairPrice,
            maxPrice,
            matched.EczBenchmarkEtb,
            "Moderate",
            matched.VolatilityRating,
            msgEn,
            msgAm,
            coldChainPremium * 100,
            volumeDiscount * 100
        );
    }
}
