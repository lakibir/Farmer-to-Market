using FarmerMarket.API.Extensions;
using FarmerMarket.Application.Common.Interfaces;
using FarmerMarket.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FarmerMarket.API.Controllers;

[ApiController]
[Route("api/account")]
[Authorize]
public class AccountController(IAppDbContext db) : ControllerBase
{
    [HttpGet("addresses")]
    public async Task<IActionResult> GetAddresses(CancellationToken ct) => Ok(await db.SavedAddresses.AsNoTracking().Where(x => x.UserId == User.GetUserId()).ToListAsync(ct));

    [HttpPost("addresses")]
    public async Task<IActionResult> AddAddress(AddressRequest request, CancellationToken ct)
    {
        var userId = User.GetUserId();
        var address = new SavedAddress { UserId = userId, Name = request.Name.Trim(), Phone = request.Phone.Trim(), Street = request.Street.Trim(), City = request.City.Trim(), Region = request.Region.Trim(), PostalCode = request.PostalCode?.Trim(), Country = request.Country.Trim(), IsDefaultShipping = request.IsDefaultShipping, IsDefaultBilling = request.IsDefaultBilling };
        db.SavedAddresses.Add(address);
        await ClearAddressDefaults(userId, address, ct);
        await db.SaveChangesAsync(ct);
        return Ok(address);
    }

    [HttpPut("addresses/{id:guid}")]
    public async Task<IActionResult> UpdateAddress(Guid id, AddressRequest request, CancellationToken ct)
    {
        var address = await db.SavedAddresses.FirstOrDefaultAsync(x => x.Id == id && x.UserId == User.GetUserId(), ct);
        if (address is null) return NotFound();
        address.Name = request.Name.Trim(); address.Phone = request.Phone.Trim(); address.Street = request.Street.Trim(); address.City = request.City.Trim(); address.Region = request.Region.Trim(); address.PostalCode = request.PostalCode?.Trim(); address.Country = request.Country.Trim(); address.IsDefaultShipping = request.IsDefaultShipping; address.IsDefaultBilling = request.IsDefaultBilling;
        await ClearAddressDefaults(address.UserId, address, ct);
        await db.SaveChangesAsync(ct);
        return Ok(address);
    }

    [HttpDelete("addresses/{id:guid}")]
    public async Task<IActionResult> DeleteAddress(Guid id, CancellationToken ct)
    {
        var address = await db.SavedAddresses.FirstOrDefaultAsync(x => x.Id == id && x.UserId == User.GetUserId(), ct);
        if (address is null) return NotFound();
        db.SavedAddresses.Remove(address); await db.SaveChangesAsync(ct); return NoContent();
    }

    [HttpGet("payment-methods")]
    public async Task<IActionResult> GetPaymentMethods(CancellationToken ct) => Ok(await db.PaymentMethods.AsNoTracking().Where(x => x.UserId == User.GetUserId()).Select(x => new { x.Id, x.Provider, x.MaskedDisplay, x.Brand, x.ExpiryMonth, x.ExpiryYear, x.IsPrimary, x.CreatedAt }).ToListAsync(ct));

