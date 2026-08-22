import { Language, translations } from '../i18n/translations';
import { Listing, Order, PaymentSummary } from '../types';

export function renderFarmerView(
  lang: Language,
  listings: Listing[],
  orders: Order[],
  summary: PaymentSummary,
  isCreateModalOpen: boolean
): string {
  const t = translations[lang];

  return `
    <div class="space-y-8 pb-20">
      
      <!-- Top Header & Post Button -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-1">
            <i class="fa-solid fa-seedling"></i> Farmer Control Center · Oromia (Bishoftu)
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">
            ${t.farmerPortalTitle}
          </h1>
        </div>

        <button onclick="window.toggleCreateListingModal()" class="btn-primary text-sm py-2.5 px-5 shadow-md">
          <i class="fa-solid fa-plus-circle"></i>
          <span class="${lang === 'am' ? 'lang-am' : ''}">${t.postNewListing}</span>
        </button>
      </div>

      <!-- Earnings Dashboard (90% Net Cut) -->
      <section class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div class="glass-card p-5 border-l-4 border-emerald-600 space-y-1">
          <div class="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>${t.earningsToday}</span>
            <span class="telebirr-pill text-[10px] py-0.5 px-2">Telebirr</span>
          </div>
          <div class="text-2xl sm:text-3xl font-black text-slate-900">
            ${(summary.totalEarnedEtb * 0.4).toLocaleString()} <span class="text-sm font-bold text-emerald-700">ETB</span>
          </div>
          <p class="text-[11px] text-emerald-700 font-semibold">
            <i class="fa-solid fa-circle-check"></i> ${t.depositedToWallet}
          </p>
        </div>

        <div class="glass-card p-5 border-l-4 border-amber-500 space-y-1">
          <div class="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Pending Escrow Release</span>
            <span class="escrow-badge text-[10px]">Held in Escrow</span>
          </div>
          <div class="text-2xl sm:text-3xl font-black text-slate-900">
            ${summary.pendingEscrowEtb.toLocaleString()} <span class="text-sm font-bold text-amber-700">ETB</span>
          </div>
          <p class="text-[11px] text-amber-700 font-semibold">
            <i class="fa-solid fa-hourglass-half"></i> Releases upon buyer delivery confirmation
          </p>
        </div>

        <div class="glass-card p-5 border-l-4 border-blue-600 space-y-1">
          <div class="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Total Orders Fulfilled</span>
            <span class="text-xs text-blue-600 font-bold">100% Guaranteed</span>
          </div>
          <div class="text-2xl sm:text-3xl font-black text-slate-900">
            ${summary.completedOrdersCount + summary.pendingOrdersCount} <span class="text-sm font-bold text-slate-500">Orders</span>
          </div>
          <p class="text-[11px] text-blue-700 font-semibold">
            <i class="fa-solid fa-bolt"></i> 90% direct cut per order
          </p>
        </div>

      </section>

      <!-- Incoming Orders Management -->
      <section class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">
            <i class="fa-solid fa-bell text-amber-500 mr-2"></i> ${t.incomingOrders}
          </h2>
          <span class="text-xs font-bold px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full">
            ${orders.filter(o => o.status === 'pending').length} Action Required
          </span>
        </div>

        ${orders.length === 0 ? `
          <div class="glass-card p-8 text-center text-slate-500 text-sm">
            No incoming orders yet. Post new produce listings to receive bulk orders.
          </div>
        ` : `
          <div class="space-y-3">
            ${orders.map(o => `
              <div class="glass-card p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <span class="text-sm font-extrabold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">
                      ${o.productName}
                    </span>
                    <span class="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                      ${o.qtyKg} kg
                    </span>
                    <span class="escrow-badge text-[10px]">
                      <i class="fa-solid fa-shield-check text-amber-600"></i> ${(o.farmerCut).toLocaleString()} ETB (90% Payout)
                    </span>
                  </div>

                  <p class="text-xs text-slate-600">
                    <i class="fa-solid fa-user text-slate-400 mr-1"></i> Buyer: <span class="font-semibold text-slate-800">${o.buyerName}</span> (${o.buyerPhone})
                  </p>
                  <p class="text-xs text-slate-500">
                    <i class="fa-solid fa-location-dot text-slate-400 mr-1"></i> Delivery to: ${o.deliveryAddress || 'Addis Ababa'}
                  </p>
                </div>

                <div class="flex items-center gap-2 w-full sm:w-auto">
                  ${o.status === 'pending' ? `
                    <button onclick="window.confirmFarmerOrder('${o.id}')" 
                      class="btn-primary w-full sm:w-auto text-xs py-2 px-4 shadow-sm">
                      <i class="fa-solid fa-check"></i>
                      <span class="${lang === 'am' ? 'lang-am' : ''}">${t.confirmOrderAction}</span>
                    </button>
                  ` : `
                    <div class="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5">
                      <i class="fa-solid fa-circle-check text-emerald-600"></i>
                      <span>Status: ${o.status.toUpperCase()}</span>
                    </div>
                  `}
                  
                  <button onclick="window.viewOrder('${o.id}')" class="btn-secondary text-xs py-2 px-3">
                    <i class="fa-solid fa-eye"></i>
                  </button>
                </div>

              </div>
            `).join('')}
          </div>
        `}
      </section>

      <!-- My Active Produce Listings -->
      <section class="space-y-4">
        <h2 class="text-xl font-bold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">
          <i class="fa-solid fa-box-open text-emerald-600 mr-2"></i> ${t.myActiveListings}
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${listings.map(l => `
            <div class="glass-card overflow-hidden">
              <div class="h-40 w-full relative">
                <img src="${l.photos[0]}" class="w-full h-full object-cover" />
                <span class="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-700 text-white shadow-xs">
                  ${l.status.toUpperCase()}
                </span>
              </div>
              <div class="p-4 space-y-2">
                <h3 class="font-bold text-slate-900 text-base ${lang === 'am' ? 'lang-am' : ''}">
                  ${lang === 'am' && l.nameAm ? l.nameAm : l.productName}
                </h3>
                <div class="flex items-center justify-between text-xs text-slate-600">
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

      <!-- Post New Produce Listing Modal -->
      ${isCreateModalOpen ? `
        <div class="modal-backdrop" onclick="if(event.target === this) window.toggleCreateListingModal()">
          <div class="modal-content p-6 sm:p-8 space-y-6">
            
            <div class="flex items-center justify-between pb-4 border-b border-slate-200">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
                  <i class="fa-solid fa-plus"></i>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">${t.postNewListing}</h3>
                  <p class="text-xs text-slate-500 font-medium">Publish produce directly to wholesale buyers</p>
                </div>
              </div>
              <button onclick="window.toggleCreateListingModal()" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onsubmit="window.handleCreateListing(event)" class="space-y-4 text-xs font-semibold text-slate-700">
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block mb-1">${t.productNameEn}</label>
                  <input type="text" id="newProdName" required placeholder="e.g. Red Onions" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
                </div>
                <div>
                  <label class="block mb-1">${t.productNameAm}</label>
                  <input type="text" id="newProdNameAm" placeholder="ለምሳሌ: ቀይ ሽንኩርት" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none lang-am" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label class="block mb-1">${t.categoryLabel}</label>
                  <select id="newProdCategory" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                    <option value="Vegetables">Vegetables / አትክልት</option>
                    <option value="Grains">Grains / እህል</option>
                    <option value="Fruits">Fruits / ፍራፍሬ</option>
                    <option value="Coffee">Coffee / ቡና</option>
                    <option value="Spices">Spices / ቅመማ ቅመም</option>
                  </select>
                </div>
                <div>
                  <label class="block mb-1">${t.qtyKgLabel}</label>
                  <input type="number" id="newProdQty" required min="10" value="1000" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
                </div>
                <div>
                  <label class="block mb-1">${t.priceKgLabel}</label>
                  <input type="number" id="newProdPrice" required min="1" value="50" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block mb-1">${t.minOrderLabel}</label>
                  <input type="number" id="newProdMinOrder" required min="1" value="50" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
                </div>
                <div>
                  <label class="block mb-1">${t.farmLocationLabel}</label>
                  <input type="text" id="newProdRegion" value="Oromia (Bishoftu)" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
                </div>
              </div>

              <div>
                <label class="block mb-1">Produce Photo URL</label>
                <input type="text" id="newProdPhoto" value="https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=800&auto=format&fit=crop&q=80" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
              </div>

              <button type="submit" class="btn-primary w-full py-3 text-sm mt-4">
                <i class="fa-solid fa-cloud-arrow-up"></i> ${t.publishListingBtn}
              </button>
            </form>

          </div>
        </div>
      ` : ''}

    </div>
  `;
}
