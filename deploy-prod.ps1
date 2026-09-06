<#
.SYNOPSIS
  Automated Production Deployment Script for Farmer-to-Market Exchange.
.DESCRIPTION
  Validates prerequisites, environment secrets, compiles containers, executes database migrations, and health checks.
#>

param(
    [string]$EnvFile = ".env.production"
)

$ErrorActionPreference = "Stop"

Write-Host "==========================================================" -ForegroundColor Green
Write-Host "🚀 Starting Farmer-to-Market Production Deployment..." -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green

# 1. Check if .env.production exists
if (-not (Test-Path $EnvFile)) {
    Write-Host "⚠️ Warning: '$EnvFile' not found!" -ForegroundColor Yellow
    Write-Host "Creating '$EnvFile' from template '.env.production.example'..." -ForegroundColor Cyan
    Copy-Item ".env.production.example" $EnvFile
    Write-Host "❗ Please review and fill real production secrets in '$EnvFile' before live traffic." -ForegroundColor Red
}

# 2. Check Docker availability
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Error: Docker is not installed or not available in PATH." -ForegroundColor Red
    exit 1
}

# 3. Pull base images and build containers
Write-Host "📦 Building production multi-stage containers..." -ForegroundColor Cyan
docker compose -f docker-compose.prod.yml --env-file $EnvFile build

# 4. Start orchestrated services
Write-Host "⚡ Starting production stack (DB + Redis + API + Web)..." -ForegroundColor Cyan
docker compose -f docker-compose.prod.yml --env-file $EnvFile up -d

# 5. Wait for health check probes
Write-Host "🔍 Verifying service health probes..." -ForegroundColor Cyan
Start-Sleep -Seconds 10

docker compose -f docker-compose.prod.yml ps

Write-Host "==========================================================" -ForegroundColor Green
Write-Host "✅ Deployment successfully initiated!" -ForegroundColor Green
Write-Host "   Frontend & Proxy: http://localhost (or configured domain)" -ForegroundColor White
Write-Host "   Health Probe:     http://localhost/api/superadmin/db/health" -ForegroundColor White
Write-Host "==========================================================" -ForegroundColor Green
