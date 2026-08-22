import { Language, translations } from '../i18n/translations';
import { PlatformStats, Order } from '../types';

export function renderAdminView(
  lang: Language,
  stats: PlatformStats,
  disputedOrders: Order[]
): string {
  const t = translations[lang];

  return `
    <div class="space-y-8 pb-20">
      
      <!-- Top Banner -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold mb-1">
            <i class="fa-solid fa-shield-halved"></i> Platform Governance · Sara Mengistu
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">
            ${t.adminPortalTitle}
          </h1>
        </div>
      </div>

      <!-- Platform Analytics KPI Cards -->
      <section class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div class="glass-card p-5 border-l-4 border-emerald-600 space-y-1">
          <span class="text-xs font-bold text-slate-500">${t.statTotalVolume}</span>
          <div class="text-xl sm:text-2xl font-black text-slate-900">
            ${stats.totalTransactionVolumeEtb.toLocaleString()} <span class="text-xs font-bold text-emerald-700">ETB</span>
          </div>
          <p class="text-[11px] text-emerald-700 font-semibold">100% via Telebirr Escrow</p>
        </div>

        <div class="glass-card p-5 border-l-4 border-purple-600 space-y-1">
          <span class="text-xs font-bold text-slate-500">${t.statPlatformRev}</span>
          <div class="text-xl sm:text-2xl font-black text-purple-900">
            ${stats.totalPlatformCommissionEtb.toLocaleString()} <span class="text-xs font-bold text-purple-700">ETB</span>
          </div>
          <p class="text-[11px] text-purple-700 font-semibold">5% standard marketplace take</p>
        </div>

        <div class="glass-card p-5 border-l-4 border-amber-600 space-y-1">
          <span class="text-xs font-bold text-slate-500">${t.statActiveEscrow}</span>
          <div class="text-xl sm:text-2xl font-black text-slate-900">
            ${stats.activeEscrowHeldEtb.toLocaleString()} <span class="text-xs font-bold text-amber-700">ETB</span>
          </div>
          <p class="text-[11px] text-amber-700 font-semibold">Secured in Telebirr vault</p>
        </div>

        <div class="glass-card p-5 border-l-4 border-blue-600 space-y-1">
          <span class="text-xs font-bold text-slate-500">Registered Users</span>
          <div class="text-xl sm:text-2xl font-black text-slate-900">
            ${stats.totalUsers}
          </div>
          <p class="text-[11px] text-blue-700 font-semibold">${stats.totalFarmers} Farmers · ${stats.totalBuyers} Buyers · ${stats.totalDrivers} Drivers</p>
        </div>

      </section>

      <!-- Dispute Resolution Management -->
      <section class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">
            <i class="fa-solid fa-scale-balanced text-purple-600 mr-2"></i> ${t.resolveDisputeTitle}
          </h2>
          <span class="text-xs font-bold px-2.5 py-1 ${disputedOrders.length > 0 ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-600'} rounded-full">
            ${disputedOrders.length} Pending Disputes
          </span>
        </div>

        ${disputedOrders.length === 0 ? `
          <div class="glass-card p-6 text-center text-slate-500 text-xs">
            <i class="fa-solid fa-circle-check text-emerald-500 text-xl mb-1 block"></i>
            No active disputes. All transactions proceeding normally with Telebirr escrow protection.
          </div>
        ` : `
          <div class="space-y-3">
            ${disputedOrders.map(o => `
              <div class="glass-card p-5 border border-red-200 bg-red-50/30 space-y-3">
                <div class="flex items-start justify-between">
                  <div>
                    <span class="text-xs font-bold text-red-700 uppercase">Dispute on Order #${o.id.slice(0, 8).toUpperCase()}</span>
                    <h3 class="text-base font-bold text-slate-900">${o.productName} (${o.qtyKg} kg · ${o.totalEtb.toLocaleString()} ETB)</h3>
                    <p class="text-xs text-slate-600 mt-1">${o.deliveryNotes || 'Buyer reported delay in delivery'}</p>
                  </div>
                  <span class="escrow-badge bg-red-100 text-red-800 border-red-200 font-bold">
                    Escrow Frozen
                  </span>
                </div>

                <div class="flex items-center gap-3 pt-2 border-t border-red-100">
                  <button onclick="window.adminResolveDispute('${o.id}', 'ReleaseToFarmer')" class="btn-primary text-xs py-2 px-3.5">
                    <i class="fa-solid fa-hand-holding-dollar"></i> ${t.releaseFarmerBtn}
                  </button>
                  <button onclick="window.adminResolveDispute('${o.id}', 'RefundBuyer')" class="btn-secondary text-xs py-2 px-3.5 text-red-700 border-red-300 hover:bg-red-100">
                    <i class="fa-solid fa-rotate-left"></i> ${t.refundBuyerBtn}
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </section>

      <!-- Bilingual SMS Broadcaster Tool -->
      <section class="glass-card p-6 space-y-4">
        <div>
          <h2 class="text-lg font-bold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">
            <i class="fa-solid fa-tower-broadcast text-emerald-600 mr-2"></i> ${t.broadcastSmsTitle}
          </h2>
          <p class="text-xs text-slate-500">Send instant market price updates or emergency notifications via Twilio SMS to offline smallholder farmers.</p>
        </div>

        <form onsubmit="window.handleBroadcastSms(event)" class="space-y-3 text-xs font-semibold text-slate-700">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block mb-1">Message in English</label>
              <textarea id="broadcastEn" rows="2" class="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none" placeholder="Market advisory: High demand for Red Onions in Addis wholesale depots."></textarea>
            </div>
            <div>
              <label class="block mb-1">መልእክት በአማርኛ (Amharic Message)</label>
              <textarea id="broadcastAm" rows="2" class="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none lang-am" placeholder="የገበያ መረጃ: በአዲስ አበባ የጅምላ ገበያዎች የቀይ ሽንኩርት ፍላጎት ከፍተኛ ሆኗል።"></textarea>
            </div>
          </div>

          <div class="flex items-center justify-between pt-2">
            <select id="broadcastTarget" class="py-2 px-3 rounded-xl border border-slate-300 text-xs font-semibold bg-white">
              <option value="farmer">Target: All Smallholder Farmers</option>
              <option value="buyer">Target: All Wholesale Buyers</option>
              <option value="driver">Target: All Partner Drivers</option>
              <option value="all">Target: All Registered Users</option>
            </select>

            <button type="submit" class="btn-primary text-xs py-2 px-4 shadow-sm">
              <i class="fa-solid fa-paper-plane"></i> ${t.sendSmsBtn}
            </button>
          </div>
        </form>
      </section>

    </div>
  `;
}
