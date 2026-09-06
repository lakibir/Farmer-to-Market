using FarmerMarket.Application.Common.Interfaces;
using FarmerMarket.Application.Common.Models;
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
        // ─── Typed Options (IOptions<T>) with Fail-Fast Validation ─────────────
        services.AddOptions<JwtOptions>()
            .Bind(configuration.GetSection(JwtOptions.SectionName))
            .ValidateDataAnnotations()
            .ValidateOnStart();

        services.AddOptions<EscrowOptions>()
            .Bind(configuration.GetSection(EscrowOptions.SectionName))
            .ValidateDataAnnotations()
            .ValidateOnStart();

        services.AddOptions<TelebirrOptions>()
            .Bind(configuration.GetSection(TelebirrOptions.SectionName))
            .ValidateDataAnnotations()
            .ValidateOnStart();

        services.AddOptions<ChapaOptions>()
            .Bind(configuration.GetSection(ChapaOptions.SectionName))
            .ValidateDataAnnotations()
            .ValidateOnStart();

        services.AddOptions<SmsOptions>()
            .Bind(configuration.GetSection(SmsOptions.SectionName))
            .ValidateDataAnnotations()
            .ValidateOnStart();

        services.AddOptions<EmailOptions>()
            .Bind(configuration.GetSection(EmailOptions.SectionName))
            .ValidateDataAnnotations()
            .ValidateOnStart();

        // ─── Database Configuration ───────────────────────────────────────────
        var connectionString = configuration.GetConnectionString("Default")
            ?? configuration.GetConnectionString("TmsDatabase")
            ?? configuration["DATABASE_URL"];

        var environment = configuration["ASPNETCORE_ENVIRONMENT"] ?? "Development";
        var isProduction = environment.Equals("Production", StringComparison.OrdinalIgnoreCase);

        if (!string.IsNullOrWhiteSpace(connectionString) && !connectionString.Equals("InMemory", StringComparison.OrdinalIgnoreCase))
        {
            services.AddDbContext<AppDbContext>(options =>
                options.UseNpgsql(connectionString, npgsqlOptions =>
                {
                    npgsqlOptions.EnableRetryOnFailure(maxRetryCount: 3, maxRetryDelay: TimeSpan.FromSeconds(2), errorCodesToAdd: null);
                }));
        }
        else
        {
            if (isProduction)
            {
                throw new InvalidOperationException(
                    "FATAL: Production database connection string 'ConnectionStrings:Default' or 'DATABASE_URL' is missing. " +
                    "Silent fallback to an in-memory database is strictly prohibited in Production mode.");
            }

            // In-memory database for unit tests or explicitly disconnected dev runs
            services.AddDbContext<AppDbContext>(options =>
                options.UseInMemoryDatabase("FarmerMarketDb"));
        }

        services.AddScoped<IAppDbContext>(provider => provider.GetRequiredService<AppDbContext>());

        // ─── Core Services ────────────────────────────────────────────────────
        services.AddSingleton<IJwtService, JwtService>();
        services.AddSingleton<IOtpService, OtpService>();
        services.AddSingleton<ISignalRNotifier, FallbackSignalRNotifier>();
        services.AddSingleton<ISuperAdminGovernanceStore, SuperAdminGovernanceStore>();
        services.AddScoped<IEmailService, EmailService>();

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
                _ => sp.GetRequiredService<TwilioSmsService>() // Log mode: safe local development logging
            };
        });

        return services;
    }
}
