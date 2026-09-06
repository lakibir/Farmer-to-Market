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
    DbSet<SavedAddress> SavedAddresses { get; }
    DbSet<PaymentMethod> PaymentMethods { get; }
    DbSet<Coupon> Coupons { get; }
    DbSet<NotificationPreference> NotificationPreferences { get; }
    DbSet<UserSession> UserSessions { get; }
    DbSet<TwoFactorSetting> TwoFactorSettings { get; }

    // Governance & Market Intelligence
    DbSet<DeliveryZone> DeliveryZones { get; }
    DbSet<FeatureFlag> FeatureFlags { get; }
    DbSet<BlacklistEntry> BlacklistEntries { get; }
    DbSet<PayoutRecord> PayoutRecords { get; }
    DbSet<SystemSetting> SystemSettings { get; }
    DbSet<CommodityPriceIndexEntity> CommodityPriceIndices { get; }
    DbSet<RegionalPricePointEntity> RegionalPricePoints { get; }
    DbSet<PriceHistoryPointEntity> PriceHistoryPoints { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
