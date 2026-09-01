import { Listing } from '../types';
import { translations, Language } from '../i18n/translations';

export class ProduceDetailModal {
  private currentLang: Language = 'en';
  private activePhotoIndex: number = 0;
  private selectedQtyKg: number = 50;

  constructor(lang: Language = 'en') {
    this.currentLang = lang;
  }

  public setLanguage(lang: Language) {
    this.currentLang = lang;
  }

  public setActivePhotoIndex(index: number) {
    this.activePhotoIndex = index;
  }

  public setSelectedQtyKg(qty: number) {
    this.selectedQtyKg = Math.max(1, qty);
  }

  public render(listing: Listing | null): string {
    if (!listing) return '';

    const t = translations[this.currentLang];
    const isAm = this.currentLang === 'am';

    // Photos handling
    const photos = listing.photos && listing.photos.length > 0
      ? listing.photos
      : ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=1200&auto=format&fit=crop&q=80'];

    const safePhotoIndex = Math.min(this.activePhotoIndex, photos.length - 1);
    const activePhoto = photos[safePhotoIndex];

    // Qty & Price calculation
    const qty = Math.max(listing.minOrderKg || 10, this.selectedQtyKg || listing.minOrderKg || 50);
    const subtotal = qty * listing.pricePerKg;
    const farmerShare = Math.round(subtotal * 0.90);
    const driverCut = Math.round(subtotal * 0.05);
    const escrowProtectionFee = Math.round(subtotal * 0.05);

    // Benchmark comparison calculation
    const benchmark = listing.marketBenchmarkPrice || (listing.pricePerKg * 1.15);
    const savingsPerKg = Math.max(0, benchmark - listing.pricePerKg);
    const savingsPercent = benchmark > 0 ? Math.round((savingsPerKg / benchmark) * 100) : 0;

    // Rich description fallback if none provided
    const descEn = listing.description || `Freshly harvested Grade 1 ${listing.productName} cultivated directly by smallholder farmer ${listing.farmerName} in ${listing.region}. Verified under Ethiopian agricultural commodity standards with 90% direct farmer escrow payout.`;
    const descAm = listing.descriptionAm || `በ${listing.region} በአርሶ አደር ${listing.farmerNameAm || listing.farmerName} የተመረተ ምርጥ ደረጃ ${listing.nameAm || listing.productName}። በቴሌብር ዋስትና 90% ቀጥታ ለአርሶ አደሩ የሚከፈልበት ተመራጭ ምርት።`;

    return `
      <div class="modal-backdrop" onclick="if(event.target === this) window.closeProduceDetail()">
        <div class="modal-content overflow-hidden max-w-4xl w-[95%] max-h-[92vh] flex flex-col p-0 rounded-2xl shadow-2xl border border-slate-200 bg-white animate-fade-in">
          
          <!-- Modal Header Bar -->
          <div class="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-md">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-emerald-700/80 border border-emerald-500/40 flex items-center justify-center text-emerald-200 text-lg shadow-inner">
                <i class="fa-solid fa-leaf"></i>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-xs uppercase tracking-widest font-extrabold text-emerald-300">
                    ${isAm ? 'የምርት መረጃ እና ዝርዝር' : 'PRODUCE POST & FARM DETAILS'}
                  </span>
                  <span class="bg-emerald-500/20 text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/30">
                    ${listing.category}
                  </span>
                </div>
                <h2 class="text-lg font-black text-white leading-tight ${isAm ? 'lang-am' : ''}">
                  ${isAm && listing.nameAm ? listing.nameAm : listing.productName}
                </h2>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <button onclick="window.shareProduceListing('${listing.id}')" title="${isAm ? 'ምርቱን ያጋሩ' : 'Share Produce Post'}" class="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer">
                <i class="fa-solid fa-share-nodes text-sm"></i>
              </button>
              <button onclick="window.closeProduceDetail()" title="Close" class="w-9 h-9 rounded-xl bg-white/10 hover:bg-red-600/80 text-white flex items-center justify-center transition-colors cursor-pointer">
                <i class="fa-solid fa-xmark text-base"></i>
              </button>
            </div>
          </div>

          <!-- Modal Scrollable Body -->
          <div class="overflow-y-auto flex-1 p-5 sm:p-7 space-y-6 bg-slate-50/50">
            
            <!-- Top Grid: Image Gallery & Key Price / Escrow Snapshot -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              <!-- Left Column: Interactive Image Gallery (7 Cols) -->
              <div class="lg:col-span-7 space-y-3">
                
                <!-- Main High-Resolution Hero Photo Preview -->
                <div class="relative w-full h-72 sm:h-88 rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 group bg-slate-950">
                  <img 
                    id="produceHeroImage" 
                    src="${activePhoto}" 
                    alt="${listing.productName}" 
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  
                  <!-- Gradient Vignette -->
                  <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none"></div>

                  <!-- Floating Quality Badges (Top Left) -->
                  <div class="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                    <span class="bg-emerald-900/90 backdrop-blur-md text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md border border-emerald-500/40 flex items-center gap-1.5">
                      <i class="fa-solid fa-award text-amber-400"></i> ${listing.grade || 'Grade 1'}
                    </span>
                    ${listing.requiresColdChain ? `
                      <span class="bg-cyan-950/90 backdrop-blur-md text-cyan-200 text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md border border-cyan-400/40 flex items-center gap-1">
                        <i class="fa-solid fa-snowflake text-cyan-400"></i> Cold-Chain (0°C - 8°C)
                      </span>
                    ` : ''}
                    ${listing.isAggregatedLot || listing.cooperativeName ? `
                      <span class="bg-amber-950/90 backdrop-blur-md text-amber-200 text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md border border-amber-400/40 flex items-center gap-1">
                        <i class="fa-solid fa-users text-amber-300"></i> ${listing.cooperativeName || 'Cooperative Union Batch'}
                      </span>
                    ` : ''}
                    ${listing.isOrganic ? `
                      <span class="bg-teal-900/90 backdrop-blur-md text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md border border-teal-400/40 flex items-center gap-1">
                        <i class="fa-solid fa-seedling text-emerald-400"></i> 100% Organic
                      </span>
                    ` : ''}
                    ${listing.isAdvanceHarvest ? `
                      <span class="bg-amber-900/90 backdrop-blur-md text-amber-100 text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md border border-amber-400/40 flex items-center gap-1">
                        <i class="fa-solid fa-calendar-check text-amber-300"></i> Advance Harvest
                      </span>
                    ` : ''}
                  </div>

                  <!-- Floating Price Tag (Top Right) -->
                  <div class="absolute top-3 right-3 bg-slate-950/85 backdrop-blur-md text-white px-3.5 py-1.5 rounded-2xl shadow-xl border border-white/20 text-right z-10">
                    <div class="text-xs text-slate-300 font-semibold uppercase tracking-wider">Direct Farm Rate</div>
                    <div class="text-xl font-black text-emerald-400 flex items-baseline justify-end gap-1">
                      ${listing.pricePerKg} <span class="text-xs font-bold text-white">ETB/kg</span>
                    </div>
                  </div>

                  <!-- Floating Bottom Information Pill (Bottom Left) -->
                  <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white z-10">
                    <div class="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs">
                      <i class="fa-solid fa-location-dot text-emerald-400"></i>
                      <span class="font-bold">${listing.region}</span>
                      ${listing.distanceKm ? `<span class="text-slate-300 font-medium">(${listing.distanceKm} km from Addis)</span>` : ''}
                    </div>

                    <span class="bg-black/60 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-white/10 text-[11px] font-bold text-slate-200 flex items-center gap-1">
                      <i class="fa-solid fa-images text-emerald-400"></i> ${safePhotoIndex + 1} / ${photos.length}
                    </span>
                  </div>
                </div>

                <!-- Multiple Photo Gallery Thumbnails (Click to Switch) -->
                ${photos.length > 1 ? `
                  <div class="space-y-1.5">
                    <div class="flex items-center justify-between text-xs text-slate-500 font-bold px-1">
                      <span><i class="fa-solid fa-camera mr-1 text-emerald-600"></i> ${t.photoGallery} (${photos.length} angles)</span>
                      <span class="text-[10px] text-slate-400 font-normal">Click thumbnail to inspect</span>
                    </div>
                    <div class="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                      ${photos.map((p, idx) => `
                        <button 
                          onclick="window.selectProducePhoto(${idx})" 
                          class="relative h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer group ${idx === safePhotoIndex ? 'border-emerald-600 ring-2 ring-emerald-500/30 scale-102 shadow-md' : 'border-slate-200 hover:border-emerald-400 opacity-70 hover:opacity-100'}"
                        >
                          <img src="${p}" alt="Photo angle ${idx + 1}" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                          <span class="absolute bottom-1 right-1 bg-black/70 text-[9px] font-bold text-white px-1.5 py-0.5 rounded">
                            ${idx === 0 ? 'Harvest' : idx === 1 ? 'Packaged' : 'Inspection'}
                          </span>
                        </button>
                      `).join('')}
                    </div>
                  </div>
                ` : ''}

