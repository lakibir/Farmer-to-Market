import { Language, translations } from '../i18n/translations';
import { User, CartItem } from '../types';
import { api } from '../services/api';

export function renderNavbar(
  lang: Language,
  currentUser: User | null,
  isAuthenticated: boolean,
  activeTab: string,
  cart: CartItem[],
  unreadNotifications: number,
  searchQuery: string = ''
): string {
  const t = translations[lang];
  const cartTotalKg = cart.reduce((sum, item) => sum + item.qtyKg, 0);

  const roleBadgeStyle: Record<string, { label: string; labelAm: string; color: string; icon: string }> = {
    farmer: { label: 'Farmer / Producer', labelAm: 'አርሶ አደር', color: 'bg-emerald-100 text-emerald-900 border-emerald-300', icon: 'fa-seedling' },
    buyer: { label: 'Wholesale Buyer', labelAm: 'የጅምላ ገዢ', color: 'bg-blue-100 text-blue-900 border-blue-300', icon: 'fa-shopping-basket' },
    driver: { label: 'Freight Driver', labelAm: 'አጓጓዥ ሹፌር', color: 'bg-amber-100 text-amber-900 border-amber-300', icon: 'fa-truck-fast' },
    agent: { label: 'Field Extension Agent', labelAm: 'የግብርና ድጋፍ ኤጀንት', color: 'bg-teal-100 text-teal-900 border-teal-300', icon: 'fa-users-gear' },
    admin: { label: 'Platform Admin', labelAm: 'አድሚን', color: 'bg-purple-100 text-purple-900 border-purple-300', icon: 'fa-shield-halved' },
    superadmin: { label: 'Super Admin (Chief Platform Officer)', labelAm: 'ዋና አድሚን (Super Admin)', color: 'bg-rose-100 text-rose-900 border-rose-300', icon: 'fa-crown' }
  };

  const currentBadge = currentUser ? roleBadgeStyle[currentUser.role] || roleBadgeStyle.buyer : null;
  const isImpersonating = currentUser ? localStorage.getItem('currentUser') && JSON.parse(localStorage.getItem('currentUser') || '{}').phone !== '+251900000001' && (window as any).isSuperAdminImpersonating : false;

  return `
    <!-- Top Impersonation Banner if active -->
    <div id="impersonationBannerContainer"></div>

    <header class="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      
      <!-- Top Utility & Trust Bar -->
      <div class="bg-slate-950 text-slate-300 text-[11px] font-medium py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1.5 text-emerald-400 font-bold">
              <i class="fa-solid fa-shield-check"></i> Telebirr Escrow 100% Guaranteed
            </span>
            <span class="hidden md:inline text-slate-600">|</span>
            <span class="hidden md:flex items-center gap-1.5 text-slate-300">
              <i class="fa-solid fa-handshake text-amber-400"></i> Direct Farm-to-Buyer (0% Middlemen Markups)
            </span>
            <span class="hidden lg:inline text-slate-600">|</span>
            <span class="hidden lg:flex items-center gap-1 text-slate-400">
              <i class="fa-solid fa-truck text-emerald-400"></i> Isuzu 5-Ton Freight Network
            </span>
          </div>

          <div class="flex items-center gap-3 sm:gap-5">
            <span class="hidden sm:inline text-slate-400">
              <i class="fa-solid fa-phone mr-1 text-emerald-400"></i> Hotline: <strong class="text-slate-200">+251 911 223 344</strong>
            </span>
            
            <span class="text-slate-600">|</span>

            <!-- Language Switcher -->
            <button onclick="window.toggleLanguage()" 
              class="flex items-center gap-1.5 text-slate-200 hover:text-emerald-400 font-bold transition-colors cursor-pointer px-1 py-0.5 rounded hover:bg-slate-900"
              title="Switch Language">
              <i class="fa-solid fa-globe text-emerald-400"></i>
              <span>${lang === 'en' ? 'አማርኛ' : 'English'}</span>
            </button>
          </div>

        </div>
      </div>

      <!-- Main AliExpress Style Header -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div class="flex items-center justify-between gap-4 sm:gap-8">
          
          <!-- Brand Logo -->
          <div class="flex items-center gap-3 cursor-pointer shrink-0" onclick="window.navigateTab('marketplace')">
            <div class="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-800 to-emerald-600 flex items-center justify-center shadow-md text-white text-xl font-bold">
              <i class="fa-solid fa-wheat-awn"></i>
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <span class="text-xl font-black tracking-tight text-slate-900 ${lang === 'am' ? 'lang-am' : ''}">
                  ${t.brandName}
                </span>
                <span class="bg-amber-100 text-amber-900 text-[10px] font-black px-1.5 py-0.5 rounded border border-amber-200">
                  ET
                </span>
              </div>
              <p class="text-[11px] text-slate-500 font-medium ${lang === 'am' ? 'lang-am' : ''}">
                ${t.brandSubtitle}
              </p>
            </div>
          </div>

          <!-- AliExpress Style Global Search Box -->
          <div class="hidden md:flex flex-1 max-w-2xl relative">
            <div class="relative w-full flex items-center shadow-xs rounded-xl overflow-hidden border-2 border-emerald-700 bg-white">
              <div class="pl-3.5 pr-2 text-slate-400">
                <i class="fa-solid fa-magnifying-glass text-sm"></i>
              </div>
              <input type="text" 
                value="${searchQuery}" 
                oninput="window.setSearchQuery(this.value)"
                placeholder="${t.searchPlaceholder}"
                class="w-full py-2.5 pr-3 text-sm focus:outline-none bg-transparent placeholder:text-slate-400 font-medium ${lang === 'am' ? 'lang-am' : ''}" />
              
              <button onclick="window.navigateTab('marketplace')" class="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-3 transition-colors cursor-pointer flex items-center gap-1.5 shrink-0">
                <span>Search</span>
                <i class="fa-solid fa-arrow-right text-[10px]"></i>
              </button>
            </div>
          </div>

          <!-- Right Action Controls (AliExpress Account & Cart Style) -->
          <div class="flex items-center gap-3 shrink-0">
            
            <!-- Professional Account Dropdown Container -->
            <div class="relative group">
              
              ${isAuthenticated && currentUser ? `
                <!-- Logged In Account Button -->
                <button class="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-2 rounded-xl hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all cursor-pointer text-left">
                  <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-900 text-white flex items-center justify-center font-bold text-sm shadow-xs relative">
                    <span>${currentUser.name.charAt(0).toUpperCase()}</span>
                    <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                  </div>
                  <div class="hidden xl:block">
                    <span class="text-[10px] font-bold text-slate-400 block leading-tight">
                      ${lang === 'am' ? 'ሰላም,' : 'Hello,'}
                    </span>
                    <span class="text-xs font-black text-slate-900 block truncate max-w-[120px] leading-tight ${lang === 'am' ? 'lang-am' : ''}">
                      ${lang === 'am' && currentUser.nameAm ? currentUser.nameAm : currentUser.name}
                    </span>
                  </div>
                  <i class="fa-solid fa-chevron-down text-[10px] text-slate-400 ml-0.5"></i>
                </button>

                <!-- Professional Flyout Account Menu -->
                <div class="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 space-y-3.5 hidden group-hover:block z-50 animate-fadeIn">
                  
                  <!-- Profile Header in Dropdown -->
                  <div class="pb-3 border-b border-slate-100 flex items-center gap-3">
                    <div class="w-11 h-11 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-black text-base shadow-sm">
                      ${currentUser.name.charAt(0).toUpperCase()}
                    </div>
                    <div class="truncate">
                      <div class="flex items-center gap-1.5">
                        <span class="text-sm font-black text-slate-900 truncate ${lang === 'am' ? 'lang-am' : ''}">
                          ${lang === 'am' && currentUser.nameAm ? currentUser.nameAm : currentUser.name}
                        </span>
                        <i class="fa-solid fa-circle-check text-emerald-600 text-xs" title="Verified Account"></i>
                      </div>
                      <span class="text-[11px] font-semibold text-slate-500 block truncate">${currentUser.phone}</span>
                      <span class="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border inline-block mt-1 ${currentBadge?.color || 'bg-slate-100 text-slate-800'}">
                        ${lang === 'am' ? currentBadge?.labelAm : currentBadge?.label}
                      </span>
                    </div>
                  </div>

                  <!-- Verification Status Banner in Dropdown -->
                  <div class="p-2.5 rounded-xl ${currentUser.verificationStatus === 'Approved' || currentUser.verified ? 'bg-emerald-50 border border-emerald-200' : currentUser.verificationStatus === 'UnderReview' ? 'bg-amber-50 border border-amber-200' : 'bg-red-50 border border-red-200'} text-xs">
                    <div class="flex items-center justify-between">
                      <span class="font-bold ${currentUser.verificationStatus === 'Approved' || currentUser.verified ? 'text-emerald-900' : currentUser.verificationStatus === 'UnderReview' ? 'text-amber-900' : 'text-red-900'}">
                        ${currentUser.verificationStatus === 'Approved' || currentUser.verified ? '🛡️ ' + (lang === 'am' ? 'የተረጋገጠ መለያ' : 'Fayda Verified') : currentUser.verificationStatus === 'UnderReview' ? '⏳ ' + (lang === 'am' ? 'በመገምገም ላይ' : 'Under Review') : '⚠️ ' + (lang === 'am' ? 'ማረጋገጫ ያስፈልጋል' : 'Unverified Account')}
                      </span>
                      <button onclick="window.openVerificationWizard()" class="text-[10px] font-bold underline cursor-pointer text-emerald-800">
                        ${lang === 'am' ? 'ይመልከቱ' : 'Manage'}
                      </button>
                    </div>
                  </div>

                  <!-- Quick Portal Navigation -->
                  <div class="space-y-1 text-xs font-bold text-slate-700">
                    <button onclick="window.navigateTab('${currentUser.role}');" class="w-full text-left px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-900 transition-colors flex items-center justify-between cursor-pointer">
                      <span class="flex items-center gap-2">
                        <i class="fa-solid fa-gauge text-emerald-600"></i> My Portal Dashboard
                      </span>
                      <i class="fa-solid fa-arrow-right text-[10px] text-slate-400"></i>
                    </button>

                    ${currentUser.role === 'farmer' ? `
                      <button onclick="window.navigateTab('farmer-account');" class="w-full text-left px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-900 transition-colors flex items-center justify-between cursor-pointer">
                        <span class="flex items-center gap-2"><i class="fa-solid fa-user-gear text-emerald-600"></i> Account center</span>
                        <i class="fa-solid fa-arrow-right text-[10px] text-slate-400"></i>
                      </button>
                    ` : ''}

                    ${currentUser.role === 'buyer' ? `
                      <button onclick="window.navigateTab('account');" class="w-full text-left px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-900 transition-colors flex items-center justify-between cursor-pointer">
                        <span class="flex items-center gap-2"><i class="fa-solid fa-user-gear text-emerald-600"></i> Account center</span>
                        <i class="fa-solid fa-arrow-right text-[10px] text-slate-400"></i>
                      </button>
                    ` : ''}

                    <button onclick="window.openVerificationWizard();" class="w-full text-left px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-900 transition-colors flex items-center gap-2 cursor-pointer">
                      <i class="fa-solid fa-id-card text-emerald-600"></i> ${lang === 'am' ? 'የፋይዳ / የታክስ ማረጋገጫ' : 'Fayda & TIN Verification'}
                    </button>

                    ${currentUser.role === 'farmer' ? `
                      <button onclick="window.toggleCreateListingModal();" class="w-full text-left px-3 py-2 rounded-xl hover:bg-emerald-50 hover:text-emerald-900 transition-colors flex items-center gap-2 cursor-pointer">
                        <i class="fa-solid fa-plus-circle text-emerald-600"></i> Post New Produce Listing
                      </button>
                    ` : ''}

                    ${currentUser.role === 'superadmin' ? `
                      <button onclick="window.navigateTab('superadmin');" class="w-full text-left px-3 py-2 rounded-xl bg-rose-50 text-rose-950 hover:bg-rose-100 transition-colors flex items-center gap-2 cursor-pointer font-bold border border-rose-200">
                        <i class="fa-solid fa-crown text-rose-600"></i> Super Admin Command Center
                      </button>
                    ` : ''}

                    <button onclick="window.navigateTab('marketplace');" class="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2 cursor-pointer">
                      <i class="fa-solid fa-store text-slate-500"></i> Browse Produce Exchange
                    </button>
                  </div>

                  <!-- Logout Button -->
                  <div class="pt-2 border-t border-slate-100">
                    <button onclick="window.handleLogout()" class="w-full py-2 px-3 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer">
                      <i class="fa-solid fa-arrow-right-from-bracket"></i>
                      <span>${lang === 'am' ? 'ከመለያ ውጣ (Sign Out)' : 'Sign Out'}</span>
                    </button>
                  </div>

                </div>
              ` : `
                <!-- Logged Out AliExpress Style Sign In Button -->
                <button onclick="window.openAuthModal('login')" 
                  class="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-xl hover:bg-slate-100 border border-slate-200 transition-all cursor-pointer text-left">
                  <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center text-sm font-bold">
                    <i class="fa-regular fa-user"></i>
                  </div>
                  <div class="hidden sm:block">
                    <span class="text-[10px] font-bold text-slate-400 block leading-tight">Welcome</span>
                    <span class="text-xs font-black text-slate-900 block leading-tight">Sign In / Join</span>
                  </div>
                  <i class="fa-solid fa-chevron-down text-[10px] text-slate-400 ml-0.5"></i>
                </button>

                <!-- AliExpress Style Guest Flyout Menu -->
                <div class="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 space-y-3 hidden group-hover:block z-50 animate-fadeIn">
                  <button onclick="window.openAuthModal('login')" class="btn-primary w-full py-2.5 text-xs font-bold shadow-md cursor-pointer">
                    <i class="fa-solid fa-right-to-bracket mr-1"></i> Sign In (መግቢያ)
                  </button>
                  <p class="text-[11px] text-center text-slate-500 font-medium">
                    New to platform? <a href="javascript:void(0)" onclick="window.openAuthModal('register')" class="text-emerald-700 font-bold hover:underline">Join Free</a>
                  </p>
                  
                  <div class="pt-2 border-t border-slate-100 space-y-1.5 text-xs font-semibold text-slate-600">
                    <a href="javascript:void(0)" onclick="window.openAuthModal('login')" class="flex items-center gap-2 p-1.5 hover:bg-slate-50 rounded-lg">
                      <i class="fa-solid fa-box text-emerald-600"></i> Track Wholesale Orders
                    </a>
                    <a href="javascript:void(0)" onclick="window.openAuthModal('register')" class="flex items-center gap-2 p-1.5 hover:bg-slate-50 rounded-lg">
                      <i class="fa-solid fa-tractor text-amber-600"></i> Farmer Seller Center
                    </a>
                    <a href="javascript:void(0)" onclick="window.openAuthModal('register')" class="flex items-center gap-2 p-1.5 hover:bg-slate-50 rounded-lg">
                      <i class="fa-solid fa-truck text-blue-600"></i> Freight & Driver Logistics
                    </a>
                  </div>
                </div>
              `}

            </div>

            <!-- Notifications Bell -->
            <button onclick="window.openNotificationsModal()" 
              class="relative p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:text-slate-950 hover:bg-slate-50 transition-colors cursor-pointer"
              title="SMS Alerts & Notifications">
              <i class="fa-regular fa-bell text-base"></i>
              ${unreadNotifications > 0 ? `
                <span class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center animate-pulse">
                  ${unreadNotifications}
                </span>` : ''}
            </button>

            <!-- Bulk Cart Button -->
            <button onclick="window.toggleCart()" 
              class="btn-primary text-xs py-2 px-3 sm:px-4 flex items-center gap-2 cursor-pointer shadow-md">
              <i class="fa-solid fa-cart-shopping text-sm"></i>
              <span class="font-bold hidden sm:inline ${lang === 'am' ? 'lang-am' : ''}">${t.navCart}</span>
              <span class="bg-amber-400 text-slate-950 text-[11px] font-black px-2 py-0.5 rounded-full shadow-xs">
                ${cartTotalKg > 0 ? `${cartTotalKg} kg` : '0'}
              </span>
            </button>

          </div>

        </div>
      </div>

      <!-- Secondary Role Navigation Strip -->
      <div class="bg-slate-50 border-t border-slate-200/80 px-4 sm:px-8">
        <div class="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto scrollbar-none py-2 gap-2 text-xs font-semibold text-slate-600">
          
          <div class="flex items-center gap-1.5">
            
            <button onclick="window.navigateTab('marketplace')" 
              class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${activeTab === 'marketplace' ? 'bg-emerald-900 text-white font-bold shadow-xs' : 'hover:bg-slate-200/70 text-slate-700'} ${lang === 'am' ? 'lang-am' : ''}">
              <i class="fa-solid fa-store"></i> ${t.navMarketplace}
            </button>

            ${isAuthenticated && currentUser?.role === 'farmer' ? `
              <button onclick="window.navigateTab('farmer')" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${activeTab === 'farmer' ? 'bg-emerald-900 text-white font-bold shadow-xs' : 'hover:bg-slate-200/70 text-slate-700'} ${lang === 'am' ? 'lang-am' : ''}">
                <i class="fa-solid fa-tractor"></i> ${t.navFarmerPortal}
              </button>
              ${api.hasEffectivePermission('PUBLISH_PRODUCE', 'farmer') ? `
                <button onclick="window.toggleCreateListingModal()" 
                  class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 bg-emerald-100 text-emerald-950 font-bold hover:bg-emerald-200 ${lang === 'am' ? 'lang-am' : ''}">
                  <i class="fa-solid fa-plus-circle text-emerald-700"></i> ${t.postNewListing}
                </button>
              ` : ''}
            ` : ''}

            ${isAuthenticated && currentUser?.role === 'driver' ? `
              <button onclick="window.navigateTab('driver')" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${activeTab === 'driver' ? 'bg-emerald-900 text-white font-bold shadow-xs' : 'hover:bg-slate-200/70 text-slate-700'} ${lang === 'am' ? 'lang-am' : ''}">
                <i class="fa-solid fa-truck"></i> ${t.navDriverPortal}
              </button>
            ` : ''}

            ${isAuthenticated && currentUser?.role === 'agent' ? `
              <button onclick="window.navigateTab('agent')" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${activeTab === 'agent' ? 'bg-emerald-900 text-white font-bold shadow-xs' : 'hover:bg-slate-200/70 text-slate-700'} ${lang === 'am' ? 'lang-am' : ''}">
                <i class="fa-solid fa-users-gear text-teal-400"></i> ${t.navAgentPortal}
              </button>
            ` : ''}

            ${isAuthenticated && currentUser?.role === 'admin' ? `
              <button onclick="window.navigateTab('admin')" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${activeTab === 'admin' ? 'bg-emerald-900 text-white font-bold shadow-xs' : 'hover:bg-slate-200/70 text-slate-700'} ${lang === 'am' ? 'lang-am' : ''}">
                <i class="fa-solid fa-sliders"></i> ${t.navAdminPortal}
              </button>
            ` : ''}

            ${isAuthenticated && currentUser?.role === 'superadmin' ? `
              <button onclick="window.navigateTab('superadmin')" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${activeTab === 'superadmin' ? 'bg-rose-900 text-white font-bold shadow-xs' : 'bg-rose-50 hover:bg-rose-100 text-rose-900 font-bold border border-rose-200'}">
                <i class="fa-solid fa-crown text-rose-500"></i> SuperAdmin
              </button>
            ` : ''}

            ${!isAuthenticated || currentUser?.role === 'buyer' ? `
              <button onclick="window.toggleCart()" 
                class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 hover:bg-slate-200/70 text-slate-700 ${lang === 'am' ? 'lang-am' : ''}">
                <i class="fa-solid fa-cart-shopping text-emerald-600"></i> Wholesale Bulk Cart (${cartTotalKg} kg)
              </button>
            ` : ''}

            <button onclick="window.openMarketIntelligence()" 
              class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold ${lang === 'am' ? 'lang-am' : ''}"
              title="View live Ethiopian Commodity Exchange (ECX) prices & AI valuation">
              <i class="fa-solid fa-chart-line text-amber-600"></i> ${lang === 'am' ? '📈 የECX ገበያ ዋጋ' : '📈 ECX Price Index'}
            </button>

            <button onclick="window.openUssdSimulator()" 
              class="px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 font-bold ${lang === 'am' ? 'lang-am' : ''}"
              title="Simulate 2G feature-phone USSD *804# workflow for offline farmers">
              <i class="fa-solid fa-phone text-emerald-600"></i> ${lang === 'am' ? '📞 USSD (*804#)' : '📞 USSD (*804#)'}
            </button>

          </div>

          <div class="hidden lg:flex items-center gap-3 text-slate-500 text-[11px]">
            <span class="flex items-center gap-1"><i class="fa-solid fa-seedling text-emerald-600"></i> 100% Ethiopian Farm Sourced</span>
            <span>·</span>
            <span class="flex items-center gap-1"><i class="fa-solid fa-snowflake text-cyan-600"></i> Cold-Chain Logistics</span>
            <span>·</span>
            <span class="flex items-center gap-1"><i class="fa-solid fa-bolt text-blue-600"></i> Telebirr Escrow Automated</span>
          </div>

        </div>
      </div>

    </header>
  `;
}
