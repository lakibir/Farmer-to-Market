using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using FarmerMarket.Application.Common.Interfaces;
using FarmerMarket.Domain.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace FarmerMarket.Infrastructure.Services;

public class JwtService(IConfiguration config) : IJwtService
{
    private readonly string _secret = config["Jwt:Key"] ?? "FarmerMarket_Secret_Key_For_Ethiopia_Telebirr_Escrow_2026_Secure_JWT_Token_Key!";
    private readonly string _issuer = config["Jwt:Issuer"] ?? "FarmerMarket.API";
    private readonly string _audience = config["Jwt:Audience"] ?? "FarmerMarket.Client";

    public string GenerateToken(User user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secret));
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
        {
            claims.Add(new("name_am", user.NameAm));
        }

        var token = new JwtSecurityToken(
            issuer: _issuer,
            audience: _audience,
            claims: claims,
            expires: DateTime.UtcNow.AddDays(30),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public Guid? ValidateToken(string token)
    {
        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_secret);

            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = true,
                ValidIssuer = _issuer,
                ValidateAudience = true,
                ValidAudience = _audience,
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
