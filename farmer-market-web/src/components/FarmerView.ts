import { Language, translations } from '../i18n/translations';
import { Listing, Order, PaymentSummary, PriceBenchmark, User } from '../types';
import { api } from '../services/api';

export function renderFarmerView(
  lang: Language,
  listings: Listing[],
  orders: Order[],
  summary: PaymentSummary,
  isCreateModalOpen: boolean,
  activeFarmerTab: 'listings' | 'wallet' | 'sms' = 'listings',
  benchmarks: PriceBenchmark[] = api.getPriceBenchmarks(),
  currentUser: User | null = api.getCurrentUser()
): string {
  const t = translations[lang];

  return `
    <div class="space-y-8 pb-20">
      
      <!-- Top Header & Farmer Info with Trust Badges -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex flex-wrap items-center gap-2 mb-1.5">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
              <i class="fa-solid fa-seedling text-emerald-700"></i> ${currentUser?.region || 'Oromia (Bishoftu)'}
            </span>
            ${api.getVerificationStatus() === 'Approved' ? `
              <span class="trust-badge text-emerald-800 bg-emerald-50 border-emerald-200">
                <i class="fa-solid fa-circle-check text-emerald-600"></i> ${t.verifiedFayda} ${currentUser?.kycDocumentNumber ? `(${currentUser.kycDocumentNumber})` : ''}
              </span>
              ${currentUser?.tinNumber ? `
                <span class="trust-badge text-blue-800 bg-blue-50 border-blue-200">
                  <i class="fa-solid fa-file-invoice text-blue-600"></i> TIN: ${currentUser.tinNumber}
                </span>
              ` : ''}
            ` : api.getVerificationStatus() === 'UnderReview' ? `
              <span class="trust-badge text-amber-800 bg-amber-50 border-amber-200">
                <i class="fa-solid fa-hourglass-half text-amber-600"></i> ${lang === 'am' ? 'ማረጋገጫ በመገምገም ላይ' : 'Verification Under Review'}
              </span>
            ` : api.getVerificationStatus() === 'Rejected' ? `
              <span class="trust-badge text-red-800 bg-red-50 border-red-200">
                <i class="fa-solid fa-circle-xmark text-red-600"></i> ${lang === 'am' ? 'ማረጋገጫ አልጸደቀም' : 'Verification Rejected'}
              </span>
            ` : `
              <span class="trust-badge text-slate-700 bg-slate-100 border-slate-200">
                <i class="fa-solid fa-shield-halved text-slate-500"></i> ${lang === 'am' ? 'ያልተረጋገጠ መለያ' : 'Unverified Account'}
              </span>
            `}
            <span class="trust-badge text-amber-900 bg-amber-50 border-amber-300 font-extrabold">
              <i class="fa-solid fa-star text-amber-500"></i> ${api.getFarmerRatingStats(currentUser?.id || '').averageRating} (${api.getFarmerRatingStats(currentUser?.id || '').reviewCount} ${t.allReviews || 'Reviews'})
            </span>
            <span class="trust-badge text-purple-800 bg-purple-50 border-purple-200">
              <i class="fa-solid fa-users text-purple-600"></i> ${currentUser?.repeatBuyerCount || 0} ${t.repeatBuyers}
            </span>
            <span class="trust-badge text-emerald-800 bg-emerald-50 border-emerald-200">
              <i class="fa-solid fa-clock-rotate-left text-emerald-600"></i> ${currentUser?.onTimeDeliveryRate || 100}% ${t.onTimeRate}
            </span>
          </div>

          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">
            ${t.farmerPortalTitle}
          </h1>
        </div>

        <div class="flex items-center gap-3">
          <button onclick="window.toggleFarmerTab('sms')" class="btn-secondary text-xs py-2.5 px-4 cursor-pointer">
            <i class="fa-solid fa-comment-sms text-emerald-600"></i>
            <span class="${lang === 'am' ? 'lang-am' : ''}">${t.navSmsConsole}</span>
          </button>

          <button onclick="window.toggleFarmerTab('wallet')" class="btn-secondary text-xs py-2.5 px-4 cursor-pointer">
            <i class="fa-solid fa-wallet text-amber-600"></i>
            <span class="${lang === 'am' ? 'lang-am' : ''}">${t.navWallet}</span>
          </button>

          <button onclick="${api.hasEffectivePermission('PUBLISH_PRODUCE', 'farmer') ? 'window.toggleCreateListingModal()' : 'window.alert(\'Permission Restricted: PUBLISH_PRODUCE has been revoked by SuperAdmin RBAC policy.\')'}" class="btn-primary text-xs sm:text-sm py-2.5 px-5 shadow-md cursor-pointer ${!api.hasEffectivePermission('PUBLISH_PRODUCE', 'farmer') ? 'opacity-60 border-dashed bg-slate-700' : ''}">
            <i class="fa-solid ${api.hasEffectivePermission('PUBLISH_PRODUCE', 'farmer') ? 'fa-plus-circle' : 'fa-lock'}"></i>
            <span class="${lang === 'am' ? 'lang-am' : ''}">${t.postNewListing}</span>
          </button>
        </div>
      </div>

      <!-- Verification Action Banner -->
      ${api.getVerificationStatus() !== 'Approved' ? `
        <div class="p-4 rounded-2xl ${api.getVerificationStatus() === 'UnderReview' ? 'bg-amber-50 border border-amber-200' : api.getVerificationStatus() === 'Rejected' ? 'bg-red-50 border border-red-200' : 'bg-emerald-50 border border-emerald-200'} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div class="flex items-center gap-3">
            <span class="text-2xl">${api.getVerificationStatus() === 'UnderReview' ? '⏳' : api.getVerificationStatus() === 'Rejected' ? '❌' : '🛡️'}</span>
            <div>
              <h4 class="text-sm font-bold ${api.getVerificationStatus() === 'UnderReview' ? 'text-amber-900' : api.getVerificationStatus() === 'Rejected' ? 'text-red-900' : 'text-emerald-900'}">
                ${api.getVerificationStatus() === 'UnderReview' ? (lang === 'am' ? 'ሰነዶችዎ በአድሚን በመገምገም ላይ ናቸው' : 'Fayda ID & TIN Verification Under Review') : api.getVerificationStatus() === 'Rejected' ? (lang === 'am' ? 'ማረጋገጫዎ አልጸደቀም፤ እባክዎ እንደገና ያስገቡ' : 'Verification Rejected - Action Required') : (lang === 'am' ? 'መለያዎን በፋይዳ (Fayda) እና በTIN ያረጋግጡ' : 'Complete Fayda ID & Taxpayer TIN Verification')}
              </h4>
              <p class="text-xs ${api.getVerificationStatus() === 'UnderReview' ? 'text-amber-700' : api.getVerificationStatus() === 'Rejected' ? 'text-red-700' : 'text-emerald-700'}">
                ${currentUser?.rejectionReason ? `${t.rejectionReasonLabel}: ${currentUser.rejectionReason}` : t.verificationBannerText}
              </p>
            </div>
          </div>
          <button onclick="window.openVerificationWizard()" class="btn-primary text-xs py-2 px-4 shrink-0 shadow-xs cursor-pointer ${api.getVerificationStatus() === 'UnderReview' ? 'bg-amber-700 hover:bg-amber-800' : api.getVerificationStatus() === 'Rejected' ? 'bg-red-700 hover:bg-red-800' : 'bg-emerald-700 hover:bg-emerald-800'}">
            <i class="fa-solid fa-id-card mr-1"></i> ${api.getVerificationStatus() === 'Rejected' ? t.resubmitDocsBtn : t.startVerificationBtn}
          </button>
        </div>
      ` : ''}

      <!-- Farmer Portal Navigation Pills -->
      <div class="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button onclick="window.toggleFarmerTab('listings')" class="cat-pill ${activeFarmerTab === 'listings' ? 'active' : ''}">
          <i class="fa-solid fa-box-open"></i>
          <span>${lang === 'am' ? 'ምርቶች እና ትዕዛዞች' : 'Produce & Orders'}</span>
        </button>
        <button onclick="window.toggleFarmerTab('wallet')" class="cat-pill ${activeFarmerTab === 'wallet' ? 'active' : ''}">
          <i class="fa-solid fa-wallet"></i>
          <span>${t.walletTitle}</span>
        </button>
        <button onclick="window.toggleFarmerTab('sms')" class="cat-pill ${activeFarmerTab === 'sms' ? 'active' : ''}">
          <i class="fa-solid fa-tower-broadcast"></i>
          <span>${t.smsConsoleTitle}</span>
        </button>
      </div>

      ${activeFarmerTab === 'wallet' ? renderFarmerWalletSection(lang, summary, orders, currentUser) :
      activeFarmerTab === 'sms' ? renderFarmerSmsSection(lang) : `

      <!-- Price Benchmark Advisory Banner -->
      <section class="p-5 rounded-2xl bg-gradient-to-r from-emerald-900 to-slate-900 text-white shadow-lg space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-sm">
              <i class="fa-solid fa-chart-line"></i>
            </div>
            <div>
              <h3 class="font-extrabold text-sm text-white ${lang === 'am' ? 'lang-am' : ''}">${t.priceBenchmarkTitle}</h3>
              <p class="text-[11px] text-emerald-200 font-medium">${t.benchmarkDesc}</p>
            </div>
          </div>
          <span class="text-[10px] font-bold bg-white/10 text-emerald-300 px-2.5 py-1 rounded-full border border-white/10">
            <i class="fa-solid fa-clock mr-1"></i> Live Merkato & Sholla Feeds
          </span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-1">
          ${benchmarks.map(b => `
            <div class="p-3 rounded-xl bg-white/10 border border-white/10 space-y-1">
              <div class="text-[11px] font-bold text-slate-300 truncate">${lang === 'am' ? b.cropNameAm : b.cropName}</div>
              <div class="text-base font-black text-white">${b.avgPriceEtb} <span class="text-[10px] font-bold text-emerald-300">ETB/kg</span></div>
              <div class="flex items-center justify-between text-[10px] text-slate-400">
                <span>Range: ${b.minPriceEtb}-${b.maxPriceEtb}</span>
                <span class="${b.trend === 'Up' ? 'text-emerald-400' : b.trend === 'Down' ? 'text-amber-300' : 'text-slate-300'} font-bold">
                  <i class="fa-solid fa-arrow-trend-${b.trend === 'Up' ? 'up' : b.trend === 'Down' ? 'down' : 'flat'}"></i>
                </span>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Earnings Dashboard (90% Net Cut) -->
      <section class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div class="glass-card p-5 border-l-4 border-emerald-600 space-y-1">
          <div class="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>${t.walletBalance}</span>
            <span class="telebirr-pill text-[10px] py-0.5 px-2">Telebirr Payout</span>
          </div>
          <div class="text-2xl sm:text-3xl font-black text-slate-900">
            ${(currentUser?.walletBalanceEtb || 48200).toLocaleString()} <span class="text-sm font-bold text-emerald-700">ETB</span>
          </div>
          <p class="text-[11px] text-emerald-700 font-semibold">
            <i class="fa-solid fa-circle-check"></i> Ready for instant withdrawal
          </p>
        </div>

        <div class="glass-card p-5 border-l-4 border-amber-500 space-y-1">
          <div class="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>${t.pendingEscrow}</span>
            <span class="text-xs text-amber-600 font-bold">${summary.pendingOrdersCount} Active</span>
          </div>
          <div class="text-2xl sm:text-3xl font-black text-slate-900">
            ${summary.pendingEscrowEtb.toLocaleString()} <span class="text-sm font-bold text-amber-700">ETB</span>
          </div>
          <p class="text-[11px] text-amber-700 font-semibold">
            <i class="fa-solid fa-lock"></i> Protected in Telebirr Escrow
          </p>
        </div>

        <div class="glass-card p-5 border-l-4 border-blue-600 space-y-1">
          <div class="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>${t.lifetimePayout}</span>
            <span class="text-xs text-blue-600 font-bold">${summary.completedOrdersCount} Delivered</span>
          </div>
          <div class="text-2xl sm:text-3xl font-black text-slate-900">
            ${summary.releasedEtb.toLocaleString()} <span class="text-sm font-bold text-slate-500">ETB</span>
          </div>
          <p class="text-[11px] text-blue-700 font-semibold">
            <i class="fa-solid fa-hand-holding-dollar"></i> 90% direct produce value
          </p>
        </div>

      </section>

      <!-- Incoming Orders with Full Legal & Tax Receipts -->
      <section class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">
            <i class="fa-solid fa-clipboard-list text-emerald-600 mr-2"></i> ${t.incomingOrders}
          </h2>
          <span class="text-xs font-bold px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
            ${orders.length} Active Orders
          </span>
        </div>

        ${orders.length === 0 ? `
          <div class="glass-card p-8 text-center text-slate-500 text-xs">
            <i class="fa-solid fa-basket-shopping text-3xl mb-2 text-slate-300"></i>
            <p>No incoming buyer orders yet. Create new listings to reach wholesale buyers.</p>
          </div>
        ` : `
          <div class="space-y-3">
            ${orders.map(o => `
              <div class="glass-card p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-emerald-300 transition-colors">
                
                <div class="space-y-1 min-w-0">
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="badge-status status-${o.status}">${o.status.toUpperCase()}</span>
                    <span class="text-xs font-bold text-slate-900">${o.productName}</span>
                    <span class="text-xs text-slate-500">(${o.qtyKg} kg @ ${o.pricePerKg} ETB)</span>
                    <span class="text-[10px] font-mono text-slate-400">${o.contractNumber || 'AGR-ET-001'}</span>
                  </div>

                  <p class="text-xs text-slate-600">
                    Buyer: <strong class="text-slate-800">${o.buyerName}</strong> · Telebirr Escrow: <strong class="text-emerald-700">${o.totalEtb.toLocaleString()} ETB</strong> (Your Net 90%: <strong class="text-emerald-800 font-bold">${o.farmerCut.toLocaleString()} ETB</strong>)
                  </p>
                </div>

                <div class="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  <button onclick="window.openContractModal('${o.id}')" class="btn-secondary text-xs py-1.5 px-2.5 text-purple-700 bg-purple-50 hover:bg-purple-100 border-purple-200 cursor-pointer" title="View Digital Sales Contract">
                    <i class="fa-solid fa-file-contract mr-1"></i> ${t.viewContractBtn}
                  </button>

                  <button onclick="window.openInvoiceModal('${o.id}')" class="btn-secondary text-xs py-1.5 px-2.5 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border-emerald-200 cursor-pointer" title="Download Tax Exemption Receipt">
                    <i class="fa-solid fa-file-invoice mr-1"></i> ${t.viewInvoiceBtn}
                  </button>

                  <button onclick="window.openWaybillModal('${o.id}')" class="btn-secondary text-xs py-1.5 px-2.5 text-sky-700 bg-sky-50 hover:bg-sky-100 border-sky-200 cursor-pointer" title="View Transport Waybill">
                    <i class="fa-solid fa-truck-fast mr-1"></i> ${t.viewWaybillBtn}
                  </button>

                  ${o.status === 'pending' ? `
                    <button onclick="window.confirmFarmerOrder('${o.id}')" 
                      class="btn-primary text-xs py-1.5 px-4 shadow-sm cursor-pointer">
                      <i class="fa-solid fa-check mr-1"></i>
                      <span class="${lang === 'am' ? 'lang-am' : ''}">${t.confirmOrderAction}</span>
                    </button>
                  ` : ''}
                </div>

              </div>
            `).join('')}
          </div>
        `}
      </section>

      <!-- My Active Produce Listings & Advance Harvests -->
      <section class="space-y-4">
        <h2 class="text-xl font-bold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">
          <i class="fa-solid fa-box-open text-emerald-600 mr-2"></i> ${t.myActiveListings}
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${listings.map(l => `
            <div 
              onclick="window.openProduceDetail('${l.id}')"
              class="glass-card overflow-hidden cursor-pointer hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 transform hover:-translate-y-1 group"
              title="Click to view produce post details & photos"
            >
              <div class="h-44 w-full relative overflow-hidden">
                <img src="${l.photos[0]}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                
                <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span class="bg-white/95 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    <i class="fa-solid fa-eye text-emerald-600 mr-1"></i> View Post Details
                  </span>
                </div>

                <div class="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
                  ${l.isAdvanceHarvest ? `
                    <span class="advance-pill shadow-xs">
                      <i class="fa-solid fa-calendar-days text-emerald-700"></i> Advance Harvest
                    </span>
                  ` : ''}
                  ${l.requiresColdChain ? `
                    <span class="bg-cyan-900/90 backdrop-blur-md text-cyan-200 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs border border-cyan-500/30">
                      <i class="fa-solid fa-snowflake"></i> Cold-Chain
                    </span>
                  ` : ''}
                  ${l.isAggregatedLot || l.cooperativeName ? `
                    <span class="bg-amber-900/90 backdrop-blur-md text-amber-200 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs border border-amber-500/30">
                      <i class="fa-solid fa-users"></i> ${l.cooperativeName || 'Cooperative Lot'}
                    </span>
                  ` : ''}
                  ${l.isOrganic ? `
                    <span class="bg-emerald-800/90 backdrop-blur-md text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
                      Organic
                    </span>
                  ` : ''}
                </div>

                <span class="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-700 text-white shadow-xs z-10 pointer-events-none">
                  ${l.status.toUpperCase()}
                </span>
              </div>
              <div class="p-4 space-y-2">
                <div class="flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span class="text-amber-600 font-bold"><i class="fa-solid fa-certificate mr-1"></i> ${l.grade || 'Grade 1'}</span>
                  <span>${l.ripeness || 'Ready Today'}</span>
                </div>

                <h3 class="font-bold text-slate-900 text-base group-hover:text-emerald-700 transition-colors ${lang === 'am' ? 'lang-am' : ''}">
                  ${lang === 'am' && l.nameAm ? l.nameAm : l.productName}
                </h3>

                ${l.voiceNoteTranscript ? `
                  <div class="p-2 rounded-lg bg-emerald-50 border border-emerald-100 text-[11px] text-emerald-900 flex items-start gap-2">
                    <i class="fa-solid fa-microphone text-emerald-700 mt-0.5"></i>
                    <span class="italic truncate">"${l.voiceNoteTranscript}"</span>
                  </div>
                ` : ''}

                <div class="flex items-center justify-between text-xs text-slate-600 pt-1">
                  <span>Price: <strong class="text-emerald-800 font-extrabold text-sm">${l.pricePerKg} ETB</strong>/kg</span>
                  <span>Stock: <strong class="font-bold text-slate-800">${l.qtyKg.toLocaleString()} kg</strong></span>
                </div>
                
                <div class="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span>Min order: ${l.minOrderKg} kg</span>
                  <span><i class="fa-solid fa-calendar mr-1"></i> ${l.availableFrom}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Customer Reviews & Feedback Section -->
      ${(() => {
        const farmerId = currentUser?.id || '11111111-1111-1111-1111-111111111111';
        const reviews = api.getReviewsForFarmer(farmerId);
        const stats = api.getFarmerRatingStats(farmerId);
        return `
          <section class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-xl font-bold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">
                  <i class="fa-solid fa-star text-amber-500 mr-2"></i> ${t.verifiedBuyerReviews || 'Customer Reviews & Feedback'}
                </h2>
                <p class="text-xs text-slate-500 font-medium">Real-time ratings and comments from verified wholesale buyers who received your produce.</p>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-sm font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  ★ ${stats.averageRating} / 5.0
                </span>
                <span class="text-xs font-bold px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
                  ${stats.reviewCount} ${t.allReviews || 'Verified Reviews'}
                </span>
              </div>
            </div>

            ${reviews.length === 0 ? `
              <div class="glass-card p-8 text-center text-slate-500 text-xs">
                <i class="fa-regular fa-comment-dots text-3xl mb-2 text-slate-300"></i>
                <p>${t.noReviewsYet || 'No customer reviews yet. Reviews will appear here once buyers confirm delivery.'}</p>
              </div>
            ` : `
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${reviews.map(rev => `
                  <div class="glass-card p-4 space-y-2.5">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center">
                          ${rev.reviewerName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div class="font-bold text-slate-900 text-xs">${rev.reviewerName}</div>
                          <span class="text-[10px] text-slate-400 font-medium">${rev.createdAt}</span>
                        </div>
                      </div>
                      <div class="flex items-center text-amber-400 text-xs gap-0.5 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        ${[1, 2, 3, 4, 5].map(st => `
                          <i class="fa-solid fa-star ${st <= rev.rating ? 'text-amber-500' : 'text-slate-200'}"></i>
                        `).join('')}
                        <span class="font-bold text-slate-700 ml-1 text-[11px]">${rev.rating}.0</span>
                      </div>
                    </div>

                    ${rev.quickTags && rev.quickTags.length > 0 ? `
                      <div class="flex flex-wrap gap-1">
                        ${rev.quickTags.map(tag => `
                          <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-100">
                            ${tag}
                          </span>
                        `).join('')}
                      </div>
                    ` : ''}

                    ${rev.comment ? `
                      <p class="text-xs text-slate-700 leading-relaxed font-medium bg-slate-50 p-2.5 rounded-xl border border-slate-100 italic">
                        "${rev.comment}"
                      </p>
                    ` : ''}
                  </div>
                `).join('')}
              </div>
            `}
          </section>
        `;
      })()}
      `}

      <!-- Post New Produce Listing Modal (Voice Note + Advance Harvest + Benchmarking) -->
      ${isCreateModalOpen ? renderCreateListingModal(lang, benchmarks) : ''}

    </div>
  `;
}

function renderFarmerWalletSection(lang: Language, summary: PaymentSummary, orders: Order[], user: User | null): string {
  const t = translations[lang];

  return `
    <div class="space-y-6">
      
      <!-- Telebirr Balance Card -->
      <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-tr from-blue-900 via-blue-800 to-sky-700 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div class="space-y-2">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold text-sky-200">
            <i class="fa-solid fa-bolt text-amber-300"></i> Telebirr Direct Settlement Engine
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-white">
            ${(user?.walletBalanceEtb || 48200).toLocaleString()} <span class="text-lg font-bold text-sky-200">ETB</span>
          </h2>
          <p class="text-xs text-sky-100 max-w-md">
            Linked Telebirr Account: <strong class="text-white">${user?.phone || '+251 911 223 344'}</strong> · 90% direct produce value deposited immediately after buyer delivery approval.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <button onclick="${api.hasEffectivePermission('REQUEST_WALLET_WITHDRAWAL', 'farmer') ? 'window.handleFarmerWithdrawal()' : 'window.alert(\'Permission Restricted: REQUEST_WALLET_WITHDRAWAL has been revoked by SuperAdmin RBAC policy.\')'}" class="btn-primary bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs py-3 px-6 rounded-xl shadow-lg w-full sm:w-auto cursor-pointer ${!api.hasEffectivePermission('REQUEST_WALLET_WITHDRAWAL', 'farmer') ? 'opacity-50 border-dashed' : ''}">
            <i class="fa-solid ${api.hasEffectivePermission('REQUEST_WALLET_WITHDRAWAL', 'farmer') ? 'fa-money-bill-transfer' : 'fa-lock'} mr-1 text-slate-950"></i> ${t.requestWithdrawal}
          </button>
        </div>
      </div>

      <!-- Tax Exemption & Withholding Summary Banner -->
      <div class="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-lg font-bold shrink-0">
            <i class="fa-solid fa-stamp"></i>
          </div>
          <div>
            <h4 class="font-extrabold text-sm text-emerald-950">Ethiopian Tax Exemption Compliance (Proclamation No. 979/2016)</h4>
            <p class="text-xs text-emerald-800">Primary agricultural produce sales are VAT-exempt. 2% withholding tax reported directly to MOR.</p>
          </div>
        </div>
        <div class="text-right shrink-0">
          <div class="text-xs font-bold text-emerald-800">Withholding Declared:</div>
          <div class="text-base font-black text-emerald-950">${(summary.totalWithholdingTaxPaidEtb || 964).toLocaleString()} ETB</div>
        </div>
      </div>

      <!-- Payout Log History -->
      <div class="glass-card p-6 space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-bold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">
            <i class="fa-solid fa-receipt text-emerald-600 mr-1.5"></i> ${t.payoutHistory}
          </h3>
          <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
            100% Verified Telebirr Payouts
          </span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead>
              <tr class="border-b border-slate-200 text-slate-400 font-bold">
                <th class="py-2.5">Order & Produce</th>
                <th class="py-2.5">Quantity</th>
                <th class="py-2.5">Gross Order</th>
                <th class="py-2.5 text-emerald-800">Net Farmer Payout (90%)</th>
                <th class="py-2.5">Telebirr Ref</th>
                <th class="py-2.5">Documents</th>
                <th class="py-2.5">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700 font-medium">
              ${orders.map(o => `
                <tr>
                  <td class="py-3 font-bold text-slate-900">
                    <div>${o.productName}</div>
                    <span class="text-[10px] text-slate-400">Order #${o.id.slice(0, 8).toUpperCase()}</span>
                  </td>
                  <td class="py-3 font-semibold">${o.qtyKg} kg</td>
                  <td class="py-3 font-semibold">${o.totalEtb.toLocaleString()} ETB</td>
                  <td class="py-3 font-black text-emerald-700 text-sm">${o.farmerCut.toLocaleString()} ETB</td>
                  <td class="py-3 font-mono text-[11px] text-slate-500">${o.paymentRef || 'TB-TXN-' + o.id.slice(0, 8)}</td>
                  <td class="py-3">
                    <div class="flex items-center gap-1.5">
                      <button onclick="window.openInvoiceModal('${o.id}')" class="px-2 py-1 rounded bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 font-bold text-[10px] cursor-pointer" title="View Tax Receipt">
                        <i class="fa-solid fa-file-invoice"></i> Receipt
                      </button>
                      <button onclick="window.openContractModal('${o.id}')" class="px-2 py-1 rounded bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200 font-bold text-[10px] cursor-pointer" title="View Contract">
                        <i class="fa-solid fa-file-contract"></i> Contract
                      </button>
                    </div>
                  </td>
                  <td class="py-3">
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${o.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
                      ${o.status === 'delivered' ? 'Paid to Telebirr' : 'Held in Escrow'}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;
}

function renderFarmerSmsSection(lang: Language): string {
  const t = translations[lang];

  return `
    <div class="glass-card p-6 sm:p-8 space-y-6 max-w-3xl mx-auto">
      
      <div class="flex items-center gap-3 pb-4 border-b border-slate-200">
        <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xl font-bold">
          <i class="fa-solid fa-comment-sms"></i>
        </div>
        <div>
          <h2 class="text-lg font-bold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">${t.smsConsoleTitle}</h2>
          <p class="text-xs text-slate-500">${t.smsConsoleDesc}</p>
        </div>
      </div>

      <!-- Quick Command Reference -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <div class="font-bold text-slate-900"><i class="fa-solid fa-tag text-emerald-600 mr-1"></i> List Produce:</div>
          <code class="text-[11px] text-emerald-800 bg-white p-1 rounded border border-slate-200 block">LIST Tomato 1000 45 Bishoftu</code>
        </div>
        <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <div class="font-bold text-slate-900"><i class="fa-solid fa-check text-blue-600 mr-1"></i> Confirm Order:</div>
          <code class="text-[11px] text-blue-800 bg-white p-1 rounded border border-slate-200 block">CONFIRM 0001</code>
        </div>
        <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <div class="font-bold text-slate-900"><i class="fa-solid fa-chart-line text-purple-600 mr-1"></i> Check Market Prices:</div>
          <code class="text-[11px] text-purple-800 bg-white p-1 rounded border border-slate-200 block">PRICES</code>
        </div>
        <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <div class="font-bold text-slate-900"><i class="fa-solid fa-wallet text-amber-600 mr-1"></i> Check Balance:</div>
          <code class="text-[11px] text-amber-800 bg-white p-1 rounded border border-slate-200 block">WALLET</code>
        </div>
      </div>

      <!-- Interactive SMS Simulator -->
      <form onsubmit="window.handleSimulateSms(event)" class="space-y-4 pt-2">
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Smallholder Mobile Phone Number</label>
          <input type="text" id="smsPhone" value="+251911223344" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">${t.smsSimulateInbound}</label>
          <div class="flex items-center gap-2">
            <input type="text" id="smsCommand" required placeholder="${t.smsCommandPlaceholder}" class="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            <button type="submit" class="btn-primary text-xs py-2.5 px-5 cursor-pointer">
              <i class="fa-solid fa-paper-plane"></i> Send SMS
            </button>
          </div>
        </div>
      </form>

      <!-- SMS Response Terminal -->
      <div id="smsResponseBox" class="hidden p-4 rounded-2xl bg-slate-900 text-emerald-300 font-mono text-xs space-y-1 border border-slate-800">
        <div class="text-[10px] text-slate-400 font-sans font-bold flex items-center justify-between border-b border-slate-800 pb-1">
          <span><i class="fa-solid fa-tower-cell mr-1 text-emerald-400"></i> Inbound Twilio Webhook Output</span>
          <span class="text-emerald-400 font-bold">200 OK</span>
        </div>
        <div id="smsResponseText" class="pt-1 leading-relaxed"></div>
      </div>

    </div>
  `;
}

export function renderCreateListingModal(lang: Language, benchmarks: PriceBenchmark[]): string {
  const t = translations[lang];

  return `
    <div class="modal-backdrop" onclick="if(event.target === this) window.toggleCreateListingModal()">
      <div class="modal-content p-6 sm:p-8 space-y-6 max-w-2xl">
        
        <div class="flex items-center justify-between pb-4 border-b border-slate-200">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
              <i class="fa-solid fa-plus"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">${t.postNewListing}</h3>
              <p class="text-xs text-slate-500 font-medium">Publish produce with Voice Note & Market Price Benchmarking</p>
            </div>
          </div>
          <button onclick="window.toggleCreateListingModal()" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <!-- Voice Note Recording Engine (Amharic / Afaan Oromoo) -->
        <div class="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-microphone-lines text-emerald-700 text-lg"></i>
              <span class="font-extrabold text-xs text-emerald-950 ${lang === 'am' ? 'lang-am' : ''}">${t.voiceNoteTitle}</span>
            </div>
            <span class="text-[10px] font-bold bg-emerald-200/70 text-emerald-900 px-2 py-0.5 rounded-full">
              Amharic / Oromifa Audio AI
            </span>
          </div>

          <p class="text-xs text-emerald-800 leading-relaxed font-medium">
            ${t.voiceNoteDesc}
          </p>

          <div class="flex flex-wrap items-center gap-3 pt-1">
            <button type="button" id="voiceRecordBtn" onclick="window.handleVoiceRecordToggle()" class="btn-primary text-xs py-2 px-4 shadow-sm cursor-pointer">
              <i class="fa-solid fa-microphone mr-1"></i> <span id="voiceRecordLabel">${t.recordVoiceBtn}</span>
            </button>
            <div id="voiceWaveAnimation" class="hidden flex items-center gap-1 h-6">
              <div class="voice-wave-bar"></div>
              <div class="voice-wave-bar"></div>
              <div class="voice-wave-bar"></div>
              <div class="voice-wave-bar"></div>
              <div class="voice-wave-bar"></div>
              <span class="text-xs font-bold text-emerald-800 ml-2 animate-pulse">Transcribing speech...</span>
            </div>
          </div>

          <div id="voiceTranscriptionResult" class="hidden p-3 rounded-xl bg-white border border-emerald-200 text-xs text-slate-800 space-y-1">
            <div class="font-bold text-emerald-800 flex items-center gap-1.5">
              <i class="fa-solid fa-circle-check"></i> ${t.voiceRecordedSuccess}
            </div>
            <p id="voiceTranscriptText" class="italic text-slate-600 text-[11px]"></p>
          </div>
        </div>

        <form onsubmit="window.handleCreateListingSubmit(event)" class="space-y-4">
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">${t.productNameEn}</label>
              <input type="text" id="newProdName" required placeholder="e.g. Fresh Red Tomatoes" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">${t.productNameAm}</label>
              <input type="text" id="newProdNameAm" placeholder="ለምሳሌ: ቀይ የሾላ ቲማቲም" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">${t.categoryLabel}</label>
              <select id="newCategory" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white">
                <option value="Vegetables">${t.catVegetables}</option>
                <option value="Grains">${t.catGrains}</option>
                <option value="Fruits">${t.catFruits}</option>
                <option value="Coffee">${t.catCoffee}</option>
                <option value="Spices">${t.catSpices}</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">${t.qtyKgLabel}</label>
              <input type="number" id="newQtyKg" required min="10" value="1000" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>

            <div>
              <div class="flex items-center justify-between mb-1">
                <label class="text-xs font-bold text-slate-700">${t.priceKgLabel}</label>
                <button type="button" onclick="window.checkFairPriceForNewListing()" class="text-[10px] font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1 cursor-pointer">
                  <i class="fa-solid fa-wand-magic-sparkles text-amber-600"></i> AI Fair Rate
                </button>
              </div>
              <input type="number" id="newPricePerKg" required min="1" value="45" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-emerald-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">${t.minOrderLabel}</label>
              <input type="number" id="newMinOrderKg" required min="5" value="50" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">${t.gradeLabel}</label>
              <select id="newGrade" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white">
                <option value="Grade 1">Grade 1 (Standard / Premium)</option>
                <option value="Export Grade">Export Grade (Grade A+ International)</option>
                <option value="Grade 2">Grade 2 (Commercial Table)</option>
                <option value="Grade 3">Grade 3 (Processing / Bulk)</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">${t.ripenessLabel}</label>
              <select id="newRipeness" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white">
                <option value="Ready Today">Ready Today</option>
                <option value="Semi-Ripe">Semi-Ripe (2-3 Days)</option>
                <option value="Green / Storable">Green / Storable (1-2 Weeks)</option>
              </select>
            </div>
          </div>

          <!-- Cold-Chain & Cooperative Aggregation Lot Features -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3.5 rounded-xl bg-cyan-50/70 border border-cyan-200 space-y-1">
              <label class="flex items-center gap-2 text-xs font-bold text-cyan-950 cursor-pointer">
                <input type="checkbox" id="newRequiresColdChain" class="rounded text-cyan-600 focus:ring-cyan-500" />
                <span>❄️ Requires Cold-Chain Logistics</span>
              </label>
              <p class="text-[10px] text-cyan-800 font-medium pl-5">Auto-matches with refrigerated Isuzu freight trucks (0°C to 8°C).</p>
            </div>

            <div class="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
              <div class="flex items-center justify-between">
                <label class="flex items-center gap-2 text-xs font-bold text-amber-950 cursor-pointer">
                  <input type="checkbox" id="newIsAggregatedLot" onchange="document.getElementById('coopDetailsField').classList.toggle('hidden', !this.checked)" class="rounded text-amber-600 focus:ring-amber-500" />
                  <span>🤝 Cooperative Hub Aggregated Lot</span>
                </label>
              </div>
              <div id="coopDetailsField" class="hidden">
                <input type="text" id="newCooperativeName" placeholder="e.g. Bishoftu Farmers Union" class="w-full px-2.5 py-1.5 rounded-lg border border-amber-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white" />
              </div>
            </div>
          </div>

          <!-- Advance Harvest Calendar Toggle -->
          <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div class="flex items-center justify-between">
              <label class="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                <input type="checkbox" id="newIsAdvanceHarvest" onchange="document.getElementById('advanceHarvestDateField').classList.toggle('hidden', !this.checked)" class="rounded text-emerald-600 focus:ring-emerald-500" />
                <span>${t.advanceHarvestToggle}</span>
              </label>
              <span class="text-[10px] text-slate-500 font-semibold">Pre-commit Wholesale Buyers</span>
            </div>

            <div id="advanceHarvestDateField" class="hidden pt-1">
              <label class="block text-xs font-bold text-slate-700 mb-1">${t.expectedHarvestLabel}</label>
              <input type="date" id="newExpectedHarvestDate" class="px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>
          </div>

          <div class="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
            <button type="button" onclick="window.toggleCreateListingModal()" class="btn-secondary text-xs py-2.5 px-4 cursor-pointer">
              Cancel
            </button>
            <button type="submit" class="btn-primary text-xs py-2.5 px-6 shadow-md cursor-pointer">
              <i class="fa-solid fa-cloud-arrow-up"></i> ${t.publishListingBtn}
            </button>
          </div>

        </form>

      </div>
    </div>
  `;
}
