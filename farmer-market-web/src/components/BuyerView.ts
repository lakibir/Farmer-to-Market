import { Language, translations } from '../i18n/translations';
import { Listing, CartItem, Order } from '../types';

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
  quickViewListing: Listing | null = null
): string {
  const t = translations[lang];

  const categories = [
    { key: 'All', label: t.catAll, icon: 'fa-boxes-stacked', count: listings.length },
    { key: 'Vegetables', label: t.catVegetables, icon: 'fa-carrot', count: listings.filter(l => l.category === 'Vegetables').length },
    { key: 'Grains', label: t.catGrains, icon: 'fa-wheat-awn', count: listings.filter(l => l.category === 'Grains').length },
    { key: 'Fruits', label: t.catFruits, icon: 'fa-apple-whole', count: listings.filter(l => l.category === 'Fruits').length },
    { key: 'Coffee', label: t.catCoffee, icon: 'fa-mug-hot', count: listings.filter(l => l.category === 'Coffee').length }
  ];

  const cartTotal = cart.reduce((sum, item) => sum + (item.qtyKg * item.listing.pricePerKg), 0);
  const farmerShare = Math.round(cartTotal * 0.90);
  const driverShare = Math.round(cartTotal * 0.05);
  const platformShare = cartTotal - farmerShare - driverShare;

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
              <button onclick="window.setCategory('Vegetables')" class="bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs py-2.5 px-5 rounded-xl shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer">
                <i class="fa-solid fa-fire mr-1.5 text-amber-900"></i> Browse Farm Deals
              </button>
              <button onclick="window.setCategory('Coffee')" class="bg-white/15 hover:bg-white/25 text-white font-bold text-xs py-2.5 px-5 rounded-xl border border-white/20 transition-colors cursor-pointer">
                <i class="fa-solid fa-mug-hot mr-1.5 text-amber-300"></i> Specialty Coffee Beans
              </button>
            </div>
          </div>

          <!-- Hero Promo Card -->
          <div class="lg:col-span-4 hidden lg:block">
            <div class="bg-white/10 backdrop-blur-xl p-5 rounded-2xl border border-white/20 shadow-2xl space-y-3">
              <div class="flex items-center justify-between text-xs font-bold text-emerald-200">
                <span><i class="fa-solid fa-bolt text-amber-400"></i> Escrow Guarantee</span>
                <span class="telebirr-badge text-[10px]">Telebirr C2B</span>
              </div>
              <div class="text-2xl font-black text-white">90% Direct to Farmer</div>
              <p class="text-xs text-emerald-100/90 leading-relaxed">
                Wholesale buyers save up to 40% vs Mercato wholesale markup. Payment is released only after you inspect produce.
              </p>
              <div class="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-emerald-200">
                <span>Avg Delivery: <strong class="text-white">Same Day</strong></span>
                <span>Minimum Order: <strong class="text-white">40 kg+</strong></span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- Trust Pillars / E-Commerce Value Strip -->
      <section class="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div class="glass-card p-4 flex items-center gap-3.5 border-slate-200">
          <div class="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xl shrink-0 font-bold">
            <i class="fa-solid fa-shield-halved"></i>
          </div>
          <div>
            <h4 class="text-xs font-extrabold text-slate-900">Telebirr Escrow</h4>
            <p class="text-[11px] text-slate-500">100% money-back protection</p>
          </div>
        </div>

        <div class="glass-card p-4 flex items-center gap-3.5 border-slate-200">
          <div class="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-xl shrink-0 font-bold">
            <i class="fa-solid fa-seedling"></i>
          </div>
          <div>
            <h4 class="text-xs font-extrabold text-slate-900">Direct Sourcing</h4>
            <p class="text-[11px] text-slate-500">Zero broker markups</p>
          </div>
        </div>

        <div class="glass-card p-4 flex items-center gap-3.5 border-slate-200">
          <div class="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center text-xl shrink-0 font-bold">
            <i class="fa-solid fa-truck-fast"></i>
          </div>
          <div>
            <h4 class="text-xs font-extrabold text-slate-900">Dedicated Freight</h4>
            <p class="text-[11px] text-slate-500">Verified Isuzu partner drivers</p>
          </div>
        </div>

        <div class="glass-card p-4 flex items-center gap-3.5 border-slate-200">
          <div class="w-12 h-12 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center text-xl shrink-0 font-bold">
            <i class="fa-solid fa-certificate"></i>
          </div>
          <div>
            <h4 class="text-xs font-extrabold text-slate-900">Quality Certified</h4>
            <p class="text-[11px] text-slate-500">Grade 1 farm harvested produce</p>
          </div>
        </div>

      </section>

      <!-- Category Tabs & Controls -->
      <section class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        
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

        <!-- Filter Dropdowns -->
        <div class="flex items-center gap-3 shrink-0">
          <div class="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-700 font-semibold shadow-xs">
            <i class="fa-solid fa-location-dot text-emerald-600"></i>
            <select onchange="window.setRegion(this.value)" class="bg-transparent font-bold focus:outline-none cursor-pointer">
              <option value="All">${t.allRegions}</option>
              <option value="Addis" ${selectedRegion === 'Addis' ? 'selected' : ''}>${t.addisAbaba}</option>
              <option value="Oromia" ${selectedRegion === 'Oromia' ? 'selected' : ''}>${t.oromia}</option>
              <option value="Amhara" ${selectedRegion === 'Amhara' ? 'selected' : ''}>${t.amhara}</option>
              <option value="Sidama" ${selectedRegion === 'Sidama' ? 'selected' : ''}>${t.sidama}</option>
            </select>
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
            <h3 class="text-base font-bold text-slate-800">No Produce Listings Found</h3>
            <p class="text-xs text-slate-500">Try selecting "All Produce" or changing your region filter.</p>
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
                    </div>

                    <div class="absolute top-3 right-3">
                      <span class="bg-white/90 backdrop-blur-md text-emerald-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-xs border border-emerald-200">
                        ${l.category}
                      </span>
                    </div>

                    <!-- Region & Distance Overlay -->
                    <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-bold text-white bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                      <span><i class="fa-solid fa-location-dot text-emerald-400 mr-1"></i> ${l.region}</span>
                      <span class="text-emerald-300">${l.distanceKm ? `~${l.distanceKm} km away` : 'Direct Farm'}</span>
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
                          <i class="fa-solid fa-check-circle"></i> Ready Today
                        </span>
                      </div>

                      <h3 class="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-emerald-800 transition-colors ${lang === 'am' ? 'lang-am' : ''}">
                        ${lang === 'am' && l.nameAm ? l.nameAm : l.productName}
                      </h3>
                      ${lang === 'en' && l.nameAm ? `<p class="text-xs text-slate-400 font-medium lang-am">${l.nameAm}</p>` : ''}
                    </div>

                    <!-- Farmer Badge -->
                    <div class="flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <div class="flex items-center gap-2 truncate">
                        <div class="w-6 h-6 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center font-bold text-[10px] shrink-0">
                          <i class="fa-solid fa-user"></i>
                        </div>
                        <span class="font-bold text-slate-800 truncate ${lang === 'am' ? 'lang-am' : ''}">${lang === 'am' && l.farmerNameAm ? l.farmerNameAm : l.farmerName}</span>
                      </div>
                      <span class="text-emerald-700 text-[11px] font-bold shrink-0">Verified Farm</span>
                    </div>

                    <!-- Stock Progress Indicator -->
                    <div class="space-y-1 text-xs">
                      <div class="flex justify-between font-semibold text-slate-600">
                        <span>Stock Available: <strong class="text-slate-900 font-black">${l.qtyKg.toLocaleString()} kg</strong></span>
                        <span class="text-slate-400 font-medium">Min: ${l.minOrderKg} kg</span>
                      </div>
                      <div class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div class="h-full bg-emerald-600 rounded-full" style="width: 85%;"></div>
                      </div>
                    </div>

                  </div>
                </div>

                <!-- Price & Add To Cart Stepper -->
                <div class="p-5 pt-0">
                  <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div>
                      <span class="text-xs font-bold text-slate-400 uppercase block leading-none">Unit Price</span>
                      <div class="flex items-baseline gap-1 mt-0.5">
                        <span class="text-2xl font-black text-emerald-800 leading-none">${l.pricePerKg}</span>
                        <span class="text-xs font-extrabold text-slate-600">ETB / kg</span>
                      </div>
                    </div>

                    <button onclick="window.quickBuy('${l.id}')" 
                      class="btn-primary text-xs py-2.5 px-4 shadow-sm hover:shadow-md cursor-pointer">
                      <i class="fa-solid fa-cart-plus"></i>
                      <span class="${lang === 'am' ? 'lang-am' : ''}">${t.addToCart}</span>
                    </button>
                  </div>
                </div>

              </div>
            `).join('')}
          </div>
        `}
      </section>

      <!-- Bulk Cart Slide-over Drawer -->
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
                  <p class="text-xs text-slate-500 font-medium">Wholesale direct produce escrow checkout</p>
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
              <div class="space-y-3 max-h-72 overflow-y-auto pr-1">
                ${cart.map(item => `
                  <div class="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 flex items-center justify-between gap-3">
                    <img src="${item.listing.photos[0]}" class="w-14 h-14 rounded-xl object-cover shrink-0" />
                    
                    <div class="flex-1 min-w-0">
                      <h4 class="text-sm font-bold text-slate-900 truncate ${lang === 'am' ? 'lang-am' : ''}">
                        ${lang === 'am' && item.listing.nameAm ? item.listing.nameAm : item.listing.productName}
                      </h4>
                      <p class="text-xs text-emerald-800 font-extrabold">${item.listing.pricePerKg} ETB / kg</p>
                      
                      <div class="flex items-center gap-2 mt-2">
                        <button onclick="window.updateCartQty('${item.listing.id}', -25)" class="w-6 h-6 rounded-lg bg-white border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 cursor-pointer">-</button>
                        <span class="text-xs font-black text-slate-900 px-1">${item.qtyKg} kg</span>
                        <button onclick="window.updateCartQty('${item.listing.id}', 25)" class="w-6 h-6 rounded-lg bg-white border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 cursor-pointer">+</button>
                        ${item.qtyKg < item.listing.minOrderKg ? `
                          <span class="text-[10px] text-amber-700 font-bold bg-amber-100 px-1.5 py-0.5 rounded">Min ${item.listing.minOrderKg}kg</span>
                        ` : ''}
                      </div>
                    </div>

                    <div class="text-right shrink-0">
                      <span class="text-sm font-black text-slate-900 block">${(item.qtyKg * item.listing.pricePerKg).toLocaleString()} ETB</span>
                      <button onclick="window.removeFromCart('${item.listing.id}')" class="text-xs text-red-600 hover:text-red-700 font-semibold mt-1 cursor-pointer">Remove</button>
                    </div>
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
              <p class="text-[11px] text-blue-600 font-semibold">Funds locked in escrow until you confirm delivery</p>
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
                <button onclick="window.raiseDispute('${activeOrderModal.id}')" class="btn-secondary py-3 text-xs text-red-600 border-red-200 hover:bg-red-50 cursor-pointer">
                  <i class="fa-solid fa-triangle-exclamation"></i> ${t.disputeBtn}
                </button>
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
