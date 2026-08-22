import { Language, translations } from '../i18n/translations';
import { Listing, CartItem, Order, StandingOrder } from '../types';
import { api } from '../services/api';

export function renderBuyerView(
  lang: Language,
  listings: Listing[],
  activeCategory: string,
  selectedRegion: string,
  searchQuery: string,
  cart: CartItem[],
  isCartOpen: boolean,
  activeOrderModal: Order | null,
  activeTelebirrModal: { isOpen: boolean; totalEtb: number; listingId?: string; qtyKg?: number } | null,
  activeDisputeModal: { isOpen: boolean; order: Order } | null = null,
  maxDistanceKm: number = 0,
  activeGrade: string = 'All',
  activeRipeness: string = 'All',
  organicOnly: boolean = false,
  advanceOnly: boolean = false,
  activeBuyerSubTab: 'marketplace' | 'orders' | 'standing_orders' = 'marketplace',
  standingOrders: StandingOrder[] = api.getStandingOrders(),
  buyerOrders: Order[] = api.getOrders('buyer')
): string {
  const t = translations[lang];

  const categories = [
    { key: 'All', label: t.catAll, icon: 'fa-boxes-stacked' },
    { key: 'Vegetables', label: t.catVegetables, icon: 'fa-carrot' },
    { key: 'Grains', label: t.catGrains, icon: 'fa-wheat-awn' },
    { key: 'Fruits', label: t.catFruits, icon: 'fa-apple-whole' },
    { key: 'Coffee', label: t.catCoffee, icon: 'fa-mug-hot' }
  ];

  const cartTotal = cart.reduce((sum, item) => sum + (item.qtyKg * item.listing.pricePerKg), 0);
  const farmerShare = Math.round(cartTotal * 0.90);
  const driverShare = Math.round(cartTotal * 0.05);
  const platformShare = cartTotal - farmerShare - driverShare;

  // Group cart items by Farmer
  const farmerGroups = cart.reduce((acc, item) => {
    const fId = item.listing.farmerId;
    if (!acc[fId]) {
      acc[fId] = {
        farmerName: item.listing.farmerName,
        farmerRegion: item.listing.region,
        items: []
      };
    }
    acc[fId].items.push(item);
    return acc;
  }, {} as Record<string, { farmerName: string; farmerRegion: string; items: CartItem[] }>);

  return `
    <div class="space-y-8 pb-20">
      
      <!-- E-Commerce Hero Promotional Banner -->
      <section class="hero-gradient rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden text-white">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          <div class="lg:col-span-8 space-y-4">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-200 text-xs font-bold">
              <span class="pulse-dot"></span>
              <span>15M+ Ethiopian Smallholder Farmers Direct Network</span>
            </div>

            <h1 class="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight ${lang === 'am' ? 'lang-am' : ''}">
              ${t.heroTitle}
            </h1>

            <p class="text-emerald-100 text-sm sm:text-base max-w-2xl leading-relaxed ${lang === 'am' ? 'lang-am' : ''}">
              ${t.heroDesc}
            </p>

            <div class="flex flex-wrap items-center gap-3 pt-2">
              <button onclick="window.setCategory('Vegetables'); window.setBuyerSubTab('marketplace')" class="bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs py-2.5 px-5 rounded-xl shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer">
                <i class="fa-solid fa-fire mr-1.5 text-amber-900"></i> Browse Farm Deals
              </button>
              <button onclick="window.setBuyerSubTab('orders')" class="bg-white/15 hover:bg-white/25 text-white font-bold text-xs py-2.5 px-5 rounded-xl border border-white/20 transition-colors cursor-pointer">
                <i class="fa-solid fa-file-invoice mr-1.5 text-emerald-300"></i> ${t.navOrders} & Invoices (${buyerOrders.length})
              </button>
              <button onclick="window.setBuyerSubTab('standing_orders')" class="bg-white/15 hover:bg-white/25 text-white font-bold text-xs py-2.5 px-5 rounded-xl border border-white/20 transition-colors cursor-pointer">
                <i class="fa-solid fa-repeat mr-1.5 text-amber-300"></i> ${t.standingOrdersTitle}
              </button>
            </div>
          </div>

          <!-- Hero Promo Card -->
          <div class="lg:col-span-4 hidden lg:block">
            <div class="bg-white/10 backdrop-blur-xl p-5 rounded-2xl border border-white/20 shadow-2xl space-y-3">
              <div class="flex items-center justify-between text-xs font-bold text-emerald-200">
                <span><i class="fa-solid fa-bolt text-amber-400"></i> PostGIS Geo-Proximity</span>
                <span class="telebirr-badge text-[10px]">Telebirr C2B</span>
              </div>
              <div class="text-2xl font-black text-white">90% Direct to Farmer</div>
              <p class="text-xs text-emerald-100/90 leading-relaxed">
                Source directly from farms within 10-100 km. Consolidate orders from multiple farmers with official e-VAT tax receipts.
              </p>
              <div class="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-emerald-200">
                <span>Tax Invoices: <strong class="text-white">e-VAT Ready</strong></span>
                <span>Contracts: <strong class="text-white">EABC Standard</strong></span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- Sub-Tab Switcher: Marketplace vs My Orders & Tax Invoices vs Standing Orders -->
      <div class="flex items-center justify-between border-b border-slate-200 pb-3">
        <div class="flex items-center gap-2 overflow-x-auto">
          <button onclick="window.setBuyerSubTab('marketplace')" class="cat-pill ${activeBuyerSubTab === 'marketplace' ? 'active' : ''}">
            <i class="fa-solid fa-store"></i>
            <span>${lang === 'am' ? 'የጅምላ ገበያ' : 'Wholesale Marketplace'}</span>
          </button>
          <button onclick="window.setBuyerSubTab('orders')" class="cat-pill ${activeBuyerSubTab === 'orders' ? 'active' : ''}">
            <i class="fa-solid fa-receipt"></i>
            <span>${t.navOrders} & ${t.navLegalDocuments} (${buyerOrders.length})</span>
          </button>
          <button onclick="window.setBuyerSubTab('standing_orders')" class="cat-pill ${activeBuyerSubTab === 'standing_orders' ? 'active' : ''}">
            <i class="fa-solid fa-repeat"></i>
            <span>${t.standingOrdersTitle} (${standingOrders.length})</span>
          </button>
        </div>

        <div class="text-xs text-slate-500 font-bold hidden sm:block">
          <i class="fa-solid fa-location-crosshairs text-emerald-600 mr-1"></i> Addis Ababa Wholesale Hub
        </div>
      </div>

      ${activeBuyerSubTab === 'standing_orders' ? renderStandingOrdersSection(lang, standingOrders) :
      activeBuyerSubTab === 'orders' ? renderBuyerOrdersSection(lang, buyerOrders) : `

      <!-- Advanced Filter Toolbar (Category, Proximity Radius, Quality Grade, Ripeness, Advance) -->
      <section class="space-y-4">
        
        <!-- Category Filter Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          ${categories.map(c => `
            <button onclick="window.setCategory('${c.key}')" 
              class="cat-pill ${activeCategory === c.key ? 'active' : ''} ${lang === 'am' ? 'lang-am' : ''}">
              <i class="fa-solid ${c.icon}"></i>
              <span>${c.label}</span>
            </button>
          `).join('')}
        </div>

        <!-- Filter Controls Bar -->
        <div class="glass-card p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
          
          <!-- PostGIS Geo-Proximity Radius Slider -->
          <div class="flex items-center gap-3">
            <span class="font-bold text-slate-700 flex items-center gap-1.5">
              <i class="fa-solid fa-location-dot text-emerald-600"></i> ${t.filterDistance}:
            </span>
            <div class="flex items-center gap-1.5">
              ${[0, 25, 50, 100].map(km => `
                <button onclick="window.setMaxDistanceKm(${km})" class="px-2.5 py-1 rounded-lg font-bold border transition-colors cursor-pointer ${maxDistanceKm === km ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}">
                  ${km === 0 ? 'All' : km + ' km'}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Quality Grade Selector -->
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-700">${t.filterGrade}:</span>
            <select onchange="window.setFilterGrade(this.value)" class="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option value="All" ${activeGrade === 'All' ? 'selected' : ''}>All Grades</option>
              <option value="Grade 1" ${activeGrade === 'Grade 1' ? 'selected' : ''}>Grade 1 (Standard)</option>
              <option value="Grade 2" ${activeGrade === 'Grade 2' ? 'selected' : ''}>Grade 2 (Value)</option>
              <option value="Export Grade" ${activeGrade === 'Export Grade' ? 'selected' : ''}>Export Grade</option>
            </select>
          </div>

          <!-- Ripeness Selector -->
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-700">${t.filterRipeness}:</span>
            <select onchange="window.setFilterRipeness(this.value)" class="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option value="All" ${activeRipeness === 'All' ? 'selected' : ''}>All Ripeness</option>
              <option value="Ready Today" ${activeRipeness === 'Ready Today' ? 'selected' : ''}>Ready Today</option>
              <option value="Semi-Ripe" ${activeRipeness === 'Semi-Ripe' ? 'selected' : ''}>Semi-Ripe</option>
              <option value="Green / Storable" ${activeRipeness === 'Green / Storable' ? 'selected' : ''}>Green / Storable</option>
            </select>
          </div>

          <!-- Toggle Flags -->
          <div class="flex items-center gap-3">
            <label class="flex items-center gap-1.5 font-bold text-slate-700 cursor-pointer">
              <input type="checkbox" onchange="window.toggleOrganicFilter(this.checked)" ${organicOnly ? 'checked' : ''} class="rounded text-emerald-600 focus:ring-emerald-500" />
              <span>${t.filterOrganic}</span>
            </label>

            <label class="flex items-center gap-1.5 font-bold text-emerald-800 cursor-pointer">
              <input type="checkbox" onchange="window.toggleAdvanceFilter(this.checked)" ${advanceOnly ? 'checked' : ''} class="rounded text-emerald-600 focus:ring-emerald-500" />
              <span>${t.filterAdvance}</span>
            </label>
          </div>

        </div>

      </section>

      <!-- Produce Marketplace Grid -->
      <section class="space-y-4">
        
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">
            <i class="fa-solid fa-boxes-packing text-emerald-600 mr-2"></i> ${t.catAll} (${listings.length})
          </h2>
          <span class="text-xs text-slate-500 font-semibold">
            Showing verified smallholder produce within delivery range
          </span>
        </div>

        ${listings.length === 0 ? `
          <div class="glass-card p-12 text-center text-slate-500 space-y-3">
            <i class="fa-solid fa-magnifying-glass text-4xl text-slate-300"></i>
            <p class="text-sm font-semibold">No produce matches your current filters.</p>
            <button onclick="window.resetFilters()" class="btn-secondary text-xs py-2 px-4">Reset All Filters</button>
          </div>
        ` : `
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            ${listings.map(l => `
              <div class="glass-card overflow-hidden flex flex-col justify-between">
                
                <div>
                  <div class="h-48 w-full relative overflow-hidden group">
                    <img src="${l.photos[0]}" alt="${l.productName}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    
                    <div class="absolute top-3 left-3 flex flex-col gap-1">
                      ${l.isAdvanceHarvest ? `
                        <span class="advance-pill shadow-md">
                          <i class="fa-solid fa-calendar-check text-emerald-700"></i> Advance Harvest
                        </span>
                      ` : ''}
                      ${l.isOrganic ? `
                        <span class="bg-emerald-900/90 backdrop-blur-md text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md">
                          Organic Certified
                        </span>
                      ` : ''}
                    </div>

                    <span class="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                      ${l.pricePerKg} ETB<span class="text-[10px] font-normal text-slate-300">/kg</span>
                    </span>

                    ${l.distanceKm ? `
                      <span class="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                        <i class="fa-solid fa-route text-amber-600 mr-1"></i> ${l.distanceKm} km ${t.farmDistance}
                      </span>
                    ` : ''}
                  </div>

                  <div class="p-5 space-y-3">
                    
                    <div class="flex items-center justify-between text-xs text-slate-500 font-semibold">
                      <span class="text-amber-700 font-bold"><i class="fa-solid fa-award mr-1"></i> ${l.grade || 'Grade 1'}</span>
                      <span class="text-slate-600 font-medium">${l.ripeness || 'Ready Today'}</span>
                    </div>

                    <h3 class="font-extrabold text-slate-900 text-lg leading-snug ${lang === 'am' ? 'lang-am' : ''}">
                      ${lang === 'am' && l.nameAm ? l.nameAm : l.productName}
                    </h3>

                    <!-- Farmer Credibility & Trust Badges -->
                    <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                      <div class="flex items-center justify-between text-xs">
                        <span class="font-bold text-slate-800"><i class="fa-solid fa-user-check text-emerald-600 mr-1"></i> ${l.farmerName}</span>
                        <span class="text-amber-600 font-extrabold"><i class="fa-solid fa-star mr-1"></i> ${l.farmerRating}</span>
                      </div>
                      <div class="flex flex-wrap items-center gap-1.5 text-[10px] text-slate-500">
                        <span><i class="fa-solid fa-location-dot text-emerald-600"></i> ${l.region}</span>
                        <span>·</span>
                        <span>${l.repeatBuyerCount || 18} Repeat Wholesalers</span>
                      </div>
                    </div>

                    ${l.voiceNoteTranscript ? `
                      <div class="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-[11px] text-emerald-900 flex items-start gap-2">
                        <i class="fa-solid fa-microphone-lines text-emerald-700 text-sm mt-0.5"></i>
                        <span class="italic leading-tight">"${l.voiceNoteTranscript}"</span>
                      </div>
                    ` : ''}

                    <div class="flex items-center justify-between text-xs text-slate-600 pt-1">
                      <span>Available: <strong class="font-bold text-slate-900">${l.qtyKg.toLocaleString()} kg</strong></span>
                      <span>Min Order: <strong class="font-bold text-slate-900">${l.minOrderKg} kg</strong></span>
                    </div>

                  </div>
                </div>

                <!-- Add to Bulk Cart Button -->
                <div class="p-5 pt-0">
                  <button onclick="window.addToCart('${l.id}')" class="btn-primary w-full py-2.5 text-xs font-extrabold shadow-sm cursor-pointer">
                    <i class="fa-solid fa-cart-plus mr-1.5"></i> ${t.addToCart}
                  </button>
                </div>

              </div>
            `).join('')}
          </div>
        `}

      </section>
      `}

      <!-- Bulk Cart Drawer Modal -->
      ${isCartOpen ? `
        <div class="modal-backdrop" onclick="if(event.target === this) window.toggleCart()">
          <div class="modal-content max-w-xl p-6 sm:p-8 space-y-6">
            
            <div class="flex items-center justify-between pb-4 border-b border-slate-200">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg font-bold">
                  <i class="fa-solid fa-cart-shopping"></i>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">${t.cartTitle}</h3>
                  <p class="text-xs text-slate-500 font-medium">Consolidated multi-farmer checkout with Telebirr Escrow</p>
                </div>
              </div>
              <button onclick="window.toggleCart()" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            ${cart.length === 0 ? `
              <div class="p-8 text-center text-slate-500 text-xs">
                <p>${t.cartEmpty}</p>
              </div>
            ` : `
              <div class="space-y-4 max-h-80 overflow-y-auto pr-1">
                ${Object.entries(farmerGroups).map(([fId, group]) => `
                  <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div class="flex items-center justify-between text-xs font-bold text-slate-700 border-b border-slate-200 pb-2">
                      <span><i class="fa-solid fa-seedling text-emerald-600 mr-1"></i> Farm Source: ${group.farmerName} (${group.farmerRegion})</span>
                      <span class="text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">Direct Gate Payout</span>
                    </div>

                    ${group.items.map(item => `
                      <div class="flex items-center justify-between gap-3 text-xs">
                        <div>
                          <h4 class="font-bold text-slate-900">${item.listing.productName}</h4>
                          <span class="text-slate-500">${item.listing.pricePerKg} ETB / kg</span>
                        </div>

                        <div class="flex items-center gap-3">
                          <div class="flex items-center gap-1">
                            <button onclick="window.updateCartQty('${item.listing.id}', ${item.qtyKg - 10})" class="w-6 h-6 rounded bg-white border border-slate-300 text-xs font-bold flex items-center justify-center cursor-pointer">-</button>
                            <span class="w-12 text-center font-bold text-slate-800">${item.qtyKg} kg</span>
                            <button onclick="window.updateCartQty('${item.listing.id}', ${item.qtyKg + 10})" class="w-6 h-6 rounded bg-white border border-slate-300 text-xs font-bold flex items-center justify-center cursor-pointer">+</button>
                          </div>
                          <span class="font-extrabold text-slate-900 w-16 text-right">${(item.qtyKg * item.listing.pricePerKg).toLocaleString()} ETB</span>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                `).join('')}
              </div>

              <!-- Price Breakdown (90% Farmer / 5% Driver / 5% Platform) -->
              <div class="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2 text-xs">
                <div class="flex justify-between text-slate-600">
                  <span>${t.farmerShare}:</span>
                  <strong class="text-emerald-900">${farmerShare.toLocaleString()} ETB</strong>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>${t.deliveryEstimate}:</span>
                  <strong class="text-slate-800">${driverShare.toLocaleString()} ETB</strong>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>${t.platformFee}:</span>
                  <strong class="text-slate-800">${platformShare.toLocaleString()} ETB</strong>
                </div>
                <div class="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-emerald-200">
                  <span>${t.totalAmount}:</span>
                  <span class="text-emerald-800">${cartTotal.toLocaleString()} ETB</span>
                </div>
              </div>

              <button onclick="window.openTelebirrModal(${cartTotal})" class="btn-primary w-full py-3.5 text-xs font-extrabold shadow-md cursor-pointer">
                <i class="fa-solid fa-shield-halved mr-1.5"></i> ${t.checkoutTelebirr}
              </button>
            `}

          </div>
        </div>
      ` : ''}

      <!-- Telebirr Escrow Payment Modal -->
      ${activeTelebirrModal?.isOpen ? `
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeTelebirrModal()">
          <div class="modal-content max-w-md p-6 sm:p-8 space-y-6">
            
            <div class="text-center space-y-2">
              <div class="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto shadow-lg">
                <i class="fa-solid fa-building-columns"></i>
              </div>
              <h3 class="text-xl font-extrabold text-slate-900">${t.telebirrTitle}</h3>
              <p class="text-xs text-slate-500">${t.telebirrDesc}</p>
            </div>

            <div class="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-center space-y-1">
              <span class="text-xs font-bold text-blue-900">${t.totalAmount}</span>
              <div class="text-3xl font-black text-blue-950">${activeTelebirrModal.totalEtb.toLocaleString()} <span class="text-sm font-bold text-blue-700">ETB</span></div>
              <span class="text-[11px] text-blue-800 font-semibold block">${t.escrowGuarantee}</span>
            </div>

            <form onsubmit="window.handleTelebirrSubmit(event)" class="space-y-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">${t.enterPhone}</label>
                <input type="text" id="telePhone" required value="+251955667788" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">${t.enterPin}</label>
                <input type="password" id="telePin" required value="1234" maxlength="4" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold tracking-widest text-center focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>

              <div class="pt-2">
                <button type="submit" class="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-lg transition-colors cursor-pointer">
                  <i class="fa-solid fa-lock mr-1.5"></i> ${t.payNow}
                </button>
              </div>
            </form>

          </div>
        </div>
      ` : ''}

      <!-- Dispute Filing Modal -->
      ${activeDisputeModal?.isOpen ? `
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeDisputeModal()">
          <div class="modal-content max-w-md p-6 sm:p-8 space-y-5">
            
            <div class="flex items-center justify-between pb-3 border-b border-slate-200">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center text-lg font-bold">
                  <i class="fa-solid fa-triangle-exclamation"></i>
                </div>
                <div>
                  <h3 class="text-base font-bold text-slate-900">${t.submitDisputeTitle}</h3>
                  <p class="text-xs text-slate-500">Order #${activeDisputeModal.order.id.slice(0, 8).toUpperCase()}</p>
                </div>
              </div>
              <button onclick="window.closeDisputeModal()" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onsubmit="window.handleDisputeSubmit(event, '${activeDisputeModal.order.id}')" class="space-y-4 text-xs">
              <div>
                <label class="block font-bold text-slate-700 mb-1">${t.disputeReasonLabel}</label>
                <textarea id="disputeReasonInput" required rows="3" class="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-red-500 focus:outline-none" placeholder="Describe produce defects, transit spoilage, or weight discrepancy..."></textarea>
              </div>

              <div>
                <label class="block mb-1 font-bold text-slate-700">${t.disputePhotoLabel}</label>
                <input type="text" id="disputePhotoUrl" value="https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-red-500 focus:outline-none" />
              </div>

              <div>
                <div class="flex items-center justify-between mb-1">
                  <label class="font-bold text-slate-700">${t.refundPercentLabel}</label>
                  <span id="refundPercentVal" class="font-bold text-red-700">50% Partial Refund</span>
                </div>
                <input type="range" id="disputeRefundSlider" min="20" max="100" step="10" value="50" oninput="document.getElementById('refundPercentVal').innerText = this.value + '% Partial Refund (' + Math.round(${activeDisputeModal.order.totalEtb} * (this.value/100)).toLocaleString() + ' ETB)'" class="w-full accent-red-600 cursor-pointer" />
              </div>

              <div class="p-3 rounded-xl bg-red-50 border border-red-200 text-[11px] text-red-900 leading-relaxed">
                <i class="fa-solid fa-lock text-red-700 mr-1"></i>
                Submitting this dispute immediately locks the Telebirr Escrow and assigns case to Marketplace Admin for binding arbitration.
              </div>

              <button type="submit" class="btn-secondary w-full py-3 text-xs text-red-700 border-red-300 hover:bg-red-50 font-bold cursor-pointer">
                <i class="fa-solid fa-gavel"></i> ${t.submitDisputeBtn}
              </button>
            </form>

          </div>
        </div>
      ` : ''}

      <!-- Live Order SignalR Tracking & Legal Invoicing Modal -->
      ${activeOrderModal ? `
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeOrderModal()">
          <div class="modal-content max-w-lg p-6 sm:p-8 space-y-6">
            
            <div class="flex items-center justify-between pb-4 border-b border-slate-200">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg font-bold">
                  <i class="fa-solid fa-satellite-dish"></i>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">${t.orderTracking}</h3>
                  <p class="text-xs text-slate-500 font-medium">Order ID: #${activeOrderModal.id.slice(0, 8).toUpperCase()}</p>
                </div>
              </div>
              <button onclick="window.closeOrderModal()" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <!-- Order Snapshot -->
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <h4 class="font-bold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">${activeOrderModal.productName}</h4>
                <p class="text-xs text-slate-500">${activeOrderModal.qtyKg} kg · Farmer: ${activeOrderModal.farmerName}</p>
              </div>
              <div class="text-right">
                <span class="text-base font-extrabold text-emerald-800">${activeOrderModal.totalEtb.toLocaleString()} ETB</span>
                <span class="escrow-pill block text-[10px] mt-0.5">
                  ${activeOrderModal.escrowHeld ? 'Escrow Held' : 'Funds Released'}
                </span>
              </div>
            </div>

            <!-- Legal Documents Quick Action Bar -->
            <div class="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-slate-100 border border-slate-200">
              <button onclick="window.openInvoiceModal('${activeOrderModal.id}')" class="px-2.5 py-1.5 rounded-lg bg-white text-emerald-800 hover:bg-emerald-50 border border-slate-200 font-bold text-xs shadow-xs cursor-pointer">
                <i class="fa-solid fa-file-invoice mr-1 text-emerald-600"></i> ${t.viewInvoiceBtn}
              </button>

              <button onclick="window.openContractModal('${activeOrderModal.id}')" class="px-2.5 py-1.5 rounded-lg bg-white text-purple-800 hover:bg-purple-50 border border-slate-200 font-bold text-xs shadow-xs cursor-pointer">
                <i class="fa-solid fa-file-contract mr-1 text-purple-600"></i> ${t.viewContractBtn}
              </button>

              <button onclick="window.openWaybillModal('${activeOrderModal.id}')" class="px-2.5 py-1.5 rounded-lg bg-white text-sky-800 hover:bg-sky-50 border border-slate-200 font-bold text-xs shadow-xs cursor-pointer">
                <i class="fa-solid fa-truck-fast mr-1 text-sky-600"></i> ${t.viewWaybillBtn}
              </button>

              ${activeOrderModal.status === 'disputed' ? `
                <button onclick="window.openArbitrationModal('${activeOrderModal.id}')" class="px-2.5 py-1.5 rounded-lg bg-red-50 text-red-800 hover:bg-red-100 border border-red-200 font-bold text-xs shadow-xs cursor-pointer">
                  <i class="fa-solid fa-scale-balanced mr-1 text-red-600"></i> ${t.viewArbitrationBtn}
                </button>
              ` : ''}
            </div>

            <!-- Timeline -->
            <div class="space-y-4 py-2">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                  <i class="fa-solid fa-check"></i>
                </div>
                <div>
                  <h5 class="text-sm font-bold text-slate-900">Order Placed & Escrow Locked</h5>
                  <p class="text-xs text-slate-500">Telebirr transaction verified (${activeOrderModal.paymentRef || 'TB-20260819'})</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full ${['confirmed', 'picked_up', 'delivered'].includes(activeOrderModal.status) ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'} flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                  <i class="fa-solid fa-tractor"></i>
                </div>
                <div>
                  <h5 class="text-sm font-bold text-slate-900">Farmer Confirmation</h5>
                  <p class="text-xs text-slate-500">${['confirmed', 'picked_up', 'delivered'].includes(activeOrderModal.status) ? 'Produce harvested and packed at farm' : 'Awaiting farmer acceptance via SMS/App'}</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full ${['picked_up', 'delivered'].includes(activeOrderModal.status) ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'} flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                  <i class="fa-solid fa-truck"></i>
                </div>
                <div>
                  <h5 class="text-sm font-bold text-slate-900">Driver Pickup & Transit</h5>
                  <p class="text-xs text-slate-500">${['picked_up', 'delivered'].includes(activeOrderModal.status) ? `Isuzu Truck with Dawit Kebede in transit to ${activeOrderModal.deliveryAddress || 'Depot'}` : 'Driver assignment in progress'}</p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full ${activeOrderModal.status === 'delivered' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'} flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                  <i class="fa-solid fa-hand-holding-dollar"></i>
                </div>
                <div>
                  <h5 class="text-sm font-bold text-slate-900">Delivery Confirmation & Escrow Release</h5>
                  <p class="text-xs text-slate-500">${activeOrderModal.status === 'delivered' ? '90% released to farmer, 5% to driver' : 'Confirm on receipt to release funds'}</p>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="pt-4 border-t border-slate-200 flex items-center gap-3">
              ${activeOrderModal.status !== 'delivered' && activeOrderModal.status !== 'disputed' ? `
                <button onclick="window.confirmDelivery('${activeOrderModal.id}')" class="btn-primary flex-1 py-3 text-xs cursor-pointer">
                  <i class="fa-solid fa-circle-check"></i> ${t.confirmDeliveryBtn}
                </button>
                <button onclick="window.openDisputeModal('${activeOrderModal.id}')" class="btn-secondary py-3 text-xs text-red-600 border-red-200 hover:bg-red-50 cursor-pointer">
                  <i class="fa-solid fa-triangle-exclamation"></i> ${t.disputeBtn}
                </button>
              ` : activeOrderModal.status === 'disputed' ? `
                <div class="w-full p-3 rounded-xl bg-red-100 text-red-900 font-bold text-xs text-center">
                  <i class="fa-solid fa-triangle-exclamation text-red-700 mr-1"></i> Dispute Active: Escrow Frozen Under Admin Arbitration
                </div>
              ` : `
                <div class="w-full p-3 rounded-xl bg-emerald-100 text-emerald-900 font-bold text-xs text-center flex items-center justify-center gap-2">
                  <i class="fa-solid fa-check-double text-emerald-700"></i> Delivery Completed & Escrow Released to Farmer
                </div>
              `}
            </div>

          </div>
        </div>
      ` : ''}

    </div>
  `;
}

function renderBuyerOrdersSection(lang: Language, orders: Order[]): string {
  const t = translations[lang];

  return `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-bold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">
            <i class="fa-solid fa-receipt text-emerald-600 mr-2"></i> ${t.navOrders} & ${t.navLegalDocuments}
          </h2>
          <p class="text-xs text-slate-500 font-medium">View commercial tax invoices, legal commodity contracts, and transport waybills.</p>
        </div>
        <span class="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
          ${orders.length} Verified Purchases
        </span>
      </div>

      ${orders.length === 0 ? `
        <div class="glass-card p-12 text-center text-slate-500 text-xs">
          <i class="fa-solid fa-basket-shopping text-3xl mb-2 text-slate-300"></i>
          <p>No past purchases yet. Browse the wholesale marketplace to order farm-fresh produce.</p>
        </div>
      ` : `
        <div class="space-y-3">
          ${orders.map(o => `
            <div class="glass-card p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="badge-status status-${o.status}">${o.status.toUpperCase()}</span>
                  <span class="font-bold text-slate-900 text-sm">${o.productName}</span>
                  <span class="text-xs text-slate-500">(${o.qtyKg} kg @ ${o.pricePerKg} ETB)</span>
                </div>
                <p class="text-xs text-slate-600">
                  Farmer: <strong class="text-slate-800">${o.farmerName}</strong> · Telebirr Total: <strong class="text-emerald-800">${o.totalEtb.toLocaleString()} ETB</strong>
                </p>
                <div class="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                  <span>INV: ${o.invoiceNumber || 'ET-INV-001'}</span>
                  <span>·</span>
                  <span>CONTR: ${o.contractNumber || 'AGR-ET-001'}</span>
                </div>
              </div>

              <div class="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button onclick="window.openInvoiceModal('${o.id}')" class="btn-secondary text-xs py-1.5 px-3 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border-emerald-200 cursor-pointer">
                  <i class="fa-solid fa-file-invoice mr-1"></i> ${t.viewInvoiceBtn}
                </button>
                <button onclick="window.openContractModal('${o.id}')" class="btn-secondary text-xs py-1.5 px-3 text-purple-700 bg-purple-50 hover:bg-purple-100 border-purple-200 cursor-pointer">
                  <i class="fa-solid fa-file-contract mr-1"></i> ${t.viewContractBtn}
                </button>
                <button onclick="window.openWaybillModal('${o.id}')" class="btn-secondary text-xs py-1.5 px-3 text-sky-700 bg-sky-50 hover:bg-sky-100 border-sky-200 cursor-pointer">
                  <i class="fa-solid fa-truck-fast mr-1"></i> ${t.viewWaybillBtn}
                </button>
                <button onclick="window.viewOrder('${o.id}')" class="btn-primary text-xs py-1.5 px-3.5 cursor-pointer">
                  <i class="fa-solid fa-satellite-dish mr-1"></i> Track
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
}

function renderStandingOrdersSection(lang: Language, standingOrders: StandingOrder[]): string {
  const t = translations[lang];

  return `
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-bold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">
            <i class="fa-solid fa-repeat text-emerald-600 mr-2"></i> ${t.standingOrdersTitle}
          </h2>
          <p class="text-xs text-slate-500 font-medium">Automatic scheduled produce deliveries directly from Ethiopian smallholder farms.</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${standingOrders.map(so => `
          <div class="glass-card p-5 space-y-4 border-l-4 ${so.active ? 'border-emerald-600' : 'border-slate-300'}">
            <div class="flex items-start justify-between">
              <div>
                <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${so.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}">
                  ${so.frequency} Scheduled
                </span>
                <h3 class="text-base font-extrabold text-slate-900 mt-1">${lang === 'am' && so.productNameAm ? so.productNameAm : so.productName}</h3>
                <p class="text-xs text-slate-500">Source: <strong class="text-slate-800">${so.farmerName}</strong></p>
              </div>

              <div class="text-right">
                <span class="text-base font-black text-emerald-800">${(so.qtyKg * so.pricePerKg).toLocaleString()} ETB</span>
                <span class="text-[11px] text-slate-400 block">${so.qtyKg} kg @ ${so.pricePerKg} ETB/kg</span>
              </div>
            </div>

            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-700">
              <span><i class="fa-solid fa-calendar-check text-emerald-600 mr-1.5"></i> Next Run: <strong class="text-slate-900">${so.nextDeliveryDate}</strong></span>
              <button onclick="window.toggleStandingOrderStatus('${so.id}')" class="text-xs font-bold ${so.active ? 'text-amber-700 hover:text-amber-800' : 'text-emerald-700 hover:text-emerald-800'} cursor-pointer">
                ${so.active ? 'Pause Order' : 'Resume Order'}
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