              </div>

              <!-- Right Column: Farmer Credibility & Benchmarking (5 Cols) -->
              <div class="lg:col-span-5 space-y-4">
                
                <!-- Farmer / Producer Trust Badge Card -->
                <div class="bg-white p-4.5 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
                  <div class="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div class="flex items-center gap-3">
                      <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-700 to-teal-800 text-white flex items-center justify-center text-xl font-bold shadow-md">
                        <i class="fa-solid fa-user-shield"></i>
                      </div>
                      <div>
                        <div class="flex items-center gap-1.5">
                          <h4 class="font-extrabold text-slate-900 text-sm">
                            ${isAm && listing.farmerNameAm ? listing.farmerNameAm : listing.farmerName}
                          </h4>
                          <i class="fa-solid fa-circle-check text-emerald-600 text-sm" title="Verified Fayda Smallholder"></i>
                        </div>
                        <p class="text-xs text-slate-500 font-medium">
                          ${listing.region} · Kebele Producer
                        </p>
                      </div>
                    </div>

                    <div class="text-right">
                      <div class="flex items-center justify-end text-amber-500 text-sm font-black">
                        <i class="fa-solid fa-star mr-1"></i> ${listing.farmerRating || 4.9}
                      </div>
                      <div class="text-[10px] text-slate-400 font-medium">${listing.reviewCount || 24} Verified Reviews</div>
                    </div>
                  </div>

