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
  activeBuyerSubTab: 'marketplace' | 'standing_orders' = 'marketplace',
  standingOrders: StandingOrder[] = api.getStandingOrders()
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
                Source directly from farms within 10-100 km. Consolidate orders from multiple farmers in one delivery run.
              </p>
              <div class="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-emerald-200">
                <span>Avg Delivery: <strong class="text-white">Same Day</strong></span>
                <span>Multi-Farmer: <strong class="text-white">Supported</strong></span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- Sub-Tab Switcher: Marketplace vs Standing Orders -->
      <div class="flex items-center justify-between border-b border-slate-200 pb-3">
        <div class="flex items-center gap-2">
          <button onclick="window.setBuyerSubTab('marketplace')" class="cat-pill ${activeBuyerSubTab === 'marketplace' ? 'active' : ''}">
            <i class="fa-solid fa-store"></i>
            <span>${lang === 'am' ? 'የጅምላ ገበያ' : 'Wholesale Marketplace'}</span>
          </button>
          <button onclick="window.setBuyerSubTab('standing_orders')" class="cat-pill ${activeBuyerSubTab === 'standing_orders' ? 'active' : ''}">
            <i class="fa-solid fa-repeat"></i>
            <span>${t.standingOrdersTitle} (${standingOrders.length})</span>
          </button>
        </div>

        <div class="text-xs text-slate-500 font-bold hidden sm:block">
          <i class="fa-solid fa-location-crosshairs text-emerald-600 mr-1"></i> Addis Ababa Depot Sourcing
        </div>
      </div>

      ${activeBuyerSubTab === 'standing_orders' ? renderStandingOrdersSection(lang, standingOrders) : `

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
                  ${km === 0 ? 'All Ethiopia' : `${km} km`}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Quality Grade Selector -->
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-700">${t.filterGrade}:</span>
            <select onchange="window.setGradeFilter(this.value)" class="bg-slate-50 border border-slate-200 py-1 px-2.5 rounded-lg font-bold text-slate-800 cursor-pointer">
              <option value="All" ${activeGrade === 'All' ? 'selected' : ''}>All Grades</option>
              <option value="Grade 1" ${activeGrade === 'Grade 1' ? 'selected' : ''}>Grade 1 (Premium)</option>
              <option value="Export Grade" ${activeGrade === 'Export Grade' ? 'selected' : ''}>Export Grade</option>
              <option value="Grade 2" ${activeGrade === 'Grade 2' ? 'selected' : ''}>Grade 2</option>
            </select>
          </div>

          <!-- Ripeness Selector -->
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-700">${t.filterRipeness}:</span>
            <select onchange="window.setRipenessFilter(this.value)" class="bg-slate-50 border border-slate-200 py-1 px-2.5 rounded-lg font-bold text-slate-800 cursor-pointer">
              <option value="All" ${activeRipeness === 'All' ? 'selected' : ''}>All Stages</option>
              <option value="Ready Today" ${activeRipeness === 'Ready Today' ? 'selected' : ''}>Ready Today</option>
              <option value="Semi-Ripe" ${activeRipeness === 'Semi-Ripe' ? 'selected' : ''}>Semi-Ripe</option>
              <option value="Green / Storable" ${activeRipeness === 'Green / Storable' ? 'selected' : ''}>Green / Storable</option>
            </select>
          </div>

          <!-- Organic & Advance Harvest Toggles -->
          <div class="flex items-center gap-3">
            <label class="flex items-center gap-1.5 font-bold text-slate-700 cursor-pointer">
              <input type="checkbox" onchange="window.toggleOrganicFilter(this.checked)" ${organicOnly ? 'checked' : ''} class="rounded text-emerald-600" />
              <span>Organic Only</span>
            </label>
            <label class="flex items-center gap-1.5 font-bold text-emerald-800 cursor-pointer">
              <input type="checkbox" onchange="window.toggleAdvanceFilter(this.checked)" ${advanceOnly ? 'checked' : ''} class="rounded text-emerald-600" />
              <span>Advance Harvests</span>
            </label>
          </div>

        </div>

      </section>

      <!-- Main Produce Grid -->
      <section>
        <div class="flex items-center justify-between mb-5">
          <h2 class="text-lg sm:text-xl font-extrabold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">
            ${lang === 'am' ? 'የቀጥታ የጅምላ ምርቶች ዝርዝር' : 'Verified Farm Produce Catalog'}
          </h2>
          <span class="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            Showing ${listings.length} wholesale listings
          </span>
        </div>

        ${listings.length === 0 ? `
          <div class="glass-card p-12 text-center space-y-3">
            <div class="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-2xl">
              <i class="fa-solid fa-leaf"></i>
            </div>
            <h3 class="text-base font-bold text-slate-800">No Produce Found Matching Filters</h3>
            <p class="text-xs text-slate-500">Try adjusting your proximity radius, quality grade, or category.</p>
          </div>
        ` : `
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            ${listings.map(l => `
              <div class="glass-card overflow-hidden flex flex-col justify-between group">
                
                <div>
                  <!-- Product Image with Badges -->
                  <div class="relative h-52 w-full overflow-hidden bg-slate-100">
                    <img src="${l.photos[0]}" alt="${l.productName}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    
                    <div class="absolute top-3 left-3 flex flex-col gap-1.5">
                      <span class="escrow-pill shadow-xs">
                        <i class="fa-solid fa-shield-halved text-amber-600"></i> Telebirr Escrow
                      </span>
                      ${l.isAdvanceHarvest ? `
                        <span class="advance-pill shadow-xs">
                          <i class="fa-solid fa-calendar-days text-emerald-700"></i> Harvest in ${l.availableFrom}
                        </span>
                      ` : ''}
                    </div>

                    <div class="absolute top-3 right-3 flex flex-col items-end gap-1">
                      <span class="bg-white/90 backdrop-blur-md text-emerald-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-xs border border-emerald-200">
                        ${l.category}
                      </span>
                      <span class="bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                        ${l.grade || 'Grade 1'}
                      </span>
                    </div>

                    <!-- Region & Distance Overlay (PostGIS) -->
                    <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-bold text-white bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                      <span><i class="fa-solid fa-location-dot text-emerald-400 mr-1"></i> ${l.region}</span>
                      <span class="text-emerald-300">${l.distanceKm ? `~${l.distanceKm} km (Est. ${(l.distanceKm * 0.4).toFixed(0)} min)` : 'Direct Farm'}</span>
                    </div>
                  </div>

                  <!-- Product Info -->
                  <div class="p-5 space-y-3">
                    
                    <div>
                      <div class="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
                        <span class="text-amber-500 flex items-center gap-1 font-bold">
                          <i class="fa-solid fa-star"></i> ${l.farmerRating} <span class="text-slate-400 font-medium">(${l.reviewCount} reviews)</span>
                        </span>
                        <span class="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                          ${l.ripeness || 'Ready Today'}
                        </span>
                      </div>

                      <h3 class="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-emerald-800 transition-colors ${lang === 'am' ? 'lang-am' : ''}">
                        ${lang === 'am' && l.nameAm ? l.nameAm : l.productName}
                      </h3>
                      ${lang === 'en' && l.nameAm ? `<p class="text-xs text-slate-400 font-medium lang-am">${l.nameAm}</p>` : ''}
                    </div>

                    <!-- Farmer Credibility & Trust Badge -->
                    <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-xs text-slate-600">
                      <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2 truncate">
                          <div class="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center font-bold text-[9px] shrink-0">
                            <i class="fa-solid fa-user"></i>
                          </div>
                          <span class="font-bold text-slate-800 truncate">${lang === 'am' && l.farmerNameAm ? l.farmerNameAm : l.farmerName}</span>
                        </div>
                        <span class="text-[10px] font-bold text-emerald-700"><i class="fa-solid fa-certificate text-emerald-600 mr-1"></i>Fayda ID</span>
                      </div>

                      <div class="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                        <span><i class="fa-solid fa-repeat text-blue-600 mr-1"></i> ${l.repeatBuyerCount || 14} Repeat Buyers</span>
                        <span><i class="fa-solid fa-bolt text-amber-500 mr-1"></i> ${l.onTimeDeliveryRate || 99}% On-Time</span>
                      </div>
                    </div>

                    <!-- Stock Progress Indicator -->
                    <div class="space-y-1 text-xs">
                      <div class="flex justify-between font-semibold text-slate-600">
                        <span>Stock Available: <strong class="text-slate-900 font-black">${l.qtyKg.toLocaleString()} kg</strong></span>
                        <span class="text-slate-400 font-medium">Min: ${l.minOrderKg} kg</span>
                      </div>
                      <div class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div class="h-full bg-emerald-600 rounded-full" style="width: 80%;"></div>
                      </div>
                    </div>

                  </div>
                </div>

                <!-- Price & Add To Cart / Standing Order Action -->
                <div class="p-5 pt-0">
                  <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div>
                      <span class="text-xs font-bold text-slate-400 uppercase block leading-none">Unit Price</span>
                      <div class="flex items-baseline gap-1 mt-0.5">
                        <span class="text-2xl font-black text-emerald-800 leading-none">${l.pricePerKg}</span>
                        <span class="text-xs font-extrabold text-slate-600">ETB / kg</span>
                      </div>
                    </div>

                    <div class="flex items-center gap-1.5">
                      <button onclick="window.quickBuy('${l.id}')" 
                        class="btn-primary text-xs py-2.5 px-3.5 shadow-sm hover:shadow-md cursor-pointer">
                        <i class="fa-solid fa-cart-plus"></i>
                        <span class="${lang === 'am' ? 'lang-am' : ''}">${t.addToCart}</span>
                      </button>
                      <button onclick="window.handleCreateStandingOrderModal('${l.id}')" title="Set Weekly Standing Order"
                        class="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer">
                        <i class="fa-solid fa-repeat"></i>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            `).join('')}
          </div>
        `}
      </section>
      `}

      <!-- Multi-Farmer Bulk Cart Slide-over Drawer -->
      ${isCartOpen ? `
        <div class="modal-backdrop" onclick="if(event.target === this) window.toggleCart()">
          <div class="modal-content max-w-lg p-6 sm:p-8 space-y-6">
            
            <div class="flex items-center justify-between pb-4 border-b border-slate-200">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg font-bold">
                  <i class="fa-solid fa-cart-shopping"></i>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">${t.cartTitle}</h3>
                  <p class="text-xs text-slate-500 font-medium">Consolidated multi-farmer order with single driver dispatch</p>
                </div>
              </div>
              <button onclick="window.toggleCart()" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            ${cart.length === 0 ? `
              <div class="py-12 text-center space-y-3">
                <i class="fa-solid fa-basket-shopping text-4xl text-slate-300"></i>
                <p class="text-sm font-semibold text-slate-500 ${lang === 'am' ? 'lang-am' : ''}">${t.cartEmpty}</p>
              </div>
            ` : `
              <!-- Grouped by Farm Source Section -->
              <div class="space-y-4 max-h-72 overflow-y-auto pr-1">
                ${Object.entries(farmerGroups).map(([fId, group]) => `
                  <div class="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                    <div class="flex items-center justify-between text-xs font-bold text-slate-800 border-b border-slate-200 pb-2">
                      <span class="flex items-center gap-1.5 text-emerald-800">
                        <i class="fa-solid fa-tractor text-emerald-600"></i> Farm: ${group.farmerName} (${group.farmerRegion})
                      </span>
                      <span class="text-[10px] text-slate-500">${group.items.length} item(s)</span>
                    </div>

                    ${group.items.map(item => `
                      <div class="flex items-center justify-between gap-3 text-xs">
                        <img src="${item.listing.photos[0]}" class="w-12 h-12 rounded-xl object-cover shrink-0" />
                        
                        <div class="flex-1 min-w-0">
                          <h4 class="font-bold text-slate-900 truncate">${lang === 'am' && item.listing.nameAm ? item.listing.nameAm : item.listing.productName}</h4>
                          <p class="text-emerald-800 font-extrabold">${item.listing.pricePerKg} ETB/kg · <span class="text-slate-500 font-normal">${item.listing.grade || 'Grade 1'}</span></p>
                          
                          <div class="flex items-center gap-1.5 mt-1">
                            <button onclick="window.updateCartQty('${item.listing.id}', -25)" class="w-5 h-5 rounded bg-white border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 cursor-pointer">-</button>
                            <span class="font-black text-slate-900 px-1">${item.qtyKg} kg</span>
                            <button onclick="window.updateCartQty('${item.listing.id}', 25)" class="w-5 h-5 rounded bg-white border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 cursor-pointer">+</button>
                          </div>
                        </div>

                        <div class="text-right shrink-0">
                          <span class="font-black text-slate-900 block">${(item.qtyKg * item.listing.pricePerKg).toLocaleString()} ETB</span>
                          <button onclick="window.removeFromCart('${item.listing.id}')" class="text-[11px] text-red-600 hover:text-red-700 font-semibold cursor-pointer">Remove</button>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                `).join('')}
              </div>

              <!-- 90/5/5 Escrow Transparent Breakdown Card -->
              <div class="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 space-y-2 text-xs">
                <div class="flex items-center justify-between text-slate-600">
                  <span>${t.farmerShare}</span>
                  <span class="font-black text-emerald-900">${farmerShare.toLocaleString()} ETB</span>
                </div>
                <div class="flex items-center justify-between text-slate-600">
                  <span>${t.deliveryEstimate}</span>
                  <span class="font-bold text-slate-800">${driverShare.toLocaleString()} ETB</span>
                </div>
                <div class="flex items-center justify-between text-slate-600">
                  <span>${t.platformFee}</span>
                  <span class="font-bold text-slate-800">${platformShare.toLocaleString()} ETB</span>
                </div>
                <div class="pt-2 border-t border-emerald-300/60 flex items-center justify-between text-sm font-black text-slate-900">
                  <span>${t.totalAmount}</span>
                  <span class="text-emerald-900 text-base font-black">${cartTotal.toLocaleString()} ETB</span>
                </div>
              </div>

              <button onclick="window.openTelebirrModal()" 
                class="btn-telebirr w-full py-3.5 text-sm flex items-center justify-center gap-2 cursor-pointer">
                <i class="fa-solid fa-lock"></i>
                <span class="${lang === 'am' ? 'lang-am' : ''}">${t.checkoutTelebirr}</span>
              </button>
            `}

          </div>
        </div>
      ` : ''}

      <!-- Telebirr Escrow Interactive Checkout Modal -->
      ${activeTelebirrModal && activeTelebirrModal.isOpen ? `
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeTelebirrModal()">
          <div class="modal-content max-w-md p-6 sm:p-8 space-y-6">
            
            <div class="text-center space-y-2">
              <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-amber-400 text-white flex items-center justify-center mx-auto text-3xl font-black shadow-lg shadow-blue-900/20">
                <i class="fa-solid fa-bolt"></i>
              </div>
              <h3 class="text-xl font-bold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">${t.telebirrTitle}</h3>
              <p class="text-xs text-slate-500 ${lang === 'am' ? 'lang-am' : ''}">${t.telebirrDesc}</p>
            </div>

            <!-- Amount Card -->
            <div class="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-center space-y-1">
              <span class="text-xs font-bold text-blue-700 uppercase tracking-wider">Escrow Lock Amount</span>
              <div class="text-3xl font-black text-blue-950">${activeTelebirrModal.totalEtb.toLocaleString()} <span class="text-sm font-bold text-blue-700">ETB</span></div>
              <p class="text-[11px] text-blue-600 font-semibold">90% Farmer / 5% Driver / 5% Platform locked in vault</p>
            </div>

            <form onsubmit="window.processTelebirrPayment(event)" class="space-y-4 text-xs font-semibold text-slate-700">
              <div>
                <label class="block mb-1">${t.enterPhone}</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">+251</span>
                  <input type="text" value="955667788" required class="w-full pl-14 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
              </div>

              <div>
                <label class="block mb-1">${t.enterPin}</label>
                <input type="password" maxlength="4" value="1234" required class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-center text-xl tracking-widest font-black focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>

              <div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 font-medium flex items-start gap-2">
                <i class="fa-solid fa-shield-check text-amber-700 text-sm mt-0.5"></i>
                <span class="${lang === 'am' ? 'lang-am' : ''}">${t.escrowGuarantee}</span>
              </div>

              <button type="submit" id="telebirrSubmitBtn" class="btn-telebirr w-full py-3.5 text-sm cursor-pointer">
                <i class="fa-solid fa-check-double"></i> ${t.payNow} (${activeTelebirrModal.totalEtb.toLocaleString()} ETB)
              </button>
            </form>

          </div>
        </div>
      ` : ''}

      <!-- Dispute / Partial Refund Submission Modal -->
      ${activeDisputeModal && activeDisputeModal.isOpen ? `
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeDisputeModal()">
          <div class="modal-content max-w-lg p-6 sm:p-8 space-y-6">
            
            <div class="flex items-center justify-between pb-4 border-b border-slate-200">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-red-100 text-red-800 flex items-center justify-center text-lg font-bold">
                  <i class="fa-solid fa-triangle-exclamation"></i>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">${t.submitDisputeTitle}</h3>
                  <p class="text-xs text-slate-500">Order #${activeDisputeModal.order.id.slice(0, 8).toUpperCase()} · ${activeDisputeModal.order.productName}</p>
                </div>
              </div>
              <button onclick="window.closeDisputeModal()" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onsubmit="window.handleDisputeSubmit(event, '${activeDisputeModal.order.id}')" class="space-y-4 text-xs font-semibold text-slate-700">
              <div>
                <label class="block mb-1">${t.disputeReasonLabel}</label>
                <textarea id="disputeReasonText" required rows="3" class="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-red-500 focus:outline-none" placeholder="e.g. Delivered produce is 20% bruised and size is smaller than Grade 1 listing specification..."></textarea>
              </div>

              <div>
                <label class="block mb-1">${t.disputePhotoLabel}</label>
                <input type="text" id="disputePhotoUrl" value="https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-red-500 focus:outline-none" />
              </div>

              <div>
                <div class="flex items-center justify-between mb-1">
                  <label>${t.refundPercentLabel}</label>
                  <span id="refundPercentVal" class="font-bold text-red-700">50% Partial Refund</span>
                </div>
                <input type="range" id="disputeRefundSlider" min="20" max="100" step="10" value="50" oninput="document.getElementById('refundPercentVal').innerText = this.value + '% Partial Refund (' + Math.round(${activeDisputeModal.order.totalEtb} * (this.value/100)).toLocaleString() + ' ETB)'" class="w-full accent-red-600 cursor-pointer" />
              </div>

              <div class="p-3 rounded-xl bg-red-50 border border-red-200 text-[11px] text-red-900 leading-relaxed">
                <i class="fa-solid fa-lock text-red-700 mr-1"></i>
                Submitting this dispute immediately locks the Telebirr Escrow and assigns case to Marketplace Admin for arbitration.
              </div>

              <button type="submit" class="btn-secondary w-full py-3 text-xs text-red-700 border-red-300 hover:bg-red-50 font-bold cursor-pointer">
                <i class="fa-solid fa-gavel"></i> ${t.submitDisputeBtn}
              </button>
            </form>

          </div>
        </div>
      ` : ''}

      <!-- Live Order SignalR Tracking Modal -->
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
