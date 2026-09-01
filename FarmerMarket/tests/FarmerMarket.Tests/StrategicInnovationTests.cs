using FarmerMarket.Application.Features.MarketIntelligence;
using FarmerMarket.Application.Features.Ussd;
using FarmerMarket.Domain.Entities;
using FarmerMarket.Domain.Enums;
using FarmerMarket.Infrastructure.Data;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace FarmerMarket.Tests;

public class StrategicInnovationTests
{
    private static AppDbContext CreateMockDb()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        var context = new AppDbContext(options);

        // Seed sample farmer
        context.Users.Add(new User
        {
            Id = Guid.NewGuid(),
            Name = "Abebe Bekele",
            Phone = "+251911223344",
            Role = UserRole.Farmer,
            Region = "Oromia",
            WalletBalanceEtb = 35000.00m
        });
        context.SaveChanges();
        return context;
    }

    [Fact]
    public async Task Ussd_WelcomeScreen_ShouldReturnContinueAndValidMenu()
    {
        using var db = CreateMockDb();
        var handler = new UssdHandlers(db);

        var request = new UssdRequest("sess-01", "+251911223344", "*804#", "*804#", "am");
        var response = await handler.Handle(new ProcessUssdCommand(request), CancellationToken.None);

        response.Action.Should().Be("CON");
        response.Message.Should().Contain("ወደ ገበያ-ለአርሶ አደር");
        response.Message.Should().Contain("1. 📈 የገበያ ዋጋ መረጃ");
    }

    [Fact]
    public async Task Ussd_CheckMarketPrices_ShouldReturnEcxRates()
    {
        using var db = CreateMockDb();
        var handler = new UssdHandlers(db);

        // Step 1: Start
        await handler.Handle(new ProcessUssdCommand(new UssdRequest("sess-02", "+251911223344", "*804#", "*804#", "en")), CancellationToken.None);

        // Step 2: Choose 1 (Market Prices)
        var response = await handler.Handle(new ProcessUssdCommand(new UssdRequest("sess-02", "+251911223344", "1", "*804#", "en")), CancellationToken.None);

        response.Action.Should().Be("CON");
        response.Message.Should().Contain("Live ECX Market Prices");
        response.Message.Should().Contain("Teff White");
    }

    [Fact]
    public async Task MarketIntelligence_GetIndices_ShouldReturnRegionalBenchmarks()
    {
        var handler = new MarketIntelligenceHandlers();

        var result = await handler.Handle(new GetCommodityPriceIndicesQuery(), CancellationToken.None);

        result.Should().NotBeEmpty();
        result.Should().Contain(x => x.CommodityId == "teff-white");
        result.First(x => x.CommodityId == "teff-white").RegionalPrices.Should().NotBeEmpty();
    }

    [Fact]
    public async Task MarketIntelligence_FairPriceAdvisor_ShouldCalculateColdChainAndVolumeRates()
    {
        var handler = new MarketIntelligenceHandlers();

        var request = new FairPriceRecommendationRequest(
            "Teff (White Magna)",
            "Grain",
            "Oromia",
            "Export Grade",
            1200,
            RequiresColdChain: true
        );

        var result = await handler.Handle(new GetFairPriceRecommendationQuery(request), CancellationToken.None);

        result.RecommendedFairPriceEtb.Should().BeGreaterThan(result.RecommendedMinEtb);
        result.RecommendedMaxEtb.Should().BeGreaterThan(result.RecommendedFairPriceEtb);
        result.ColdChainPremiumPercent.Should().Be(12);
        result.GuidanceMessageEn.Should().Contain("ETB");
    }
}
