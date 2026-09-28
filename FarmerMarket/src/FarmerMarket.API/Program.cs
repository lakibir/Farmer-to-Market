using System.Text;
using System.Threading.RateLimiting;
using FarmerMarket.API.Authorization;
using FarmerMarket.API.Hubs;
using FarmerMarket.API.Middleware;
using FarmerMarket.API.Services;
using FarmerMarket.Application;
using FarmerMarket.Application.Common.Interfaces;
using FarmerMarket.Infrastructure;
using FarmerMarket.Infrastructure.Data;
using FarmerMarket.Infrastructure.Options;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Cloud platform dynamic port support (Render/Fly.io/Heroku pass $PORT)
var envPort = Environment.GetEnvironmentVariable("PORT");
if (!string.IsNullOrEmpty(envPort) && int.TryParse(envPort, out _))
{
    builder.WebHost.UseUrls($"http://*:{envPort}");
}

// ── 1. Clean Architecture Layers ─────────────────────────────────────────────
builder.Services.AddApplicationServices();
builder.Services.AddInfrastructureServices(builder.Configuration);

// Register API-layer SignalR notifier
builder.Services.AddScoped<ISignalRNotifier, SignalRNotifier>();

// ── 2. SignalR ────────────────────────────────────────────────────────────────
builder.Services.AddSignalR();

// ── 3. Health Checks (Production probes) ──────────────────────────────────────
builder.Services.AddHealthChecks()
    .AddDbContextCheck<AppDbContext>("database", tags: new[] { "ready", "db" });

// ── 4. Rate Limiting (DDoS & Brute-force protection) ──────────────────────────
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    
    // Global fixed window rate limiter (100 req / minute per IP)
    options.AddPolicy("global", httpContext =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: httpContext.Connection.RemoteIpAddress?.ToString() ?? "anonymous",
            factory: _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 120,
                Window = TimeSpan.FromMinutes(1),
                QueueProcessingOrder = QueueProcessingOrder.OldestFirst,
                QueueLimit = 10
            }));

    // Strict rate limiter for auth / OTP endpoints (10 req / minute per IP)
    options.AddPolicy("auth-strict", httpContext =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: httpContext.Connection.RemoteIpAddress?.ToString() ?? "anonymous",
            factory: _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 10,
                Window = TimeSpan.FromMinutes(1),
                QueueProcessingOrder = QueueProcessingOrder.OldestFirst,
                QueueLimit = 0
            }));
});

// ── 5. Forwarded Headers (Reverse Proxy / Nginx / ALB) ───────────────────────
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
    options.KnownIPNetworks.Clear();
    options.KnownProxies.Clear();
});

// ── 6. Controllers ────────────────────────────────────────────────────────────
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
    });

// ── 7. JWT Authentication ────────────────────────────────────────────────────
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKeyResolver = (token, securityToken, kid, validationParameters) =>
        {
            var config = builder.Configuration;
            var key = config["Jwt:Key"] ?? string.Empty;
            return new[] { new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)) };
        },
        ValidateIssuer = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"] ?? "FarmerMarket.API",
        ValidateAudience = true,
        ValidAudience = builder.Configuration["Jwt:Audience"] ?? "FarmerMarket.Client",
        ClockSkew = TimeSpan.Zero
    };

    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            var accessToken = context.Request.Query["access_token"];
            var path = context.HttpContext.Request.Path;
            if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/hubs"))
                context.Token = accessToken;
            return Task.CompletedTask;
        }
    };
});

// ── 8. Authorization Policies (RBAC) ─────────────────────────────────────────
builder.Services.AddAuthorization(AuthorizationPolicies.ConfigurePolicies);

