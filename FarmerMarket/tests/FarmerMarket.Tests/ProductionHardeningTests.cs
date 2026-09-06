using System.ComponentModel.DataAnnotations;
using FarmerMarket.API.Controllers;
using FarmerMarket.Application.Common.Models;
using FarmerMarket.Domain.Entities;
using FarmerMarket.Domain.Enums;
using FarmerMarket.Infrastructure;
using FarmerMarket.Infrastructure.Data;
using FarmerMarket.Infrastructure.Options;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using Xunit;

namespace FarmerMarket.Tests;

public class ProductionHardeningTests
{
    // ── 1. Escrow Split & Business Option Validation ─────────────────────────────

    [Fact]
    public void EscrowOptions_Should_Pass_When_Percentages_Sum_To_100()
    {
        var options = new EscrowOptions
        {
            FarmerPercent = 90m,
            DriverPercent = 5m,
            PlatformPercent = 5m,
            MinOrderKg = 10m,
            MaxOrderKg = 50000m
        };

        var context = new ValidationContext(options);
        var results = new List<ValidationResult>();
        var isValid = Validator.TryValidateObject(options, context, results, validateAllProperties: true);

        Assert.True(isValid);
        Assert.Empty(results);
    }

    [Theory]
    [InlineData(80, 10, 5)]  // 95 != 100
    [InlineData(95, 5, 5)]   // 105 != 100
    [InlineData(0, 0, 0)]    // 0 != 100
    public void EscrowOptions_Should_Fail_When_Percentages_Do_Not_Sum_To_100(decimal farmer, decimal driver, decimal platform)
    {
        var options = new EscrowOptions
        {
            FarmerPercent = farmer,
            DriverPercent = driver,
            PlatformPercent = platform
        };

        var context = new ValidationContext(options);
        var results = options.Validate(context).ToList();

        Assert.NotEmpty(results);
        Assert.Contains(results, r => r.ErrorMessage!.Contains("must sum to exactly 100"));
    }

    [Fact]
    public void EscrowOptions_Should_Fail_When_MinOrder_Exceeds_MaxOrder()
    {
        var options = new EscrowOptions
        {
            FarmerPercent = 90m,
            DriverPercent = 5m,
            PlatformPercent = 5m,
            MinOrderKg = 5000m,
            MaxOrderKg = 100m
        };

        var context = new ValidationContext(options);
        var results = options.Validate(context).ToList();

        Assert.NotEmpty(results);
        Assert.Contains(results, r => r.ErrorMessage!.Contains("cannot be greater than MaxOrderKg"));
    }

    // ── 2. JWT Options Security Validation ───────────────────────────────────────

    [Fact]
    public void JwtOptions_Should_Fail_When_Key_Is_Shorter_Than_32_Chars()
    {
        var options = new JwtOptions
        {
            Key = "too_short_key_123",
            Issuer = "FarmerMarket.API",
            Audience = "FarmerMarket.Client"
        };

        var context = new ValidationContext(options);
        var results = new List<ValidationResult>();
        var isValid = Validator.TryValidateObject(options, context, results, validateAllProperties: true);

        Assert.False(isValid);
        Assert.Contains(results, r => r.ErrorMessage!.Contains("at least 32 characters"));
    }

    [Fact]
    public void JwtOptions_Should_Pass_When_Key_Is_Strong()
    {
        var options = new JwtOptions
        {
            Key = "FarmerMarket_Production_Secret_Key_AtLeast64Chars_SuperSecure2026!",
            Issuer = "FarmerMarket.API",
            Audience = "FarmerMarket.Client"
        };

        var context = new ValidationContext(options);
        var results = new List<ValidationResult>();
        var isValid = Validator.TryValidateObject(options, context, results, validateAllProperties: true);

        Assert.True(isValid);
        Assert.Empty(results);
    }

    // ── 3. Production Database Guard (No In-Memory in Production) ────────────────

