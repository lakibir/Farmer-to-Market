# 🌾 FARMER-TO-MARKET: Direct Produce Exchange (Ethiopia)

> A bilingual (Amharic + English) digital agricultural marketplace connecting 15M+ Ethiopian smallholder farmers directly with commercial wholesale buyers and partner drivers, powered by **Telebirr Escrow** (90% Farmer / 5% Driver / 5% Platform split).

---

## 🏗️ Architecture & Technology Stack

- **Backend**: Clean Architecture with ASP.NET Core 9 / .NET 10, EF Core, MediatR CQRS, and SignalR.
- **Frontend**: Responsive Web Client with TypeScript, Ethiopic + Outfit typography, Glassmorphism design tokens, and live SignalR tracking.
- **Database**: PostgreSQL 16 + PostGIS for spatial geo-proximity calculations.
- **Payments**: Telebirr C2B Escrow Engine with automatic fund release upon delivery confirmation.
- **Messaging**: Twilio Bilingual SMS Engine (Amharic & English) for offline smallholder farmers.
- **Containerization**: Docker Compose with multi-stage production Dockerfiles.

---

## 📁 Repository Structure

```text
framemarket1/
├── docker-compose.yml              # PostgreSQL PostGIS, Redis, API, Web
├── .env.example                    # Environment variable template
├── FarmerMarket/                   # ASP.NET Core Backend Solution
│   ├── FarmerMarket.slnx
│   ├── src/
│   │   ├── FarmerMarket.Domain/    # Entities (User, Listing, Order, Payment, Review) & Enums
│   │   ├── FarmerMarket.Application/ # MediatR CQRS Commands, Queries, DTOs, Interfaces
│   │   ├── FarmerMarket.Infrastructure/ # EF Core AppDbContext, Telebirr & Twilio Services
│   │   └── FarmerMarket.API/       # REST Controllers, SignalR Hubs, JWT Auth, Swagger
│   └── tests/
│       └── FarmerMarket.Tests/     # xUnit & FluentAssertions Test Suite
└── farmer-market-web/              # Frontend Application
    ├── src/
    │   ├── components/             # Buyer, Farmer, Driver, Admin & Modals
    │   ├── i18n/                   # English & Amharic (አማርኛ) translation engine
    │   ├── services/               # API state & SignalR real-time client
    │   └── styles/main.css         # Modern design tokens & animations
    ├── Dockerfile
    ├── nginx.conf
    └── package.json
```

---

## 🚀 Quick Start Guide

### 1. Run the .NET 9 Backend
```bash
cd FarmerMarket
dotnet build
dotnet test
dotnet run --project src/FarmerMarket.API
```
- **Swagger Documentation**: `http://localhost:5000/swagger`
- **SignalR Order Hub**: `http://localhost:5000/hubs/orders`

### 2. Run the Frontend Web Application
```bash
cd farmer-market-web
npm install
npm run dev
```
Open **`http://localhost:4200`** in your browser.

---

## 👥 Demo Profiles & Test Accounts

| Role | Name | Phone | Region / Details |
|---|---|---|---|
| 🌾 **Farmer** | Abebe Bekele (አበበ በቀለ) | `+251911223344` | Oromia (Bishoftu) · Tomatoes & Onions |
| 🛒 **Buyer** | Bethlehem Tilahun (ቤተልሔም ጥላሁን) | `+251955667788` | Addis Ababa (Bole) · FreshMart Supermarkets |
| 🚚 **Driver** | Dawit Kebede (ዳዊት ከበደ) | `+251977889900` | Addis Ababa (Kaliti) · Isuzu 5-Ton Truck |
| 🛡️ **Admin** | Sara Mengistu (ሳራ መንግስቱ) | `+251900112233` | Addis Ababa · Compliance & Dispute Lead |

*Demo OTP code for instant phone authentication: **`123456`***

---

## 💳 90 / 5 / 5 Escrow Model

1. **Buyer Orders**: Telebirr locks 100% of order value in Escrow.
2. **Farmer Confirms**: Order is flagged for partner driver pickup.
3. **Driver Picks Up**: Driver uploads proof photo and navigates to buyer depot.
4. **Buyer Confirms Delivery**:
   - **90%** automatically deposited to Farmer's Telebirr wallet.
   - **5%** automatically deposited to Driver's Telebirr wallet.
   - **5%** retained as platform transaction revenue.