                  <!-- Producer Trust Indicators -->
                  <div class="grid grid-cols-2 gap-2 text-xs">
                    <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <div class="text-[10px] text-slate-400 uppercase font-bold">Repeat Wholesalers</div>
                      <div class="font-black text-slate-800 text-sm mt-0.5">
                        <i class="fa-solid fa-repeat text-emerald-600 mr-1"></i> ${listing.repeatBuyerCount || 18} Buyers
                      </div>
                    </div>
                    <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <div class="text-[10px] text-slate-400 uppercase font-bold">On-Time Dispatch</div>
                      <div class="font-black text-emerald-700 text-sm mt-0.5">
                        <i class="fa-solid fa-truck-fast text-emerald-600 mr-1"></i> ${listing.onTimeDeliveryRate || 99}%
                      </div>
                    </div>
                  </div>

                  <!-- Direct Producer Contact Actions -->
                  <div class="flex items-center gap-2 pt-1">
                    <a href="tel:${listing.farmerPhone}" class="btn-secondary flex-1 py-2 text-xs font-bold text-center justify-center text-slate-700 hover:bg-slate-100">
                      <i class="fa-solid fa-phone text-emerald-600 mr-1.5"></i> ${t.callFarmer}
                    </a>
                    <button onclick="window.sendSmsInquiry('${listing.farmerPhone}', '${listing.productName}')" class="btn-secondary flex-1 py-2 text-xs font-bold text-center justify-center text-slate-700 hover:bg-slate-100 cursor-pointer">
                      <i class="fa-solid fa-comment-sms text-blue-600 mr-1.5"></i> ${t.smsInquiry}
                    </button>
                  </div>
                </div>

