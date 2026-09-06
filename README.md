# 🌾 FARMER-TO-MARKET: Direct Produce Exchange (Ethiopia)

> An enterprise, bilingual (Amharic + English) digital agricultural marketplace connecting 15M+ Ethiopian smallholder farmers directly with commercial wholesale buyers and transport drivers, powered by **Telebirr & Chapa Escrow** (authoritative 90% Farmer / 5% Driver / 5% Platform split).

---

## 🏗️ Architecture & Technology Stack

- **Backend**: Clean Architecture with ASP.NET Core (.NET 10), Entity Framework Core (PostgreSQL/PostGIS), MediatR CQRS, and SignalR.
- **Frontend**: Responsive Single-Page Application (TypeScript, Tailwind CSS, Ethiopic + Outfit typography, live SignalR telemetry).
- **Database**: PostgreSQL 16 + PostGIS for spatial logistics and geo-proximity routing.
- **Caching & Rate Limiting**: Redis 7 and ASP.NET Core built-in rate limiters (IP-partitioned sliding window).
- **Payments**: Multi-gateway Escrow Engine supporting **Telebirr** and **Chapa** with automatic release upon verified delivery.
- **Messaging**: Config-driven SMS gateway supporting **AfroMessage** (Ethiopian native) and **Twilio**, with safe local log fallback.
- **Security**: 12-Factor App compliant, HMAC-SHA256 hashed OTPs with brute-force lockout, non-root Docker containers, strict CORS allow-lists, and HSTS/CSP security headers.

---

## 📁 Repository Structure

```text
framemarket1/
├── docker-compose.prod.yml         # Production Orchestration (DB, Redis, API, Web)
├── .env.example                    # Complete environment variables template
├── .env.production.example         # Production deployment secrets template
├── deploy-prod.sh                  # Automated Linux/Cloud deployment script
├── deploy-prod.ps1                 # Automated Windows PowerShell deployment script
├── FarmerMarket/                   # ASP.NET Core Backend Solution
│   ├── Dockerfile                  # Multi-stage production container (.NET 10 Alpine)
│   ├── src/
│   │   ├── FarmerMarket.Domain/    # Entities (User, Listing, Order, Payment, Governance) & Enums
│   │   ├── FarmerMarket.Application/ # MediatR CQRS Commands, Queries, Authoritative Escrow Model
│   │   ├── FarmerMarket.Infrastructure/ # EF Core AppDbContext, PostGIS, Gateways, Fail-Fast DI
│   │   └── FarmerMarket.API/       # REST Controllers, SignalR Hubs, Security Headers, Health Probes
│   └── tests/
│       └── FarmerMarket.Tests/     # Comprehensive xUnit, Security & Production Hardening Tests
└── farmer-market-web/              # Frontend Application
    ├── Dockerfile                  # Multi-stage production Nginx container
    ├── nginx.conf                  # Production reverse proxy, caching & security headers
    ├── src/
    │   ├── components/             # Buyer, Farmer, Driver, Admin, SuperAdmin & Modals
    │   ├── i18n/                   # English & Amharic (አማርኛ) translation engine
    │   ├── services/               # API client, public config consumer & SignalR tracking
    │   └── styles/main.css         # Modern design tokens & animations
    └── package.json
```

---

## 🚀 Quick Start Guide

### 1. Local Development Setup

#### Prerequisites
- .NET 10 SDK
- Node.js 20+ & npm
- PostgreSQL 16 with PostGIS (or use Docker compose)

#### Backend (.NET API)
```bash
cd FarmerMarket
# Optional: Set local development user secrets
dotnet user-secrets set "Jwt:Key" "YourDevelopmentSecretKey_AtLeast32CharsLong_2026!" --project src/FarmerMarket.API

# Run automated test suite
dotnet test

# Start the API server
dotnet run --project src/FarmerMarket.API
```
- **API URL**: `http://localhost:5155`
- **Swagger Documentation** (Dev mode only): `http://localhost:5155/swagger`
- **Health Probes**: `http://localhost:5155/healthz`
- **Public Authoritative Config**: `http://localhost:5155/api/config/public`

#### Frontend (Vite Client)
```bash
cd farmer-market-web
npm install
npm run build    # Type-check & verify build
npm run dev      # Start Vite dev server on http://localhost:4200
```
Open **`http://localhost:4200`** in your browser.

---

## 🐳 Production Deployment (Docker Compose)

