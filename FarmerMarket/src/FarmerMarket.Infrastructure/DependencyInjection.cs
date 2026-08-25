using FarmerMarket.Application.Common.Interfaces;
using FarmerMarket.Infrastructure.Data;
using FarmerMarket.Infrastructure.Options;
using FarmerMarket.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace FarmerMarket.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        // ─── Typed Options (IOptions<T>) ─────────────────────────────────────
        services.AddOptions<JwtOptions>()
            .Bind(configuration.GetSection(JwtOptions.SectionName))
            .ValidateDataAnnotations()
            .ValidateOnStart();      // Fail fast at startup if Jwt:Key is missing/short

        services.AddOptions<TelebirrOptions>()
            .Bind(configuration.GetSection(TelebirrOptions.SectionName));

        services.AddOptions<ChapaOptions>()
            .Bind(configuration.GetSection(ChapaOptions.SectionName))
            .ValidateDataAnnotations(); // Fail fast if SecretKey is missing when Chapa is the active provider

        services.AddOptions<SmsOptions>()
            .Bind(configuration.GetSection(SmsOptions.SectionName));

        services.AddOptions<EscrowOptions>()
            .Bind(configuration.GetSection(EscrowOptions.SectionName));

        // ─── Database ─────────────────────────────────────────────────────────
        var connectionString = configuration.GetConnectionString("Default")
            ?? configuration.GetConnectionString("TmsDatabase")
            ?? configuration["DATABASE_URL"];

        if (!string.IsNullOrWhiteSpace(connectionString) && !connectionString.Contains("Host=db"))
        {
            services.AddDbContext<AppDbContext>(options =>
                options.UseNpgsql(connectionString, npgsqlOptions =>
                {
                    npgsqlOptions.EnableRetryOnFailure(3, TimeSpan.FromSeconds(2), null);
                }));
        }
        else
        {
            // In-memory database for local development / CI without a running Postgres
            services.AddDbContext<AppDbContext>(options =>
                options.UseInMemoryDatabase("FarmerMarketDb"));
        }

        services.AddScoped<IAppDbContext>(provider => provider.GetRequiredService<AppDbContext>());

        // ─── Core Services ────────────────────────────────────────────────────
        services.AddSingleton<IJwtService, JwtService>();
        services.AddSingleton<IOtpService, OtpService>();
        services.AddSingleton<ISignalRNotifier, FallbackSignalRNotifier>();

        // ─── Payment Gateway (config-driven provider selection) ───────────────
        services.AddScoped<TelebirrService>();
        services.AddScoped<ChapaService>();
        services.AddScoped<ITelebirrService>(sp => sp.GetRequiredService<TelebirrService>());

        services.AddScoped<IPaymentGateway>(sp =>
        {
            var escrowOpts = sp.GetRequiredService<IOptions<EscrowOptions>>().Value;
            return escrowOpts.PaymentProvider.Equals("Chapa", StringComparison.OrdinalIgnoreCase)
                ? (IPaymentGateway)sp.GetRequiredService<ChapaService>()
                : sp.GetRequiredService<TelebirrService>();
        });

        // ─── SMS Provider (config-driven) ─────────────────────────────────────
        services.AddScoped<TwilioSmsService>();
        services.AddScoped<AfroMessageSmsService>();

        services.AddScoped<ISmsService>(sp =>
        {
            var smsOpts = sp.GetRequiredService<IOptions<SmsOptions>>().Value;
            return smsOpts.Provider switch
            {
                SmsProviderType.AfroMessage => (ISmsService)sp.GetRequiredService<AfroMessageSmsService>(),
                SmsProviderType.Twilio => sp.GetRequiredService<TwilioSmsService>(),
                _ => sp.GetRequiredService<TwilioSmsService>() // Log mode: TwilioSmsService logs without credentials
            };
        });

        return services;
    }
}
