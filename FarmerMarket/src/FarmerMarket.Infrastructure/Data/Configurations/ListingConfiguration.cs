using FarmerMarket.Domain.Entities;
using FarmerMarket.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FarmerMarket.Infrastructure.Data.Configurations;

public class ListingConfiguration : IEntityTypeConfiguration<Listing>
{
    public void Configure(EntityTypeBuilder<Listing> b)
    {
        b.HasKey(l => l.Id);
        b.Property(l => l.ProductName).HasMaxLength(100).IsRequired();
        b.Property(l => l.NameAm).HasMaxLength(100);
        b.Property(l => l.Category).HasMaxLength(50).IsRequired();
        b.Property(l => l.PricePerKg).HasPrecision(10, 2);
        b.Property(l => l.QtyKg).HasPrecision(10, 2);
        b.Property(l => l.MinOrderKg).HasPrecision(10, 2);
        b.Property(l => l.Status).HasConversion<string>().HasDefaultValue(ListingStatus.Active);

        b.HasOne(l => l.Farmer)
            .WithMany(u => u.Listings)
            .HasForeignKey(l => l.FarmerId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
