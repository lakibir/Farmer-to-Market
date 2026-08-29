using System.Reflection;
using FarmerMarket.Application.Common.Interfaces;
using FarmerMarket.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace FarmerMarket.Infrastructure.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options), IAppDbContext
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Listing> Listings => Set<Listing>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<Payment> Payments => Set<Payment>();
    public DbSet<Review> Reviews => Set<Review>();
    public DbSet<Notification> Notifications => Set<Notification>();
    public DbSet<UserDocument> UserDocuments => Set<UserDocument>();
    public DbSet<VerificationReview> VerificationReviews => Set<VerificationReview>();
    public DbSet<AuditLog> AuditLogs => Set<AuditLog>();
    public DbSet<SavedAddress> SavedAddresses => Set<SavedAddress>();
    public DbSet<PaymentMethod> PaymentMethods => Set<PaymentMethod>();
    public DbSet<Coupon> Coupons => Set<Coupon>();
    public DbSet<NotificationPreference> NotificationPreferences => Set<NotificationPreference>();
    public DbSet<UserSession> UserSessions => Set<UserSession>();
    public DbSet<TwoFactorSetting> TwoFactorSettings => Set<TwoFactorSetting>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        builder.Entity<UserDocument>()
            .HasOne(d => d.User)
            .WithMany(u => u.Documents)
            .HasForeignKey(d => d.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<VerificationReview>()
            .HasOne(r => r.User)
            .WithMany(u => u.VerificationReviews)
            .HasForeignKey(r => r.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<SavedAddress>().HasOne(x => x.User).WithMany().HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.Cascade);
        builder.Entity<PaymentMethod>().HasOne(x => x.User).WithMany().HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.Cascade);
        builder.Entity<Payment>().HasOne(x => x.PaymentMethod).WithMany().HasForeignKey(x => x.PaymentMethodId).OnDelete(DeleteBehavior.SetNull);
        builder.Entity<Coupon>().HasOne(x => x.User).WithMany().HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.SetNull);
        builder.Entity<NotificationPreference>().HasOne(x => x.User).WithMany().HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.Cascade);
        builder.Entity<UserSession>().HasOne(x => x.User).WithMany().HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.Cascade);
        builder.Entity<TwoFactorSetting>().HasOne(x => x.User).WithMany().HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.Cascade);
        builder.Entity<PaymentMethod>().Property(x => x.ProviderToken).IsRequired().HasMaxLength(500);
        builder.Entity<Coupon>().HasIndex(x => x.Code).IsUnique();
        builder.Entity<NotificationPreference>().HasIndex(x => new { x.UserId, x.EventType }).IsUnique();
    }
}
