using System.Security.Cryptography;
using System.Text;
using FarmerMarket.Application.Common.Interfaces;
using FarmerMarket.Application.Common.Models;
using FarmerMarket.Application.DTOs;
using FarmerMarket.Application.Features.Auth;
using FarmerMarket.Application.Features.Orders;
using FarmerMarket.Application.Features.Ussd;
using FarmerMarket.Domain.Entities;
using FarmerMarket.Domain.Enums;
using FarmerMarket.Infrastructure.Data;
using FarmerMarket.Infrastructure.Options;
using FarmerMarket.Infrastructure.Services;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using Moq;
using Xunit;

namespace FarmerMarket.Tests;

public class EnterpriseSecurityTests
{
    private AppDbContext CreateInMemoryDbContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        return new AppDbContext(options);
    }

    [Fact]
    public void OtpService_Should_Reject_Old_Master_Bypass_123456()
    {
        var otpService = new OtpService(NullLogger<OtpService>.Instance);
        var phone = "+251911223344";

        // Store a legitimate OTP code
        otpService.StoreOtp(phone, "987654", TimeSpan.FromMinutes(5));

        // Attempting to use the old backdoor 123456 must fail
        var result = otpService.ValidateOtp(phone, "123456");
        result.Should().BeFalse();
    }

    [Fact]
    public void OtpService_Should_Validate_Correct_Hashed_Code_And_Enforce_Single_Use()
    {
        var otpService = new OtpService(NullLogger<OtpService>.Instance);
        var phone = "+251911223344";

        otpService.StoreOtp(phone, "654321", TimeSpan.FromMinutes(5));

        // First verification with valid code should succeed
        var firstAttempt = otpService.ValidateOtp(phone, "654321");
        firstAttempt.Should().BeTrue();

        // Second verification with same code must fail (single-use token)
        var secondAttempt = otpService.ValidateOtp(phone, "654321");
        secondAttempt.Should().BeFalse();
    }

    [Fact]
    public void OtpService_Should_Lockout_After_Max_Failed_Attempts()
    {
        var otpService = new OtpService(NullLogger<OtpService>.Instance);
        var phone = "+251911223344";

        otpService.StoreOtp(phone, "777888", TimeSpan.FromMinutes(5));

        // 5 consecutive wrong attempts
        for (int i = 0; i < 5; i++)
        {
            otpService.ValidateOtp(phone, "000000").Should().BeFalse();
        }

        // Even with the correct code now, it must be locked out
        var lockedAttempt = otpService.ValidateOtp(phone, "777888");
        lockedAttempt.Should().BeFalse();
    }

    [Fact]
    public async Task VerifyOtp_Should_Fail_For_Unregistered_SuperAdmin_Phone_Without_Backdoor()
    {
        using var db = CreateInMemoryDbContext();
        var mockJwt = new Mock<IJwtService>();
        var mockOtp = new Mock<IOtpService>();
        mockOtp.Setup(x => x.ValidateOtp(It.IsAny<string>(), It.IsAny<string>())).Returns(true);

        var handler = new VerifyOtpHandler(db, mockJwt.Object, mockOtp.Object);

        // Attempt verify on +251900000001 when it is NOT seeded in DB
        var result = await handler.Handle(new VerifyOtpCommand("+251900000001", "123456"), default);

        result.IsSuccess.Should().BeFalse();
        result.Error.Should().Contain("User account not found");
    }

    [Fact]
    public void ChapaService_VerifyWebhookSignature_Should_Reject_Invalid_Or_Missing_Signature()
    {
        var chapaOpts = Options.Create(new ChapaOptions
        {
            SecretKey = "CHASECK_TEST_KEY_FOR_UNIT_TEST",
            WebhookSecret = "MY_WEBHOOK_SECRET_123"
        });
        var escrowOpts = Options.Create(new FarmerMarket.Application.Common.Models.EscrowOptions());
        var service = new ChapaService(chapaOpts, escrowOpts, NullLogger<ChapaService>.Instance);

        var payload = "{\"event\":\"charge.success\",\"data\":{\"amount\":\"500.00\"}}";

        // Missing signature
        service.VerifyWebhookSignature(payload, "").Should().BeFalse();

        // Invalid signature
        service.VerifyWebhookSignature(payload, "invalid_sig_hex").Should().BeFalse();
    }

    [Fact]
    public void ChapaService_VerifyWebhookSignature_Should_Validate_Correct_HMAC()
    {
        var secret = "MY_WEBHOOK_SECRET_123";
        var chapaOpts = Options.Create(new ChapaOptions
        {
            WebhookSecret = secret
        });
        var escrowOpts = Options.Create(new FarmerMarket.Application.Common.Models.EscrowOptions());
        var service = new ChapaService(chapaOpts, escrowOpts, NullLogger<ChapaService>.Instance);

        var payload = "{\"event\":\"charge.success\",\"data\":{\"amount\":\"500.00\"}}";

        using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(secret));
        var validSignature = Convert.ToHexString(hmac.ComputeHash(Encoding.UTF8.GetBytes(payload)));

        service.VerifyWebhookSignature(payload, validSignature).Should().BeTrue();
    }

    [Fact]
    public async Task OrderHandlers_Should_Calculate_Custom_Escrow_Split_From_Options()
    {
        using var db = CreateInMemoryDbContext();

        var farmer = new User
        {
            Id = Guid.NewGuid(),
            Phone = "+251911111111",
            Name = "Abebe Bekele",
            Role = UserRole.Farmer,
            Region = "Oromia (Bishoftu)"
        };

        var buyer = new User
        {
            Id = Guid.NewGuid(),
            Phone = "+251922222222",
            Name = "Bethlehem Tilahun",
            Role = UserRole.Buyer,
            Region = "Addis Ababa"
        };

        var listing = new Listing
        {
            Id = Guid.NewGuid(),
            FarmerId = farmer.Id,
            Farmer = farmer,
            ProductName = "Red Tomatoes",
            Category = "Vegetables",
            QtyKg = 500m,
            PricePerKg = 50m,
            MinOrderKg = 20m,
            Status = ListingStatus.Active
        };

        db.Users.AddRange(farmer, buyer);
        db.Listings.Add(listing);
        await db.SaveChangesAsync();

        var mockPayment = new Mock<IPaymentGateway>();
        mockPayment.Setup(x => x.InitiatePaymentAsync(It.IsAny<Guid>(), It.IsAny<decimal>(), It.IsAny<string>(), It.IsAny<string?>(), It.IsAny<string?>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new PaymentInitResult("ord1", "https://payment.et", "TB-TEST-001", 5000m, "Chapa"));

        var mockSms = new Mock<ISmsService>();
        var mockSignalR = new Mock<ISignalRNotifier>();

        // Configure custom 88 / 7 / 5 split with 200 ETB driver subsidy
        var customEscrow = Options.Create(new FarmerMarket.Application.Common.Models.EscrowOptions
        {
            FarmerPercent = 88m,
            DriverPercent = 7m,
            PlatformPercent = 5m,
            DriverSubsidyEtb = 200m
        });

        var handler = new PlaceOrderHandler(db, mockPayment.Object, mockSms.Object, mockSignalR.Object, customEscrow);

        // Act: 100 kg * 50 ETB = 5,000 ETB
        var result = await handler.Handle(new PlaceOrderCommand(buyer.Id, new PlaceOrderDto(listing.Id, 100m)), default);

        result.IsSuccess.Should().BeTrue();

        var order = await db.Orders.Include(o => o.Payment).FirstOrDefaultAsync(o => o.Id == result.Value!.OrderId);
        order.Should().NotBeNull();
        order!.DriverSubsidyEtb.Should().Be(200m);

        // 88% Farmer = 4,400 ETB, 7% Driver = 350 ETB, 5% Platform = 250 ETB
        order.Payment!.FarmerCut.Should().Be(4400m);
        order.Payment.DriverCut.Should().Be(350m);
        order.Payment.PlatformCut.Should().Be(250m);
    }

    [Fact]
    public async Task Ussd_CheckWallet_UnregisteredUser_Should_Return_Explicit_Error_Without_Fallback_Balance()
    {
        using var db = CreateInMemoryDbContext();
        var handler = new UssdHandlers(db);

        // First open main menu
        await handler.Handle(new ProcessUssdCommand(new UssdRequest("sess-sec-1", "+251999888777", "*804#", "*804#", "en")), CancellationToken.None);

        // Select 2 (Wallet Balance)
        var response = await handler.Handle(new ProcessUssdCommand(new UssdRequest("sess-sec-1", "+251999888777", "2", "*804#", "en")), CancellationToken.None);

        response.Action.Should().Be("END");
        response.Message.Should().Contain("Account not found");
        response.Message.Should().NotContain("28,450.00");
    }
}