                <!-- Price Benchmarking & Wholesale Savings Card -->
                <div class="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-emerald-500/10 p-4.5 rounded-2xl border border-amber-200/80 space-y-2.5">
                  <div class="flex items-center justify-between text-xs">
                    <span class="font-extrabold text-amber-900 flex items-center gap-1.5">
                      <i class="fa-solid fa-chart-line text-amber-600"></i> ${t.marketComparison}
                    </span>
                    <span class="trend-badge trend-down text-[10px]">
                      <i class="fa-solid fa-arrow-down"></i> ${savingsPercent}% Direct Savings
                    </span>
                  </div>

                  <div class="flex items-baseline justify-between pt-1">
                    <div>
                      <div class="text-[11px] text-slate-500">Regional Depot Benchmark</div>
                      <div class="text-sm font-bold text-slate-700 line-through">
                        ${benchmark.toFixed(1)} ETB/kg
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="text-[11px] text-emerald-700 font-bold">Farmer Direct Price</div>
                      <div class="text-lg font-black text-emerald-800">
                        ${listing.pricePerKg} ETB/kg
                      </div>
                    </div>
                  </div>

                  <div class="text-[11px] text-slate-600 bg-white/80 p-2 rounded-xl border border-amber-200/50 leading-tight">
                    <i class="fa-solid fa-circle-check text-emerald-600 mr-1"></i>
                    Eliminates 3 intermediary middleman margins. You save <strong class="text-emerald-800 font-bold">${savingsPerKg.toFixed(1)} ETB/kg</strong> while smallholder receives full 90% value.
                  </div>
                </div>

                <!-- Telebirr Escrow Protection Guarantee -->
                <div class="bg-blue-50/80 p-3.5 rounded-2xl border border-blue-200 text-xs space-y-1 text-blue-950">
                  <div class="flex items-center gap-2 font-black text-blue-900">
                    <i class="fa-solid fa-shield-halved text-blue-600 text-base"></i>
                    <span>Telebirr Escrow Guarantee (No Financial Risk)</span>
                  </div>
                  <p class="text-[11px] text-blue-800/90 leading-tight">
                    Your payment is held in escrow until driver delivers to your warehouse and you physically inspect produce quality. Full refund guarantee on transit spoilage.
                  </p>
                </div>

              </div>

            </div>

            <!-- Full Rich Description & Agricultural Specifications -->
            <div class="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div class="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2 ${isAm ? 'lang-am' : ''}">
                  <i class="fa-solid fa-align-left text-emerald-600"></i>
                  ${t.cropDescription}
                </h3>
                <span class="text-xs font-bold text-slate-400">
                  Batch #ET-${listing.id.slice(0, 8).toUpperCase()}
                </span>
              </div>

              <!-- Bilingual Description Tabs / Content -->
              <div class="space-y-3 text-slate-700 leading-relaxed text-sm">
                <p class="font-medium text-slate-800">
                  ${descEn}
                </p>
                <div class="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-slate-800 lang-am text-xs font-medium leading-relaxed">
                  <span class="font-bold text-emerald-800 block mb-1">የምርት ዝርዝር መግለጫ (አማርኛ)፡</span>
                  ${descAm}
                </div>
              </div>

