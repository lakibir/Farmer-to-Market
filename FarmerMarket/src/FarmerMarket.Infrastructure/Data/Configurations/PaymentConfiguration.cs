using FarmerMarket.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FarmerMarket.Infrastructure.Data.Configurations;

public class PaymentConfiguration : IEntityTypeConfiguration<Payment>
{
    public void Configure(EntityTypeBuilder<Payment> b)
    {
        b.HasKey(p => p.Id);
        b.Property(p => p.AmountEtb).HasPrecision(12, 2);
        b.Property(p => p.FarmerCut).HasPrecision(12, 2);
        b.Property(p => p.DriverCut).HasPrecision(12, 2);
        b.Property(p => p.PlatformCut).HasPrecision(12, 2);
        b.Property(p => p.Status).HasMaxLength(20).HasDefaultValue("Held");
        b.Property(p => p.TelebirrRef).HasMaxLength(100);

        b.HasOne(p => p.Order)
            .WithOne(o => o.Payment)
            .HasForeignKey<Payment>(p => p.OrderId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
