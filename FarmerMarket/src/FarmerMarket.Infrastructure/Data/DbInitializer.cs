using FarmerMarket.Domain.Entities;
using FarmerMarket.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace FarmerMarket.Infrastructure.Data;

public static class DbInitializer
{
    public static async Task SeedAsync(AppDbContext context, ILogger logger)
    {
        await context.Database.EnsureCreatedAsync();

        if (await context.Users.AnyAsync())
        {
            return; // Already seeded
        }

        logger.LogInformation("Seeding Ethiopian FarmerMarket initial data...");

        // 1. Users
        var farmerAbebe = new User
        {
            Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
            Phone = "+251911223344",
            Name = "Abebe Bekele",
            NameAm = "አበበ በቀለ",
            Role = UserRole.Farmer,
            Region = "Oromia (Bishoftu)",
            Verified = true,
            CreatedAt = DateTimeOffset.UtcNow.AddMonths(-3)
        };

        var farmerAlmaz = new User
        {
            Id = Guid.Parse("22222222-2222-2222-2222-222222222222"),
            Phone = "+251922334455",
            Name = "Almaz Hailu",
            NameAm = "አልማዝ ኃይሉ",
            Role = UserRole.Farmer,
            Region = "Amhara (Debre Berhan)",
            Verified = true,
            CreatedAt = DateTimeOffset.UtcNow.AddMonths(-2)
        };

        var farmerChala = new User
        {
            Id = Guid.Parse("33333333-3333-3333-3333-333333333333"),
            Phone = "+251933445566",
            Name = "Chala Gemechu",
            NameAm = "ጫላ ገመቹ",
            Role = UserRole.Farmer,
            Region = "Sidama (Hawassa)",
            Verified = true,
            CreatedAt = DateTimeOffset.UtcNow.AddMonths(-1)
        };

        var buyerBethlehem = new User
        {
            Id = Guid.Parse("44444444-4444-4444-4444-444444444444"),
            Phone = "+251955667788",
            Name = "Bethlehem Tilahun (FreshMart)",
            NameAm = "ቤተልሔም ጥላሁን",
            Role = UserRole.Buyer,
            Region = "Addis Ababa (Bole)",
            Verified = true,
            CreatedAt = DateTimeOffset.UtcNow.AddMonths(-2)
        };

        var driverDawit = new User
        {
            Id = Guid.Parse("55555555-5555-5555-5555-555555555555"),
            Phone = "+251977889900",
            Name = "Dawit Kebede (Isuzu 5-Ton)",
            NameAm = "ዳዊት ከበደ",
            Role = UserRole.Driver,
            Region = "Addis Ababa (Kaliti)",
            Verified = true,
            CreatedAt = DateTimeOffset.UtcNow.AddMonths(-2)
        };

        var adminSara = new User
        {
            Id = Guid.Parse("66666666-6666-6666-6666-666666666666"),
            Phone = "+251900112233",
            Name = "Sara Mengistu (Marketplace Admin)",
            NameAm = "ሳራ መንግስቱ",
            Role = UserRole.Admin,
            Region = "Addis Ababa",
            Verified = true,
            CreatedAt = DateTimeOffset.UtcNow.AddMonths(-5)
        };

        context.Users.AddRange(farmerAbebe, farmerAlmaz, farmerChala, buyerBethlehem, driverDawit, adminSara);

        // 2. Listings
        var listingTomatoes = new Listing
        {
            Id = Guid.Parse("a1b2c3d4-0001-0000-0000-000000000001"),
            FarmerId = farmerAbebe.Id,
            ProductName = "Fresh Sholla Red Tomatoes",
            NameAm = "የሾላ ቀይ ቲማቲም",
            Category = "Vegetables",
            QtyKg = 2500m,
            PricePerKg = 45m,
            MinOrderKg = 50m,
            Latitude = 8.7523,
            Longitude = 38.9785, // Bishoftu
            Photos = new List<string> { "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80" },
            AvailableFrom = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(-2)),
            Status = ListingStatus.Active,
            CreatedAt = DateTimeOffset.UtcNow.AddDays(-5)
        };

        var listingTeff = new Listing
        {
            Id = Guid.Parse("a1b2c3d4-0002-0000-0000-000000000002"),
            FarmerId = farmerAlmaz.Id,
            ProductName = "Organic Magna White Teff",
            NameAm = "የማኛ ነጭ ጤፍ",
            Category = "Grains",
            QtyKg = 8000m,
            PricePerKg = 115m,
            MinOrderKg = 100m,
            Latitude = 9.6800,
            Longitude = 39.5300, // Debre Berhan
            Photos = new List<string> { "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format&fit=crop&q=80" },
            AvailableFrom = DateOnly.FromDateTime(DateTime.UtcNow),
            Status = ListingStatus.Active,
            CreatedAt = DateTimeOffset.UtcNow.AddDays(-3)
        };

