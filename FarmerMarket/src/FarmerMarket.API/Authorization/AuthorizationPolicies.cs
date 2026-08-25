using Microsoft.AspNetCore.Authorization;

namespace FarmerMarket.API.Authorization;

/// <summary>
/// Single source of truth for all authorization policy names and their definitions.
/// Role hierarchy: SuperAdmin > Admin > Farmer / Driver / Buyer / Agent
/// </summary>
public static class AuthorizationPolicies
{
    // Policy name constants — use these instead of magic strings in [Authorize(Policy = "...")]
    public const string SuperAdminOnly = "SuperAdminOnly";
    public const string AdminOrAbove = "AdminOrAbove";
    public const string OperationalStaff = "OperationalStaff";   // Admin + SuperAdmin
    public const string VerifiedFarmer = "VerifiedFarmer";
    public const string DriverOnly = "DriverOnly";
    public const string BuyerOnly = "BuyerOnly";
    public const string AnyAuthenticated = "AnyAuthenticated";

    public static void ConfigurePolicies(AuthorizationOptions options)
    {
        // SuperAdmin is the only role that can manage platform settings,
        // create/suspend Admin accounts, and view system-wide audit logs.
        options.AddPolicy(SuperAdminOnly, policy =>
            policy.RequireAuthenticatedUser()
                  .RequireRole("superadmin"));

        // Admin + SuperAdmin — day-to-day operational permissions
        options.AddPolicy(AdminOrAbove, policy =>
            policy.RequireAuthenticatedUser()
                  .RequireRole("admin", "superadmin"));

        // Alias for AdminOrAbove — for readability at call sites
        options.AddPolicy(OperationalStaff, policy =>
            policy.RequireAuthenticatedUser()
                  .RequireRole("admin", "superadmin"));

        // Farmers (verified or not) — for listing management endpoints
        options.AddPolicy(VerifiedFarmer, policy =>
            policy.RequireAuthenticatedUser()
                  .RequireRole("farmer"));

        options.AddPolicy(DriverOnly, policy =>
            policy.RequireAuthenticatedUser()
                  .RequireRole("driver"));

        options.AddPolicy(BuyerOnly, policy =>
            policy.RequireAuthenticatedUser()
                  .RequireRole("buyer"));

        // Any logged-in user regardless of role
        options.AddPolicy(AnyAuthenticated, policy =>
            policy.RequireAuthenticatedUser());
    }
}
