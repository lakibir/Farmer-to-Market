using System.Security.Claims;
using FarmerMarket.Domain.Enums;

namespace FarmerMarket.API.Extensions;

public static class ClaimsPrincipalExtensions
{
    public static Guid GetUserId(this ClaimsPrincipal principal)
    {
        var claim = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value
                    ?? principal.FindFirst("sub")?.Value;

        if (string.IsNullOrEmpty(claim) || !Guid.TryParse(claim, out var userId))
        {
            throw new UnauthorizedAccessException("User ID claim is missing or invalid.");
        }

        return userId;
    }

    public static UserRole GetUserRole(this ClaimsPrincipal principal)
    {
        var roleClaim = principal.FindFirst(ClaimTypes.Role)?.Value;
        if (!string.IsNullOrEmpty(roleClaim) && Enum.TryParse<UserRole>(roleClaim, true, out var role))
        {
            return role;
        }

        return UserRole.Buyer;
    }
}
