using FarmerMarket.Domain.Entities;
using FarmerMarket.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace FarmerMarket.Infrastructure.Data;

public static class DbInitializer
{
    public static async Task SeedAsync(AppDbContext context, ILogger logger)
    {
        try
        {
            if (context.Database.IsNpgsql())
            {
                await EnsurePostgresSchemaAsync(context, logger);
            }
            else
            {
                await context.Database.EnsureCreatedAsync();
            }

            var hasUsers = await context.Users.AnyAsync();
            if (!hasUsers)
            {
                logger.LogInformation("Seeding Ethiopian FarmerMarket initial data with advanced features...");
                await SeedInitialDataAsync(context, logger);
            }
            else
            {
                // Ensure new advance harvest listings and sample disputed orders exist if they were added after initial seed
                await EnsureEnrichedSeedDataAsync(context, logger);
            }
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "An error occurred while initializing and seeding the database.");
        }
    }

    private static async Task EnsurePostgresSchemaAsync(AppDbContext context, ILogger logger)
    {
        try
        {
            await context.Database.EnsureCreatedAsync();

            // Run idempotent ALTER TABLE statements to add any missing columns in existing PostgreSQL databases
            var sqlCommands = new[]
            {
                // Users table verification and agent columns
                @"ALTER TABLE ""Users"" ADD COLUMN IF NOT EXISTS ""RegistrationMethod"" character varying(50) DEFAULT 'Self';",
                @"ALTER TABLE ""Users"" ADD COLUMN IF NOT EXISTS ""RegisteredByAgentId"" uuid;",
                @"ALTER TABLE ""Users"" ADD COLUMN IF NOT EXISTS ""VerificationStatus"" integer DEFAULT 2;",
                @"ALTER TABLE ""Users"" ADD COLUMN IF NOT EXISTS ""RejectionReason"" character varying(500);",
                @"ALTER TABLE ""Users"" ADD COLUMN IF NOT EXISTS ""TinNumber"" character varying(100);",

                // UserDocuments table
                @"CREATE TABLE IF NOT EXISTS ""UserDocuments"" (
                    ""Id"" uuid PRIMARY KEY,
                    ""UserId"" uuid NOT NULL REFERENCES ""Users""(""Id"") ON DELETE CASCADE,
                    ""DocumentType"" integer NOT NULL,
                    ""DocumentNumber"" character varying(100) NOT NULL,
                    ""FrontImageUrl"" character varying(500),
                    ""BackImageUrl"" character varying(500),
                    ""FileUrl"" character varying(500),
                    ""Status"" integer NOT NULL DEFAULT 1,
                    ""RejectionReason"" character varying(500),
                    ""SubmittedAt"" timestamp with time zone NOT NULL,
                    ""ReviewedAt"" timestamp with time zone
                );",

                // VerificationReviews table
                @"CREATE TABLE IF NOT EXISTS ""VerificationReviews"" (
                    ""Id"" uuid PRIMARY KEY,
                    ""UserId"" uuid NOT NULL REFERENCES ""Users""(""Id"") ON DELETE CASCADE,
                    ""ReviewerId"" uuid NOT NULL REFERENCES ""Users""(""Id""),
                    ""DocumentId"" uuid,
                    ""ActionTaken"" character varying(100) NOT NULL,
                    ""Notes"" character varying(1000),
                    ""Timestamp"" timestamp with time zone NOT NULL
                );",

                // Users table
                @"ALTER TABLE ""Users"" ADD COLUMN IF NOT EXISTS ""VehicleType"" character varying(100);",
                @"ALTER TABLE ""Users"" ADD COLUMN IF NOT EXISTS ""RefrigerationType"" character varying(100);",
                @"ALTER TABLE ""Users"" ADD COLUMN IF NOT EXISTS ""VehicleCapacityKg"" numeric;",
                @"ALTER TABLE ""Users"" ADD COLUMN IF NOT EXISTS ""KycDocumentType"" character varying(100);",
                @"ALTER TABLE ""Users"" ADD COLUMN IF NOT EXISTS ""KycDocumentNumber"" character varying(100);",
                @"ALTER TABLE ""Users"" ADD COLUMN IF NOT EXISTS ""KycStatus"" character varying(50) DEFAULT 'Verified';",
                @"ALTER TABLE ""Users"" ADD COLUMN IF NOT EXISTS ""RepeatBuyerCount"" integer DEFAULT 0;",
                @"ALTER TABLE ""Users"" ADD COLUMN IF NOT EXISTS ""OnTimeDeliveryRate"" numeric DEFAULT 100;",
                @"ALTER TABLE ""Users"" ADD COLUMN IF NOT EXISTS ""WalletBalanceEtb"" numeric DEFAULT 0;",
                @"ALTER TABLE ""Users"" ADD COLUMN IF NOT EXISTS ""Status"" character varying(50) DEFAULT 'active';",
                @"ALTER TABLE ""Users"" ADD COLUMN IF NOT EXISTS ""PrimaryCrop"" character varying(200);",
                @"ALTER TABLE ""Users"" ADD COLUMN IF NOT EXISTS ""Kebele"" character varying(200);",
                @"ALTER TABLE ""Users"" ADD COLUMN IF NOT EXISTS ""FaydaId"" character varying(100);",
                @"ALTER TABLE ""Users"" ADD COLUMN IF NOT EXISTS ""BusinessLicenseNumber"" character varying(100);",

                // Phase 6 & 7: Password auth + buyer profile fields
                @"ALTER TABLE ""Users"" ADD COLUMN IF NOT EXISTS ""PasswordHash"" character varying(200);",
                @"ALTER TABLE ""Users"" ADD COLUMN IF NOT EXISTS ""Email"" character varying(200);",
                @"ALTER TABLE ""Users"" ADD COLUMN IF NOT EXISTS ""LanguagePreference"" character varying(10) DEFAULT 'am';",
                @"ALTER TABLE ""Users"" ADD COLUMN IF NOT EXISTS ""SavedDeliveryAddress"" character varying(500);",
                @"ALTER TABLE ""Users"" ADD COLUMN IF NOT EXISTS ""DefaultDeliveryLat"" double precision;",
                @"ALTER TABLE ""Users"" ADD COLUMN IF NOT EXISTS ""DefaultDeliveryLng"" double precision;",

                // Listings table
                @"ALTER TABLE ""Listings"" ADD COLUMN IF NOT EXISTS ""Grade"" character varying(50) DEFAULT 'Grade 1';",
                @"ALTER TABLE ""Listings"" ADD COLUMN IF NOT EXISTS ""Ripeness"" character varying(50) DEFAULT 'Ready Today';",
                @"ALTER TABLE ""Listings"" ADD COLUMN IF NOT EXISTS ""IsOrganic"" boolean DEFAULT true;",
                @"ALTER TABLE ""Listings"" ADD COLUMN IF NOT EXISTS ""IsAdvanceHarvest"" boolean DEFAULT false;",
                @"ALTER TABLE ""Listings"" ADD COLUMN IF NOT EXISTS ""ExpectedHarvestDate"" date;",
                @"ALTER TABLE ""Listings"" ADD COLUMN IF NOT EXISTS ""VoiceNoteUrl"" character varying(500);",
                @"ALTER TABLE ""Listings"" ADD COLUMN IF NOT EXISTS ""VoiceNoteTranscript"" character varying(1000);",
                @"ALTER TABLE ""Listings"" ADD COLUMN IF NOT EXISTS ""MarketBenchmarkPrice"" numeric;",
                @"ALTER TABLE ""Listings"" ADD COLUMN IF NOT EXISTS ""ModerationStatus"" character varying(50) DEFAULT 'Approved';",

                // Orders table
                @"ALTER TABLE ""Orders"" ADD COLUMN IF NOT EXISTS ""PickupPhoto"" character varying(500);",
                @"ALTER TABLE ""Orders"" ADD COLUMN IF NOT EXISTS ""DeliveryPhoto"" character varying(500);",
                @"ALTER TABLE ""Orders"" ADD COLUMN IF NOT EXISTS ""DeliveryGpsLat"" double precision;",
                @"ALTER TABLE ""Orders"" ADD COLUMN IF NOT EXISTS ""DeliveryGpsLng"" double precision;",
                @"ALTER TABLE ""Orders"" ADD COLUMN IF NOT EXISTS ""DeliveredAt"" timestamp with time zone;",
                @"ALTER TABLE ""Orders"" ADD COLUMN IF NOT EXISTS ""DisputeReason"" character varying(1000);",
                @"ALTER TABLE ""Orders"" ADD COLUMN IF NOT EXISTS ""DisputePhoto"" character varying(500);",
                @"ALTER TABLE ""Orders"" ADD COLUMN IF NOT EXISTS ""RequestedRefundPercent"" integer DEFAULT 100;",
                @"ALTER TABLE ""Orders"" ADD COLUMN IF NOT EXISTS ""DisputeStatus"" character varying(50) DEFAULT 'None';",
                @"ALTER TABLE ""Orders"" ADD COLUMN IF NOT EXISTS ""DisputeResolutionNotes"" character varying(1000);",
                @"ALTER TABLE ""Orders"" ADD COLUMN IF NOT EXISTS ""IsRecurring"" boolean DEFAULT false;",
                @"ALTER TABLE ""Orders"" ADD COLUMN IF NOT EXISTS ""RecurringFrequency"" character varying(50);",
                @"ALTER TABLE ""Orders"" ADD COLUMN IF NOT EXISTS ""DriverSubsidyEtb"" numeric DEFAULT 150;",

                // Account features added after databases were initialized with EnsureCreated
                @"CREATE TABLE IF NOT EXISTS ""SavedAddresses"" (
                    ""Id"" uuid PRIMARY KEY,
                    ""UserId"" uuid NOT NULL REFERENCES ""Users""(""Id"") ON DELETE CASCADE,
                    ""Name"" character varying(200) NOT NULL,
                    ""Phone"" character varying(30) NOT NULL,
                    ""Street"" character varying(300) NOT NULL,
                    ""City"" character varying(100) NOT NULL,
                    ""Region"" character varying(100) NOT NULL,
                    ""PostalCode"" character varying(30),
                    ""Country"" character varying(100) NOT NULL DEFAULT 'Ethiopia',
                    ""IsDefaultShipping"" boolean NOT NULL DEFAULT false,
                    ""IsDefaultBilling"" boolean NOT NULL DEFAULT false
                );",
                @"CREATE INDEX IF NOT EXISTS ""IX_SavedAddresses_UserId"" ON ""SavedAddresses"" (""UserId"");",
                @"CREATE TABLE IF NOT EXISTS ""PaymentMethods"" (
                    ""Id"" uuid PRIMARY KEY,
                    ""UserId"" uuid NOT NULL REFERENCES ""Users""(""Id"") ON DELETE CASCADE,
                    ""Provider"" character varying(50) NOT NULL,
                    ""ProviderToken"" character varying(500) NOT NULL,
                    ""MaskedDisplay"" character varying(100),
                    ""Brand"" character varying(50),
                    ""ExpiryMonth"" integer,
                    ""ExpiryYear"" integer,
                    ""IsPrimary"" boolean NOT NULL DEFAULT false,
                    ""CreatedAt"" timestamp with time zone NOT NULL
                );",
                @"CREATE INDEX IF NOT EXISTS ""IX_PaymentMethods_UserId"" ON ""PaymentMethods"" (""UserId"");",
                @"ALTER TABLE ""Payments"" ADD COLUMN IF NOT EXISTS ""PaymentMethodId"" uuid REFERENCES ""PaymentMethods""(""Id"") ON DELETE SET NULL;",
                @"CREATE TABLE IF NOT EXISTS ""Coupons"" (
                    ""Id"" uuid PRIMARY KEY,
                    ""UserId"" uuid REFERENCES ""Users""(""Id"") ON DELETE SET NULL,
                    ""Code"" character varying(100) NOT NULL,
                    ""Source"" character varying(50) NOT NULL DEFAULT 'Platform',
                    ""Value"" numeric NOT NULL,
                    ""DiscountType"" character varying(20) NOT NULL DEFAULT 'Percent',
                    ""MinimumSpendEtb"" numeric NOT NULL DEFAULT 0,
                    ""ApplicableScope"" character varying(200) NOT NULL DEFAULT 'All produce',
                    ""ExpiresAt"" timestamp with time zone NOT NULL,
                    ""UsedAt"" timestamp with time zone
                );",
                @"CREATE UNIQUE INDEX IF NOT EXISTS ""IX_Coupons_Code"" ON ""Coupons"" (""Code"");",
                @"CREATE TABLE IF NOT EXISTS ""NotificationPreferences"" (
                    ""Id"" uuid PRIMARY KEY,
                    ""UserId"" uuid NOT NULL REFERENCES ""Users""(""Id"") ON DELETE CASCADE,
                    ""EventType"" character varying(100) NOT NULL,
                    ""SmsEnabled"" boolean NOT NULL DEFAULT true,
                    ""InAppEnabled"" boolean NOT NULL DEFAULT true,
                    ""EmailEnabled"" boolean NOT NULL DEFAULT false
                );",
                @"CREATE UNIQUE INDEX IF NOT EXISTS ""IX_NotificationPreferences_UserId_EventType"" ON ""NotificationPreferences"" (""UserId"", ""EventType"");",
                @"CREATE TABLE IF NOT EXISTS ""UserSessions"" (
                    ""Id"" uuid PRIMARY KEY,
                    ""UserId"" uuid NOT NULL REFERENCES ""Users""(""Id"") ON DELETE CASCADE,
                    ""Device"" character varying(100) NOT NULL,
                    ""Browser"" character varying(100) NOT NULL,
                    ""OperatingSystem"" character varying(100) NOT NULL,
                    ""IpAddress"" character varying(64) NOT NULL,
                    ""LastActiveAt"" timestamp with time zone NOT NULL,
                    ""RevokedAt"" timestamp with time zone
                );",
                @"CREATE INDEX IF NOT EXISTS ""IX_UserSessions_UserId"" ON ""UserSessions"" (""UserId"");",
                @"CREATE TABLE IF NOT EXISTS ""TwoFactorSettings"" (
                    ""Id"" uuid PRIMARY KEY,
                    ""UserId"" uuid NOT NULL REFERENCES ""Users""(""Id"") ON DELETE CASCADE,
                    ""Method"" character varying(30) NOT NULL DEFAULT 'Sms',
                    ""IsEnabled"" boolean NOT NULL DEFAULT false,
                    ""SecretReference"" character varying(500),
                    ""EnabledAt"" timestamp with time zone
                );",
                @"CREATE UNIQUE INDEX IF NOT EXISTS ""IX_TwoFactorSettings_UserId"" ON ""TwoFactorSettings"" (""UserId"");",

                // Populate null values on existing rows
                @"UPDATE ""Users"" SET ""VehicleCapacityKg"" = 5000 WHERE ""VehicleCapacityKg"" IS NULL AND ""Role"" = 'Driver';",
                @"UPDATE ""Users"" SET ""KycStatus"" = 'Verified' WHERE ""KycStatus"" IS NULL;",
                @"UPDATE ""Users"" SET ""RepeatBuyerCount"" = 12 WHERE ""RepeatBuyerCount"" IS NULL;",
                @"UPDATE ""Users"" SET ""OnTimeDeliveryRate"" = 99 WHERE ""OnTimeDeliveryRate"" IS NULL;",
                @"UPDATE ""Users"" SET ""WalletBalanceEtb"" = 0 WHERE ""WalletBalanceEtb"" IS NULL;",
                @"UPDATE ""Listings"" SET ""Grade"" = 'Grade 1' WHERE ""Grade"" IS NULL;",
                @"UPDATE ""Listings"" SET ""Ripeness"" = 'Ready Today' WHERE ""Ripeness"" IS NULL;",
                @"UPDATE ""Listings"" SET ""IsOrganic"" = true WHERE ""IsOrganic"" IS NULL;",
                @"UPDATE ""Listings"" SET ""IsAdvanceHarvest"" = false WHERE ""IsAdvanceHarvest"" IS NULL;",
                @"UPDATE ""Listings"" SET ""ModerationStatus"" = 'Approved' WHERE ""ModerationStatus"" IS NULL;",
                @"UPDATE ""Orders"" SET ""RequestedRefundPercent"" = 100 WHERE ""RequestedRefundPercent"" IS NULL;",
                @"UPDATE ""Orders"" SET ""DisputeStatus"" = 'None' WHERE ""DisputeStatus"" IS NULL;",
                @"UPDATE ""Orders"" SET ""IsRecurring"" = false WHERE ""IsRecurring"" IS NULL;",
                @"UPDATE ""Orders"" SET ""DriverSubsidyEtb"" = 150 WHERE ""DriverSubsidyEtb"" IS NULL;"
            };

            foreach (var sql in sqlCommands)
            {
                try
                {
                    await context.Database.ExecuteSqlRawAsync(sql);
                }
                catch (Exception sqlEx)
                {
                    logger.LogWarning("Schema migration warning: {Message}", sqlEx.Message);
                }
            }
        }
        catch (Exception ex)
        {
            logger.LogWarning("Database schema verification warning: {Message}", ex.Message);
        }
    }

    private static async Task SeedInitialDataAsync(AppDbContext context, ILogger logger)
    {
        // 1. Users with KYC, Vehicle & Trust Badges
        var farmerAbebe = new User
        {
            Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
            Phone = "+251911223344",
            Name = "Abebe Bekele",
            NameAm = "አበበ በቀለ",
            Role = UserRole.Farmer,
            Region = "Oromia (Bishoftu)",
            Verified = true,
            KycDocumentType = "National ID (Fayda)",
            KycDocumentNumber = "FAYDA-ET-8829104",
            KycStatus = "Verified",
            RepeatBuyerCount = 18,
            OnTimeDeliveryRate = 99,
            WalletBalanceEtb = 48200m,
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
            KycDocumentType = "National ID (Fayda)",
            KycDocumentNumber = "FAYDA-ET-1029481",
            KycStatus = "Verified",
            RepeatBuyerCount = 12,
            OnTimeDeliveryRate = 97,
            WalletBalanceEtb = 32500m,
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
            KycDocumentType = "Kebele ID",
            KycDocumentNumber = "HAW-KEB-4410",
            KycStatus = "Verified",
            RepeatBuyerCount = 8,
            OnTimeDeliveryRate = 95,
            WalletBalanceEtb = 15800m,
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
            KycDocumentType = "Business License (TIN)",
            KycDocumentNumber = "TIN-ET-9912001",
            KycStatus = "Verified",
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
            VehicleType = "Isuzu 5-Ton",
            RefrigerationType = "Ventilated",
            VehicleCapacityKg = 5000m,
            KycDocumentType = "Commercial Vehicle Logbook",
            KycDocumentNumber = "ET-LOG-5T-98214",
            KycStatus = "Verified",
            OnTimeDeliveryRate = 98,
            WalletBalanceEtb = 6450m,
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
            VerificationStatus = VerificationStatus.Approved,
            CreatedAt = DateTimeOffset.UtcNow.AddMonths(-5)
        };

        var agentKassahun = new User
        {
            Id = Guid.Parse("77777777-7777-7777-7777-777777777777"),
            Phone = "+251988776655",
            Name = "Kassahun Tolessa (Field Agent)",
            NameAm = "ካሳሁን ቶለሳ (የገበሬዎች ድጋፍ ኤጀንት)",
            Role = UserRole.Agent,
            Region = "Oromia (East Shewa / Bishoftu)",
            Verified = true,
            VerificationStatus = VerificationStatus.Approved,
            KycDocumentType = "Cooperative Agent Certificate",
            KycDocumentNumber = "COOP-AG-98214",
            KycStatus = "Verified",
            TinNumber = "TIN-AG-881920",
            CreatedAt = DateTimeOffset.UtcNow.AddMonths(-4)
        };

        var farmerGirma = new User
        {
            Id = Guid.Parse("88888888-8888-8888-8888-888888888888"),
            Phone = "+251944556677",
            Name = "Girma Wondimu",
            NameAm = "ግርማ ወንዲሙ",
            Role = UserRole.Farmer,
            Region = "Oromia (Bishoftu / Ada'a)",
            Verified = false,
            RegistrationMethod = "Agent",
            RegisteredByAgentId = agentKassahun.Id,
            VerificationStatus = VerificationStatus.UnderReview,
            KycDocumentType = "National ID (Fayda)",
            KycDocumentNumber = "FAN-8812-4091-2810",
            TinNumber = "0099881122",
            KycStatus = "Pending",
            CreatedAt = DateTimeOffset.UtcNow.AddDays(-1)
        };

        var superAdminDawit = new User
        {
            Id = Guid.Parse("00000000-0000-0000-0000-000000000001"),
            Phone = "+251900000001",
            Name = "Dr. Dawit Haile (Super Admin)",
            NameAm = "ዶ/ር ዳዊት ኃይሌ",
            Role = UserRole.SuperAdmin,
            Region = "Addis Ababa (Headquarters)",
            Verified = true,
            VerificationStatus = VerificationStatus.Approved,
            CreatedAt = DateTimeOffset.UtcNow.AddYears(-1)
        };

        context.Users.AddRange(farmerAbebe, farmerAlmaz, farmerChala, buyerBethlehem, driverDawit, adminSara, agentKassahun, farmerGirma, superAdminDawit);

        var docGirmaFayda = new UserDocument
        {
            Id = Guid.Parse("d1111111-1111-1111-1111-111111111111"),
            UserId = farmerGirma.Id,
            DocumentType = DocumentType.FaydaId,
            DocumentNumber = "FAN-8812-4091-2810",
            FrontImageUrl = "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80",
            BackImageUrl = "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",
            Status = VerificationStatus.UnderReview,
            SubmittedAt = DateTimeOffset.UtcNow.AddDays(-1)
        };

        var docGirmaTin = new UserDocument
        {
            Id = Guid.Parse("d2222222-2222-2222-2222-222222222222"),
            UserId = farmerGirma.Id,
            DocumentType = DocumentType.TinCertificate,
            DocumentNumber = "0099881122",
            FrontImageUrl = "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80",
            Status = VerificationStatus.UnderReview,
            SubmittedAt = DateTimeOffset.UtcNow.AddDays(-1)
        };

        context.UserDocuments.AddRange(docGirmaFayda, docGirmaTin);

        // 2. Listings with Voice Notes, Benchmarks, Grades, Ripeness, Advance Harvests
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
            Longitude = 38.9785, // Bishoftu (~45 km from Addis)
            Photos = new List<string> { "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80" },
            AvailableFrom = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(-2)),
            Status = ListingStatus.Active,
            Grade = "Grade 1",
            Ripeness = "Ready Today",
            IsOrganic = true,
            IsAdvanceHarvest = false,
            VoiceNoteTranscript = "2,500 ኪሎ ቀይ የሾላ ቲማቲም አለኝ። ዋጋው በኪሎ 45 ብር። ቢሾፍቱ እርሻችን ይገኛል።",
            MarketBenchmarkPrice = 45m,
            ModerationStatus = "Approved",
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
            Longitude = 39.5300, // Debre Berhan (~120 km)
            Photos = new List<string> { "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format&fit=crop&q=80" },
            AvailableFrom = DateOnly.FromDateTime(DateTime.UtcNow),
            Status = ListingStatus.Active,
            Grade = "Export Grade",
            Ripeness = "Ready Today",
            IsOrganic = true,
            IsAdvanceHarvest = false,
            MarketBenchmarkPrice = 115m,
            ModerationStatus = "Approved",
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
            Longitude = 39.3000, // Mojo/Awash
            Photos = new List<string> { "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=800&auto=format&fit=crop&q=80" },
            AvailableFrom = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(-1)),
            Status = ListingStatus.Active,
            Grade = "Grade 1",
            Ripeness = "Ready Today",
            IsOrganic = false,
            IsAdvanceHarvest = false,
            MarketBenchmarkPrice = 55m,
            ModerationStatus = "Approved",
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
            Grade = "Grade 1",
            Ripeness = "Semi-Ripe",
            IsOrganic = true,
            IsAdvanceHarvest = false,
            MarketBenchmarkPrice = 60m,
            ModerationStatus = "Approved",
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
            Grade = "Export Grade",
            Ripeness = "Ready Today",
            IsOrganic = true,
            IsAdvanceHarvest = false,
            VoiceNoteTranscript = "ይርጋጨፌ ስፔሻሊቲ አረንጓዴ ቡና 1,500 ኪሎ። ዋጋው በኪሎ 380 ብር። ጥራቱ አንደኛ ደረጃ ነው።",
            MarketBenchmarkPrice = 380m,
            ModerationStatus = "Approved",
            CreatedAt = DateTimeOffset.UtcNow.AddDays(-4)
        };

        var listingAdvanceStrawberries = new Listing
        {
            Id = Guid.Parse("a1b2c3d4-0006-0000-0000-000000000006"),
            FarmerId = farmerAbebe.Id,
            ProductName = "Bishoftu Sweet Greenhouse Strawberries",
            NameAm = "የቢሾፍቱ እንጆሪ (የቅድመ ምርት)",
            Category = "Fruits",
            QtyKg = 1200m,
            PricePerKg = 90m,
            MinOrderKg = 25m,
            Latitude = 8.7523,
            Longitude = 38.9785,
            Photos = new List<string> { "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&auto=format&fit=crop&q=80" },
            AvailableFrom = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(18)),
            Status = ListingStatus.Active,
            Grade = "Export Grade",
            Ripeness = "Green / Storable",
            IsOrganic = true,
            IsAdvanceHarvest = true,
            ExpectedHarvestDate = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(18)),
            MarketBenchmarkPrice = 95m,
            ModerationStatus = "Approved",
            CreatedAt = DateTimeOffset.UtcNow.AddDays(-1)
        };

        context.Listings.AddRange(listingTomatoes, listingTeff, listingOnions, listingAvocado, listingCoffee, listingAdvanceStrawberries);

        // 3. Orders with Proof of Delivery, GPS, and Disputes
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
            PickupPhoto = "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",
            DeliveryPhoto = "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",
            DeliveryGpsLat = 8.9950,
            DeliveryGpsLng = 38.7890,
            DeliveredAt = DateTimeOffset.UtcNow.AddDays(-1),
            ConfirmedAt = DateTimeOffset.UtcNow.AddDays(-1),
            DriverSubsidyEtb = 150m,
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
            DriverSubsidyEtb = 200m,
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

        var order3Disputed = new Order
        {
            Id = Guid.Parse("b1b2c3d4-0003-0000-0000-000000000003"),
            ListingId = listingAvocado.Id,
            BuyerId = buyerBethlehem.Id,
            DriverId = driverDawit.Id,
            QtyKg = 150m,
            TotalEtb = 9000m,
            Status = OrderStatus.Disputed,
            EscrowHeld = true,
            PaymentRef = "TB-20260813-9000",
            PickupPhoto = "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80",
            DeliveryAddress = "Bole Supermarket Cold Storage, Addis Ababa",
            DisputeReason = "Delivered avocados were overripe and 20% bruised during transit from Hawassa.",
            DisputePhoto = "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80",
            RequestedRefundPercent = 50,
            DisputeStatus = "PendingReview",
            CreatedAt = DateTimeOffset.UtcNow.AddDays(-1)
        };

        var payment3 = new Payment
        {
            Id = Guid.NewGuid(),
            OrderId = order3Disputed.Id,
            AmountEtb = 9000m,
            FarmerCut = 8100m,
            DriverCut = 450m,
            PlatformCut = 450m,
            TelebirrRef = "TB-TXN-98217411",
            Status = "Frozen",
            CreatedAt = DateTimeOffset.UtcNow.AddDays(-1)
        };

        context.Orders.AddRange(order1, order2, order3Disputed);
        context.Payments.AddRange(payment1, payment2, payment3);
        context.Reviews.Add(review1);

        await context.SaveChangesAsync();
        logger.LogInformation("Database seeded successfully with Ethiopian produce, advance harvests, KYC profiles, and dispute transactions.");
    }

    private static async Task EnsureEnrichedSeedDataAsync(AppDbContext context, ILogger logger)
    {
        var superAdminId = Guid.Parse("00000000-0000-0000-0000-000000000001");
        var superAdminPhone = "+251900000001";
        if (!await context.Users.AnyAsync(u => u.Id == superAdminId || u.Phone == superAdminPhone))
        {
            context.Users.Add(new User
            {
                Id = superAdminId,
                Phone = superAdminPhone,
                Name = "Dr. Dawit Haile (Super Admin)",
                NameAm = "ዶ/ር ዳዊት ኃይሌ",
                Role = UserRole.SuperAdmin,
                Region = "Addis Ababa (Headquarters)",
                Verified = true,
                VerificationStatus = VerificationStatus.Approved,
                CreatedAt = DateTimeOffset.UtcNow.AddYears(-1)
            });
            await context.SaveChangesAsync();
            logger.LogInformation("Seeded Super Admin Dr. Dawit Haile (+251900000001).");
        }

        var strawberryId = Guid.Parse("a1b2c3d4-0006-0000-0000-000000000006");
        if (!await context.Listings.AnyAsync(l => l.Id == strawberryId))
        {
            var farmerAbebeId = Guid.Parse("11111111-1111-1111-1111-111111111111");
            context.Listings.Add(new Listing
            {
                Id = strawberryId,
                FarmerId = farmerAbebeId,
                ProductName = "Bishoftu Sweet Greenhouse Strawberries",
                NameAm = "የቢሾፍቱ እንጆሪ (የቅድመ ምርት)",
                Category = "Fruits",
                QtyKg = 1200m,
                PricePerKg = 90m,
                MinOrderKg = 25m,
                Latitude = 8.7523,
                Longitude = 38.9785,
                Photos = new List<string> { "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&auto=format&fit=crop&q=80" },
                AvailableFrom = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(18)),
                Status = ListingStatus.Active,
                Grade = "Export Grade",
                Ripeness = "Green / Storable",
                IsOrganic = true,
                IsAdvanceHarvest = true,
                ExpectedHarvestDate = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(18)),
                MarketBenchmarkPrice = 95m,
                ModerationStatus = "Approved",
                CreatedAt = DateTimeOffset.UtcNow.AddDays(-1)
            });
            await context.SaveChangesAsync();
        }
    }
}
