using FarmerMarket.Application.Common.Interfaces;
using FarmerMarket.Infrastructure.Data;
using FarmerMarket.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FarmerMarket.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("Default");

        if (!string.IsNullOrWhiteSpace(connectionString) && !connectionString.Contains("Host=db"))
        {
            services.AddDbContext<AppDbContext>(options =>
                options.UseNpgsql(connectionString));
        }
        else
        {
            // Default fast development / in-memory database for seamless instant execution
            services.AddDbContext<AppDbContext>(options =>
                options.UseInMemoryDatabase("FarmerMarketDb"));
        }

        services.AddScoped<IAppDbContext>(provider => provider.GetRequiredService<AppDbContext>());

        services.AddSingleton<IJwtService, JwtService>();
        services.AddSingleton<IOtpService, OtpService>();
        services.AddScoped<ITelebirrService, TelebirrService>();
        services.AddScoped<ISmsService, TwilioSmsService>();
        services.AddSingleton<ISignalRNotifier, FallbackSignalRNotifier>();

        return services;
    }
}
