import { Language, translations } from '../i18n/translations';
import { api } from '../services/api';

export function renderAboutDashboardView(lang: Language): string {
  const t = translations[lang];
  const isAm = lang === 'am';

  const stats = [
    {
      icon: 'fa-wheat-awn',
      color: 'from-emerald-600 to-teal-700',
      textColor: 'text-emerald-400',
      value: '4,200+',
      labelEn: 'Onboarded Smallholder Producers',
      labelAm: 'በስታርት-አፑ የተመዘገቡ አምራች አርሶ አደሮች',
      subEn: 'Direct digital onboarding across 6 regional corridors',
      subAm: 'በ 6 የክልል የግብርና ኮሪደሮች ውስጥ በቴክኖሎጂ የተሳሰሩ'
    },
    {
      icon: 'fa-money-bill-trend-up',
      color: 'from-amber-600 to-orange-700',
      textColor: 'text-amber-400',
      value: '14.1M+ ETB',
      labelEn: 'Annualized Startup Platform GMV',
      labelAm: 'አጠቃላይ የተገበያየ የግብይት ዋጋ (GMV)',
      subEn: '100% digital settlement via Telebirr Escrow with 0% dispute loss',
      subAm: '100% በቴሌብር ዲጂታል ኤስክሮው የተከፈለና የተጠበቀ'
    },
    {
      icon: 'fa-truck-fast',
      color: 'from-blue-600 to-indigo-700',
      textColor: 'text-blue-400',
      value: '7 Freight Hubs',
      labelEn: 'Active B2B Logistics Corridors',
      labelAm: 'የጭነት እና የትራንስፖርት ተርሚናሎች',
      subEn: 'Kality Dry Port, Furi-Lebu / Sebeta, Gelan, Dukem, Modjo Dry Port, Debre Zeit Rd & Addis Ababa',
      subAm: 'ቃሊቲ ደረቅ ወደብ፣ ፉሪ-ለቡ/ሰበታ፣ ገላን፣ ዱከም፣ ሞጆ ደረቅ ወደብ፣ ደብረ ዘይት መንገድ እና አዲስ አበባ'
    },
    {
      icon: 'fa-shield-halved',
      color: 'from-purple-600 to-pink-700',
      textColor: 'text-purple-400',
      value: '90 / 5 / 5 %',
      labelEn: 'Startup Unit Economics & Fair Split',
      labelAm: 'ፍትሃዊ የገቢ ሞዴል (Unit Economics)',
      subEn: '90% Farmer Direct · 5% Driver Telemetry · 5% Startup Platform Fee',
      subAm: '90% ለአርሶ አደር · 5% ለሹፌር · 5% ለስታርት-አፕ ፕላትፎርም'
    }
  ];

  const pillars = [
    {
      step: '01',
      icon: 'fa-id-card-clip',
      titleEn: 'Fayda ID & Kebele Verified Producers',
      titleAm: 'በፋይዳ እና በቀበሌ የተረጋገጡ አምራቾች',
      descEn: 'Every farmer and cooperative is authenticated with Ethiopian National ID (Fayda FAN), Kebele land certification, and TIN before publishing produce lots.',
      descAm: 'እያንዳንዱ አርሶ አደር እና ኅብረት ሥራ ማህበር በብሔራዊ መታወቂያ (Fayda)፣ የቀበሌ የምስክር ወረቀት እና TIN ተረጋግጦ ይመዘገባል።',
      badge: 'Tier-2 KYC'
    },
    {
      step: '02',
      icon: 'fa-chart-line',
      titleEn: 'Live ECX & Depot Fair Price Benchmarks',
      titleAm: 'የECX እና የማዕከላዊ ዲፖ የቀጥታ ዋጋ መረጃ',
      descEn: 'Real-time price intelligence continuously aggregated against ECX Central Exchange, Merkato Ehil Berenda, Sholla, and Adama wholesale depots.',
      descAm: 'ከኢትዮጵያ ምርት ገበያ (ECX)፣ ከመሪካቶ እህል በረንዳ እና ከአዳማ ዲፖ ጋር የተጣጣመ የቀጥታ የገበያ መረጃ።',
      badge: 'AI Price Engine'
    },
    {
      step: '03',
      icon: 'fa-lock',
      titleEn: '100% Protected Telebirr & Chapa Escrow',
      titleAm: '100% አስተማማኝ የቴሌብር ኤስክሮው ዋስትና',
      descEn: 'Buyer funds remain securely locked in platform escrow until destination weighbridge inspection and digital waybill delivery sign-off.',
      descAm: 'የገዢው ክፍያ ምርቱ ተጓጉዞ መዳረሻው ላይ በጥራት እስኪረከብ ድረስ በዋስትና ኤስክሮው ተቆልፎ ይቆያል።',
      badge: 'Zero Fraud'
    },
    {
      step: '04',
      icon: 'fa-file-signature',
      titleEn: 'e-VAT Invoices & Digital Waybills',
      titleAm: 'ዲጂታል e-VAT ደረሰኝ እና የመንገድ ማረጋገጫ',
      descEn: 'Automated Ministry of Revenues (MOR) compliant 15% VAT on service fee, 2% withholding tax slips, and legal EABC freight waybills generated per order.',
      descAm: 'የገቢዎች ሚኒስቴር የ15% VAT፣ የ2% ቅድመ ግብር ተቀናሽ እና ህጋዊ የትራንስፖርት ሰነዶችን በራስ-ሰር ያመነጫል።',
      badge: 'MOR Compliant'
    }
  ];

  const roleGateways = [
    {
      role: 'farmer',
      titleEn: 'For Farmers & Cooperatives',
      titleAm: 'ለአርሶ አደሮች እና ማህበራት',
      taglineEn: 'Sell direct at 90% farmgate price and eliminate predatory broker markups.',
      taglineAm: 'ያለ ደላላ ጣልቃ ገብነት ምርትዎን በሙሉ ዋጋ ይሽጡ፣ ክፍያዎን በቴሌብር ወዲያውኑ ይቀበሉ።',
      featuresEn: [
        'Instant Telebirr digital wallet disbursements',
        'Direct bulk wholesale pre-orders & advance harvest sales',
        'Offline USSD (*804# / *990#) support for 2G feature phones',
        'Dedicated local agricultural extension agent visits'
      ],
      featuresAm: [
        'ፈጣን የቴሌብር ክፍያ ቀጥታ ወደ ስልክዎ',
        'የቅድመ ምርት እና የጅምላ ትዕዛዞች ሽያጭ',
        'በቀላል ስልክ በ USSD (*804#) የመመዝገብ ዕድል',
        'የአካባቢ የግብርና ድጋፍ ባለሙያ ክትትል'
      ],
      icon: 'fa-tractor',
      gradient: 'from-emerald-900 to-teal-950 border-emerald-500/40 text-emerald-300',
      btnTextEn: 'Join as Farmer / Producer',
      btnTextAm: 'እንደ አርሶ አደር ይመዝገቡ',
      action: "window.openAuthModal('register')"
    },
    {
      role: 'buyer',
      titleEn: 'For Wholesale Buyers & Supermarkets',
      titleAm: 'ለጅምላ ገዢዎች እና ሱፐርማርኬቶች',
      taglineEn: 'Source premium Grade-1 Teff, Produce & Coffee directly from verified farms.',
      taglineAm: 'ጥራት ያላቸውን የግብርና ምርቶች በቀጥታ ከእርሻ ላይ በጅምላ ዋጋ ይዘዙ።',
      featuresEn: [
        'Consolidate multiple smallholder farm lots into one dispatch',
        'Official Ministry of Revenues (MOR) e-VAT tax deduction invoices',
        'Scheduled standing orders with automated weekly recurring delivery',
        'Full dispute arbitration & 100% refund guarantee'
      ],
      featuresAm: [
        'የበርካታ አርሶ አደሮችን ምርት በአንድ ጭነት የማሰባሰብ ዕድል',
        'ህጋዊ የግብር እና የ e-VAT የታክስ ደረሰኝ',
        'ሳምንታዊ ቋሚ ትዕዛዞችን በራስ-ሰር የማስረከብ ሥርዓት',
        '100% አስተማማኝ የክፍያ ዋስትና እና የተመላሽ ጥበቃ'
      ],
      icon: 'fa-building-wheat',
      gradient: 'from-blue-900 to-indigo-950 border-blue-500/40 text-blue-300',
      btnTextEn: 'Join as Wholesale Buyer',
      btnTextAm: 'እንደ ጅምላ ገዢ ይመዝገቡ',
      action: "window.openAuthModal('register')"
    },
    {
      role: 'driver',
      titleEn: 'For Transporters & Fleet Owners',
      titleAm: 'ለጭነት አሽከርካሪዎች እና ባለቤቶች',
      taglineEn: 'Earn guaranteed 5% escrow share with instant fuel advance and live routing.',
      taglineAm: 'የተረጋገጠ የ5% የትራንስፖርት ድርሻ እና የቅድመ ነዳጅ ክፍያ ያግኙ።',
      featuresEn: [
        'Guaranteed freight fees locked in escrow before departure',
        'GPS corridor route optimization across all major Ethiopian highways',
        'Cold-chain and insulated Isuzu 5-ton/10-ton batch incentives',
        'Electronic delivery confirmation with photo upload verification'
      ],
      featuresAm: [
        'ከመነሳትዎ በፊት በዋስትና የተያዘ የትራንስፖርት ክፍያ',
        'የተቀናጀ የ GPS የጉዞ መስመር መረጃ',
        'ለማቀዝቀዣ የጭነት መኪኖች ልዩ ማበረታቻ',
        'በፎቶ የተደገፈ ዲጂታል የርክክብ ማረጋገጫ'
      ],
      icon: 'fa-truck-moving',
      gradient: 'from-amber-900 to-orange-950 border-amber-500/40 text-amber-300',
      btnTextEn: 'Register Transport Fleet',
      btnTextAm: 'የጭነት መኪናዎን ይመዝግቡ',
      action: "window.openAuthModal('register')"
    },
    {
      role: 'agent',
      titleEn: 'For Field Extension Agents',
      titleAm: 'ለገጠር የግብርና ድጋፍ ኤጀንቶች',
      taglineEn: 'Digitize rural smallholders, verify harvest quality, and earn commissions.',
      taglineAm: 'የአካባቢዎን አርሶ አደሮች ይመዝግቡ፣ የምርት ጥራትን ያረጋግጡ እና ኮሚሽን ያግኙ።',
      featuresEn: [
        'Agent field app for offline biometric & Kebele ID verification',
        'Harvest yield estimation and grade assessment toolkit',
        'Facilitate cooperative bulk aggregations and USSD onboarding',
        'Earn per-producer verified onboarding & dispatch commissions'
      ],
      featuresAm: [
        'ያለ ኢንተርኔት አርሶ አደሮችን የመመዝገቢያ መተግበሪያ',
        'የምርት ጥራት እና ደረጃ መገምገሚያ ሥርዓት',
        'አርሶ አደሮችን በ USSD (*804#) የማስተሳሰር ዕድል',
        'በእያንዳንዱ በተረጋገጠ ምዝገባ ላይ የሚከፈል ኮሚሽን'
      ],
      icon: 'fa-users-gear',
      gradient: 'from-teal-900 to-slate-950 border-teal-500/40 text-teal-300',
      btnTextEn: 'Apply as Extension Agent',
      btnTextAm: 'እንደ ኤጀንት ይመዝገቡ',
      action: "window.openAuthModal('register')"
    }
  ];

  return `
    <div class="space-y-12 pb-24 animate-fadeIn">
      
      <!-- Top Hero Section -->
      <section class="hero-gradient rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden text-white border border-emerald-500/30">
        <!-- Background accents -->
        <div class="absolute -right-20 -bottom-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -left-20 -top-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div class="max-w-4xl space-y-6 relative z-10">
          <div class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-200 text-xs font-black shadow-md">
            <span class="pulse-dot"></span>
            <span>${isAm ? 'የኢትዮጵያ ፈር-ቀዳጅ የግብርና ቴክኖሎጂ (AgTech) ስታርት-አፕ' : 'Ethiopia\'s Premier AgTech Startup & Digital Agri-Exchange'}</span>
          </div>

          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white ${isAm ? 'lang-am' : ''}">
            ${isAm
      ? 'አርሶ አደሮችን በቀጥታ ከጅምላ ገዢዎች ጋር በቴክኖሎጂ የሚያስተሳስር ፈጣን የግብርና ስታርት-አፕ'
      : 'Next-Gen AgTech Startup Powering Direct Farm-to-Market Trade with 100% Escrow Protection'}
          </h1>

          <p class="text-emerald-100 text-sm sm:text-lg leading-relaxed max-w-3xl font-normal ${isAm ? 'lang-am' : ''}">
            ${isAm
      ? 'Farmer-to-Market የኢትዮጵያን የግብርና ንግድ በዘመናዊ ቴክኖሎጂ የሚቀይር ፈጣን ስታርት-አፕ ነው። የደላላ ጣልቃ ገብነትን በማስቀረት አርሶ አደሮች 90% የምርት ዋጋቸውን በቴሌብር እንዲያገኙ፣ የጅምላ ገዢዎች በዋስትና የተጠበቀ ግዢ እንዲፈጽሙ እና ህጋዊ የe-VAT ደረሰኝ እንዲያገኙ ያደርጋል።'
      : 'Farmer-to-Market is Ethiopia\'s high-growth AgTech startup revolutionizing direct agricultural commerce. We eliminate predatory middlemen, provide live ECX market price discovery, guarantee 100% Telebirr escrow protection, and issue automated Ministry of Revenues (MOR) e-VAT tax invoices.'}
          </p>

          <!-- Direct Wholesale Search & Discovery Box -->
          <div class="pt-2 max-w-3xl space-y-3">
            <div class="relative flex items-center shadow-2xl rounded-2xl overflow-hidden border-2 border-amber-400/80 bg-white text-slate-900 p-1">
              <div class="pl-4 pr-2 text-slate-400">
                <i class="fa-solid fa-magnifying-glass text-lg text-emerald-700"></i>
              </div>
              <input type="text" 
                id="about-hero-search-input"
                onkeydown="if(event.key === 'Enter'){ window.executeAboutSearch(this.value); }"
                placeholder="${isAm ? 'ሰብል፣ አትክልት ወይም ፍራፍሬ ይፈልጉ (ለምሳሌ፡ ነጭ ጤፍ፣ ቡና፣ ሽንኩርት፣ ቲማቲም...)' : 'Search wholesale produce (e.g. Magna Teff, Sidama Coffee G1, Adama Onions, Tomatoes, Potatoes)...'}"
                class="w-full py-3 pr-3 text-sm sm:text-base focus:outline-none bg-transparent placeholder:text-slate-400 font-semibold ${isAm ? 'lang-am' : ''}" />
              
              <button onclick="const el = document.getElementById('about-hero-search-input'); window.executeAboutSearch(el ? el.value : '');" class="bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 shrink-0 shadow-md">
                <span>${isAm ? 'በገበያው ፈልግ' : 'Search Market'}</span>
                <i class="fa-solid fa-arrow-right text-xs text-amber-300"></i>
              </button>
            </div>

            <!-- Popular Quick Search Commodity Tags -->
            <div class="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span class="text-emerald-200/90 font-bold flex items-center gap-1">
                <i class="fa-solid fa-fire text-amber-400 text-[11px]"></i>
                ${isAm ? 'ተፈላጊ ምርቶች:' : 'Trending Crops:'}
              </span>
              <button onclick="window.executeAboutSearch('Teff')" class="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[11px] font-semibold transition-all cursor-pointer">
                🌾 ${isAm ? 'ነጭ ጤፍ' : 'White Teff'}
              </button>
              <button onclick="window.executeAboutSearch('Coffee')" class="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[11px] font-semibold transition-all cursor-pointer">
                ☕ ${isAm ? 'ሲዳማ ቡና' : 'Sidama Coffee'}
              </button>
              <button onclick="window.executeAboutSearch('Onion')" class="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[11px] font-semibold transition-all cursor-pointer">
                🧅 ${isAm ? 'አዳማ ሽንኩርት' : 'Adama Onions'}
              </button>
              <button onclick="window.executeAboutSearch('Tomato')" class="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[11px] font-semibold transition-all cursor-pointer">
                🍅 ${isAm ? 'መቂ ቲማቲም' : 'Meki Tomatoes'}
              </button>
              <button onclick="window.executeAboutSearch('Potato')" class="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[11px] font-semibold transition-all cursor-pointer">
                🥔 ${isAm ? 'የሻሸመኔ ድንች' : 'Potatoes'}
              </button>
              <button onclick="window.executeAboutSearch('Avocado')" class="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[11px] font-semibold transition-all cursor-pointer">
                🥑 ${isAm ? 'ሀስ አቮካዶ' : 'Hass Avocados'}
              </button>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-4 pt-2">
            <button onclick="window.openAuthModal('register')" class="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-sm py-3.5 px-8 rounded-2xl shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2">
              <i class="fa-solid fa-seedling text-emerald-950"></i>
              <span>${isAm ? 'አሁኑኑ በነጻ ይመዝገቡ' : 'Create Free Account / Get Started'}</span>
            </button>

            <button onclick="window.openAuthModal('login')" class="bg-white/15 hover:bg-white/25 text-white font-bold text-sm py-3.5 px-7 rounded-2xl border border-white/20 transition-all cursor-pointer flex items-center gap-2">
              <i class="fa-solid fa-right-to-bracket text-emerald-300"></i>
              <span>${isAm ? 'ወደ መለያዎ ይግቡ' : 'Sign In to Portal'}</span>
            </button>

            <button onclick="window.navigateTab('marketplace')" class="bg-slate-900/60 hover:bg-slate-900 text-emerald-200 font-bold text-sm py-3.5 px-6 rounded-2xl border border-emerald-500/30 transition-all cursor-pointer flex items-center gap-2">
              <i class="fa-solid fa-store text-amber-400"></i>
              <span>${isAm ? 'ሁሉንም ምርቶች ይመልከቱ' : 'Browse All Marketplace'}</span>
            </button>
          </div>
        </div>
      </section>

      <!-- AgTech Startup Traction & Live Scale Metrics -->
      <section class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-black text-slate-900 ${isAm ? 'lang-am' : ''}">
            <i class="fa-solid fa-chart-line text-emerald-600 mr-2"></i>
            ${isAm ? 'የስታርት-አፑ የቀጥታ የዕድገት እና የገበያ መረጃዎች (Startup Traction)' : 'AgTech Startup Traction & Marketplace Scale'}
          </h2>
          <span class="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            <i class="fa-solid fa-rocket text-amber-500 mr-1"></i> Live Startup Traction
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          ${stats.map(s => `
            <div class="glass-card p-6 rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 space-y-3 relative overflow-hidden group">
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr ${s.color} text-white flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform">
                <i class="fa-solid ${s.icon}"></i>
              </div>
              <div>
                <div class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">${s.value}</div>
                <div class="text-xs font-bold text-slate-700 mt-0.5 ${isAm ? 'lang-am' : ''}">${isAm ? s.labelAm : s.labelEn}</div>
                <div class="text-[11px] text-slate-500 mt-1 leading-snug ${isAm ? 'lang-am' : ''}">${isAm ? s.subAm : s.subEn}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- How Farmer-to-Market Works: 4-Pillar Pipeline -->
      <section class="space-y-6 bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        <div class="max-w-3xl space-y-2">
          <div class="text-amber-400 font-black text-xs uppercase tracking-widest flex items-center gap-2">
            <i class="fa-solid fa-diagram-project"></i>
            <span>${isAm ? 'የአሰራር ሂደት' : 'End-to-End Trade Architecture'}</span>
          </div>
          <h2 class="text-2xl sm:text-4xl font-black text-white ${isAm ? 'lang-am' : ''}">
            ${isAm ? 'መድረኩ እንዴት ይሰራል? (4ቱ ዋና የግብይት ደረጃዎች)' : 'How Farmer-to-Market Works'}
          </h2>
          <p class="text-slate-300 text-xs sm:text-sm leading-relaxed ${isAm ? 'lang-am' : ''}">
            ${isAm
      ? 'ከምርት ምዝገባ ጀምሮ እስከ መዳረሻ ርክክብ እና ክፍያ ድረስ ያለውን ሂደት በሙሉ በዲጂታል ቴክኖሎጂ እና በህጋዊ ማረጋገጫ የተጠበቀ ነው።'
      : 'Our digital trade pipeline ensures zero counterparty default, full tax compliance, cold-chain transport tracking, and fair producer earnings.'}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          ${pillars.map(p => `
            <div class="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 space-y-4 hover:border-emerald-500/50 transition-all duration-300 relative group">
              <div class="flex items-center justify-between">
                <span class="text-3xl font-black text-slate-600 group-hover:text-emerald-400 transition-colors font-mono">${p.step}</span>
                <span class="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-950 text-emerald-300 border border-emerald-500/30">${p.badge}</span>
              </div>
              <div class="w-10 h-10 rounded-xl bg-slate-700 text-emerald-400 flex items-center justify-center text-lg">
                <i class="fa-solid ${p.icon}"></i>
              </div>
              <div class="space-y-1.5">
                <h3 class="font-extrabold text-sm text-white leading-snug ${isAm ? 'lang-am' : ''}">${isAm ? p.titleAm : p.titleEn}</h3>
                <p class="text-slate-400 text-xs leading-relaxed ${isAm ? 'lang-am' : ''}">${isAm ? p.descAm : p.descEn}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Interactive Role Gateways ("Join the Ecosystem") -->
      <section class="space-y-6">
        <div class="text-center max-w-2xl mx-auto space-y-2">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold">
            <i class="fa-solid fa-users"></i>
            <span>${isAm ? 'የተጠቃሚዎች ድርሻ' : 'Ecosystem Participants'}</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900 ${isAm ? 'lang-am' : ''}">
            ${isAm ? 'የእርስዎን ዘርፍ ይምረጡ እና ይቀላቀሉ' : 'Choose Your Role in the Exchange'}
          </h2>
          <p class="text-slate-600 text-xs sm:text-sm ${isAm ? 'lang-am' : ''}">
            ${isAm
      ? 'አርሶ አደር፣ የጅምላ ገዢ፣ አጓጓዥ ሹፌር ወይም የግብርና ድጋፍ ኤጀንት ይሁኑ — ለሁሉም የተዘጋጀ ልዩ የዲጂታል አገልግሎት አለን።'
      : 'Select your role below to register, explore dedicated portal features, or sign in to your dashboard.'}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${roleGateways.map(rg => `
            <div class="bg-gradient-to-br ${rg.gradient} border rounded-3xl p-7 text-white shadow-xl flex flex-col justify-between space-y-6 hover:scale-[1.01] transition-transform duration-300">
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <div class="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-2xl border border-white/20">
                    <i class="fa-solid ${rg.icon}"></i>
                  </div>
                  <span class="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 border border-white/20">
                    ${rg.role.toUpperCase()} PORTAL
                  </span>
                </div>

                <div>
                  <h3 class="text-xl sm:text-2xl font-black text-white ${isAm ? 'lang-am' : ''}">
                    ${isAm ? rg.titleAm : rg.titleEn}
                  </h3>
                  <p class="text-xs text-white/80 mt-1 leading-relaxed ${isAm ? 'lang-am' : ''}">
                    ${isAm ? rg.taglineAm : rg.taglineEn}
                  </p>
                </div>

                <div class="space-y-2 pt-2 border-t border-white/10 text-xs">
                  ${(isAm ? rg.featuresAm : rg.featuresEn).map(f => `
                    <div class="flex items-start gap-2 text-white/90">
                      <i class="fa-solid fa-circle-check text-emerald-400 mt-0.5 text-xs shrink-0"></i>
                      <span class="${isAm ? 'lang-am' : ''}">${f}</span>
                    </div>
                  `).join('')}
                </div>
              </div>

              <div class="pt-4 flex items-center gap-3">
                <button onclick="${rg.action}" class="flex-1 bg-white hover:bg-slate-100 text-slate-950 font-black text-xs py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer text-center">
                  <span>${isAm ? rg.btnTextAm : rg.btnTextEn}</span>
                  <i class="fa-solid fa-arrow-right ml-1.5 text-xs"></i>
                </button>
                <button onclick="window.openAuthModal('login')" class="bg-white/15 hover:bg-white/25 text-white font-bold text-xs py-3 px-4 rounded-xl border border-white/20 transition-all cursor-pointer">
                  ${isAm ? 'ግባ' : 'Sign In'}
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Live ECX Commodity Indices Showcase -->
      <section class="glass-card p-8 rounded-3xl border border-slate-200/90 shadow-lg space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="inline-flex items-center gap-2 text-amber-700 text-xs font-black uppercase tracking-wider">
              <i class="fa-solid fa-scale-balanced"></i>
              <span>${isAm ? 'የቀጥታ ገበያ ዋጋ ጠቋሚ' : 'Live ECX Market Price Indices'}</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-black text-slate-900 mt-1 ${isAm ? 'lang-am' : ''}">
              ${isAm ? 'የወቅቱ የኢትዮጵያ ምርት ገበያ እና የዲፖ አማካይ ዋጋዎች' : 'National Wholesale Depot & Commodity Exchange Benchmarks'}
            </h2>
          </div>

          <div class="flex items-center gap-2">
            <button onclick="window.openMarketIntelligence()" class="btn-primary text-xs py-2.5 px-4 flex items-center gap-2 shadow-md cursor-pointer">
              <i class="fa-solid fa-chart-line text-amber-300"></i>
              <span>${isAm ? 'ሙሉ የዋጋ መረጃ ዝርዝር' : 'Open Price Intelligence & AI Advisor'}</span>
            </button>
            <button onclick="window.openUssdSimulator()" class="btn-secondary text-xs py-2.5 px-3.5 flex items-center gap-1.5 cursor-pointer">
              <i class="fa-solid fa-phone text-emerald-600"></i>
              <span>*804# USSD</span>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="font-extrabold text-slate-800">White Magna Teff (ነጭ ጤፍ)</span>
              <span class="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded text-[10px]">+3.8%</span>
            </div>
            <div class="text-2xl font-black text-slate-900">128.50 <span class="text-xs font-medium text-slate-500">ETB/kg</span></div>
            <div class="text-[11px] text-slate-500 flex items-center justify-between">
              <span>ECX: 126.00 ETB</span>
              <span class="text-emerald-700 font-semibold"><i class="fa-solid fa-arrow-trend-up"></i> Stable Up</span>
            </div>
          </div>

          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="font-extrabold text-slate-800">Sidama Coffee G1 (ሲዳማ ቡና)</span>
              <span class="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded text-[10px]">+5.2%</span>
            </div>
            <div class="text-2xl font-black text-slate-900">485.00 <span class="text-xs font-medium text-slate-500">ETB/kg</span></div>
            <div class="text-[11px] text-slate-500 flex items-center justify-between">
              <span>ECX: 490.00 ETB</span>
              <span class="text-emerald-700 font-semibold"><i class="fa-solid fa-arrow-trend-up"></i> High Demand</span>
            </div>
          </div>

          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="font-extrabold text-slate-800">Adama Red Onions (ቀይ ሽንኩርት)</span>
              <span class="text-rose-700 font-bold bg-rose-100 px-2 py-0.5 rounded text-[10px]">-2.4%</span>
            </div>
            <div class="text-2xl font-black text-slate-900">82.00 <span class="text-xs font-medium text-slate-500">ETB/kg</span></div>
            <div class="text-[11px] text-slate-500 flex items-center justify-between">
              <span>Merkato: 88.00 ETB</span>
              <span class="text-rose-700 font-semibold"><i class="fa-solid fa-arrow-trend-down"></i> Seasonal Supply</span>
            </div>
          </div>

          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="font-extrabold text-slate-800">Meki Plum Tomatoes (የመቂ ቲማቲም)</span>
              <span class="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded text-[10px]">+8.1%</span>
            </div>
            <div class="text-2xl font-black text-slate-900">65.00 <span class="text-xs font-medium text-slate-500">ETB/kg</span></div>
            <div class="text-[11px] text-slate-500 flex items-center justify-between">
              <span>Sholla: 72.00 ETB</span>
              <span class="text-emerald-700 font-semibold"><i class="fa-solid fa-arrow-trend-up"></i> Fresh Dispatch</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Institutional & Regulatory Compliance Badges -->
      <section class="border-t border-slate-200 pt-8">
        <div class="text-center text-xs font-bold text-slate-500 mb-6 uppercase tracking-wider">
          ${isAm ? 'የተረጋገጡ የቴክኖሎጂ እና የህግ አጋሮች' : 'Compliant Infrastructure & Regulatory Frameworks'}
        </div>

        <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-8 opacity-90 text-xs font-bold text-slate-700">
          <div class="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-xs">
            <i class="fa-solid fa-bolt text-blue-600"></i>
            <span>Ethio Telecom Telebirr Escrow API</span>
          </div>

          <div class="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-xs">
            <i class="fa-solid fa-id-card text-emerald-600"></i>
            <span>Fayda Digital National ID (FAN-ID)</span>
          </div>

          <div class="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-xs">
            <i class="fa-solid fa-building-columns text-purple-600"></i>
            <span>Ministry of Revenues (MOR) e-VAT</span>
          </div>

          <div class="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-xs">
            <i class="fa-solid fa-map-location-dot text-amber-600"></i>
            <span>PostGIS Spatial Route Telemetry</span>
          </div>
        </div>
      </section>

      <!-- Call to Action Banner -->
      <section class="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 rounded-3xl p-8 sm:p-12 text-center text-white border border-emerald-500/40 shadow-2xl space-y-5">
        <h2 class="text-2xl sm:text-4xl font-black text-white ${isAm ? 'lang-am' : ''}">
          ${isAm ? 'የኢትዮጵያን የግብርና ንግድ ይቀላቀሉ' : 'Ready to Transform Your Agricultural Sourcing & Sales?'}
        </h2>
        <p class="text-emerald-200 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed ${isAm ? 'lang-am' : ''}">
          ${isAm
      ? 'አሁኑኑ ይመዝገቡና በቀጥታ ከእርሻ ላይ ይዘዙ ወይም ምርትዎን ያለምንም ደላላ ለጅምላ ገዢዎች ያቅርቡ።'
      : 'Join over 4,200 verified farmers and wholesale buyers already trading on Ethiopia\'s premier agricultural B2B platform.'}
        </p>
        <div class="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button onclick="window.openAuthModal('register')" class="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-sm py-3 px-8 rounded-2xl shadow-xl transition-all cursor-pointer">
            <i class="fa-solid fa-user-plus mr-1.5"></i> ${isAm ? 'መለያ ይክፈቱ' : 'Create Free Account'}
          </button>
          <button onclick="window.navigateTab('marketplace')" class="bg-white/10 hover:bg-white/20 text-white font-bold text-sm py-3 px-7 rounded-2xl border border-white/20 transition-all cursor-pointer">
            <i class="fa-solid fa-basket-shopping mr-1.5 text-emerald-400"></i> ${isAm ? 'ገበያውን ይቃኙ' : 'Browse Marketplace'}
          </button>
        </div>
      </section>

    </div>
  `;
}
