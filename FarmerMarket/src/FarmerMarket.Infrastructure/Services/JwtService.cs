using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using FarmerMarket.Application.Common.Interfaces;
using FarmerMarket.Domain.Entities;
using FarmerMarket.Infrastructure.Options;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace FarmerMarket.Infrastructure.Services;

public class JwtService(IOptions<JwtOptions> jwtOptions) : IJwtService
{
    private readonly JwtOptions _opts = jwtOptions.Value;

    public string GenerateToken(User user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_opts.Key));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.MobilePhone, user.Phone),
            new(ClaimTypes.Name, user.Name),
            new(ClaimTypes.Role, user.Role.ToString().ToLower()),
            new("region", user.Region),
            new("verified", user.Verified.ToString())
        };

        if (!string.IsNullOrWhiteSpace(user.NameAm))
            claims.Add(new("name_am", user.NameAm));

        var token = new JwtSecurityToken(
            issuer: _opts.Issuer,
            audience: _opts.Audience,
            claims: claims,
            expires: DateTime.UtcNow.AddDays(_opts.ExpiryDays),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public Guid? ValidateToken(string token)
    {
        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_opts.Key);

            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = true,
                ValidIssuer = _opts.Issuer,
                ValidateAudience = true,
                ValidAudience = _opts.Audience,
                ClockSkew = TimeSpan.Zero
            }, out var validatedToken);

            var jwtToken = (JwtSecurityToken)validatedToken;
            var userIdClaim = jwtToken.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value;

            return Guid.Parse(userIdClaim);
        }
        catch
        {
            return null;
        }
    }
}
