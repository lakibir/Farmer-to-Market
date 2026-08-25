using FarmerMarket.Application.Common.Interfaces;
using FarmerMarket.Application.DTOs;
using FarmerMarket.Application.Features.Auth;
using FarmerMarket.Application.Features.Listings;
using FarmerMarket.Application.Features.Orders;
using FarmerMarket.Application.Features.Payments;
using FarmerMarket.Domain.Entities;
using FarmerMarket.Domain.Enums;
using FarmerMarket.Infrastructure.Data;
using FarmerMarket.Infrastructure.Services;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using Xunit;

namespace FarmerMarket.Tests;

public class CoreWorkflowTests
{
    private AppDbContext CreateInMemoryDbContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        return new AppDbContext(options);
    }

    [Fact]
    public async Task RequestOtp_Should_Fail_If_User_Not_Registered()
    {
        // Arrange
        using var db = CreateInMemoryDbContext();
        var mockSms = new Mock<ISmsService>();
        var mockOtp = new Mock<IOtpService>();

        var handler = new RequestOtpHandler(db, mockSms.Object, mockOtp.Object);

        // Act
        var result = await handler.Handle(new RequestOtpCommand("+251999999999"), default);

        // Assert - un-registered user must fail and not auto-create
        result.IsSuccess.Should().BeFalse();
        result.Error.Should().Contain("No account found");

        var user = await db.Users.FirstOrDefaultAsync(u => u.Phone == "+251999999999");
        user.Should().BeNull();
    }

    [Fact]
    public async Task RequestOtp_Should_Succeed_If_User_Registered()
    {
        // Arrange
        using var db = CreateInMemoryDbContext();
        var existingUser = new User
        {
            Id = Guid.NewGuid(),
            Phone = "+251911223344",
            Name = "Abebe Bekele",
            Role = UserRole.Farmer,
            Region = "Oromia (Bishoftu)"
        };
        db.Users.Add(existingUser);
        await db.SaveChangesAsync();

        var mockSms = new Mock<ISmsService>();
        mockSms.Setup(x => x.SendOtpAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>(), default))
            .ReturnsAsync(true);
        var mockOtp = new Mock<IOtpService>();

        var handler = new RequestOtpHandler(db, mockSms.Object, mockOtp.Object);

        // Act
        var result = await handler.Handle(new RequestOtpCommand("+251911223344"), default);

        // Assert
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().NotBeNull();
        result.Value!.DemoCode.Should().NotBeNullOrWhiteSpace();
        result.Value.DemoCode!.Length.Should().Be(6);
        result.Value.UserName.Should().Be("Abebe Bekele");
    }

    [Fact]
    public async Task RegisterUser_Should_Create_User_In_Database()
    {
        // Arrange
        using var db = CreateInMemoryDbContext();
        var mockJwt = new Mock<IJwtService>();
        mockJwt.Setup(x => x.GenerateToken(It.IsAny<User>())).Returns("fake-jwt-token");

        var handler = new RegisterUserHandler(db, mockJwt.Object);

        // Act
        var result = await handler.Handle(new RegisterUserCommand(new RegisterUserDto(
            Phone: "0955667788",
            Name: "Bethlehem Tilahun",
            NameAm: "ቤተልሔም ጥላሁን",
            Role: UserRole.Buyer,
            Region: "Addis Ababa"
        )), default);

        // Assert
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().NotBeNull();
        result.Value!.User.Name.Should().Be("Bethlehem Tilahun");
        result.Value.User.Role.Should().Be(UserRole.Buyer);

        var saved = await db.Users.FirstOrDefaultAsync(u => u.Phone == "+251955667788");
        saved.Should().NotBeNull();
        saved!.Role.Should().Be(UserRole.Buyer);
    }

    [Fact]
    public async Task PlaceOrder_Should_Calculate_90_5_5_Escrow_Split_Correctly()
    {
        // Arrange
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
            PricePerKg = 45m, // 45 ETB/kg
            MinOrderKg = 20m,
            Status = ListingStatus.Active
        };

        db.Users.AddRange(farmer, buyer);
        db.Listings.Add(listing);
        await db.SaveChangesAsync();

        var mockPayment = new Mock<IPaymentGateway>();
        mockPayment.Setup(x => x.InitiatePaymentAsync(It.IsAny<Guid>(), It.IsAny<decimal>(), It.IsAny<string>(), default))
            .ReturnsAsync(new PaymentInitResult("ord1", "https://telebirr.et/pay?test", "TB-TEST-001", 4500m, "Telebirr"));

        var mockSms = new Mock<ISmsService>();
        var mockSignalR = new Mock<ISignalRNotifier>();

        var handler = new PlaceOrderHandler(db, mockPayment.Object, mockSms.Object, mockSignalR.Object);

        // Act: Buyer orders 100 kg at 45 ETB/kg = 4,500 ETB
        var result = await handler.Handle(new PlaceOrderCommand(buyer.Id, new PlaceOrderDto(listing.Id, 100m)), default);

        // Assert
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().NotBeNull();
        result.Value!.TotalEtb.Should().Be(4500m);

        var order = await db.Orders.Include(o => o.Payment).FirstOrDefaultAsync(o => o.Id == result.Value.OrderId);
        order.Should().NotBeNull();
        order!.QtyKg.Should().Be(100m);
        order.Status.Should().Be(OrderStatus.Pending);
        order.EscrowHeld.Should().BeTrue();

        // 90% Farmer = 4,050 ETB, 5% Driver = 225 ETB, 5% Platform = 225 ETB
        order.Payment.Should().NotBeNull();
        order.Payment!.FarmerCut.Should().Be(4050m);
        order.Payment.DriverCut.Should().Be(225m);
        order.Payment.PlatformCut.Should().Be(225m);
        order.Payment.Status.Should().Be("Held");

        // Remaining listing quantity should be 400 kg
        var updatedListing = await db.Listings.FindAsync(listing.Id);
        updatedListing!.QtyKg.Should().Be(400m);
    }

    [Fact]
    public async Task DeliverOrder_Should_Release_Escrow_To_Farmer_And_Driver()
    {
        // Arrange
        using var db = CreateInMemoryDbContext();

        var farmer = new User { Id = Guid.NewGuid(), Phone = "+251911000001", Name = "Farmer A", Role = UserRole.Farmer };
        var buyer = new User { Id = Guid.NewGuid(), Phone = "+251911000002", Name = "Buyer B", Role = UserRole.Buyer };
        var driver = new User { Id = Guid.NewGuid(), Phone = "+251911000003", Name = "Driver D", Role = UserRole.Driver };

        var listing = new Listing
        {
            Id = Guid.NewGuid(),
            FarmerId = farmer.Id,
            Farmer = farmer,
            ProductName = "White Teff",
            PricePerKg = 100m,
            QtyKg = 1000m,
            MinOrderKg = 50m
        };

        var order = new Order
        {
            Id = Guid.NewGuid(),
            ListingId = listing.Id,
            Listing = listing,
            BuyerId = buyer.Id,
            Buyer = buyer,
            DriverId = driver.Id,
            Driver = driver,
            QtyKg = 100m,
            TotalEtb = 10000m,
            Status = OrderStatus.PickedUp,
            EscrowHeld = true
        };

        var payment = new Payment
        {
            Id = Guid.NewGuid(),
            OrderId = order.Id,
            AmountEtb = 10000m,
            FarmerCut = 9000m,
            DriverCut = 500m,
            PlatformCut = 500m,
            Status = "Held"
        };

        db.Users.AddRange(farmer, buyer, driver);
        db.Listings.Add(listing);
        db.Orders.Add(order);
        db.Payments.Add(payment);
        await db.SaveChangesAsync();

        var mockPayment = new Mock<IPaymentGateway>();
        var mockSignalR = new Mock<ISignalRNotifier>();
        var mockSms = new Mock<ISmsService>();

        var handler = new DeliverOrderHandler(db, mockPayment.Object, mockSignalR.Object, mockSms.Object);

        // Act
        var result = await handler.Handle(new DeliverOrderCommand(order.Id, buyer.Id), default);

        // Assert
        result.IsSuccess.Should().BeTrue();

        var updatedOrder = await db.Orders.Include(o => o.Payment).FirstOrDefaultAsync(o => o.Id == order.Id);
        updatedOrder!.Status.Should().Be(OrderStatus.Delivered);
        updatedOrder.EscrowHeld.Should().BeFalse();
        updatedOrder.Payment!.Status.Should().Be("Released");
        updatedOrder.Payment.ReleasedAt.Should().NotBeNull();
    }

    [Fact]
    public void GeoUtils_Should_Calculate_Approximate_Distance_Between_Addis_And_Bishoftu()
    {
        // Addis Ababa: 9.0300, 38.7400
        // Bishoftu: 8.7523, 38.9785 (~40-45 km)
        var distance = GeoUtils.CalculateDistanceKm(9.0300, 38.7400, 8.7523, 38.9785);
        distance.Should().BeInRange(38.0, 50.0);
    }
}
