import { Language, translations } from '../i18n/translations';
import { Order, DriverSummary, OptimizedRoute, User } from '../types';
import { api } from '../services/api';

export function renderDriverView(
  lang: Language,
  orders: Order[],
  summary: DriverSummary,
  route: OptimizedRoute = api.getOptimizedRoute(),
  currentUser: User | null = api.getCurrentUser(),
  isOfflineMode: boolean = api.getIsOfflineMode(),
  offlineQueueCount: number = api.getOfflineQueue().length
): string {
  const t = translations[lang];
  const maxCapacity = currentUser?.vehicleCapacityKg || 5000;
  const utilizedPercent = Math.min(100, Math.round((route.totalWeightKg / maxCapacity) * 100));

  return `
    <div class="space-y-8 pb-20">
      
      <!-- Top Banner with Vehicle & Offline Mode Controls -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex flex-wrap items-center gap-2 mb-1.5">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
              <i class="fa-solid fa-truck text-amber-700"></i> ${currentUser?.vehicleType || 'Isuzu 5-Ton'} · ${currentUser?.refrigerationType || 'Ventilated'}
            </span>
            <span class="trust-badge text-emerald-800 bg-emerald-50 border-emerald-200">
              <i class="fa-solid fa-certificate"></i> Logbook Verified (${currentUser?.kycDocumentNumber || 'ET-LOG-5T-98214'})
            </span>
            <span class="trust-badge text-blue-800 bg-blue-50 border-blue-200">
              <i class="fa-solid fa-file-invoice text-blue-600"></i> TIN: ${currentUser?.tinNumber || 'TIN-DRV-981244'}
            </span>
            <span class="trust-badge text-amber-800 bg-amber-50 border-amber-200">
              <i class="fa-solid fa-star text-amber-500"></i> 4.9 Driver Rating (98% On-Time)
            </span>
          </div>

          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">
            ${t.driverPortalTitle}
          </h1>
        </div>

        <!-- Offline-First Mode Controls -->
        <div class="flex items-center gap-3">
          <button onclick="window.toggleDriverOfflineMode()" class="px-3 py-2 rounded-xl border text-xs font-bold cursor-pointer transition-colors ${isOfflineMode ? 'bg-amber-600 text-white border-amber-600 shadow-md' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}">
            <i class="fa-solid fa-wifi-slash mr-1"></i> ${isOfflineMode ? 'Offline Mode Active' : 'Online Mode'}
          </button>

          ${offlineQueueCount > 0 ? `
            <button onclick="window.syncDriverOfflineQueue()" class="btn-primary text-xs py-2 px-3.5 shadow-sm cursor-pointer animate-bounce">
              <i class="fa-solid fa-cloud-arrow-up"></i> ${t.offlineSyncBtn} (${offlineQueueCount})
            </button>
          ` : ''}
        </div>
      </div>

      <!-- Vehicle Payload & Cold-Chain Capacity Gauge -->
      <section class="glass-card p-5 border-l-4 border-amber-600 space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
              <i class="fa-solid fa-weight-hanging"></i>
            </div>
            <div>
              <h3 class="text-sm font-bold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">${t.vehicleProfileTitle}</h3>
              <p class="text-[11px] text-slate-500 font-medium">${currentUser?.vehicleType || 'Isuzu 5-Ton'} · ${currentUser?.refrigerationType || 'Ventilated Cargo'}</p>
            </div>
          </div>
          <div class="text-xs font-bold text-slate-700">
            <span>Payload: <strong class="text-amber-800">${route.totalWeightKg.toLocaleString()} kg</strong> / ${maxCapacity.toLocaleString()} kg (${utilizedPercent}%)</span>
          </div>
        </div>

        <div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div class="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-amber-600 rounded-full transition-all duration-500" style="width: ${utilizedPercent}%;"></div>
        </div>
      </section>

      <!-- Driver Earnings Overview with Rural Route Subsidy -->
      <section class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div class="glass-card p-5 border-l-4 border-amber-600 space-y-1">
          <div class="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>${t.tripCommission}</span>
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
            <span>${t.ruralBonus}</span>
            <span class="text-xs text-emerald-700 font-bold">+2.5 ETB/km</span>
          </div>
          <div class="text-2xl sm:text-3xl font-black text-slate-900">
            ${(summary.ruralBonusEtb || 1250).toLocaleString()} <span class="text-sm font-bold text-emerald-700">ETB</span>
          </div>
          <p class="text-[11px] text-emerald-700 font-semibold">
            <i class="fa-solid fa-gas-pump"></i> Rural distance freight incentive
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
            <i class="fa-solid fa-star text-amber-500"></i> 100% Escrow release rate
          </p>
        </div>

      </section>

      <!-- Multi-Stop Route Optimizer Timeline -->
      <section class="glass-card p-6 space-y-5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-extrabold mb-1">
              <i class="fa-solid fa-route"></i> PostGIS Multi-Stop Routing
            </div>
            <h2 class="text-lg font-bold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">${route.title}</h2>
          </div>

          <div class="flex items-center gap-4 text-xs font-bold text-slate-600">
            <span><i class="fa-solid fa-road text-amber-600 mr-1"></i> ${route.totalDistanceKm} km</span>
            <span><i class="fa-solid fa-clock text-blue-600 mr-1"></i> ~${route.estimatedHours} hrs</span>
            <span><i class="fa-solid fa-coins text-emerald-600 mr-1"></i> ${(route.driverCommissionEtb + route.ruralSubsidyEtb).toLocaleString()} ETB Total</span>
          </div>
        </div>

        <div class="space-y-4">
          ${route.stops.map((s, idx) => `
            <div class="flex items-start gap-4 p-4 rounded-2xl ${s.completed ? 'bg-emerald-50/60 border border-emerald-100' : 'bg-slate-50 border border-slate-200'}">
              <div class="w-8 h-8 rounded-full ${s.completed ? 'bg-emerald-600 text-white' : s.type === 'dropoff' ? 'bg-blue-600 text-white' : 'bg-amber-600 text-white'} flex items-center justify-center text-xs font-bold shrink-0 shadow-sm mt-0.5">
                ${s.completed ? '<i class="fa-solid fa-check"></i>' : s.stopNumber}
              </div>

              <div class="flex-1 min-w-0 space-y-1">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold ${s.type === 'dropoff' ? 'text-blue-800' : 'text-amber-800'} uppercase">
                    ${s.type === 'pickup' ? 'Stop ' + s.stopNumber + ': Farm Pickup' : 'Final Stop: Buyer Wholesale Depot'}
                  </span>
                  <span class="text-xs font-bold text-slate-500">${s.weightKg} kg</span>
                </div>

                <h4 class="text-sm font-extrabold text-slate-900 truncate">${s.locationName}</h4>
                <p class="text-xs text-slate-600"><i class="fa-solid fa-user text-slate-400 mr-1"></i> Contact: <strong class="text-slate-800">${s.contactName}</strong> (${s.phone})</p>
                <p class="text-xs text-slate-500 font-medium"><i class="fa-solid fa-boxes-stacked text-slate-400 mr-1"></i> Cargo: ${s.cargoDetails}</p>
              </div>

              <div class="shrink-0">
                ${s.completed ? `
                  <span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold flex items-center gap-1">
                    <i class="fa-solid fa-check"></i> Picked Up
                  </span>
                ` : `
                  <button onclick="window.handleDriverStopAction(${idx})" class="btn-primary text-xs py-1.5 px-3 shadow-xs cursor-pointer">
                    <i class="fa-solid fa-camera mr-1"></i> Verify & Confirm
                  </button>
                `}
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Active / Available Trips Queue with Official Federal Transport Waybills -->
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
                    <span class="text-xs font-bold text-amber-700 uppercase tracking-wider">Waybill #${o.waybillNumber || 'WB-FTA-001'}</span>
                    <h3 class="text-base font-extrabold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">${o.productName} (${o.qtyKg} kg)</h3>
                  </div>
                  <div class="text-right">
                    <span class="text-xs text-slate-400 font-medium block">${t.tripCommission} + Rural Subsidy</span>
                    <span class="text-lg font-black text-amber-700">${(o.driverCut + (o.driverSubsidyEtb || 150)).toLocaleString()} ETB</span>
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

                <!-- Driver Actions with Photo + GPS verification and Waybill Viewer -->
                <div class="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div class="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <span>Status:</span>
                    <span class="px-2.5 py-1 rounded-full text-[11px] font-extrabold ${o.status === 'picked_up' ? 'bg-amber-100 text-amber-800' : o.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'}">${o.status.toUpperCase()}</span>
                  </div>

                  <div class="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                    <button onclick="window.openWaybillModal('${o.id}')" class="btn-secondary text-xs py-2 px-3 text-sky-700 bg-sky-50 hover:bg-sky-100 border-sky-200 cursor-pointer">
                      <i class="fa-solid fa-file-invoice mr-1 text-sky-600"></i> ${t.viewWaybillBtn}
                    </button>

                    <button onclick="window.openContractModal('${o.id}')" class="btn-secondary text-xs py-2 px-3 text-purple-700 bg-purple-50 hover:bg-purple-100 border-purple-200 cursor-pointer">
                      <i class="fa-solid fa-file-contract mr-1 text-purple-600"></i> ${t.viewContractBtn}
                    </button>

                    ${o.status === 'confirmed' ? `
                      <button onclick="${api.hasEffectivePermission('SUBMIT_DELIVERY_PROOF', 'driver') ? `window.driverPickupWithProof('${o.id}')` : `window.alert('Permission Restricted: SUBMIT_DELIVERY_PROOF has been revoked.')`}" class="btn-primary w-full sm:w-auto text-xs py-2 px-4 shadow-sm cursor-pointer ${!api.hasEffectivePermission('SUBMIT_DELIVERY_PROOF', 'driver') ? 'opacity-60 border-dashed bg-slate-700' : ''}">
                        <i class="fa-solid ${api.hasEffectivePermission('SUBMIT_DELIVERY_PROOF', 'driver') ? 'fa-camera' : 'fa-lock'} mr-1"></i> ${t.uploadProof} & Pickup
                      </button>
                    ` : o.status === 'picked_up' ? `
                      <button onclick="${api.hasEffectivePermission('SUBMIT_DELIVERY_PROOF', 'driver') ? `window.driverCompleteDeliveryProof('${o.id}')` : `window.alert('Permission Restricted: SUBMIT_DELIVERY_PROOF has been revoked.')`}" class="btn-primary w-full sm:w-auto text-xs py-2 px-4 shadow-sm cursor-pointer ${!api.hasEffectivePermission('SUBMIT_DELIVERY_PROOF', 'driver') ? 'opacity-60 border-dashed bg-slate-700' : ''}">
                        <i class="fa-solid ${api.hasEffectivePermission('SUBMIT_DELIVERY_PROOF', 'driver') ? 'fa-location-crosshairs' : 'fa-lock'} mr-1"></i> Dropoff + GPS Proof
                      </button>
                    ` : `
                      <span class="text-xs text-emerald-700 font-bold flex items-center gap-1">
                        <i class="fa-solid fa-circle-check"></i> Trip Completed · ${(o.driverCut + (o.driverSubsidyEtb || 150)).toLocaleString()} ETB Deposited
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
