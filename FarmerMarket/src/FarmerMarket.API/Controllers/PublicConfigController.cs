using FarmerMarket.Application.Common.Interfaces;
using FarmerMarket.Application.Common.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace FarmerMarket.API.Controllers;

[ApiController]
[Route("api/config")]
public class PublicConfigController(
    IOptions<EscrowOptions> escrowOptions,
    ISuperAdminGovernanceStore? store = null) : ControllerBase
{
    /// <summary>
    /// Returns authoritative, public platform parameters (escrow splits, tax deductions, delivery limits).
    /// Contains NO secrets or private keys. Dynamically reflects live SuperAdmin governance settings.
    /// </summary>
    [HttpGet("public")]
    public IActionResult GetPublicConfig()
    {
        var opt = escrowOptions.Value;
        var cfg = store?.GetPlatformConfig();
        var rules = store?.GetBusinessRules();

        return Ok(new
        {
            farmerSharePercent = cfg?.FarmerSharePercent ?? opt.FarmerPercent,
            driverSharePercent = cfg?.DriverSharePercent ?? opt.DriverPercent,
            platformFeePercent = cfg?.PlatformFeePercent ?? opt.PlatformPercent,
            withholdingTaxPercent = cfg?.WithholdingTaxPercent ?? opt.WithholdingTaxPercent,
            vatOnCommissionPercent = cfg?.VatOnCommissionPercent ?? opt.VatOnCommissionPercent,
            driverSubsidyEtb = opt.DriverSubsidyEtb,
            highValuePayoutThresholdEtb = cfg?.HighValuePayoutThresholdEtb ?? opt.HighValuePayoutThresholdEtb,
            emergencyEscrowFrozen = cfg?.EmergencyEscrowFrozen ?? false,
            minOrderKg = rules != null ? (decimal)rules.MinOrderKg : opt.MinOrderKg,
            maxOrderKg = rules != null ? (decimal)rules.MaxOrderKg : opt.MaxOrderKg,
            maxDistanceKm = rules != null ? (decimal)rules.MaxDistanceKm : opt.MaxDistanceKm,
            requireFaydaForOrdersAboveKg = rules != null ? (decimal)rules.RequireFaydaForOrdersAboveKg : opt.RequireFaydaForOrdersAboveKg,
            autoArbitrateAfterHours = rules != null ? (int)rules.AutoArbitrateAfterHours : opt.AutoArbitrateAfterHours,
            paymentProvider = opt.PaymentProvider
        });
    }
}