              <!-- Produce Specifications Grid -->
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                
                <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div class="text-[10px] uppercase font-bold text-slate-400">Quality Grade</div>
                  <div class="font-extrabold text-slate-800 text-xs flex items-center gap-1">
                    <i class="fa-solid fa-award text-amber-600"></i> ${listing.grade || 'Grade 1'}
                  </div>
                </div>

                <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div class="text-[10px] uppercase font-bold text-slate-400">Ripeness / Maturity</div>
                  <div class="font-extrabold text-slate-800 text-xs flex items-center gap-1">
                    <i class="fa-solid fa-clock text-blue-600"></i> ${listing.ripeness || 'Ready Today'}
                  </div>
                </div>

                <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div class="text-[10px] uppercase font-bold text-slate-400">Available Stock</div>
                  <div class="font-extrabold text-emerald-800 text-xs flex items-center gap-1">
                    <i class="fa-solid fa-boxes-stacked text-emerald-600"></i> ${listing.qtyKg.toLocaleString()} kg
                  </div>
                </div>

                <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div class="text-[10px] uppercase font-bold text-slate-400">Min Bulk Order</div>
                  <div class="font-extrabold text-slate-800 text-xs flex items-center gap-1">
                    <i class="fa-solid fa-scale-balanced text-purple-600"></i> ${listing.minOrderKg} kg
                  </div>
                </div>

              </div>

              <!-- Voice Note Memo Player (If Available) -->
              ${listing.voiceNoteTranscript ? `
                <div class="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs shadow">
                        <i class="fa-solid fa-microphone"></i>
                      </div>
                      <div>
                        <div class="font-bold text-emerald-950 text-xs">Farmer Audio Memo & Speech Transcript</div>
                        <div class="text-[10px] text-emerald-700">Recorded in Bishoftu Farm Zone (Amharic)</div>
                      </div>
                    </div>
                    
                    <button onclick="window.playSimulatedVoiceNote('${listing.id}')" class="px-3 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs">
                      <i id="voicePlayIcon-${listing.id}" class="fa-solid fa-play text-[10px]"></i>
                      <span id="voicePlayText-${listing.id}">Play Voice Memo</span>
                    </button>
                  </div>

                  <div class="p-2.5 bg-white rounded-lg border border-emerald-100 text-xs text-slate-800 italic flex items-center gap-2">
                    <i class="fa-solid fa-quote-left text-emerald-400 text-sm"></i>
                    <span>"${listing.voiceNoteTranscript}"</span>
                  </div>
                </div>
              ` : ''}

            </div>

            <!-- Interactive Bulk Order & Quantity Calculator Bar -->
            <div class="bg-gradient-to-br from-slate-900 via-slate-850 to-emerald-950 text-white p-5 sm:p-6 rounded-2xl shadow-xl border border-emerald-900/60 space-y-5">
              
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div>
                  <h4 class="text-sm font-extrabold text-white flex items-center gap-2">
                    <i class="fa-solid fa-calculator text-emerald-400"></i>
                    ${t.selectOrderQty}
                  </h4>
                  <p class="text-xs text-slate-300">
                    Enter required wholesale volume in kilograms (Min. ${listing.minOrderKg} kg · Max. ${listing.qtyKg.toLocaleString()} kg)
                  </p>
                </div>

                <div class="flex items-center gap-1.5 flex-wrap">
                  <button onclick="window.setProduceOrderQty(${listing.minOrderKg})" class="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-200 cursor-pointer">
                    Min (${listing.minOrderKg} kg)
                  </button>
                  <button onclick="window.setProduceOrderQty(100)" class="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-200 cursor-pointer">
                    100 kg
                  </button>
                  <button onclick="window.setProduceOrderQty(500)" class="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-200 cursor-pointer">
                    500 kg
                  </button>
                  <button onclick="window.setProduceOrderQty(1000)" class="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-200 cursor-pointer">
                    1,000 kg (1 Ton)
                  </button>
                </div>
              </div>

