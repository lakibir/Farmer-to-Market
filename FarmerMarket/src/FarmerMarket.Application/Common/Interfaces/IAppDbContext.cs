using FarmerMarket.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace FarmerMarket.Application.Common.Interfaces;

public interface IAppDbContext
{
    DbSet<User> Users { get; }
    DbSet<Listing> Listings { get; }
    DbSet<Order> Orders { get; }
    DbSet<Payment> Payments { get; }
    DbSet<Review> Reviews { get; }
    DbSet<Notification> Notifications { get; }
    DbSet<UserDocument> UserDocuments { get; }
    DbSet<VerificationReview> VerificationReviews { get; }
    DbSet<AuditLog> AuditLogs { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
