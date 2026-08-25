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
    }
}
