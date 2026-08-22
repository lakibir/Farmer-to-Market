import { Language, translations } from '../i18n/translations';
import { Order, DriverSummary } from '../types';

export function renderDriverView(
  lang: Language,
  orders: Order[],
  summary: DriverSummary
): string {
  const t = translations[lang];

  return `
    <div class="space-y-8 pb-20">
      
      <!-- Top Banner -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-1">
            <i class="fa-solid fa-truck"></i> Driver Logistics Hub · Dawit Kebede (Isuzu 5-Ton)
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">
            ${t.driverPortalTitle}
          </h1>
        </div>
      </div>

      <!-- Driver Earnings Overview -->
      <section class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div class="glass-card p-5 border-l-4 border-amber-600 space-y-1">
          <div class="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Total Commissions Earned</span>
            <span class="telebirr-pill text-[10px] py-0.5 px-2">Telebirr Wallet</span>
          </div>
          <div class="text-2xl sm:text-3xl font-black text-slate-900">
            ${summary.totalEarnedEtb.toLocaleString()} <span class="text-sm font-bold text-amber-700">ETB</span>
          </div>
          <p class="text-[11px] text-amber-700 font-semibold">
            <i class="fa-solid fa-circle-check"></i> 5% guaranteed trip cut
          </p>
        </div>

        <div class="glass-card p-5 border-l-4 border-emerald-600 space-y-1">
          <div class="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Pending Trip Payouts</span>
            <span class="escrow-badge text-[10px]">In Transit</span>
          </div>
          <div class="text-2xl sm:text-3xl font-black text-slate-900">
            ${summary.pendingEtb.toLocaleString()} <span class="text-sm font-bold text-emerald-700">ETB</span>
          </div>
          <p class="text-[11px] text-emerald-700 font-semibold">
            <i class="fa-solid fa-hourglass-half"></i> Releases when buyer accepts delivery
          </p>
        </div>

        <div class="glass-card p-5 border-l-4 border-blue-600 space-y-1">
          <div class="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>${t.totalDeliveredTrips}</span>
            <span class="text-xs text-blue-600 font-bold">Verified Partner</span>
          </div>
          <div class="text-2xl sm:text-3xl font-black text-slate-900">
            ${summary.deliveredTripsCount} <span class="text-sm font-bold text-slate-500">Trips</span>
          </div>
          <p class="text-[11px] text-blue-700 font-semibold">
            <i class="fa-solid fa-star text-amber-500"></i> 4.9 Driver Rating
          </p>
        </div>

      </section>

      <!-- Active / Available Trips Queue -->
      <section class="space-y-4">
        <h2 class="text-xl font-bold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">
          <i class="fa-solid fa-road text-amber-600 mr-2"></i> ${t.availableTrips}
        </h2>

        ${orders.length === 0 ? `
          <div class="glass-card p-8 text-center text-slate-500 text-sm">
            No active trips assigned. Check back once farmers confirm incoming orders.
          </div>
        ` : `
          <div class="space-y-4">
            ${orders.map(o => `
              <div class="glass-card p-5 space-y-4">
                
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <span class="text-xs font-bold text-amber-700 uppercase tracking-wider">Order #${o.id.slice(0, 8).toUpperCase()}</span>
                    <h3 class="text-base font-extrabold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">${o.productName} (${o.qtyKg} kg)</h3>
                  </div>
                  <div class="text-right">
                    <span class="text-xs text-slate-400 font-medium block">${t.tripCommission}</span>
                    <span class="text-lg font-black text-amber-700">${o.driverCut.toLocaleString()} ETB</span>
                  </div>
                </div>

                <!-- Origin & Destination Route -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div class="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 space-y-1">
                    <span class="font-bold text-emerald-800 flex items-center gap-1.5">
                      <i class="fa-solid fa-circle-dot text-emerald-600"></i> Farm Pickup Location
                    </span>
                    <p class="text-slate-800 font-semibold">${o.farmerRegion}</p>
                    <p class="text-slate-500 font-medium">Farmer: ${o.farmerName} (${o.farmerPhone})</p>
                  </div>

                  <div class="p-3 rounded-xl bg-blue-50/70 border border-blue-100 space-y-1">
                    <span class="font-bold text-blue-800 flex items-center gap-1.5">
                      <i class="fa-solid fa-location-pin text-blue-600"></i> Buyer Delivery Depot
                    </span>
                    <p class="text-slate-800 font-semibold">${o.deliveryAddress || 'Addis Ababa'}</p>
                    <p class="text-slate-500 font-medium">Buyer: ${o.buyerName} (${o.buyerPhone})</p>
                  </div>
                </div>

                <!-- Driver Actions -->
                <div class="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div class="text-xs font-bold text-slate-500">
                    Status: <span class="px-2.5 py-1 rounded-full text-[11px] font-extrabold ${o.status === 'picked_up' ? 'bg-amber-100 text-amber-800' : o.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'}">${o.status.toUpperCase()}</span>
                  </div>

                  <div class="flex items-center gap-2 w-full sm:w-auto">
                    ${o.status === 'confirmed' ? `
                      <button onclick="window.driverPickup('${o.id}')" class="btn-primary w-full sm:w-auto text-xs py-2 px-4 shadow-sm">
                        <i class="fa-solid fa-camera"></i> ${t.uploadProof} & Accept
                      </button>
                    ` : o.status === 'picked_up' ? `
                      <button onclick="window.driverCompleteDelivery('${o.id}')" class="btn-primary w-full sm:w-auto text-xs py-2 px-4 shadow-sm">
                        <i class="fa-solid fa-circle-check"></i> ${t.markCompleted}
                      </button>
                    ` : `
                      <span class="text-xs text-emerald-700 font-bold flex items-center gap-1">
                        <i class="fa-solid fa-circle-check"></i> Trip Completed · ${o.driverCut} ETB Credited
                      </span>
                    `}
                  </div>
                </div>

              </div>
            `).join('')}
          </div>
        `}
      </section>

    </div>
  `;
}