### 1. Configure Environment Secrets
Copy `.env.production.example` to `.env.production` on your server:
```bash
cp .env.production.example .env.production
```
Fill in real production credentials:
- `POSTGRES_PASSWORD`: Strong database password (min 32 chars).
- `REDIS_PASSWORD`: Strong Redis password (min 32 chars).
- `JWT_KEY`: Cryptographically secure HMAC-SHA256 secret (min 64 chars).
- `CHAPA_SECRET_KEY` / `TELEBIRR_APP_KEY`: Payment gateway production API keys.
- `CORS_ALLOWED_ORIGINS`: Comma-separated list of allowed production domains (e.g. `https://farmermarket.et`).

### 2. Launch Production Stack

#### On Linux / Cloud:
```bash
chmod +x deploy-prod.sh
./deploy-prod.sh .env.production
```

#### On Windows (PowerShell):
```powershell
.\deploy-prod.ps1 -EnvFile .env.production
```

#### Or Directly via Docker Compose:
```bash
docker compose -f docker-compose.prod.yml --env-file .env.production up -d --build
```

---

## 🔐 Security & Secret Management Principles

1. **Zero Secret Leakage**: No plain passwords, JWT keys, or private gateway tokens are stored in source code or sent to the client.
2. **Fail-Fast Validation**: The backend validates required production settings on startup (`ValidateOnStart`). Missing connection strings or short JWT keys abort startup immediately.
3. **Strict CORS**: Cross-Origin Resource Sharing is locked down to explicit origins configured via `CORS_ALLOWED_ORIGINS`.
4. **Rate Limiting & Lockouts**: Public endpoints are throttled via IP-partitioned sliding windows. OTP verification locks out brute-force attempts after 5 consecutive failures.
5. **No In-Memory Fallback in Production**: In `Production` mode, an unreachable PostgreSQL database throws an exception rather than silently falling back to mock storage.

---

## 💳 Authoritative Escrow & Business Rules

Financial parameters are centralized in `FarmerMarket.Application.Common.Models.EscrowOptions` and validated on startup:
* **Escrow Splits**: **90%** Farmer, **5%** Driver Logistics, **5%** Platform Commission (Validated sum must equal **100%**).
* **Taxation**: **2%** MOR Withholding Tax on farmer disbursements, **15%** VAT on platform service commission.
* **Logistics Subsidy**: **150 ETB** base rural subsidy credited per agricultural dropoff.
* **High-Value Governance**: Transactions above **50,000 ETB** require multi-sig SuperAdmin authorization.
* **Public Discovery**: Frontend consumes parameters dynamically from `GET /api/config/public`.

---

## 🧪 Testing & Verification

Run the full automated test suite:
```bash
cd FarmerMarket
dotnet test
```

Test suite coverage:
* `EnterpriseSecurityTests.cs`: HMAC webhook verification, cryptographic OTP hashing, lockout protection, bypass prevention.
* `ProductionHardeningTests.cs`: Escrow split sum validation (`== 100`), missing production secret fail-fast, in-memory DB prohibition in production, seed data isolation, decimal precision.
* `CoreWorkflowTests.cs`: End-to-end listing, order placement, escrow holding, and multi-party disbursement.
* `VerificationWorkflowTests.cs`: KYC & Fayda identity verification lifecycle.

Run frontend TypeScript compilation:
```bash
cd farmer-market-web
npm run build
```

---

## 👥 Demo & Development Personas

> **Note**: Demo personas and simulated listings are **only** seeded in local development when `SeedDemoData: true` is set. They are disabled by default in production.

| Role | Name | Demo Phone | Region / Details |
|---|---|---|---|
| 👑 **SuperAdmin** | Dr. Dawit Haile (ዶ/ር ዳዊት ኃይሌ) | `+251900000001` | Headquarters · Platform Governance |
| 🛡️ **Admin** | Sara Mengistu (ሳራ መንግስቱ) | `+251900112233` | Addis Ababa · Compliance Lead |
| 🌾 **Farmer** | Abebe Bekele (አበበ በቀለ) | `+251911223344` | Oromia (Bishoftu) · Teff & Produce |
| 🛒 **Buyer** | Bethlehem Tilahun (ቤተልሔም ጥላሁን) | `+251955667788` | Addis Ababa (Bole) · FreshMart |
| 🚚 **Driver** | Dawit Kebede (ዳዊት ከበደ) | `+251977889900` | Addis Ababa (Kaliti) · Isuzu 5-Ton |
| 🤝 **Agent** | Kassahun Tolessa (ካሳሁን ቶለሳ) | `+251988776655` | East Shewa · Field Support |
