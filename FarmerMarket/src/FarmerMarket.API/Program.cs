using System.Text;
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
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// ── 1. Clean Architecture Layers ─────────────────────────────────────────────
builder.Services.AddApplicationServices();
builder.Services.AddInfrastructureServices(builder.Configuration);
// Infrastructure registers IOptions<JwtOptions> with ValidateOnStart — startup
// will throw OptionsValidationException immediately if Jwt:Key is missing or too short.

// Register API-layer SignalR notifier (overrides the infrastructure fallback)
builder.Services.AddScoped<ISignalRNotifier, SignalRNotifier>();

// ── 2. SignalR ────────────────────────────────────────────────────────────────
builder.Services.AddSignalR();

// ── 3. Controllers ────────────────────────────────────────────────────────────
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
    });

// ── 4. JWT Authentication (reads from IOptions<JwtOptions>) ──────────────────
// We build the service provider temporarily to resolve typed options so that
// the JWT middleware uses the same validated key as JwtService.
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    // Resolve typed options at runtime so middleware uses the validated key
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        // Key is resolved lazily via IssuerSigningKeyResolver to avoid building the SP twice
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

    // Support token in SignalR query string
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

// ── 5. Authorization Policies (RBAC) ─────────────────────────────────────────
builder.Services.AddAuthorization(AuthorizationPolicies.ConfigurePolicies);

// ── 6. CORS ───────────────────────────────────────────────────────────────────
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", policy =>
    {
        policy.SetIsOriginAllowed(_ => true)
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

// ── 7. Swagger / OpenAPI ──────────────────────────────────────────────────────
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

var app = builder.Build();

// ── Database Seed ─────────────────────────────────────────────────────────────
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var db = services.GetRequiredService<AppDbContext>();
        var logger = services.GetRequiredService<ILogger<Program>>();
        await DbInitializer.SeedAsync(db, logger, app.Environment.IsDevelopment());
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while seeding the database.");
    }
}

// ── Middleware Pipeline ───────────────────────────────────────────────────────
app.UseMiddleware<GlobalExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "FarmerMarket API v1");
        c.RoutePrefix = "swagger";
    });
}

app.UseRouting();
app.UseCors("AllowAllOrigins");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapHub<OrderHub>("/hubs/orders");

app.Run();
