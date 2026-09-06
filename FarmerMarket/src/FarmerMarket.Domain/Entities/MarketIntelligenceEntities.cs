namespace FarmerMarket.Domain.Entities;

public class CommodityPriceIndexEntity
{
    public string CommodityId { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string NameAm { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Unit { get; set; } = "kg";
    public decimal NationalAvgPriceEtb { get; set; }
    public decimal EcxBenchmarkEtb { get; set; }
    public decimal WeeklyChangePercent { get; set; }
    public string TrendDirection { get; set; } = "Stable";
    public string VolatilityRating { get; set; } = "Moderate";
    public List<RegionalPricePointEntity> RegionalPrices { get; set; } = new();
    public List<PriceHistoryPointEntity> HistoricalPrices { get; set; } = new();
    public DateTimeOffset LastUpdated { get; set; } = DateTimeOffset.UtcNow;
}

public class RegionalPricePointEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string CommodityId { get; set; } = string.Empty;
    public string RegionName { get; set; } = string.Empty;
    public string MarketName { get; set; } = string.Empty;
    public decimal MinPriceEtb { get; set; }
    public decimal AvgPriceEtb { get; set; }
    public decimal MaxPriceEtb { get; set; }
}

public class PriceHistoryPointEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string CommodityId { get; set; } = string.Empty;
    public string DateLabel { get; set; } = string.Empty;
    public decimal PriceEtb { get; set; }
    public DateTimeOffset RecordedAt { get; set; } = DateTimeOffset.UtcNow;
}
