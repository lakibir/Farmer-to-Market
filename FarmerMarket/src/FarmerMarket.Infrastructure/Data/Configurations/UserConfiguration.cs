using FarmerMarket.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FarmerMarket.Infrastructure.Data.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> b)
    {
        b.HasKey(u => u.Id);
        b.Property(u => u.Phone).HasMaxLength(20).IsRequired();
        b.HasIndex(u => u.Phone).IsUnique();
        b.Property(u => u.Name).HasMaxLength(100).IsRequired();
        b.Property(u => u.NameAm).HasMaxLength(100);
        b.Property(u => u.Role).HasConversion<string>();
        b.Property(u => u.Region).HasMaxLength(100).HasDefaultValue("Addis Ababa");
        b.Property(u => u.Verified).HasDefaultValue(false);
    }
}
