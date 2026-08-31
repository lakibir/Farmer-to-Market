import { Language, translations } from '../i18n/translations';
import { PlatformStats, Order, AnomalyAlert, KycVerificationItem, RegionalAnalytics } from '../types';
import { api } from '../services/api';
import { renderBannersTab, renderModerationTab } from './SuperAdminView';

export function renderAdminView(
  lang: Language,
  stats: PlatformStats,
  disputedOrders: Order[],
  anomalies: AnomalyAlert[] = api.getAnomalyAlerts(),
  kycQueue: KycVerificationItem[] = api.getKycQueue(),
  regionalAnalytics: RegionalAnalytics[] = api.getRegionalAnalytics(),
  activeAdminTab: 'disputes' | 'moderation' | 'banners' | 'anomalies' | 'kyc' | 'tax_compliance' | 'analytics' | 'sms' = 'disputes'
): string {
  const t = translations[lang];
  const banners = api.getBanners();
  const listings = api.getListings();

  return `
    <div class="space-y-8 pb-20">
      
      <!-- Top Banner -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold mb-1">
            <i class="fa-solid fa-shield-halved"></i> Platform Governance & Legal Compliance · Sara Mengistu
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">
            ${t.adminPortalTitle}
          </h1>
        </div>

        <div class="flex items-center gap-2">
          <span class="trust-badge text-emerald-800 bg-emerald-50 border-emerald-200">
            <i class="fa-solid fa-stamp text-emerald-600"></i> MOR Tax Compliant
          </span>
          <span class="trust-badge text-purple-800 bg-purple-50 border-purple-200">
            <i class="fa-solid fa-gavel text-purple-600"></i> EABC Binding Arbitrator
          </span>
        </div>
      </div>

      <!-- Platform Analytics KPI Cards (GMV, Commission, Metric Tons, Middleman Savings, Tax) -->
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
          <p class="text-[11px] text-purple-700 font-semibold">5% platform service</p>
        </div>

        <div class="glass-card p-5 border-l-4 border-blue-600 space-y-1">
          <span class="text-xs font-bold text-slate-500">${t.statVatRemitted}</span>
          <div class="text-xl sm:text-2xl font-black text-blue-900">
            ${(stats.totalVatRemittedEtb || 258.75).toLocaleString()} <span class="text-xs font-bold text-blue-700">ETB</span>
          </div>
          <p class="text-[11px] text-blue-700 font-semibold">15% VAT on platform fee</p>
        </div>

        <div class="glass-card p-5 border-l-4 border-teal-600 space-y-1">
          <span class="text-xs font-bold text-slate-500">${t.statWithholding}</span>
          <div class="text-xl sm:text-2xl font-black text-teal-900">
            ${(stats.totalWithholdingReportedEtb || 690.00).toLocaleString()} <span class="text-xs font-bold text-teal-700">ETB</span>
          </div>
          <p class="text-[11px] text-teal-700 font-semibold">Declared 2% to MOR</p>
        </div>

        <div class="glass-card p-5 border-l-4 border-amber-600 space-y-1">
          <span class="text-xs font-bold text-slate-500">${t.statActiveEscrow}</span>
          <div class="text-xl sm:text-2xl font-black text-slate-900">
            ${stats.activeEscrowHeldEtb.toLocaleString()} <span class="text-xs font-bold text-amber-700">ETB</span>
          </div>
          <p class="text-[11px] text-amber-700 font-semibold">Secured in Telebirr vault</p>
        </div>

      </section>

      <!-- Admin Tab Pills with RBAC status indicators -->
      ${(() => {
        const canDisputes = api.hasEffectivePermission('RESOLVE_DISPUTES', 'admin');
        const canModeration = api.hasEffectivePermission('MODERATE_LISTINGS', 'admin');
        const canBanners = api.hasEffectivePermission('MANAGE_BANNERS', 'admin');
        const canAnomalies = api.hasEffectivePermission('VIEW_ANOMALY_ALERTS', 'admin');
        const canKyc = api.hasEffectivePermission('VERIFY_KYC', 'admin');
        const canTax = api.hasEffectivePermission('VIEW_TAX_COMPLIANCE', 'admin');
        const canAnalytics = api.hasEffectivePermission('VIEW_REGIONAL_ANALYTICS', 'admin');
        const canSms = api.hasEffectivePermission('BROADCAST_SMS', 'admin');

        return `
          <div class="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
            <button onclick="window.setAdminTab('disputes')" class="cat-pill ${activeAdminTab === 'disputes' ? 'active' : ''} ${!canDisputes ? 'opacity-70 border-dashed' : ''}">
              <i class="fa-solid fa-scale-balanced"></i>
              <span>${t.resolveDisputeTitle} (${disputedOrders.length})</span>
              ${!canDisputes ? '<i class="fa-solid fa-lock text-[10px] text-rose-500 ml-1" title="Permission Revoked"></i>' : ''}
            </button>
            <button onclick="window.setAdminTab('moderation')" class="cat-pill ${activeAdminTab === 'moderation' ? 'active' : ''} ${!canModeration ? 'opacity-70 border-dashed' : ''}">
              <i class="fa-solid fa-gavel text-purple-600"></i>
              <span>${t.tabModeration} (${listings.length})</span>
              ${!canModeration ? '<i class="fa-solid fa-lock text-[10px] text-rose-500 ml-1" title="Permission Revoked"></i>' : ''}
            </button>
            <button onclick="window.setAdminTab('banners')" class="cat-pill ${activeAdminTab === 'banners' ? 'active' : ''} ${!canBanners ? 'opacity-70 border-dashed' : ''}">
              <i class="fa-solid fa-panorama text-emerald-600"></i>
              <span>${t.tabBanners} (${banners.length})</span>
              ${!canBanners ? '<i class="fa-solid fa-lock text-[10px] text-rose-500 ml-1" title="Permission Revoked"></i>' : ''}
            </button>
            <button onclick="window.setAdminTab('anomalies')" class="cat-pill ${activeAdminTab === 'anomalies' ? 'active' : ''} ${!canAnomalies ? 'opacity-70 border-dashed' : ''}">
              <i class="fa-solid fa-triangle-exclamation text-amber-500"></i>
              <span>${t.anomalyScannerTitle} (${anomalies.length})</span>
              ${!canAnomalies ? '<i class="fa-solid fa-lock text-[10px] text-rose-500 ml-1" title="Permission Revoked"></i>' : ''}
            </button>
            <button onclick="window.setAdminTab('kyc')" class="cat-pill ${activeAdminTab === 'kyc' ? 'active' : ''} ${!canKyc ? 'opacity-70 border-dashed' : ''}">
              <i class="fa-solid fa-id-card"></i>
              <span>${t.kycQueueTitle} (${kycQueue.filter(k => k.status === 'Pending').length})</span>
              ${!canKyc ? '<i class="fa-solid fa-lock text-[10px] text-rose-500 ml-1" title="Permission Revoked"></i>' : ''}
            </button>
            <button onclick="window.setAdminTab('tax_compliance')" class="cat-pill ${activeAdminTab === 'tax_compliance' ? 'active' : ''} ${!canTax ? 'opacity-70 border-dashed' : ''}">
              <i class="fa-solid fa-file-invoice-dollar"></i>
              <span>Fiscal & Tax Invoicing</span>
              ${!canTax ? '<i class="fa-solid fa-lock text-[10px] text-rose-500 ml-1" title="Permission Revoked"></i>' : ''}
            </button>
            <button onclick="window.setAdminTab('analytics')" class="cat-pill ${activeAdminTab === 'analytics' ? 'active' : ''} ${!canAnalytics ? 'opacity-70 border-dashed' : ''}">
              <i class="fa-solid fa-chart-pie"></i>
              <span>${t.regionalAnalyticsTitle}</span>
              ${!canAnalytics ? '<i class="fa-solid fa-lock text-[10px] text-rose-500 ml-1" title="Permission Revoked"></i>' : ''}
            </button>
            <button onclick="window.setAdminTab('sms')" class="cat-pill ${activeAdminTab === 'sms' ? 'active' : ''} ${!canSms ? 'opacity-70 border-dashed' : ''}">
              <i class="fa-solid fa-tower-broadcast"></i>
              <span>${t.broadcastSmsTitle}</span>
              ${!canSms ? '<i class="fa-solid fa-lock text-[10px] text-rose-500 ml-1" title="Permission Revoked"></i>' : ''}
            </button>
          </div>
        `;
      })()}

      <!-- Tab Content: Moderation & Banners with RBAC Checks -->
      ${activeAdminTab === 'moderation' ? (api.hasEffectivePermission('MODERATE_LISTINGS', 'admin') ? renderModerationTab(lang) : `
        <div class="glass-card p-12 text-center space-y-3 rounded-3xl border border-rose-200 bg-rose-50/20 shadow-sm animate-fadeIn">
          <div class="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-2xl"><i class="fa-solid fa-lock"></i></div>
          <h3 class="text-base font-black text-slate-900">${lang === 'am' ? 'የምርት ቁጥጥር ፈቃድ ተገድቧል' : 'Produce Moderation Restricted by RBAC Policy'}</h3>
          <p class="text-xs text-slate-500 max-w-md mx-auto">Your account role currently lacks the 'MODERATE_LISTINGS' permission. Please contact a Super Administrator.</p>
        </div>
      `) : ''}

      ${activeAdminTab === 'banners' ? (api.hasEffectivePermission('MANAGE_BANNERS', 'admin') ? renderBannersTab(lang) : `
        <div class="glass-card p-12 text-center space-y-3 rounded-3xl border border-rose-200 bg-rose-50/20 shadow-sm animate-fadeIn">
          <div class="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-2xl"><i class="fa-solid fa-lock"></i></div>
          <h3 class="text-base font-black text-slate-900">${lang === 'am' ? 'የባነር አስተዳደር ፈቃድ ተገድቧል' : 'Banner Management Restricted by RBAC Policy'}</h3>
          <p class="text-xs text-slate-500 max-w-md mx-auto">Your account role currently lacks the 'MANAGE_BANNERS' permission. Please contact a Super Administrator.</p>
        </div>
      `) : ''}

      <!-- Tab Content 1: Dispute Arbitration Console (3-Way Split with Legal Decrees) -->
      ${activeAdminTab === 'disputes' ? (api.hasEffectivePermission('RESOLVE_DISPUTES', 'admin') ? `
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
              No active escrow disputes. All transactions proceeding normally under standard contracts.
            </div>
          ` : `
            <div class="space-y-4">
              ${disputedOrders.map(o => `
                <div class="glass-card p-6 border-l-4 border-red-500 space-y-4">
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                    <div>
                      <span class="text-xs font-bold text-red-700 uppercase">Arbitration Docket #${o.arbitrationDecreeNumber || 'ARB-DEC-001'}</span>
                      <h3 class="text-base font-extrabold text-slate-900">${o.productName} (${o.qtyKg} kg · ${o.totalEtb.toLocaleString()} ETB)</h3>
                      <p class="text-xs text-slate-500">Claimant: <strong>${o.buyerName}</strong> vs Respondent: <strong>${o.farmerName}</strong></p>
                    </div>
                    <div class="flex items-center gap-2">
                      <button onclick="window.openArbitrationModal('${o.id}')" class="px-2.5 py-1 rounded-lg bg-red-50 text-red-800 hover:bg-red-100 border border-red-200 font-bold text-xs cursor-pointer">
                        <i class="fa-solid fa-gavel mr-1"></i> ${t.viewArbitrationBtn}
                      </button>
                      <span class="escrow-badge bg-red-100 text-red-800 border-red-200 font-bold">
                        <i class="fa-solid fa-lock mr-1"></i> Frozen (${o.totalEtb.toLocaleString()} ETB)
                      </span>
                    </div>
                  </div>

                  <!-- Claim & Photo Evidence -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div class="p-4 rounded-xl bg-red-50/70 border border-red-100 space-y-2">
                      <span class="font-bold text-red-900 block">${t.disputeEvidence}:</span>
                      <p class="text-slate-800 leading-relaxed font-medium">"${o.disputeReason || 'Delivered avocados were overripe and 20% bruised during transit from Hawassa.'}"</p>
                      <div class="text-[11px] text-red-700 font-bold">Requested Remedy: ${o.requestedRefundPercent || 50}% Partial Refund (${Math.round(o.totalEtb * ((o.requestedRefundPercent || 50) / 100)).toLocaleString()} ETB)</div>
                    </div>

                    <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                      <img src="${o.disputePhoto || o.pickupPhoto || 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80'}" class="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-200 shadow-xs" />
                      <div class="space-y-1 text-slate-600">
                        <span class="font-bold text-slate-800 block">Inspection Pathology Image</span>
                        <p class="text-[11px]">Location: Bole Cold Storage Hub</p>
                        <p class="text-[11px]">Inspection Finding: 18.5% transit softening</p>
                      </div>
                    </div>
                  </div>

                  <!-- Legal Documents Reference Bar -->
                  <div class="flex items-center gap-2 text-xs">
                    <button onclick="window.openContractModal('${o.id}')" class="px-2.5 py-1 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-[11px] cursor-pointer">
                      <i class="fa-solid fa-file-contract mr-1 text-purple-600"></i> View Original Contract
                    </button>
                    <button onclick="window.openWaybillModal('${o.id}')" class="px-2.5 py-1 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-[11px] cursor-pointer">
                      <i class="fa-solid fa-truck-fast mr-1 text-sky-600"></i> View Driver Waybill
                    </button>
                    <button onclick="window.openInvoiceModal('${o.id}')" class="px-2.5 py-1 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-[11px] cursor-pointer">
                      <i class="fa-solid fa-file-invoice mr-1 text-emerald-600"></i> View Sales Invoice
                    </button>
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
      ` : `
        <div class="glass-card p-12 text-center space-y-3 rounded-3xl border border-rose-200 bg-rose-50/20 shadow-sm animate-fadeIn">
          <div class="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-2xl"><i class="fa-solid fa-lock"></i></div>
          <h3 class="text-base font-black text-slate-900">${lang === 'am' ? 'የአለመግባባት ዳኝነት ፈቃድ ተገድቧል' : 'Dispute Arbitration Restricted by RBAC Policy'}</h3>
          <p class="text-xs text-slate-500 max-w-md mx-auto">Your account role currently lacks the 'RESOLVE_DISPUTES' permission. Please contact a Super Administrator.</p>
        </div>
      `) : ''}

      <!-- Tab Content 2: Fraud & Anomaly Detection Monitor -->
      ${activeAdminTab === 'anomalies' ? (api.hasEffectivePermission('VIEW_ANOMALY_ALERTS', 'admin') ? `
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
      ` : `
        <div class="glass-card p-12 text-center space-y-3 rounded-3xl border border-rose-200 bg-rose-50/20 shadow-sm animate-fadeIn">
          <div class="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-2xl"><i class="fa-solid fa-lock"></i></div>
          <h3 class="text-base font-black text-slate-900">${lang === 'am' ? 'የማጭበርበር ቅኝት ፈቃድ ተገድቧል' : 'Anomaly Scanner Restricted by RBAC Policy'}</h3>
          <p class="text-xs text-slate-500 max-w-md mx-auto">Your account role currently lacks the 'VIEW_ANOMALY_ALERTS' permission. Please contact a Super Administrator.</p>
        </div>
      `) : ''}

      <!-- Tab Content 3: Comprehensive Verification & Regulatory Audit Queue -->
      ${activeAdminTab === 'kyc' ? (api.hasEffectivePermission('VERIFY_KYC', 'admin') ? `
        <section class="space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 class="text-lg font-bold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">
                <i class="fa-solid fa-id-card text-emerald-600 mr-2"></i> ${t.sideBySideInspectionTitle}
              </h2>
              <p class="text-xs text-slate-500">
                ${lang === 'am' ? 'የፋይዳ (Fayda) ብሔራዊ መታወቂያ፣ የግብር ከፋይ ቁጥር (TIN) እና የአርሶ አደሮች ሰነዶች ማረጋገጫ' : 'Inspect high-res Fayda ID cards, MOR TIN numbers, and field agent submissions.'}
              </p>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                🛡️ Fayda & MOR Compliance Console
              </span>
            </div>
          </div>

          <!-- Side-by-Side Document Inspection Cards -->
          <div class="space-y-6">
            ${api.getVerificationQueue().map(item => `
              <div class="glass-card p-6 border-l-4 ${item.verificationStatus === 'Approved' ? 'border-emerald-500' : item.verificationStatus === 'Rejected' ? 'border-red-500' : 'border-amber-500'} space-y-4">
                
                <!-- Card Header -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${item.userRole === 'Driver' ? 'bg-amber-100 text-amber-800' : item.userRole === 'Farmer' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}">
                        ${item.userRole}
                      </span>
                      <span class="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600">
                        ${item.registrationMethod === 'Agent' ? '🧑‍🌾 Assisted by ' + (item.registeredByAgentName || 'Field Agent') : '💻 Self Registered'}
                      </span>
                    </div>
                    <h3 class="text-lg font-extrabold text-slate-900 mt-1">
                      ${item.userName} ${item.userNameAm ? `<span class="text-sm font-normal text-slate-500">(${item.userNameAm})</span>` : ''}
                    </h3>
                    <p class="text-xs text-slate-500 font-mono">${item.phone} · 📍 ${item.region}</p>
                  </div>

                  <div class="flex flex-col sm:items-end gap-1">
                    <span class="px-3 py-1 rounded-full text-xs font-extrabold ${item.verificationStatus === 'Approved' ? 'bg-emerald-100 text-emerald-800' : item.verificationStatus === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}">
                      ${item.verificationStatus === 'Approved' ? '✅ APPROVED' : item.verificationStatus === 'Rejected' ? '❌ REJECTED' : '⏳ UNDER REVIEW'}
                    </span>
                    <span class="text-[10px] text-slate-400">Registered: ${item.registeredAt}</span>
                  </div>
                </div>

                <!-- Verification Data & Documents Grid -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  
                  <!-- Column 1: Identity & Tax Data -->
                  <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div class="font-bold text-slate-800 border-b border-slate-200 pb-1">
                      📋 ${lang === 'am' ? 'የመታወቂያ እና የታክስ መረጃ' : 'Identity & Tax Record'}
                    </div>
                    <div>
                      <span class="text-slate-500 block">${t.tinNumberLabel}:</span>
                      <strong class="font-mono text-emerald-800 text-sm">${item.tinNumber || '0099881122'}</strong>
                    </div>
                    ${item.documents.map(d => `
                      <div class="pt-1">
                        <span class="text-slate-500 block">${d.documentType}:</span>
                        <strong class="font-mono text-slate-800">${d.documentNumber}</strong>
                      </div>
                    `).join('')}
                    ${item.rejectionReason ? `
                      <div class="p-2 rounded bg-red-50 text-red-800 text-[11px] font-medium border border-red-200 mt-2">
                        <strong>${t.rejectionReasonLabel}:</strong> ${item.rejectionReason}
                      </div>
                    ` : ''}
                  </div>

                  <!-- Column 2 & 3: High-Res Document Photo Previews -->
                  <div class="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    ${item.documents.flatMap(d => [
                      d.frontImageUrl ? `
                        <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                          <div class="text-[11px] font-bold text-slate-700 mb-1">🪪 ${d.documentType} (Front)</div>
                          <img src="${d.frontImageUrl}" alt="Document Front" class="w-full h-28 object-cover rounded-lg border border-slate-200 mb-2 cursor-pointer" onclick="window.open('${d.frontImageUrl}', '_blank')" />
                          <span class="text-[10px] text-slate-400">Click image to inspect full-res</span>
                        </div>
                      ` : '',
                      d.backImageUrl ? `
                        <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                          <div class="text-[11px] font-bold text-slate-700 mb-1">📜 ${d.documentType} (Back)</div>
                          <img src="${d.backImageUrl}" alt="Document Back" class="w-full h-28 object-cover rounded-lg border border-slate-200 mb-2 cursor-pointer" onclick="window.open('${d.backImageUrl}', '_blank')" />
                          <span class="text-[10px] text-slate-400">Click image to inspect full-res</span>
                        </div>
                      ` : ''
                    ]).join('') || `
                      <div class="p-6 text-center text-slate-400 col-span-2">No uploaded photos attached.</div>
                    `}
                  </div>

                </div>

                <!-- Action Bar -->
                <div class="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                  <div class="flex items-center gap-2 text-xs text-slate-500">
                    <span>💬</span>
                    <span>${t.sendSmsNoticeToggle}</span>
                  </div>

                  <div class="flex items-center gap-2">
                    <button 
                      onclick="window.adminReviewVerification('${item.userId}', 'Reject')" 
                      class="px-4 py-2 rounded-xl text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 cursor-pointer"
                    >
                      <i class="fa-solid fa-xmark mr-1"></i> ${t.rejectVerificationAction}
                    </button>
                    
                    <button 
                      onclick="window.adminReviewVerification('${item.userId}', 'Approve')" 
                      class="btn-primary text-xs py-2 px-5 cursor-pointer bg-emerald-700 hover:bg-emerald-800"
                    >
                      <i class="fa-solid fa-check mr-1"></i> ${t.approveVerificationAction}
                    </button>
                  </div>
                </div>

              </div>
            `).join('')}
          </div>
        </section>
      ` : `
        <div class="glass-card p-12 text-center space-y-3 rounded-3xl border border-rose-200 bg-rose-50/20 shadow-sm animate-fadeIn">
          <div class="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-2xl"><i class="fa-solid fa-lock"></i></div>
          <h3 class="text-base font-black text-slate-900">${lang === 'am' ? 'የKYC ማረጋገጫ ፈቃድ ተገድቧል' : 'KYC Verification Restricted by RBAC Policy'}</h3>
          <p class="text-xs text-slate-500 max-w-md mx-auto">Your account role currently lacks the 'VERIFY_KYC' permission. Please contact a Super Administrator.</p>
        </div>
      `) : ''}

      <!-- Tab Content 4: Fiscal & Tax Invoicing Registry -->
      ${activeAdminTab === 'tax_compliance' ? (api.hasEffectivePermission('VIEW_TAX_COMPLIANCE', 'admin') ? `
        <section class="space-y-6">
          <div class="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white shadow-xl space-y-4">
            <div class="flex items-center justify-between border-b border-white/10 pb-3">
              <div class="flex items-center gap-3">
                <span class="text-2xl">🇪🇹</span>
                <div>
                  <h3 class="text-base font-extrabold text-white">MINISTRY OF REVENUES (MOR) FISCAL SETTLEMENT CONSOLE</h3>
                  <p class="text-xs text-emerald-300">Automated Tax Withholding & Agricultural Exemption Ledger</p>
                </div>
              </div>
              <span class="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30">
                FY 2026 Audit Ready
              </span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div class="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-1">
                <span class="text-slate-300">Gross Agricultural Turnover</span>
                <div class="text-xl font-black text-white">${stats.totalTransactionVolumeEtb.toLocaleString()} ETB</div>
                <small class="text-emerald-300">100% Tax-Exempt under Art. 979/2016</small>
              </div>

              <div class="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-1">
                <span class="text-slate-300">15% VAT on Platform Service (5%)</span>
                <div class="text-xl font-black text-white">${(stats.totalVatRemittedEtb || 258.75).toFixed(2)} ETB</div>
                <small class="text-sky-300">Remitted Monthly to MOR Account</small>
              </div>

              <div class="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-1">
                <span class="text-slate-300">2% Withholding on Commercial Buyers</span>
                <div class="text-xl font-black text-white">${(stats.totalWithholdingReportedEtb || 690.00).toFixed(2)} ETB</div>
                <small class="text-amber-300">Withholding Vouchers Auto-Generated</small>
              </div>
            </div>
          </div>

          <!-- Sample Invoices Audit Table -->
          <div class="glass-card p-6 space-y-4">
            <h3 class="text-base font-bold text-slate-900">
              <i class="fa-solid fa-receipt text-emerald-600 mr-2"></i> Official Electronic Tax Invoices Log
            </h3>
            
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead>
                  <tr class="border-b border-slate-200 text-slate-400 font-bold">
                    <th class="py-2.5">Invoice #</th>
                    <th class="py-2.5">Buyer (TIN)</th>
                    <th class="py-2.5">Farmer (TIN)</th>
                    <th class="py-2.5">Total (ETB)</th>
                    <th class="py-2.5">VAT Remitted</th>
                    <th class="py-2.5">Withholding</th>
                    <th class="py-2.5">Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-slate-700 font-medium">
                  ${api.getOrders().map(o => `
                    <tr>
                      <td class="py-3 font-mono font-bold text-slate-900">${o.invoiceNumber || 'ET-INV-001'}</td>
                      <td class="py-3 font-bold">${o.buyerName} <span class="text-[10px] text-slate-400 block font-mono">TIN-ET-9912001</span></td>
                      <td class="py-3 font-bold">${o.farmerName} <span class="text-[10px] text-slate-400 block font-mono">TIN-FARM-882910</span></td>
                      <td class="py-3 font-bold text-emerald-800">${o.totalEtb.toLocaleString()} ETB</td>
                      <td class="py-3 text-slate-600">${(o.platformCut * 0.15).toFixed(2)} ETB</td>
                      <td class="py-3 text-slate-600">${(o.totalEtb * 0.02).toFixed(2)} ETB</td>
                      <td class="py-3">
                        <button onclick="window.openInvoiceModal('${o.id}')" class="px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 font-bold text-[11px] cursor-pointer">
                          <i class="fa-solid fa-eye mr-1"></i> View & Print
                        </button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ` : `
        <div class="glass-card p-12 text-center space-y-3 rounded-3xl border border-rose-200 bg-rose-50/20 shadow-sm animate-fadeIn">
          <div class="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-2xl"><i class="fa-solid fa-lock"></i></div>
          <h3 class="text-base font-black text-slate-900">${lang === 'am' ? 'የግብር ሰነዶች ፈቃድ ተገድቧል' : 'Fiscal & Tax Compliance Restricted by RBAC Policy'}</h3>
          <p class="text-xs text-slate-500 max-w-md mx-auto">Your account role currently lacks the 'VIEW_TAX_COMPLIANCE' permission. Please contact a Super Administrator.</p>
        </div>
      `) : ''}

      <!-- Tab Content 5: Regional Analytics & EABC Impact Dashboard -->
      ${activeAdminTab === 'analytics' ? (api.hasEffectivePermission('VIEW_REGIONAL_ANALYTICS', 'admin') ? `
        <section class="space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">
              <i class="fa-solid fa-chart-pie text-emerald-600 mr-2"></i> ${t.regionalAnalyticsTitle}
            </h2>
            <span class="text-xs font-bold text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
              EABC Regional Sourcing Impact
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            ${regionalAnalytics.map(r => `
              <div class="glass-card p-5 space-y-3 border-t-4 border-emerald-600">
                <div class="text-xs font-extrabold text-slate-500 uppercase">${r.region}</div>
                <div class="text-xl font-black text-slate-900">${(r.totalGmvEtb / 1000000).toFixed(2)}M <span class="text-xs font-bold text-emerald-700">ETB GMV</span></div>
                
                <div class="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div class="flex justify-between">
                    <span>Smallholders:</span>
                    <strong class="text-slate-900">${r.smallholdersCount.toLocaleString()}</strong>
                  </div>
                  <div class="flex justify-between">
                    <span>Volume Traded:</span>
                    <strong class="text-slate-900">${r.volumeMetricTons} MT</strong>
                  </div>
                  <div class="flex justify-between">
                    <span>Top Commodity:</span>
                    <strong class="text-emerald-800">${r.topCrop}</strong>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </section>
      ` : `
        <div class="glass-card p-12 text-center space-y-3 rounded-3xl border border-rose-200 bg-rose-50/20 shadow-sm animate-fadeIn">
          <div class="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-2xl"><i class="fa-solid fa-lock"></i></div>
          <h3 class="text-base font-black text-slate-900">${lang === 'am' ? 'የክልላዊ ትንታኔ ፈቃድ ተገድቧል' : 'Regional Analytics Restricted by RBAC Policy'}</h3>
          <p class="text-xs text-slate-500 max-w-md mx-auto">Your account role currently lacks the 'VIEW_REGIONAL_ANALYTICS' permission. Please contact a Super Administrator.</p>
        </div>
      `) : ''}

      <!-- Tab Content 6: Broadcast Bilingual SMS (Twilio) -->
      ${activeAdminTab === 'sms' ? (api.hasEffectivePermission('BROADCAST_SMS', 'admin') ? `
        <section class="glass-card p-6 sm:p-8 space-y-6 max-w-2xl mx-auto">
          <div class="flex items-center gap-3 pb-4 border-b border-slate-200">
            <div class="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center text-xl font-bold">
              <i class="fa-solid fa-tower-broadcast"></i>
            </div>
            <div>
              <h2 class="text-lg font-bold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">${t.broadcastSmsTitle}</h2>
              <p class="text-xs text-slate-500">Send mass regulatory alerts, weather advisories, or price updates to all smallholders.</p>
            </div>
          </div>

          <form onsubmit="window.handleAdminBroadcastSms(event)" class="space-y-4 text-xs">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Target Audience</label>
              <select id="smsTargetRole" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white">
                <option value="farmer">All Registered Farmers (15,400+)</option>
                <option value="driver">All Partner Drivers (1,250+)</option>
                <option value="buyer">All Wholesale Buyers (3,800+)</option>
              </select>
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Message Body (English)</label>
              <textarea id="smsMsgEn" required rows="2" class="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="e.g. ECX Advisory: Tomato prices up 15% in Addis Ababa. Transport subsidies active."></textarea>
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">የመልእክት ዝርዝር (በአማርኛ)</label>
              <textarea id="smsMsgAm" required rows="2" class="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="ለምሳሌ: የገበያ መረጃ: በአዲስ አበባ የቲማቲም ዋጋ 15% ጨምሯል። የትራንስፖርት ድጎማ ገቢር ሆኗል።"></textarea>
            </div>

            <button type="submit" class="btn-primary w-full py-3 text-xs bg-purple-700 hover:bg-purple-800 font-extrabold shadow-md cursor-pointer">
              <i class="fa-solid fa-paper-plane"></i> ${t.sendSmsBtn}
            </button>
          </form>
        </section>
      ` : `
        <div class="glass-card p-12 text-center space-y-3 rounded-3xl border border-rose-200 bg-rose-50/20 shadow-sm animate-fadeIn">
          <div class="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-2xl"><i class="fa-solid fa-lock"></i></div>
          <h3 class="text-base font-black text-slate-900">${lang === 'am' ? 'የኤስኤምኤስ ስርጭት ፈቃድ ተገድቧል' : 'SMS Broadcast Restricted by RBAC Policy'}</h3>
          <p class="text-xs text-slate-500 max-w-md mx-auto">Your account role currently lacks the 'BROADCAST_SMS' permission. Please contact a Super Administrator.</p>
        </div>
      `) : ''}

    </div>
  `;
}
