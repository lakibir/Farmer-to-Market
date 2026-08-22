using FarmerMarket.Domain.Entities;

namespace FarmerMarket.Application.Common.Interfaces;

public interface IJwtService
{
    string GenerateToken(User user);
    Guid? ValidateToken(string token);
}