              <!-- Quantity Input + Subtotal Breakdown -->
              <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                
                <!-- Step Input Controls (5 Cols) -->
                <div class="md:col-span-5 flex items-center gap-2">
                  <button 
                    onclick="window.setProduceOrderQty(${Math.max(listing.minOrderKg, qty - 50)})" 
                    class="w-11 h-11 rounded-xl bg-white/15 hover:bg-white/25 text-white flex items-center justify-center font-black text-lg transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  
                  <div class="flex-1 relative">
                    <input 
                      type="number" 
                      id="modalOrderQtyInput"
                      min="${listing.minOrderKg}" 
                      max="${listing.qtyKg}" 
                      value="${qty}" 
                      onchange="window.setProduceOrderQty(Number(this.value))"
                      class="w-full h-11 bg-white/10 border border-white/20 rounded-xl px-3 text-center text-white font-extrabold text-base focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                    />
                    <span class="absolute right-3 top-3 text-xs text-slate-400 font-bold pointer-events-none">kg</span>
                  </div>

                  <button 
                    onclick="window.setProduceOrderQty(${Math.min(listing.qtyKg, qty + 50)})" 
                    class="w-11 h-11 rounded-xl bg-white/15 hover:bg-white/25 text-white flex items-center justify-center font-black text-lg transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <!-- Subtotal Breakdown (7 Cols) -->
                <div class="md:col-span-7 bg-white/5 p-3.5 rounded-xl border border-white/10 flex items-center justify-between">
                  <div class="space-y-0.5 text-xs">
                    <div class="text-slate-400">Total Produce Price:</div>
                    <div class="text-2xl font-black text-emerald-400">
                      ${subtotal.toLocaleString()} <span class="text-xs font-normal text-slate-300">ETB</span>
                    </div>
                  </div>

                  <div class="text-right text-[11px] text-slate-300 space-y-0.5 border-l border-white/10 pl-4">
                    <div>Farmer Payout (90%): <strong class="text-emerald-300 font-bold">${farmerShare.toLocaleString()} ETB</strong></div>
                    <div>Driver & Escrow (10%): <strong class="text-slate-200">${(driverCut + escrowProtectionFee).toLocaleString()} ETB</strong></div>
                    <div class="text-[10px] text-amber-300 font-bold"><i class="fa-solid fa-stamp mr-1"></i> Tax-Exempt Produce (Art. 979)</div>
                  </div>
                </div>

              </div>

              <!-- Action Buttons: Add to Cart & Buy Now with Escrow -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button 
                  onclick="window.addProduceDetailToCart('${listing.id}', ${qty})" 
                  class="btn-secondary py-3 text-sm font-extrabold text-slate-900 hover:bg-slate-100 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <i class="fa-solid fa-cart-plus text-emerald-700"></i>
                  ${t.addToCart} (${qty} kg)
                </button>

                <button 
                  onclick="window.buyProduceNow('${listing.id}', ${qty})" 
                  class="btn-primary py-3 text-sm font-extrabold flex items-center justify-center gap-2 cursor-pointer shadow-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500"
                >
                  <i class="fa-solid fa-shield-halved text-amber-300"></i>
                  ${t.buyNowEscrow}
                </button>
              </div>

            </div>

          </div>

          <!-- Modal Footer with Contract Link -->
          <div class="bg-slate-100 px-6 py-3 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-500">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-file-contract text-emerald-700"></i>
              <span>Standard Ethiopian Agricultural Sales Agreement automatically generated upon order.</span>
            </div>

            <button onclick="window.closeProduceDetail()" class="text-slate-600 hover:text-slate-900 font-bold cursor-pointer">
              Close Details
            </button>
          </div>

        </div>
      </div>
    `;
  }
}

export const produceDetailModal = new ProduceDetailModal();
