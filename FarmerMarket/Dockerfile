# ==========================================
# Stage 1: Build & Publish
# ==========================================
FROM mcr.microsoft.com/dotnet/sdk:10.0-preview-alpine AS build
WORKDIR /src

# Copy solution and project files for layer caching
COPY FarmerMarket.slnx ./
COPY src/FarmerMarket.Domain/FarmerMarket.Domain.csproj src/FarmerMarket.Domain/
COPY src/FarmerMarket.Application/FarmerMarket.Application.csproj src/FarmerMarket.Application/
COPY src/FarmerMarket.Infrastructure/FarmerMarket.Infrastructure.csproj src/FarmerMarket.Infrastructure/
COPY src/FarmerMarket.API/FarmerMarket.API.csproj src/FarmerMarket.API/
COPY tests/FarmerMarket.Tests/FarmerMarket.Tests.csproj tests/FarmerMarket.Tests/

# Restore dependencies
RUN dotnet restore FarmerMarket.slnx

# Copy all source code
COPY src/ src/
COPY tests/ tests/

# Build and test
RUN dotnet test tests/FarmerMarket.Tests/FarmerMarket.Tests.csproj --no-restore -c Release
RUN dotnet publish src/FarmerMarket.API/FarmerMarket.API.csproj -c Release -o /app/publish /p:UseAppHost=false

# ==========================================
# Stage 2: Production Runtime
# ==========================================
FROM mcr.microsoft.com/dotnet/aspnet:10.0-alpine AS final
WORKDIR /app

# Add curl for container healthcheck probe
RUN apk add --no-cache curl tzdata

# Configure non-root secure user
USER $APP_UID

EXPOSE 8080
ENV ASPNETCORE_HTTP_PORTS=8080 \
    ASPNETCORE_ENVIRONMENT=Production \
    DOTNET_RUNNING_IN_CONTAINER=true \
    ALLOW_IN_MEMORY_DB=true \
    TZ=Africa/Addis_Ababa

COPY --from=build /app/publish .

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:8080/healthz || exit 1

ENTRYPOINT ["dotnet", "FarmerMarket.API.dll"]
