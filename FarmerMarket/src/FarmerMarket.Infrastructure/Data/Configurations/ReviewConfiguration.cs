using FarmerMarket.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FarmerMarket.Infrastructure.Data.Configurations;

public class ReviewConfiguration : IEntityTypeConfiguration<Review>
{
    public void Configure(EntityTypeBuilder<Review> b)
    {
        b.HasKey(r => r.Id);
        b.Property(r => r.Comment).HasMaxLength(1000);

        b.HasOne(r => r.Order)
            .WithOne(o => o.Review)
            .HasForeignKey<Review>(r => r.OrderId)
            .OnDelete(DeleteBehavior.Cascade);

        b.HasOne(r => r.Reviewer)
            .WithMany(u => u.ReviewsGiven)
            .HasForeignKey(r => r.ReviewerId)
            .OnDelete(DeleteBehavior.Restrict);

        b.HasOne(r => r.Reviewee)
            .WithMany(u => u.ReviewsReceived)
            .HasForeignKey(r => r.RevieweeId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