    [Fact]
    public void DependencyInjection_Should_Throw_When_Connection_Is_Missing_In_Production()
    {
        var configBuilder = new ConfigurationBuilder();
        configBuilder.AddInMemoryCollection(new Dictionary<string, string?>
        {
            ["ASPNETCORE_ENVIRONMENT"] = "Production",
            ["Jwt:Key"] = "FarmerMarket_Production_Secret_Key_AtLeast64Chars_SuperSecure2026!",
            ["Escrow:FarmerPercent"] = "90",
            ["Escrow:DriverPercent"] = "5",
            ["Escrow:PlatformPercent"] = "5"
        });
        var config = configBuilder.Build();

        var services = new ServiceCollection();

        var ex = Assert.Throws<InvalidOperationException>(() =>
        {
            services.AddInfrastructureServices(config);
        });

        Assert.Contains("Production database connection string", ex.Message);
        Assert.Contains("strictly prohibited", ex.Message);
    }

    // ── 4. Seed Data Safety Guard ───────────────────────────────────────────────

    [Fact]
    public async Task DbInitializer_Should_Only_Seed_Admin_When_SeedDemoData_Is_False()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        using var db = new AppDbContext(options);

        // Run with isDevelopment = false, seedDemoData = false
        await DbInitializer.SeedAsync(db, NullLogger.Instance, isDevelopment: false, seedDemoData: false);

        var totalUsers = await db.Users.CountAsync();
        var totalListings = await db.Listings.CountAsync();
        var totalOrders = await db.Orders.CountAsync();

        // Only bootstrap admin should be created, no mock personas or listings
        Assert.Equal(1, totalUsers);
        Assert.Equal(0, totalListings);
        Assert.Equal(0, totalOrders);

        var admin = await db.Users.FirstAsync();
        Assert.Equal(UserRole.SuperAdmin, admin.Role);
    }

    // ── 5. Exact Financial Precision Math ───────────────────────────────────────

    [Fact]
    public void Escrow_Financial_Math_Should_Calculate_Exact_Shares_And_Taxes()
    {
        decimal orderTotalEtb = 45000.00m;
        decimal farmerPercent = 90.00m;
        decimal driverPercent = 5.00m;
        decimal platformPercent = 5.00m;
        decimal withholdingTaxPercent = 2.00m;

        decimal farmerShare = Math.Round(orderTotalEtb * (farmerPercent / 100m), 2);
        decimal driverShare = Math.Round(orderTotalEtb * (driverPercent / 100m), 2);
        decimal platformCommission = Math.Round(orderTotalEtb * (platformPercent / 100m), 2);

        Assert.Equal(40500.00m, farmerShare);
        Assert.Equal(2250.00m, driverShare);
        Assert.Equal(2250.00m, platformCommission);
        Assert.Equal(orderTotalEtb, farmerShare + driverShare + platformCommission);

        decimal withholdingTax = Math.Round(farmerShare * (withholdingTaxPercent / 100m), 2);
        decimal netFarmerDisbursement = farmerShare - withholdingTax;

        Assert.Equal(810.00m, withholdingTax);
        Assert.Equal(39690.00m, netFarmerDisbursement);
    }

    // ── 6. Public Configuration Safe Endpoint ───────────────────────────────────

    [Fact]
    public void PublicConfigController_Should_Expose_Authoritative_Params_Without_Secrets()
    {
        var escrowOpts = Options.Create(new EscrowOptions
        {
            FarmerPercent = 90m,
            DriverPercent = 5m,
            PlatformPercent = 5m,
            WithholdingTaxPercent = 2m,
            VatOnCommissionPercent = 15m,
            HighValuePayoutThresholdEtb = 50000m,
            PaymentProvider = "Chapa"
        });

        var controller = new PublicConfigController(escrowOpts);
        var actionResult = controller.GetPublicConfig();

        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var val = okResult.Value;
        Assert.NotNull(val);

        // Verify properties via reflection / anonymous object
        var type = val.GetType();
        var farmerShare = type.GetProperty("farmerSharePercent")?.GetValue(val);
        var provider = type.GetProperty("paymentProvider")?.GetValue(val);

        Assert.Equal(90m, farmerShare);
        Assert.Equal("Chapa", provider);

        // Verify no sensitive keys exist on public response
        Assert.Null(type.GetProperty("telebirrApiKey"));
        Assert.Null(type.GetProperty("chapaSecretKey"));
        Assert.Null(type.GetProperty("jwtKey"));
    }
}
