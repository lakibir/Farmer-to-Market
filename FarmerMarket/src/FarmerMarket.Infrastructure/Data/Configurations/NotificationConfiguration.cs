using FarmerMarket.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FarmerMarket.Infrastructure.Data.Configurations;

public class NotificationConfiguration : IEntityTypeConfiguration<Notification>
{
    public void Configure(EntityTypeBuilder<Notification> b)
    {
        b.HasKey(n => n.Id);
        b.Property(n => n.Type).HasMaxLength(50).IsRequired();
        b.Property(n => n.Channel).HasMaxLength(20).HasDefaultValue("push");
        b.Property(n => n.MessageEn).HasMaxLength(1000);
        b.Property(n => n.MessageAm).HasMaxLength(1000);
        b.Property(n => n.Read).HasDefaultValue(false);

        b.HasOne(n => n.User)
            .WithMany(u => u.Notifications)
            .HasForeignKey(n => n.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