        var listingOnions = new Listing
        {
            Id = Guid.Parse("a1b2c3d4-0003-0000-0000-000000000003"),
            FarmerId = farmerAbebe.Id,
            ProductName = "Awash Valley Red Onions",
            NameAm = "የአዋሽ ቀይ ሽንኩርት",
            Category = "Vegetables",
            QtyKg = 4000m,
            PricePerKg = 55m,
            MinOrderKg = 50m,
            Latitude = 8.9806,
            Longitude = 39.3000,
            Photos = new List<string> { "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=800&auto=format&fit=crop&q=80" },
            AvailableFrom = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(-1)),
            Status = ListingStatus.Active,
            CreatedAt = DateTimeOffset.UtcNow.AddDays(-2)
        };

        var listingAvocado = new Listing
        {
            Id = Guid.Parse("a1b2c3d4-0004-0000-0000-000000000004"),
            FarmerId = farmerChala.Id,
            ProductName = "Hawassa Organic Hass Avocados",
            NameAm = "የሐዋሳ ሀስ አቮካዶ",
            Category = "Fruits",
            QtyKg = 3000m,
            PricePerKg = 60m,
            MinOrderKg = 40m,
            Latitude = 7.0504,
            Longitude = 38.4955, // Hawassa
            Photos = new List<string> { "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&auto=format&fit=crop&q=80" },
            AvailableFrom = DateOnly.FromDateTime(DateTime.UtcNow),
            Status = ListingStatus.Active,
            CreatedAt = DateTimeOffset.UtcNow.AddDays(-1)
        };

        var listingCoffee = new Listing
        {
            Id = Guid.Parse("a1b2c3d4-0005-0000-0000-000000000005"),
            FarmerId = farmerChala.Id,
            ProductName = "Grade 1 Specialty Green Coffee Beans",
            NameAm = "የይርጋጨፌ ስፔሻሊቲ ቡና",
            Category = "Coffee",
            QtyKg = 1500m,
            PricePerKg = 380m,
            MinOrderKg = 50m,
            Latitude = 6.1628,
            Longitude = 38.2064, // Yirgacheffe
            Photos = new List<string> { "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&auto=format&fit=crop&q=80" },
            AvailableFrom = DateOnly.FromDateTime(DateTime.UtcNow),
            Status = ListingStatus.Active,
            CreatedAt = DateTimeOffset.UtcNow.AddDays(-4)
        };

        context.Listings.AddRange(listingTomatoes, listingTeff, listingOnions, listingAvocado, listingCoffee);

        // 3. Sample Delivered Order (Historical with Escrow Released)
        var order1 = new Order
        {
            Id = Guid.Parse("b1b2c3d4-0001-0000-0000-000000000001"),
            ListingId = listingTomatoes.Id,
            BuyerId = buyerBethlehem.Id,
            DriverId = driverDawit.Id,
            QtyKg = 200m,
            TotalEtb = 9000m,
            Status = OrderStatus.Delivered,
            EscrowHeld = false,
            PaymentRef = "TB-20260810-9000",
            DeliveryAddress = "Bole Road, FreshMart Supermarket, Addis Ababa",
            ConfirmedAt = DateTimeOffset.UtcNow.AddDays(-1),
            CreatedAt = DateTimeOffset.UtcNow.AddDays(-2)
        };

        var payment1 = new Payment
        {
            Id = Guid.NewGuid(),
            OrderId = order1.Id,
            AmountEtb = 9000m,
            FarmerCut = 8100m, // 90%
            DriverCut = 450m,  // 5%
            PlatformCut = 450m, // 5%
            TelebirrRef = "TB-TXN-98217391",
            Status = "Released",
            ReleasedAt = DateTimeOffset.UtcNow.AddDays(-1),
            CreatedAt = DateTimeOffset.UtcNow.AddDays(-2)
        };

        var review1 = new Review
        {
            Id = Guid.NewGuid(),
            OrderId = order1.Id,
            ReviewerId = buyerBethlehem.Id,
            RevieweeId = farmerAbebe.Id,
            Rating = 5,
            Comment = "Excellent produce quality! Farm-fresh tomatoes delivered in great condition.",
            CreatedAt = DateTimeOffset.UtcNow.AddDays(-1)
        };

        // 4. Sample Active Confirmed Order
        var order2 = new Order
        {
            Id = Guid.Parse("b1b2c3d4-0002-0000-0000-000000000002"),
            ListingId = listingOnions.Id,
            BuyerId = buyerBethlehem.Id,
            DriverId = driverDawit.Id,
            QtyKg = 300m,
            TotalEtb = 16500m,
            Status = OrderStatus.PickedUp,
            EscrowHeld = true,
            PaymentRef = "TB-20260812-16500",
            PickupPhoto = "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80",
            DeliveryAddress = "Merkato Wholesalers Depot, Addis Ababa",
            CreatedAt = DateTimeOffset.UtcNow.AddHours(-3)
        };

        var payment2 = new Payment
        {
            Id = Guid.NewGuid(),
            OrderId = order2.Id,
            AmountEtb = 16500m,
            FarmerCut = 14850m,
            DriverCut = 825m,
            PlatformCut = 825m,
            TelebirrRef = "TB-TXN-98217400",
            Status = "Held",
            CreatedAt = DateTimeOffset.UtcNow.AddHours(-3)
        };

        context.Orders.AddRange(order1, order2);
        context.Payments.AddRange(payment1, payment2);
        context.Reviews.Add(review1);

        await context.SaveChangesAsync();
        logger.LogInformation("Database seeded successfully with Ethiopian produce, accounts, and escrow transactions.");
    }
}