    [HttpPost("payment-methods")]
    public async Task<IActionResult> AddPaymentMethod(PaymentMethodRequest request, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(request.ProviderToken)) return BadRequest(new { error = "A provider token is required; raw card numbers are not accepted." });
        var userId = User.GetUserId();
        var method = new PaymentMethod { UserId = userId, Provider = request.Provider.Trim(), ProviderToken = request.ProviderToken, MaskedDisplay = request.MaskedDisplay?.Trim(), Brand = request.Brand?.Trim(), ExpiryMonth = request.ExpiryMonth, ExpiryYear = request.ExpiryYear, IsPrimary = request.IsPrimary };
        db.PaymentMethods.Add(method); await ClearPrimaryPaymentMethod(userId, method, ct); await db.SaveChangesAsync(ct);
        return Ok(new { method.Id, method.Provider, method.MaskedDisplay, method.Brand, method.ExpiryMonth, method.ExpiryYear, method.IsPrimary, method.CreatedAt });
    }

    [HttpPut("payment-methods/{id:guid}/primary")]
    public async Task<IActionResult> SetPrimaryPaymentMethod(Guid id, CancellationToken ct)
    {
        var method = await db.PaymentMethods.FirstOrDefaultAsync(x => x.Id == id && x.UserId == User.GetUserId(), ct); if (method is null) return NotFound();
        await ClearPrimaryPaymentMethod(method.UserId, method, ct); method.IsPrimary = true; await db.SaveChangesAsync(ct); return NoContent();
    }

    [HttpDelete("payment-methods/{id:guid}")]
    public async Task<IActionResult> DeletePaymentMethod(Guid id, CancellationToken ct)
    {
        var method = await db.PaymentMethods.FirstOrDefaultAsync(x => x.Id == id && x.UserId == User.GetUserId(), ct); if (method is null) return NotFound();
        db.PaymentMethods.Remove(method); await db.SaveChangesAsync(ct); return NoContent();
    }

    [HttpGet("coupons")]
    public async Task<IActionResult> GetCoupons(CancellationToken ct) => Ok(await db.Coupons.AsNoTracking().Where(x => x.UserId == null || x.UserId == User.GetUserId()).OrderBy(x => x.ExpiresAt).ToListAsync(ct));

    [HttpGet("notification-preferences")]
    public async Task<IActionResult> GetNotificationPreferences(CancellationToken ct) => Ok(await db.NotificationPreferences.AsNoTracking().Where(x => x.UserId == User.GetUserId()).ToListAsync(ct));

    [HttpPut("notification-preferences")]
    public async Task<IActionResult> UpdateNotificationPreference(NotificationPreferenceRequest request, CancellationToken ct)
    {
        var userId = User.GetUserId(); var preference = await db.NotificationPreferences.FirstOrDefaultAsync(x => x.UserId == userId && x.EventType == request.EventType, ct);
        if (preference is null) { preference = new NotificationPreference { UserId = userId, EventType = request.EventType.Trim() }; db.NotificationPreferences.Add(preference); }
        preference.SmsEnabled = request.SmsEnabled; preference.InAppEnabled = request.InAppEnabled; preference.EmailEnabled = request.EmailEnabled; await db.SaveChangesAsync(ct); return Ok(preference);
    }

    [HttpGet("sessions")]
    public async Task<IActionResult> GetSessions(CancellationToken ct) => Ok(await db.UserSessions.AsNoTracking().Where(x => x.UserId == User.GetUserId() && x.RevokedAt == null).OrderByDescending(x => x.LastActiveAt).ToListAsync(ct));

    [HttpPost("sessions/revoke-others")]
    public async Task<IActionResult> RevokeOtherSessions(CancellationToken ct)
    {
        var sessions = await db.UserSessions.Where(x => x.UserId == User.GetUserId() && x.RevokedAt == null).ToListAsync(ct); foreach (var session in sessions) session.RevokedAt = DateTimeOffset.UtcNow;
        await db.SaveChangesAsync(ct); return NoContent();
    }

    [HttpGet("two-factor")]
    public async Task<IActionResult> GetTwoFactor(CancellationToken ct) => Ok(await db.TwoFactorSettings.AsNoTracking().Where(x => x.UserId == User.GetUserId()).Select(x => new { x.Method, x.IsEnabled, x.EnabledAt }).FirstOrDefaultAsync(ct) ?? new { Method = "Sms", IsEnabled = false, EnabledAt = (DateTimeOffset?)null });

    [HttpPut("two-factor")]
    public async Task<IActionResult> UpdateTwoFactor(TwoFactorRequest request, CancellationToken ct)
    {
        var userId = User.GetUserId(); var setting = await db.TwoFactorSettings.FirstOrDefaultAsync(x => x.UserId == userId, ct);
        if (setting is null) { setting = new TwoFactorSetting { UserId = userId }; db.TwoFactorSettings.Add(setting); }
        setting.Method = request.Method.Trim(); setting.IsEnabled = request.IsEnabled; setting.EnabledAt = request.IsEnabled ? DateTimeOffset.UtcNow : null; await db.SaveChangesAsync(ct);
        return Ok(new { setting.Method, setting.IsEnabled, setting.EnabledAt });
    }

    private async Task ClearAddressDefaults(Guid userId, SavedAddress current, CancellationToken ct)
    {
        if (current.IsDefaultShipping) foreach (var item in await db.SavedAddresses.Where(x => x.UserId == userId && x.Id != current.Id).ToListAsync(ct)) item.IsDefaultShipping = false;
        if (current.IsDefaultBilling) foreach (var item in await db.SavedAddresses.Where(x => x.UserId == userId && x.Id != current.Id).ToListAsync(ct)) item.IsDefaultBilling = false;
    }

    private async Task ClearPrimaryPaymentMethod(Guid userId, PaymentMethod current, CancellationToken ct)
    { foreach (var item in await db.PaymentMethods.Where(x => x.UserId == userId && x.Id != current.Id).ToListAsync(ct)) item.IsPrimary = false; }

    public record AddressRequest(string Name, string Phone, string Street, string City, string Region, string? PostalCode, string Country = "Ethiopia", bool IsDefaultShipping = false, bool IsDefaultBilling = false);
    public record PaymentMethodRequest(string Provider, string ProviderToken, string? MaskedDisplay, string? Brand, int? ExpiryMonth, int? ExpiryYear, bool IsPrimary = false);
    public record NotificationPreferenceRequest(string EventType, bool SmsEnabled, bool InAppEnabled, bool EmailEnabled);
    public record TwoFactorRequest(string Method, bool IsEnabled);
}