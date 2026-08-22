import { Language, translations } from '../i18n/translations';
import { PlatformStats, Order, AnomalyAlert, KycVerificationItem, RegionalAnalytics } from '../types';
import { api } from '../services/api';

export function renderAdminView(
  lang: Language,
  stats: PlatformStats,
  disputedOrders: Order[],
  anomalies: AnomalyAlert[] = api.getAnomalyAlerts(),
  kycQueue: KycVerificationItem[] = api.getKycQueue(),
  regionalAnalytics: RegionalAnalytics[] = api.getRegionalAnalytics(),
  activeAdminTab: 'disputes' | 'anomalies' | 'kyc' | 'analytics' | 'sms' = 'disputes'
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

      <!-- Platform Analytics KPI Cards (GMV, Commission, Metric Tons, Middleman Savings) -->
      <section class="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        <div class="glass-card p-5 border-l-4 border-emerald-600 space-y-1">
          <span class="text-xs font-bold text-slate-500">${t.statTotalVolume}</span>
          <div class="text-xl sm:text-2xl font-black text-slate-900">
            ${stats.totalTransactionVolumeEtb.toLocaleString()} <span class="text-xs font-bold text-emerald-700">ETB</span>
          </div>
          <p class="text-[11px] text-emerald-700 font-semibold">100% Telebirr Escrow</p>
        </div>

        <div class="glass-card p-5 border-l-4 border-purple-600 space-y-1">
          <span class="text-xs font-bold text-slate-500">${t.statPlatformRev}</span>
          <div class="text-xl sm:text-2xl font-black text-purple-900">
            ${stats.totalPlatformCommissionEtb.toLocaleString()} <span class="text-xs font-bold text-purple-700">ETB</span>
          </div>
          <p class="text-[11px] text-purple-700 font-semibold">5% platform take</p>
        </div>

        <div class="glass-card p-5 border-l-4 border-blue-600 space-y-1">
          <span class="text-xs font-bold text-slate-500">${t.statMetricTons}</span>
          <div class="text-xl sm:text-2xl font-black text-blue-900">
            ${(stats.totalMetricTonsMoved || 145.8).toLocaleString()} <span class="text-xs font-bold text-blue-700">Tons</span>
          </div>
          <p class="text-[11px] text-blue-700 font-semibold">EABC Impact Verified</p>
        </div>

        <div class="glass-card p-5 border-l-4 border-teal-600 space-y-1">
          <span class="text-xs font-bold text-slate-500">${t.statMiddlemanSavings}</span>
          <div class="text-xl sm:text-2xl font-black text-teal-900">
            ${(stats.middlemanMarginSavedEtb || 480000).toLocaleString()} <span class="text-xs font-bold text-teal-700">ETB</span>
          </div>
          <p class="text-[11px] text-teal-700 font-semibold">Saved for smallholders</p>
        </div>

        <div class="glass-card p-5 border-l-4 border-amber-600 space-y-1">
          <span class="text-xs font-bold text-slate-500">${t.statActiveEscrow}</span>
          <div class="text-xl sm:text-2xl font-black text-slate-900">
            ${stats.activeEscrowHeldEtb.toLocaleString()} <span class="text-xs font-bold text-amber-700">ETB</span>
          </div>
          <p class="text-[11px] text-amber-700 font-semibold">Secured in Telebirr vault</p>
        </div>

      </section>

      <!-- Admin Tab Pills -->
      <div class="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
        <button onclick="window.setAdminTab('disputes')" class="cat-pill ${activeAdminTab === 'disputes' ? 'active' : ''}">
          <i class="fa-solid fa-scale-balanced"></i>
          <span>${t.resolveDisputeTitle} (${disputedOrders.length})</span>
        </button>
        <button onclick="window.setAdminTab('anomalies')" class="cat-pill ${activeAdminTab === 'anomalies' ? 'active' : ''}">
          <i class="fa-solid fa-triangle-exclamation text-amber-500"></i>
          <span>${t.anomalyScannerTitle} (${anomalies.length})</span>
        </button>
        <button onclick="window.setAdminTab('kyc')" class="cat-pill ${activeAdminTab === 'kyc' ? 'active' : ''}">
          <i class="fa-solid fa-id-card"></i>
          <span>${t.kycQueueTitle} (${kycQueue.filter(k => k.status === 'Pending').length})</span>
        </button>
        <button onclick="window.setAdminTab('analytics')" class="cat-pill ${activeAdminTab === 'analytics' ? 'active' : ''}">
          <i class="fa-solid fa-chart-pie"></i>
          <span>${t.regionalAnalyticsTitle}</span>
        </button>
        <button onclick="window.setAdminTab('sms')" class="cat-pill ${activeAdminTab === 'sms' ? 'active' : ''}">
          <i class="fa-solid fa-tower-broadcast"></i>
          <span>${t.broadcastSmsTitle}</span>
        </button>
      </div>

      <!-- Tab Content 1: Dispute Arbitration Console (3-Way Split) -->
      ${activeAdminTab === 'disputes' ? `
        <section class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">
              <i class="fa-solid fa-scale-balanced text-purple-600 mr-2"></i> ${t.resolveDisputeTitle}
            </h2>
            <span class="text-xs font-bold px-2.5 py-1 ${disputedOrders.length > 0 ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-600'} rounded-full">
              ${disputedOrders.length} Pending Disputes
            </span>
          </div>

          ${disputedOrders.length === 0 ? `
            <div class="glass-card p-8 text-center text-slate-500 text-xs">
              <i class="fa-solid fa-circle-check text-emerald-500 text-2xl mb-2 block"></i>
              No active escrow disputes. All transactions proceeding normally.
            </div>
          ` : `
            <div class="space-y-4">
              ${disputedOrders.map(o => `
                <div class="glass-card p-6 border-l-4 border-red-500 space-y-4">
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                    <div>
                      <span class="text-xs font-bold text-red-700 uppercase">Case #${o.id.slice(0, 8).toUpperCase()}</span>
                      <h3 class="text-base font-extrabold text-slate-900">${o.productName} (${o.qtyKg} kg · ${o.totalEtb.toLocaleString()} ETB)</h3>
                      <p class="text-xs text-slate-500">Buyer: <strong>${o.buyerName}</strong> vs Farmer: <strong>${o.farmerName}</strong></p>
                    </div>
                    <span class="escrow-badge bg-red-100 text-red-800 border-red-200 font-bold self-start sm:self-center">
                      <i class="fa-solid fa-lock mr-1"></i> Escrow Frozen (${o.totalEtb.toLocaleString()} ETB)
                    </span>
                  </div>

                  <!-- Claim & Photo Evidence -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div class="p-4 rounded-xl bg-red-50/70 border border-red-100 space-y-2">
                      <span class="font-bold text-red-900 block">${t.disputeEvidence}:</span>
                      <p class="text-slate-800 leading-relaxed font-medium">"${o.disputeReason || 'Delivered avocados were overripe and 20% bruised during transit from Hawassa.'}"</p>
                      <div class="text-[11px] text-red-700 font-bold">Requested Refund: ${o.requestedRefundPercent || 50}% (${Math.round(o.totalEtb * ((o.requestedRefundPercent || 50) / 100)).toLocaleString()} ETB)</div>
                    </div>

                    <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                      <img src="${o.disputePhoto || o.pickupPhoto || 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80'}" class="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-200 shadow-xs" />
                      <div class="space-y-1 text-slate-600">
                        <span class="font-bold text-slate-800 block">Uploaded Photo Evidence</span>
                        <p class="text-[11px]">GPS Location: Bole Cold Storage Depot</p>
                        <p class="text-[11px]">Timestamp: Yesterday 4:32 PM</p>
                      </div>
                    </div>
                  </div>

                  <!-- 3-Way Manual Arbitration Controls -->
                  <div class="pt-3 border-t border-slate-200 flex flex-wrap items-center gap-3">
                    <button onclick="window.adminResolveDispute('${o.id}', 'ReleaseToFarmer')" class="btn-primary text-xs py-2.5 px-4 cursor-pointer">
                      <i class="fa-solid fa-hand-holding-dollar"></i> ${t.releaseFarmerBtn}
                    </button>
                    <button onclick="window.adminResolveDispute('${o.id}', 'RefundBuyer')" class="btn-secondary text-xs py-2.5 px-4 text-red-700 border-red-300 hover:bg-red-50 font-bold cursor-pointer">
                      <i class="fa-solid fa-rotate-left"></i> ${t.refundBuyerBtn}
                    </button>
                    <button onclick="window.adminResolveDispute('${o.id}', 'PartialSplit')" class="btn-secondary text-xs py-2.5 px-4 text-purple-700 border-purple-300 hover:bg-purple-50 font-bold cursor-pointer">
                      <i class="fa-solid fa-scale-balanced"></i> ${t.splitFiftyFiftyBtn}
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </section>
      ` : ''}

      <!-- Tab Content 2: Fraud & Anomaly Detection Monitor -->
      ${activeAdminTab === 'anomalies' ? `
        <section class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">
              <i class="fa-solid fa-triangle-exclamation text-amber-500 mr-2"></i> ${t.anomalyScannerTitle}
            </h2>
            <span class="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Active Heuristic Scanner
            </span>
          </div>

          <div class="space-y-3">
            ${anomalies.map(a => `
              <div class="glass-card p-5 border-l-4 ${a.severity === 'High' ? 'border-red-600' : a.severity === 'Medium' ? 'border-amber-500' : 'border-blue-500'} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-[10px] font-black uppercase ${a.severity === 'High' ? 'bg-red-100 text-red-800' : a.severity === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}">
                      ${a.severity} Severity
                    </span>
                    <h3 class="text-sm font-extrabold text-slate-900">${a.title}</h3>
                    <span class="text-[10px] text-slate-400 font-mono">[${a.type}]</span>
                  </div>
                  <p class="text-xs text-slate-600">${a.description}</p>
                  <p class="text-[10px] text-slate-400">Target: ${a.entityType} (${a.entityId.slice(0, 8)}...) · Detected ${a.detectedAt}</p>
                </div>

                <div class="flex items-center gap-2 w-full sm:w-auto">
                  <button onclick="window.handleDismissAnomaly('${a.id}')" class="btn-secondary text-xs py-1.5 px-3 cursor-pointer">
                    Dismiss
                  </button>
                  <button onclick="window.handleInvestigateAnomaly('${a.id}')" class="btn-primary text-xs py-1.5 px-3.5 cursor-pointer">
                    Investigate
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </section>
      ` : ''}

      <!-- Tab Content 3: Manual KYC Verification Queue -->
      ${activeAdminTab === 'kyc' ? `
        <section class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">
              <i class="fa-solid fa-id-card text-emerald-600 mr-2"></i> ${t.kycQueueTitle}
            </h2>
            <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              National ID (Fayda) & Commercial Logbooks
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${kycQueue.map(k => `
              <div class="glass-card p-5 space-y-4">
                <div class="flex items-start justify-between">
                  <div>
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${k.userRole === 'Driver' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}">
                      ${k.userRole}
                    </span>
                    <h3 class="text-base font-extrabold text-slate-900 mt-1">${k.userName}</h3>
                    <p class="text-xs text-slate-500">${k.phone} · ${k.region}</p>
                  </div>
                  <span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold ${k.status === 'Verified' ? 'bg-emerald-100 text-emerald-800' : k.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}">
                    ${k.status.toUpperCase()}
                  </span>
                </div>

                <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div class="font-bold text-slate-800"><i class="fa-solid fa-file-lines text-emerald-600 mr-1"></i> ${k.documentType}</div>
                  <div class="font-mono text-slate-600">Doc ID: ${k.documentNumber}</div>
                  <div class="text-[10px] text-slate-400">Submitted: ${k.submittedAt}</div>
                </div>

                ${k.status === 'Pending' ? `
                  <div class="flex items-center gap-2 pt-2 border-t border-slate-100">
                    <button onclick="window.adminVerifyKyc('${k.userId}', true)" class="btn-primary flex-1 text-xs py-2 cursor-pointer">
                      <i class="fa-solid fa-check"></i> ${t.approveKycBtn}
                    </button>
                    <button onclick="window.adminVerifyKyc('${k.userId}', false)" class="btn-secondary text-xs py-2 px-4 text-red-700 border-red-300 hover:bg-red-50 cursor-pointer">
                      <i class="fa-solid fa-xmark"></i> ${t.rejectKycBtn}
                    </button>
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </section>
      ` : ''}

      <!-- Tab Content 4: Regional Analytics Dashboard & EABC Impact -->
      ${activeAdminTab === 'analytics' ? `
        <section class="space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-lg font-bold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">
                <i class="fa-solid fa-chart-pie text-emerald-600 mr-2"></i> ${t.regionalAnalyticsTitle}
              </h2>
              <p class="text-xs text-slate-500 font-medium">Volume distribution, smallholder impact, and crop performance metrics for EABC and investors.</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${regionalAnalytics.map(r => `
              <div class="glass-card p-5 space-y-3 border-l-4 border-emerald-600">
                <div class="flex items-center justify-between">
                  <h3 class="text-base font-extrabold text-slate-900">${r.region}</h3>
                  <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                    ${r.smallholdersCount.toLocaleString()} Farmers
                  </span>
                </div>

                <div class="grid grid-cols-2 gap-3 text-xs pt-1">
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span class="text-slate-400 font-bold uppercase text-[10px] block">Traded Volume</span>
                    <span class="text-lg font-black text-slate-900">${r.volumeMetricTons}</span> <span class="text-xs font-bold text-slate-600">Tons</span>
                  </div>
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span class="text-slate-400 font-bold uppercase text-[10px] block">Regional GMV</span>
                    <span class="text-lg font-black text-emerald-800">${(r.totalGmvEtb / 1000000).toFixed(2)}M</span> <span class="text-xs font-bold text-emerald-700">ETB</span>
                  </div>
                </div>

                <div class="text-xs text-slate-600 pt-1">
                  Top Produce: <strong class="text-slate-900 font-bold">${r.topCrop}</strong>
                </div>
              </div>
            `).join('')}
          </div>
        </section>
      ` : ''}

      <!-- Tab Content 5: Bilingual SMS Broadcaster Tool -->
      ${activeAdminTab === 'sms' ? `
        <section class="glass-card p-6 space-y-4 max-w-2xl">
          <div>
            <h2 class="text-lg font-bold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">
              <i class="fa-solid fa-tower-broadcast text-emerald-600 mr-2"></i> ${t.broadcastSmsTitle}
            </h2>
            <p class="text-xs text-slate-500">Send market price alerts or weather advisories via Twilio SMS directly to offline smallholder mobile phones.</p>
          </div>

          <form onsubmit="window.handleBroadcastSms(event)" class="space-y-3 text-xs font-semibold text-slate-700">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block mb-1">Message in English</label>
                <textarea id="broadcastEn" rows="3" class="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none" placeholder="Market advisory: High demand for Red Onions in Addis wholesale depots."></textarea>
              </div>
              <div>
                <label class="block mb-1">መልእክት በአማርኛ (Amharic Message)</label>
                <textarea id="broadcastAm" rows="3" class="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none lang-am" placeholder="የገበያ መረጃ: በአዲስ አበባ የጅምላ ገበያዎች የቀይ ሽንኩርት ፍላጎት ከፍተኛ ሆኗል።"></textarea>
              </div>
            </div>

            <div class="flex items-center justify-between pt-2">
              <select id="broadcastTarget" class="py-2 px-3 rounded-xl border border-slate-300 text-xs font-semibold bg-white cursor-pointer">
                <option value="farmer">Target: All Smallholder Farmers</option>
                <option value="buyer">Target: All Wholesale Buyers</option>
                <option value="driver">Target: All Partner Drivers</option>
                <option value="all">Target: All Registered Users</option>
              </select>

              <button type="submit" class="btn-primary text-xs py-2.5 px-5 shadow-sm cursor-pointer">
                <i class="fa-solid fa-paper-plane"></i> ${t.sendSmsBtn}
              </button>
            </div>
          </form>
        </section>
      ` : ''}

    </div>
  `;
}
