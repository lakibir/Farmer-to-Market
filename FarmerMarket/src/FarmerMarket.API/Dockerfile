FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY ["FarmerMarket.Domain/FarmerMarket.Domain.csproj", "FarmerMarket.Domain/"]
COPY ["FarmerMarket.Application/FarmerMarket.Application.csproj", "FarmerMarket.Application/"]
COPY ["FarmerMarket.Infrastructure/FarmerMarket.Infrastructure.csproj", "FarmerMarket.Infrastructure/"]
COPY ["FarmerMarket.API/FarmerMarket.API.csproj", "FarmerMarket.API/"]

RUN dotnet restore "FarmerMarket.API/FarmerMarket.API.csproj"
COPY . .
WORKDIR "/src/FarmerMarket.API"
RUN dotnet build "FarmerMarket.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "FarmerMarket.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "FarmerMarket.API.dll"]
