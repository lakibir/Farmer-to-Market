using System.Text.RegularExpressions;
using FarmerMarket.Application.Common.Interfaces;
using FarmerMarket.Application.DTOs;
using FarmerMarket.Application.Features.Verification;
using FarmerMarket.Domain.Entities;
using FarmerMarket.Domain.Enums;
using FarmerMarket.Infrastructure.Data;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;

namespace FarmerMarket.Tests;

public class VerificationWorkflowTests
{
    private AppDbContext CreateInMemoryDbContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        return new AppDbContext(options);
    }

    [Fact]
    public async Task SubmitDocuments_Should_Update_Status_To_UnderReview_And_Send_Sms()
    {
        // Arrange
        using var db = CreateInMemoryDbContext();
        var mockSms = new Mock<ISmsService>();
        var user = new User
        {
            Id = Guid.NewGuid(),
            Phone = "+251911112233",
            Name = "Abebe Bikila",
            Role = UserRole.Farmer,
            Region = "Oromia",
            VerificationStatus = VerificationStatus.PendingSubmission
        };
        db.Users.Add(user);
        await db.SaveChangesAsync();

        var handler = new SubmitDocumentsHandler(db, mockSms.Object);
        var command = new SubmitDocumentsCommand(
            user.Id,
            new SubmitVerificationDocumentsDto(
                "1002345678",
                new List<DocumentSubmissionItemDto>
                {
                    new DocumentSubmissionItemDto(DocumentType.FaydaId, "FAN-1234-5678-9012", "https://storage.farm.et/fayda_front.jpg", "https://storage.farm.et/fayda_back.jpg", null),
                    new DocumentSubmissionItemDto(DocumentType.TinCertificate, "1002345678", "https://storage.farm.et/tin_cert.jpg", null, null)
                }
            )
        );

        // Act
        var result = await handler.Handle(command, default);

        // Assert
        result.IsSuccess.Should().BeTrue();
        result.Value!.VerificationStatus.Should().Be("UnderReview");
        result.Value.Documents.Should().HaveCount(2);

        var updatedUser = await db.Users.Include(u => u.Documents).FirstOrDefaultAsync(u => u.Id == user.Id);
        updatedUser.Should().NotBeNull();
        updatedUser!.VerificationStatus.Should().Be(VerificationStatus.UnderReview);
        updatedUser.TinNumber.Should().Be("1002345678");
        updatedUser.Documents.Should().HaveCount(2);

        mockSms.Verify(s => s.SendVerificationNotificationAsync(user.Phone, It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task AgentRegisterFarmer_Should_Create_Farmer_With_Agent_Attribution()
    {
        // Arrange
        using var db = CreateInMemoryDbContext();
        var mockSms = new Mock<ISmsService>();
        var agent = new User
        {
            Id = Guid.NewGuid(),
            Phone = "+251977777777",
            Name = "Kassahun Tolessa",
            Role = UserRole.Agent,
            Region = "Oromia",
            VerificationStatus = VerificationStatus.Approved
        };
        db.Users.Add(agent);
        await db.SaveChangesAsync();

        var handler = new AgentRegisterFarmerHandler(db, mockSms.Object);
        var command = new AgentRegisterFarmerCommand(
            agent.Id,
            new AgentRegisterFarmerDto(
                "Girma Wondimu",
                "ግርማ ወንድሙ",
                "+251988888888",
                "Oromia",
                "Kebele 04",
                "Teff",
                "FAN-8812-4091-2810",
                "0099881122",
                "https://storage.farm.et/girma_fayda.jpg",
                null,
                null
            )
        );

        // Act
        var result = await handler.Handle(command, default);

        // Assert
        result.IsSuccess.Should().BeTrue();
        result.Value!.VerificationStatus.Should().Be("UnderReview");

        var farmer = await db.Users.Include(u => u.Documents).FirstOrDefaultAsync(u => u.Id == result.Value.UserId);
        farmer.Should().NotBeNull();
        farmer!.Name.Should().Be("Girma Wondimu");
        farmer.RegistrationMethod.Should().Be("Agent");
        farmer.RegisteredByAgentId.Should().Be(agent.Id);
        farmer.Role.Should().Be(UserRole.Farmer);
        farmer.Documents.Should().HaveCount(2);

        mockSms.Verify(s => s.SendVerificationNotificationAsync(farmer.Phone, It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task ReviewVerification_Approve_Should_Approve_User_And_Add_Review_Log()
    {
        // Arrange
        using var db = CreateInMemoryDbContext();
        var mockSms = new Mock<ISmsService>();
        var admin = new User
        {
            Id = Guid.NewGuid(),
            Phone = "+251900000000",
            Name = "Admin Sara",
            Role = UserRole.Admin,
            Region = "Addis Ababa",
            VerificationStatus = VerificationStatus.Approved
        };
        var farmer = new User
        {
            Id = Guid.NewGuid(),
            Phone = "+251911223344",
            Name = "Belayneh Teshome",
            Role = UserRole.Farmer,
            Region = "Amhara",
            VerificationStatus = VerificationStatus.UnderReview
        };
        db.Users.AddRange(admin, farmer);
        await db.SaveChangesAsync();

        var handler = new ReviewVerificationHandler(db, mockSms.Object);
        var command = new ReviewVerificationCommand(
            admin.Id,
            farmer.Id,
            new ReviewVerificationDto("Approve", "All Fayda and TIN records match official MOR registry", null)
        );

        // Act
        var result = await handler.Handle(command, default);

        // Assert
        result.IsSuccess.Should().BeTrue();

        var updatedFarmer = await db.Users.Include(u => u.VerificationReviews).FirstOrDefaultAsync(u => u.Id == farmer.Id);
        updatedFarmer!.VerificationStatus.Should().Be(VerificationStatus.Approved);
        updatedFarmer.Verified.Should().BeTrue();
        updatedFarmer.VerificationReviews.Should().HaveCount(1);
        updatedFarmer.VerificationReviews.First().ActionTaken.Should().Be("Approved");

        mockSms.Verify(s => s.SendVerificationNotificationAsync(farmer.Phone, It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task ReviewVerification_Reject_Should_Set_Rejection_Reason_And_Send_Sms()
    {
        // Arrange
        using var db = CreateInMemoryDbContext();
        var mockSms = new Mock<ISmsService>();
        var admin = new User
        {
            Id = Guid.NewGuid(),
            Phone = "+251900000000",
            Name = "Admin Sara",
            Role = UserRole.Admin,
            Region = "Addis Ababa"
        };
        var farmer = new User
        {
            Id = Guid.NewGuid(),
            Phone = "+251911223344",
            Name = "Belayneh Teshome",
            Role = UserRole.Farmer,
            Region = "Amhara",
            VerificationStatus = VerificationStatus.UnderReview
        };
        db.Users.AddRange(admin, farmer);
        await db.SaveChangesAsync();

        var handler = new ReviewVerificationHandler(db, mockSms.Object);
        var command = new ReviewVerificationCommand(
            admin.Id,
            farmer.Id,
            new ReviewVerificationDto("Reject", "Photo blurry", "Blurry Fayda ID photo. Please re-upload clear image.")
        );

        // Act
        var result = await handler.Handle(command, default);

        // Assert
        result.IsSuccess.Should().BeTrue();

        var updatedFarmer = await db.Users.FirstOrDefaultAsync(u => u.Id == farmer.Id);
        updatedFarmer!.VerificationStatus.Should().Be(VerificationStatus.Rejected);
        updatedFarmer.RejectionReason.Should().Be("Blurry Fayda ID photo. Please re-upload clear image.");

        mockSms.Verify(s => s.SendVerificationNotificationAsync(farmer.Phone, It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Once);
    }
}
