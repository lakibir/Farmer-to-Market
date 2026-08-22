using FarmerMarket.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FarmerMarket.Infrastructure.Data.Configurations;

public class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> b)
    {
        b.HasKey(o => o.Id);
        b.Property(o => o.QtyKg).HasPrecision(10, 2);
        b.Property(o => o.TotalEtb).HasPrecision(12, 2);
        b.Property(o => o.Status).HasConversion<string>();
        b.Property(o => o.EscrowHeld).HasDefaultValue(true);
        b.Property(o => o.PaymentRef).HasMaxLength(100);
        b.Property(o => o.PickupPhoto).HasMaxLength(500);

        b.HasOne(o => o.Listing)
            .WithMany(l => l.Orders)
            .HasForeignKey(o => o.ListingId)
            .OnDelete(DeleteBehavior.Restrict);

        b.HasOne(o => o.Buyer)
            .WithMany(u => u.OrdersAsBuyer)
            .HasForeignKey(o => o.BuyerId)
            .OnDelete(DeleteBehavior.Restrict);

        b.HasOne(o => o.Driver)
            .WithMany(u => u.OrdersAsDriver)
            .HasForeignKey(o => o.DriverId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}