// ── 9. CORS (Allow-list with explicit credentials & Vercel auto-support) ─────
var defaultDevOrigins = new[] { "http://localhost:5173", "http://localhost:4200", "http://localhost:3000", "http://localhost:8080", "http://127.0.0.1:4200", "http://127.0.0.1:5173" };
var configuredOrigins = builder.Configuration["CORS_ALLOWED_ORIGINS"]?
    .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
    ?? (builder.Environment.IsDevelopment() ? defaultDevOrigins : Array.Empty<string>());

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowConfiguredOrigins", policy =>
    {
        policy.SetIsOriginAllowed(origin =>
        {
            if (string.IsNullOrWhiteSpace(origin)) return false;
            // Allow wildcard if configured
            if (configuredOrigins.Contains("*")) return true;
            // Allow explicit configured origins
            if (configuredOrigins.Contains(origin, StringComparer.OrdinalIgnoreCase)) return true;
            // Automatically allow all Vercel deployment and preview URLs (*.vercel.app)
            try
            {
                var uri = new Uri(origin);
                return uri.Host.EndsWith("vercel.app", StringComparison.OrdinalIgnoreCase);
            }
            catch
            {
                return false;
            }
        })
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
    });
});

// ── 10. Swagger / OpenAPI ─────────────────────────────────────────────────────
var enableSwagger = builder.Environment.IsDevelopment() || builder.Configuration.GetValue<bool>("EnableSwaggerInProduction", false);

if (enableSwagger)
{
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo
        {
            Title = "Farmer-to-Market Direct Produce Exchange API",
            Version = "v1",
            Description = "Ethiopian B2B Agricultural Marketplace connecting smallholder farmers directly with wholesale buyers via Telebirr/Chapa Escrow."
        });

        c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            Description = "JWT Authorization header using the Bearer scheme. Enter 'Bearer {token}'",
            Name = "Authorization",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.ApiKey,
            Scheme = "Bearer"
        });

        c.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
                },
                Array.Empty<string>()
            }
        });
    });
}

var app = builder.Build();

// ── Reverse Proxy Headers ─────────────────────────────────────────────────────
app.UseForwardedHeaders();

// ── Production Security Headers Middleware ────────────────────────────────────
app.Use(async (context, next) =>
{
    context.Response.Headers.Append("X-Content-Type-Options", "nosniff");
    context.Response.Headers.Append("X-Frame-Options", "DENY");
    context.Response.Headers.Append("X-XSS-Protection", "1; mode=block");
    context.Response.Headers.Append("Referrer-Policy", "strict-origin-when-cross-origin");
    context.Response.Headers.Append("Permissions-Policy", "geolocation=(self), microphone=(self), camera=()");

    if (!app.Environment.IsDevelopment())
    {
        context.Response.Headers.Append("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    }

    await next();
});

// ── Database Seed / Migration ─────────────────────────────────────────────────
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var db = services.GetRequiredService<AppDbContext>();
        var logger = services.GetRequiredService<ILogger<Program>>();
        var seedDemoData = app.Configuration.GetValue<bool>("SeedDemoData", false);
        await DbInitializer.SeedAsync(db, logger, app.Environment.IsDevelopment(), seedDemoData);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while initializing the database.");
    }
}

// ── Middleware Pipeline ───────────────────────────────────────────────────────
app.UseMiddleware<GlobalExceptionMiddleware>();

if (enableSwagger)
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "FarmerMarket API v1");
        c.RoutePrefix = "swagger";
    });
}

app.UseRouting();
app.UseCors("AllowConfiguredOrigins");
app.UseRateLimiter();
app.UseAuthentication();
app.UseAuthorization();

// ── Health Probes ─────────────────────────────────────────────────────────────
app.MapHealthChecks("/healthz", new HealthCheckOptions
{
    Predicate = _ => true,
    ResponseWriter = async (context, report) =>
    {
        context.Response.ContentType = "application/json";
        var result = System.Text.Json.JsonSerializer.Serialize(new
        {
            status = report.Status.ToString(),
            duration = report.TotalDuration.TotalMilliseconds,
            checks = report.Entries.Select(e => new
            {
                name = e.Key,
                status = e.Value.Status.ToString(),
                duration = e.Value.Duration.TotalMilliseconds,
                description = e.Value.Description
            })
        });
        await context.Response.WriteAsync(result);
    }
});

app.MapHealthChecks("/readyz", new HealthCheckOptions
{
    Predicate = check => check.Tags.Contains("ready")
});

app.MapHealthChecks("/livez", new HealthCheckOptions
{
    Predicate = _ => false
});

app.MapControllers();
app.MapHub<OrderHub>("/hubs/orders");

app.Run();
