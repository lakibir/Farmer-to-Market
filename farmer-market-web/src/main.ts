import confetti from 'canvas-confetti';
import { Language } from './i18n/translations';
import { api } from './services/api';
import { signalRService } from './services/signalr.service';
import { CartItem, Order, UserRole, Listing, PermissionKey } from './types';
import { renderNavbar } from './components/Navbar';
import { renderBuyerView } from './components/BuyerView';
import { renderFarmerView } from './components/FarmerView';
import { renderDriverView } from './components/DriverView';
import { renderAdminView } from './components/AdminView';
import { AgentView } from './components/AgentView';
import { VerificationWizardModal } from './components/VerificationWizardModal';
import { renderNotificationsModal } from './components/NotificationsModal';
import { renderAuthModal } from './components/AuthModal';
import { documentModal } from './components/DocumentModal';
import { produceDetailModal } from './components/ProduceDetailModal';
import { renderSuperAdminView, SuperAdminTab } from './components/SuperAdminView';
import { renderSuperAdminModals } from './components/SuperAdminModals';
import { renderBuyerAccountView, BuyerAccountTab } from './components/BuyerAccountView';
import { renderFarmerAccountView, FarmerAccountTab } from './components/FarmerAccountView';
import { ussdSimulator } from './components/UssdSimulatorModal';
import { marketIntelligenceModal } from './components/MarketIntelligenceModal';
import { renderRateReviewModal, RateModalState } from './components/RateReviewModal';
import { renderAboutDashboardView } from './components/AboutDashboardView';

// Toast Notification Manager
function showToast(message: string, icon: string = 'fa-circle-check', color: string = 'border-emerald-500') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast-msg border-l-4 ${color} shadow-2xl`;
  toast.innerHTML = `
    <i class="fa-solid ${icon} text-base text-emerald-400"></i>
    <span class="text-xs font-bold text-slate-100">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Application State
class App {
  private lang: Language = (localStorage.getItem('lang') as Language) || 'en';
  private activeTab: string = api.isAuthenticated() ? 'marketplace' : 'about';
  private activeCategory: string = 'All';
  private selectedRegion: string = 'All';
  private searchQuery: string = '';
  private loadCartFromStorage(): CartItem[] {
    try {
      const saved = localStorage.getItem('farmer_market_cart');
      if (saved) {
        const parsed: CartItem[] = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter(item => item && item.listing && item.qtyKg > 0);
        }
      }
    } catch (e) {
      console.warn('Failed to load cart from localStorage', e);
    }
    return [];
  }

  private saveCartToStorage() {
    try {
      localStorage.setItem('farmer_market_cart', JSON.stringify(this.cart));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }

  private cart: CartItem[] = this.loadCartFromStorage();
  private isCartOpen: boolean = false;
  private isNotificationsModalOpen: boolean = false;
  private isCreateListingModalOpen: boolean = false;
  private activeOrderModal: Order | null = null;
  private activeTelebirrModal: { isOpen: boolean; totalEtb: number; listingId?: string; qtyKg?: number } | null = null;
  private activeDisputeModal: { isOpen: boolean; order: Order } | null = null;
  private activeRateModal: RateModalState | null = null;

  // Produce Detail Post Modal State
  private activeProduceModalId: string | null = null;
  private activeProducePhotoIndex: number = 0;
  private produceOrderQty: number = 50;

  // Legal & Official Document Modal State
  private activeLegalDocModal: { isOpen: boolean; type: 'invoice' | 'waybill' | 'contract' | 'arbitration'; orderId: string } | null = null;

  // Advanced Filters
  private maxDistanceKm: number = 0;
  private activeGrade: string = 'All';
  private activeRipeness: string = 'All';
  private organicOnly: boolean = false;
  private advanceOnly: boolean = false;
  private activeBuyerSubTab: 'marketplace' | 'orders' | 'standing_orders' = 'marketplace';
  private activeBuyerAccountTab: BuyerAccountTab = 'overview';
  private activeFarmerAccountTab: FarmerAccountTab = 'overview';

  // Farmer & Admin Sub-Tabs
  private activeFarmerTab: 'listings' | 'wallet' | 'sms' = 'listings';
  private activeAdminTab: 'disputes' | 'anomalies' | 'kyc' | 'tax_compliance' | 'analytics' | 'sms' = 'disputes';

  // Super Admin & Admin Governance State
  private activeSuperAdminTab: SuperAdminTab = 'users';
  private superAdminUserRoleFilter: string = 'all';
  private superAdminAuditCategoryFilter: string = 'all';
  private isSuperAdminCreateUserModalOpen: boolean = false;
  private isSuperAdminEditUserModalOpen: boolean = false;
  private editTargetUserId: string | null = null;
  private isSuperAdminAddZoneModalOpen: boolean = false;
  private isSuperAdminAddBlacklistModalOpen: boolean = false;
  private isSuperAdminBannerModalOpen: boolean = false;
  private editTargetBannerId: string | null = null;
  private isListingEditModalOpen: boolean = false;
  private editTargetListingId: string | null = null;
  private selectedRbacRole: UserRole = 'admin';

  // Super Admin Financials & Payouts State
  private superAdminFinancialSubTab: 'payouts' | 'ledger' | 'tax' | 'config' = 'payouts';
  private superAdminPayoutStatusFilter: string = 'all';
  private superAdminPayoutRoleFilter: string = 'all';
  private superAdminPayoutRiskFilter: string = 'all';
  private superAdminPayoutSearchQuery: string = '';
  private selectedPayoutIds: string[] = [];
  private isSuperAdminRejectModalOpen: boolean = false;
  private rejectTargetPayoutId: string | null = null;
  private isSuperAdminSimulatePayoutModalOpen: boolean = false;
  private isSuperAdminPayoutDetailModalOpen: boolean = false;
  private detailTargetPayoutId: string | null = null;

  // Voice Note State
  private isRecordingVoice: boolean = false;
  private voiceRecordTimer: any = null;

  // Auth Modal State
  private isAuthModalOpen: boolean = false;
  private authMode: 'login' | 'register' = 'login';
  private otpStep: boolean = false;
  private pendingPhone: string = '';
  private lastSentCode: string = '';
  private matchedUserName: string = '';
  private matchedUserRole: string = '';
  private matchedUserEmail: string = '';
  private authErrorMessage: string = '';

  // Field Agent & Verification Modals
  private agentView: AgentView = new AgentView(this.lang);
  private verificationWizardModal: VerificationWizardModal = new VerificationWizardModal(this.lang);

  constructor() {
    this.init();
  }

  private async init() {
    this.attachGlobalWindowHandlers();

    // Connect to SignalR Order Hub
    signalRService.startConnection(api.getToken() || undefined);

    // Handle Chapa payment return redirect & auto-verify
    const urlParams = new URLSearchParams(window.location.search);
    const chapaTxRef = urlParams.get('tx_ref') || urlParams.get('trx_ref');
    const statusParam = urlParams.get('status');

    if (chapaTxRef) {
      if (statusParam === 'failed' || statusParam === 'canceled') {
        showToast('Chapa payment was cancelled or failed.', 'fa-circle-xmark', 'border-rose-500');
      } else {
        api.verifyChapaPayment(chapaTxRef).then(res => {
          if (res) {
            showToast('Chapa payment verified! Escrow is now securely locked in database.', 'fa-circle-check', 'border-emerald-500');
            confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
          } else {
            showToast('Chapa payment was not completed or failed verification.', 'fa-circle-xmark', 'border-rose-500');
          }
        });
      }
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // ── Order Status Changes (buyer + farmer + driver views) ──────
    signalRService.onOrderStatusChanged(async (orderId, status, message) => {
      console.log(`[SignalR] Order ${orderId} → ${status}: ${message}`);
      if (this.activeOrderModal && this.activeOrderModal.id === orderId) {
        this.activeOrderModal.status = status;
      }
      showToast(
        `Order #${orderId.slice(0, 8).toUpperCase()} → ${status.toUpperCase()}`,
        'fa-bolt', 'border-blue-500'
      );
      await api.refreshAllData();
      this.render();
    });

    // ── New Order Notification for Farmers ─────────────────────────
    signalRService.onNewFarmerOrder((orderId, productName, qtyKg) => {
      showToast(
        `🌾 New order! ${qtyKg}kg of ${productName} — check your dashboard`,
        'fa-basket-shopping', 'border-amber-500'
      );
      api.refreshAllData().then(() => this.render());
    });

    // ── Delivery Confirmed (escrow released) ──────────────────────
    signalRService.onDeliveryConfirmed((orderId, farmerCut, driverCut) => {
      const user = api.getCurrentUser();
      if (user?.role === 'farmer') {
        showToast(
          `💰 ${farmerCut.toLocaleString()} ETB released to your wallet!`,
          'fa-hand-holding-dollar', 'border-emerald-500'
        );
      } else if (user?.role === 'driver') {
        showToast(
          `💰 ${driverCut.toLocaleString()} ETB delivery fee credited!`,
          'fa-hand-holding-dollar', 'border-emerald-500'
        );
      }
      api.refreshAllData().then(() => this.render());
    });

    // ── Polling Fallback (when SignalR disconnects) ────────────────
    signalRService.setPollingCallback(async (_orderId: string) => {
      await api.refreshAllData();
      this.render();
    });

    // Auto-join farmer channel if logged in as farmer
    const currentUser = api.getCurrentUser();
    if (currentUser && currentUser.role === 'farmer') {
      // Farmer will receive real-time new order pings
    }

    // ── Live GPS / ETA updates ─────────────────────────────────────
    signalRService.onOrderTracking((event) => {
      // Update driver ETA badge on the orders list without a full re-render
      const etaEl = document.getElementById(`eta-${event.orderId}`);
      if (etaEl && event.estimatedArrivalMin != null && event.estimatedArrivalMin > 0) {
        etaEl.textContent = `~${event.estimatedArrivalMin} min`;
      }
    });

    // ── SignalR connection state badge ────────────────────────────
    const updateConnectionBadge = () => {
      const badge = document.getElementById('signalr-status-badge');
      if (!badge) return;
      const state = signalRService.getConnectionState();
      const configs: Record<string, { dot: string; label: string; cls: string }> = {
        connected: { dot: 'bg-emerald-500', label: 'Live', cls: 'bg-emerald-50 text-emerald-800 border-emerald-300' },
        reconnecting: { dot: 'bg-amber-400', label: 'Reconnecting', cls: 'bg-amber-50 text-amber-800 border-amber-300' },
        polling: { dot: 'bg-sky-400', label: 'Polling', cls: 'bg-sky-50 text-sky-800 border-sky-300' },
        disconnected: { dot: 'bg-slate-400', label: 'Offline', cls: 'bg-slate-50 text-slate-500 border-slate-200' },
      };
      const cfg = configs[state] || configs['disconnected'];
      badge.className = `flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${cfg.cls}`;
      badge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full ${cfg.dot} inline-block"></span> ${cfg.label}`;
    };

    // Poll the connection state every 3s to keep badge current
    setInterval(updateConnectionBadge, 3000);
    updateConnectionBadge();

    api.subscribe(() => {
      this.render();
    });

    // Initial fetch from PostgreSQL backend
    await api.refreshAllData();

    // Listen to hash changes for browser forward/back buttons and direct bookmark navigation
    window.addEventListener('hashchange', () => {
      this.restoreStateFromUrlOrStorage();
      this.render();
    });

    // Restore user active tab and subtab directly from URL Hash or localStorage
    this.restoreStateFromUrlOrStorage();

    this.render();
  }

  private syncUrlAndStorage() {
    try {
      localStorage.setItem('farmer_market_active_tab', this.activeTab);
      let sub = '';
      if (this.activeTab === 'superadmin') sub = this.activeSuperAdminTab;
      else if (this.activeTab === 'marketplace') sub = this.activeBuyerSubTab;
      else if (this.activeTab === 'farmer') sub = this.activeFarmerTab;
      else if (this.activeTab === 'admin') sub = this.activeAdminTab;
      else if (this.activeTab === 'account') sub = this.activeBuyerAccountTab;
      else if (this.activeTab === 'farmer-account') sub = this.activeFarmerAccountTab;
      else if (this.activeTab === 'agent') sub = this.agentView.getActiveTab();

      if (sub && sub !== 'marketplace' && sub !== 'users' && sub !== 'listings' && sub !== 'disputes' && sub !== 'register' && sub !== 'overview') {
        localStorage.setItem('farmer_market_active_subtab', sub);
        const hash = `#${this.activeTab}/${sub}`;
        if (window.location.hash !== hash) {
          history.replaceState(null, '', hash);
        }
      } else {
        localStorage.removeItem('farmer_market_active_subtab');
        const hash = `#${this.activeTab}`;
        if (window.location.hash !== hash) {
          history.replaceState(null, '', hash);
        }
      }
    } catch (e) {
      console.warn('Failed to sync URL and storage:', e);
    }
  }

  private restoreStateFromUrlOrStorage() {
    const rawHash = window.location.hash.replace(/^#\/?/, '').trim();
    let targetTab = '';
    let targetSubTab = '';

    if (rawHash) {
      const parts = rawHash.split('/');
      targetTab = parts[0];
      targetSubTab = parts[1] || '';
    } else {
      targetTab = localStorage.getItem('farmer_market_active_tab') || '';
      targetSubTab = localStorage.getItem('farmer_market_active_subtab') || '';
    }

    const u = api.getCurrentUser();
    const isAuth = api.isAuthenticated();

    // Map and validate target tab based on permissions
    const validTabs = ['marketplace', 'about', 'farmer', 'driver', 'admin', 'superadmin', 'agent', 'account', 'farmer-account'];
    if (targetTab && validTabs.includes(targetTab)) {
      if (targetTab === 'superadmin' && (!isAuth || u?.role !== 'superadmin')) {
        this.activeTab = isAuth ? (u?.role === 'farmer' ? 'farmer' : u?.role === 'driver' ? 'driver' : 'marketplace') : 'about';
      } else if (targetTab === 'farmer' && (!isAuth || (u?.role !== 'farmer' && u?.role !== 'superadmin'))) {
        this.activeTab = isAuth ? 'marketplace' : 'about';
      } else if (targetTab === 'driver' && (!isAuth || (u?.role !== 'driver' && u?.role !== 'superadmin'))) {
        this.activeTab = isAuth ? 'marketplace' : 'about';
      } else if (targetTab === 'admin' && (!isAuth || (u?.role !== 'admin' && u?.role !== 'superadmin'))) {
        this.activeTab = isAuth ? 'marketplace' : 'about';
      } else if (targetTab === 'agent' && (!isAuth || (u?.role !== 'agent' && u?.role !== 'superadmin'))) {
        this.activeTab = isAuth ? 'marketplace' : 'about';
      } else {
        this.activeTab = targetTab;
      }
    } else {
      if (u) {
        if (u.role === 'superadmin') this.activeTab = 'superadmin';
        else if (u.role === 'farmer') this.activeTab = 'farmer';
        else if (u.role === 'driver') this.activeTab = 'driver';
        else if (u.role === 'admin') this.activeTab = 'admin';
        else if (u.role === 'agent') this.activeTab = 'agent';
        else this.activeTab = 'marketplace';
      } else {
        this.activeTab = 'about';
      }
    }

    // Restore subtabs if valid
    if (targetSubTab) {
      if (this.activeTab === 'superadmin') {
        const validSub: SuperAdminTab[] = ['users', 'banners', 'moderation', 'permissions', 'config', 'financials', 'audit', 'zones', 'feature_flags', 'emergency', 'rules', 'db_ops'];
        if (validSub.includes(targetSubTab as SuperAdminTab)) {
          this.activeSuperAdminTab = targetSubTab as SuperAdminTab;
        }
      } else if (this.activeTab === 'marketplace') {
        if (['marketplace', 'orders', 'standing_orders'].includes(targetSubTab)) {
          this.activeBuyerSubTab = targetSubTab as any;
        }
      } else if (this.activeTab === 'farmer') {
        if (['listings', 'wallet', 'sms'].includes(targetSubTab)) {
          this.activeFarmerTab = targetSubTab as any;
        }
      } else if (this.activeTab === 'admin') {
        if (['disputes', 'anomalies', 'kyc', 'tax_compliance', 'analytics', 'sms'].includes(targetSubTab)) {
          this.activeAdminTab = targetSubTab as any;
        }
      } else if (this.activeTab === 'account') {
        this.activeBuyerAccountTab = targetSubTab as BuyerAccountTab;
      } else if (this.activeTab === 'farmer-account') {
        this.activeFarmerAccountTab = targetSubTab as FarmerAccountTab;
      } else if (this.activeTab === 'agent') {
        if (['register', 'roster', 'ussd_sim'].includes(targetSubTab)) {
          this.agentView.switchTab(targetSubTab as any);
        }
      }
    }

    if (this.activeTab === 'superadmin') {
      api.fetchSuperAdminData().catch(err => console.warn('Failed to refresh superadmin data on restore:', err));
    }

    this.syncUrlAndStorage();
  }

  public render() {
    const appEl = document.getElementById('app');
    if (!appEl) return;

    const currentUser = api.getCurrentUser();
    const isAuthenticated = api.isAuthenticated();
    const notifications = api.getNotifications();
    const unreadCount = notifications.filter(n => !n.read).length;

    // Update document modal language
    documentModal.setLanguage(this.lang);

    // Filter produce with advanced criteria (Grade, Ripeness, Proximity, Advance Harvests)
    const listings = api.getListings(
      this.activeCategory,
      this.selectedRegion,
      this.searchQuery,
      this.maxDistanceKm > 0 ? this.maxDistanceKm : undefined,
      this.activeGrade,
      this.activeRipeness,
      this.organicOnly,
      this.advanceOnly
    );

    let viewHtml = '';
    if (this.activeTab === 'farmer-account' && isAuthenticated && (currentUser?.role === 'farmer' || currentUser?.role === 'superadmin')) {
      viewHtml = renderFarmerAccountView(this.lang, currentUser, api.getListings().filter(listing => listing.farmerId === currentUser.id), api.getOrders('farmer'), this.activeFarmerAccountTab, this.isCreateListingModalOpen, api.getPriceBenchmarks());
    } else if (this.activeTab === 'farmer' && isAuthenticated && (currentUser?.role === 'farmer' || currentUser?.role === 'superadmin')) {
      const farmerListings = api.getListings().filter(l => l.farmerId === currentUser.id);
      const farmerOrders = api.getOrders('farmer');
      const summary = api.getFarmerSummary();
      viewHtml = renderFarmerView(
        this.lang,
        farmerListings.length ? farmerListings : api.getListings().slice(0, 3),
        farmerOrders,
        summary,
        this.isCreateListingModalOpen,
        this.activeFarmerTab,
        api.getPriceBenchmarks(),
        currentUser
      );
    } else if (this.activeTab === 'driver' && isAuthenticated && (currentUser?.role === 'driver' || currentUser?.role === 'superadmin')) {
      const driverOrders = api.getOrders('driver');
      const summary = api.getDriverSummary();
      viewHtml = renderDriverView(
        this.lang,
        driverOrders,
        summary,
        api.getOptimizedRoute(),
        currentUser,
        api.getIsOfflineMode(),
        api.getOfflineQueue().length
      );
    } else if (this.activeTab === 'superadmin' || (isAuthenticated && currentUser?.role === 'superadmin' && this.activeTab === 'superadmin')) {
      viewHtml = renderSuperAdminView(
        this.lang,
        this.activeSuperAdminTab,
        this.superAdminUserRoleFilter,
        this.superAdminAuditCategoryFilter,
        this.selectedRbacRole,
        this.superAdminFinancialSubTab,
        this.superAdminPayoutStatusFilter,
        this.superAdminPayoutRoleFilter,
        this.superAdminPayoutRiskFilter,
        this.superAdminPayoutSearchQuery,
        this.selectedPayoutIds
      );
    } else if (this.activeTab === 'admin' && isAuthenticated && (currentUser?.role === 'admin' || currentUser?.role === 'superadmin')) {
      const stats = api.getPlatformStats();
      const disputedOrders = api.getOrders().filter(o => o.status === 'disputed' && !o.disputeStatus?.startsWith('Resolved'));
      viewHtml = renderAdminView(
        this.lang,
        stats,
        disputedOrders,
        api.getAnomalyAlerts(),
        api.getKycQueue(),
        api.getRegionalAnalytics(),
        this.activeAdminTab
      );
    } else if (this.activeTab === 'agent' || (isAuthenticated && (currentUser?.role === 'agent' || currentUser?.role === 'superadmin') && this.activeTab === 'agent')) {
      this.agentView.setLanguage(this.lang);
      viewHtml = this.agentView.render();
    } else if (this.activeTab === 'account' && isAuthenticated && (currentUser?.role === 'buyer' || currentUser?.role === 'superadmin')) {
      viewHtml = renderBuyerAccountView(this.lang, currentUser, api.getOrders('buyer'), this.activeBuyerAccountTab, api.getAccountData());
    } else if (this.activeTab === 'about') {
      viewHtml = renderAboutDashboardView(this.lang);
    } else {
      // Default Wholesale Produce Marketplace (for Buyers or Logged Out Guests)
      const buyerOrders = api.getOrders('buyer');
      viewHtml = renderBuyerView(
        this.lang,
        listings,
        this.activeCategory,
        this.selectedRegion,
        this.searchQuery,
        this.cart,
        this.isCartOpen,
        this.activeOrderModal,
        this.activeTelebirrModal,
        this.activeDisputeModal,
        this.maxDistanceKm,
        this.activeGrade,
        this.activeRipeness,
        this.organicOnly,
        this.advanceOnly,
        this.activeBuyerSubTab,
        api.getStandingOrders(),
        buyerOrders
      );
    }

    appEl.innerHTML = `
      ${api.isImpersonating() ? `
        <div class="bg-gradient-to-r from-rose-700 via-rose-600 to-slate-900 text-white py-2.5 px-4 sm:px-8 text-xs font-bold shadow-lg flex items-center justify-between z-50 sticky top-0 border-b border-rose-500 animate-fadeIn">
          <div class="flex items-center gap-2.5">
            <span class="px-2 py-0.5 rounded bg-white/20 text-white text-[10px] font-black tracking-wider uppercase">SUPER ADMIN IMPERSONATION</span>
            <i class="fa-solid fa-user-secret text-rose-200"></i>
            <span>
              ${this.lang === 'am'
          ? `በአሁኑ ወቅት በ<strong>${currentUser?.name}</strong> (${currentUser?.role.toUpperCase()}) ስም ገብተዋል። ሁሉም ክዋኔዎች በSuper Admin ኦዲት ይመዘገባሉ።`
          : `Active Impersonation: Logged in as <strong>${currentUser?.name}</strong> (${currentUser?.role.toUpperCase()}). All actions are logged.`}
            </span>
          </div>
          <button onclick="window.stopSuperAdminImpersonation()" class="px-3.5 py-1.5 bg-white text-rose-800 hover:bg-rose-50 rounded-xl text-xs font-black transition-all cursor-pointer shadow-md flex items-center gap-1.5">
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
            <span>${this.lang === 'am' ? 'ከተጠቃሚው ውጣ' : 'Exit Impersonation'}</span>
          </button>
        </div>
      ` : ''}

      ${renderNavbar(this.lang, currentUser, isAuthenticated, this.activeTab, this.cart, unreadCount, this.searchQuery)}
      
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex-1 w-full">
        ${viewHtml}
      </main>

      <!-- Professional E-Commerce Footer -->
      <footer class="bg-slate-950 text-slate-400 border-t border-slate-800 mt-20 pt-12 pb-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          <div class="space-y-3">
            <div class="flex items-center gap-2 text-white font-extrabold text-lg">
              <div class="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-sm">
                <i class="fa-solid fa-wheat-awn"></i>
              </div>
              <span>Farmer-to-Market</span>
            </div>
            <p class="text-xs text-slate-400 leading-relaxed">
              Ethiopia's leading bilingual B2B produce exchange. Directly linking 15M+ smallholder farmers with wholesale buyers, hotels, and supermarkets with full Ethiopian tax and contract compliance.
            </p>
            <div class="flex items-center gap-2 pt-2">
              <span class="telebirr-badge text-[10px]"><i class="fa-solid fa-bolt"></i> Telebirr Escrow Certified</span>
            </div>
          </div>

          <div class="space-y-2 text-xs">
            <h4 class="font-bold text-white text-sm">Produce Categories</h4>
            <ul class="space-y-1.5 text-slate-400">
              <li><a href="javascript:void(0)" onclick="window.setCategory('Vegetables'); window.navigateTab('marketplace')" class="hover:text-emerald-400 transition-colors">Fresh Vegetables (ቲማቲም፣ ሽንኩርት)</a></li>
              <li><a href="javascript:void(0)" onclick="window.setCategory('Grains'); window.navigateTab('marketplace')" class="hover:text-emerald-400 transition-colors">Magna Teff & Grains (የማኛ ጤፍ)</a></li>
              <li><a href="javascript:void(0)" onclick="window.setCategory('Coffee'); window.navigateTab('marketplace')" class="hover:text-emerald-400 transition-colors">Specialty Coffee (ይርጋጨፌ ቡና)</a></li>
              <li><a href="javascript:void(0)" onclick="window.setCategory('Fruits'); window.navigateTab('marketplace')" class="hover:text-emerald-400 transition-colors">Organic Hass Avocados (አቮካዶ)</a></li>
            </ul>
          </div>

          <div class="space-y-2 text-xs">
            <h4 class="font-bold text-white text-sm">Legal & Fiscal Compliance</h4>
            <ul class="space-y-1.5 text-slate-400">
              <li><span class="text-slate-300">${api.getPlatformConfig().farmerSharePercent}% Direct Farmer Payout (Tax-Exempt Produce)</span></li>
              <li><span class="text-slate-300">${api.getPlatformConfig().driverSharePercent}% Transport Logistics with Official FTA Waybills</span></li>
              <li><span class="text-slate-300">${api.getPlatformConfig().vatOnCommissionPercent}% VAT on Platform Service Remitted to MOR</span></li>
              <li><span class="text-slate-300">${api.getPlatformConfig().withholdingTaxPercent}% Withholding Declaration Compliance (Proclamation 979)</span></li>
              <li><span class="text-slate-300">EABC Binding Escrow Dispute Arbitration</span></li>
            </ul>
          </div>

          <div class="space-y-2 text-xs">
            <h4 class="font-bold text-white text-sm">Contact & Support</h4>
            <p class="text-slate-400"><i class="fa-solid fa-location-dot mr-1.5 text-emerald-500"></i> Bole Sub-City, Addis Ababa, Ethiopia</p>
            <p class="text-slate-400"><i class="fa-solid fa-phone mr-1.5 text-emerald-500"></i> +251 911 223 344</p>
            <p class="text-slate-400"><i class="fa-solid fa-envelope mr-1.5 text-emerald-500"></i> support@farmermarket.et</p>
          </div>

        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Farmer-to-Market Ltd. (Ethiopia). All rights reserved.</p>
          <div class="flex items-center gap-4 text-slate-400">
            <span>Powered by .NET 9 Clean Architecture + Vite + PostgreSQL PostGIS + Telebirr Escrow</span>
          </div>
        </div>
      </footer>

      <!-- Authentication Modal -->
      ${this.isAuthModalOpen ? renderAuthModal(
            this.lang,
            this.authMode,
            this.otpStep,
            this.pendingPhone,
            this.lastSentCode,
            this.matchedUserName,
            this.matchedUserRole,
            this.authErrorMessage,
            this.matchedUserEmail
          ) : ''}
      
      <!-- Notifications Modal -->
      ${this.isNotificationsModalOpen && api.isAuthenticated() ? renderNotificationsModal(this.lang, notifications) : ''}

      <!-- Verification Wizard Modal Container -->
      <div id="verificationWizardModal"></div>

      <!-- Produce Post & Farm Details Modal -->
      ${(() => {
        if (!this.activeProduceModalId) return '';
        const activeListing = api.getListingById(this.activeProduceModalId);
        if (!activeListing) return '';
        produceDetailModal.setLanguage(this.lang);
        produceDetailModal.setActivePhotoIndex(this.activeProducePhotoIndex);
        produceDetailModal.setSelectedQtyKg(this.produceOrderQty);
        return produceDetailModal.render(activeListing);
      })()}

      <!-- Official Legal Document Viewer Modal -->
      ${this.activeLegalDocModal?.isOpen ? `
        <div class="modal-backdrop" onclick="if(event.target === this) window.closeLegalDocModal()">
          <div class="modal-content legal-doc-modal p-6 sm:p-8 space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-slate-200">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-stamp text-emerald-600 text-lg"></i>
                <span class="font-extrabold text-sm text-slate-900 uppercase">
                  ${this.activeLegalDocModal.type.toUpperCase()} · OFFICIAL DOCUMENT
                </span>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="window.printOfficialDocument()" class="btn-primary text-xs py-1.5 px-3 cursor-pointer">
                  <i class="fa-solid fa-print mr-1"></i> Print / PDF
                </button>
                <button onclick="window.closeLegalDocModal()" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>

            <div class="max-h-[75vh] overflow-y-auto pr-1">
              ${this.activeLegalDocModal.type === 'invoice' ? documentModal.renderInvoice(api.getTaxInvoice(this.activeLegalDocModal.orderId)) :
          this.activeLegalDocModal.type === 'waybill' ? documentModal.renderWaybill(api.getTransportWaybill(this.activeLegalDocModal.orderId)) :
            this.activeLegalDocModal.type === 'contract' ? documentModal.renderContract(api.getLegalContract(this.activeLegalDocModal.orderId)) :
              documentModal.renderArbitration(api.getDisputeMediationRecord(this.activeLegalDocModal.orderId))}
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Rate & Review Modal -->
      ${this.activeRateModal?.isOpen ? renderRateReviewModal(
                this.lang,
                api.getOrders().find(o => o.id === this.activeRateModal?.orderId),
                this.activeRateModal
              ) : ''}

      <!-- Super Admin Governance Modals -->
      ${renderSuperAdminModals(
                this.lang,
                this.isSuperAdminCreateUserModalOpen,
                this.isSuperAdminEditUserModalOpen,
                this.editTargetUserId,
                this.isSuperAdminAddZoneModalOpen,
                this.isSuperAdminAddBlacklistModalOpen,
                this.isSuperAdminBannerModalOpen,
                this.editTargetBannerId,
                this.isListingEditModalOpen,
                this.editTargetListingId,
                this.isSuperAdminRejectModalOpen,
                this.rejectTargetPayoutId,
                this.isSuperAdminSimulatePayoutModalOpen,
                this.isSuperAdminPayoutDetailModalOpen,
                this.detailTargetPayoutId
              )}
    `;
  }

  private attachGlobalWindowHandlers() {
    const w = window as any;

    // Real-time RBAC cross-tab and cross-window sync listener
    window.addEventListener('storage', (e) => {
      if (e.key === 'farmerMarketRolePermissions') {
        api.reloadRolePermissionsFromStorage();
        this.render();
      }
    });

    // Produce Post Detail Modal Handlers
    w.openProduceDetail = (id: string) => {
      this.activeProduceModalId = id;
      this.activeProducePhotoIndex = 0;
      const item = api.getListingById(id);
      this.produceOrderQty = item?.minOrderKg || 50;
      this.render();
    };

    w.closeProduceDetail = () => {
      this.activeProduceModalId = null;
      this.render();
    };

    w.selectProducePhoto = (index: number) => {
      this.activeProducePhotoIndex = index;
      this.render();
    };

    w.setProduceOrderQty = (qty: number) => {
      this.produceOrderQty = Math.max(1, qty);
      this.render();
    };

    w.addProduceDetailToCart = (id: string, qty?: number) => {
      const item = api.getListingById(id);
      if (!item) return;
      const finalQty = qty || this.produceOrderQty || item.minOrderKg || 50;
      const existing = this.cart.find(c => c.listing.id === id);
      if (existing) {
        existing.qtyKg += finalQty;
      } else {
        this.cart.push({ listing: item, qtyKg: finalQty });
      }
      this.saveCartToStorage();
      this.activeProduceModalId = null;
      this.isCartOpen = true;
      showToast(this.lang === 'am' ? `${finalQty} ኪ.ግ ${item.nameAm || item.productName} ወደ ጋሪ ተጨምሯል` : `Added ${finalQty} kg of ${item.productName} to bulk cart!`, 'fa-cart-plus');
      this.render();
    };

    w.buyProduceNow = (id: string, qty: number) => {
      const item = api.getListingById(id);
      if (!item) return;
      if (!api.isAuthenticated()) {
        w.openAuthModal('login');
        return;
      }
      this.activeProduceModalId = null;
      const finalQty = qty || this.produceOrderQty || item.minOrderKg || 50;
      const totalEtb = finalQty * item.pricePerKg;
      this.activeTelebirrModal = { isOpen: true, totalEtb, listingId: id, qtyKg: finalQty };
      this.render();
    };

    w.shareProduceListing = (id: string) => {
      const item = api.getListingById(id);
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
      }
      showToast(`Copied direct produce link for ${item?.productName || 'listing'}!`, 'fa-share-nodes', 'border-blue-500');
    };

    w.playSimulatedVoiceNote = (id: string) => {
      const icon = document.getElementById('voicePlayIcon-' + id);
      const text = document.getElementById('voicePlayText-' + id);
      if (icon && text) {
        icon.className = 'fa-solid fa-spinner fa-spin text-[10px]';
        text.innerText = 'Playing Memo...';
        setTimeout(() => {
          icon.className = 'fa-solid fa-check text-[10px]';
          text.innerText = 'Memo Played';
          setTimeout(() => {
            icon.className = 'fa-solid fa-play text-[10px]';
            text.innerText = 'Play Voice Memo';
          }, 2500);
        }, 1800);
      }
      showToast('Playing farmer voice note recorded in Bishoftu farm hub.', 'fa-volume-high', 'border-emerald-500');
    };

    w.sendSmsInquiry = (phone: string, productName: string) => {
      showToast(`Dispatched SMS inquiry for ${productName} to ${phone}`, 'fa-paper-plane', 'border-emerald-500');
    };

    w.navigateTab = (tab: string) => {
      this.activeTab = tab;
      if (tab === 'superadmin') {
        api.fetchSuperAdminData().then(() => this.render()).catch(err => console.warn('Failed to refresh superadmin data:', err));
      }
      this.syncUrlAndStorage();
      this.render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    w.setSearchQuery = (query: string) => {
      this.searchQuery = query;
      if (this.activeTab === 'about' && query && query.trim().length > 0) {
        this.activeTab = 'marketplace';
        this.syncUrlAndStorage();
      }
      this.render();
    };

    w.executeAboutSearch = (query: string) => {
      this.searchQuery = query || '';
      this.activeTab = 'marketplace';
      this.syncUrlAndStorage();
      this.render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    w.setBuyerAccountTab = (tab: BuyerAccountTab) => {
      this.activeBuyerAccountTab = tab;
      this.activeTab = 'account';
      this.syncUrlAndStorage();
      api.fetchAccountData().then(() => this.render()).catch((error: any) => showToast(error.message || 'Could not load account data.', 'fa-circle-xmark', 'border-rose-500'));
      this.render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    w.setFarmerAccountTab = (tab: FarmerAccountTab) => {
      this.activeFarmerAccountTab = tab;
      this.activeTab = 'farmer-account';
      this.syncUrlAndStorage();
      this.render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    w.deleteFarmerListing = async (id: string) => {
      if (!window.confirm('Delete this produce post? It will no longer be available for new orders.')) return;
      try {
        await api.deleteListing(id);
        showToast('Produce post deleted.', 'fa-trash');
        this.render();
      } catch (error: any) {
        showToast(error.message || 'Could not delete the produce post.', 'fa-circle-xmark', 'border-rose-500');
      }
    };

    w.changeFarmerPassword = async () => {
      const form = document.querySelector<HTMLFormElement>('.account-form');
      if (!form) return;
      const values = new FormData(form);
      try {
        await api.changePassword(String(values.get('currentPassword') || ''), String(values.get('newPassword') || ''));
        showToast('Password changed successfully.', 'fa-shield-check');
        form.reset();
      } catch (error: any) {
        showToast(error.message || 'Could not change your password.', 'fa-circle-xmark', 'border-rose-500');
      }
    };

    w.saveFarmerProfile = async () => {
      const form = document.querySelector<HTMLFormElement>('.account-form');
      if (!form) return;
      const values = new FormData(form);
      try {
        await api.updateProfile({
          name: String(values.get('name') || ''),
          nameAm: String(values.get('nameAm') || ''),
          region: String(values.get('region') || ''),
          email: String(values.get('email') || ''),
          languagePreference: String(values.get('languagePreference') || ''),
          savedDeliveryAddress: String(values.get('savedDeliveryAddress') || ''),
          defaultDeliveryLat: form.dataset.defaultLat ? Number(form.dataset.defaultLat) : undefined,
          defaultDeliveryLng: form.dataset.defaultLng ? Number(form.dataset.defaultLng) : undefined
        });
        showToast('Farmer profile saved to your account.', 'fa-circle-check');
        this.render();
      } catch (error: any) {
        showToast(error.message || 'Could not save farmer profile.', 'fa-circle-xmark', 'border-rose-500');
      }
    };

    w.captureFarmerLocation = () => {
      if (!navigator.geolocation) {
        showToast('Location is not available in this browser.', 'fa-location-dot', 'border-rose-500');
        return;
      }
      navigator.geolocation.getCurrentPosition(position => {
        const form = document.querySelector<HTMLFormElement>('.account-form');
        if (form) {
          form.dataset.defaultLat = String(position.coords.latitude);
          form.dataset.defaultLng = String(position.coords.longitude);
        }
        showToast('Farm location captured. Save profile to persist it.', 'fa-location-crosshairs');
      }, () => showToast('Location permission was not granted.', 'fa-location-dot', 'border-rose-500'));
    };

    w.showAccountToast = (message: string, icon: string = 'fa-circle-check') => {
      showToast(message, icon, 'border-emerald-500');
    };

    w.saveBuyerProfile = async () => {
      const form = document.querySelector<HTMLFormElement>('.account-form');
      if (!form) return;
      const values = new FormData(form);
      try {
        await api.updateProfile({
          name: String(values.get('name') || ''),
          nameAm: String(values.get('nameAm') || ''),
          region: String(values.get('region') || ''),
          email: String(values.get('email') || ''),
          languagePreference: String(values.get('languagePreference') || ''),
          savedDeliveryAddress: String(values.get('savedDeliveryAddress') || ''),
          defaultDeliveryLat: form.dataset.defaultLat ? Number(form.dataset.defaultLat) : undefined,
          defaultDeliveryLng: form.dataset.defaultLng ? Number(form.dataset.defaultLng) : undefined
        });
        showToast('Profile changes saved to your account.', 'fa-circle-check');
        this.render();
      } catch (error: any) {
        showToast(error.message || 'Could not save your profile.', 'fa-circle-xmark', 'border-rose-500');
      }
    };

    w.captureBuyerLocation = () => {
      if (!navigator.geolocation) {
        showToast('Location is not available in this browser.', 'fa-location-dot', 'border-rose-500');
        return;
      }
      navigator.geolocation.getCurrentPosition(position => {
        const form = document.querySelector<HTMLFormElement>('.account-form');
        if (form) form.dataset.defaultLat = String(position.coords.latitude);
        if (form) form.dataset.defaultLng = String(position.coords.longitude);
        showToast('Location captured. Save changes to persist it.', 'fa-location-crosshairs');
      }, () => showToast('Location permission was not granted.', 'fa-location-dot', 'border-rose-500'));
    };

    w.changeBuyerPassword = async () => {
      const form = document.querySelector<HTMLFormElement>('.account-form');
      if (!form) return;
      const values = new FormData(form);
      try {
        await api.changePassword(String(values.get('currentPassword') || ''), String(values.get('newPassword') || ''));
        showToast('Password changed successfully.', 'fa-shield-check');
        form.reset();
      } catch (error: any) {
        showToast(error.message || 'Could not change your password.', 'fa-circle-xmark', 'border-rose-500');
      }
    };

    const accountAction = async (action: () => Promise<void>, success: string) => {
      try { await action(); showToast(success, 'fa-circle-check'); this.render(); }
      catch (error: any) { showToast(error.message || 'Account action failed.', 'fa-circle-xmark', 'border-rose-500'); }
    };
    w.addBuyerAddress = () => {
      const form = document.querySelector<HTMLFormElement>('.account-form'); if (!form) return;
      const values = new FormData(form);
      accountAction(() => api.saveAddress({ name: String(values.get('name') || ''), phone: String(values.get('phone') || ''), street: String(values.get('street') || ''), city: String(values.get('city') || ''), region: String(values.get('region') || ''), postalCode: String(values.get('postalCode') || '') || null, country: String(values.get('country') || 'Ethiopia'), isDefaultShipping: values.has('isDefaultShipping'), isDefaultBilling: false }), 'Address added.');
    };
    w.deleteBuyerAddress = (id: string) => accountAction(() => api.deleteAddress(id), 'Address deleted.');
    w.addBuyerPayment = () => {
      const form = document.querySelector<HTMLFormElement>('.account-form'); if (!form) return;
      const values = new FormData(form);
      accountAction(() => api.addPaymentMethod({ provider: String(values.get('provider') || ''), providerToken: String(values.get('providerToken') || ''), maskedDisplay: String(values.get('maskedDisplay') || ''), brand: String(values.get('brand') || '') || null, expiryMonth: Number(values.get('expiryMonth')) || null, expiryYear: Number(values.get('expiryYear')) || null, isPrimary: values.has('isPrimary') }), 'Payment method linked.');
    };
    w.setPrimaryBuyerPayment = (id: string) => accountAction(() => api.setPrimaryPaymentMethod(id), 'Primary payment method updated.');
    w.deleteBuyerPayment = (id: string) => accountAction(() => api.deletePaymentMethod(id), 'Payment method removed.');
    w.submitBuyerDispute = (orderId: string) => {
      const reason = window.prompt('Reason: Item not received, Damaged, Wrong item, or Quality issue');
      if (!reason) return;
      accountAction(() => api.disputeOrder(orderId, reason, undefined, 100), 'Dispute submitted for review.');
    };

    w.revokeBuyerSessions = async () => {
      try {
        await api.revokeOtherSessions();
        showToast('Other sessions have been revoked.', 'fa-shield-check');
        this.render();
      } catch (error: any) {
        showToast(error.message || 'Could not revoke sessions.', 'fa-circle-xmark', 'border-rose-500');
      }
    };

    w.toggleLanguage = () => {
      this.lang = this.lang === 'en' ? 'am' : 'en';
      localStorage.setItem('lang', this.lang);
      showToast(this.lang === 'am' ? 'ቋንቋ ወደ አማርኛ ተቀይሯል' : 'Language switched to English', 'fa-globe');
      this.render();
    };

    // Sub-Tab Switchers
    w.setBuyerSubTab = (tab: 'marketplace' | 'orders' | 'standing_orders') => {
      this.activeBuyerSubTab = tab;
      this.syncUrlAndStorage();
      this.render();
    };

    w.toggleFarmerTab = (tab: 'listings' | 'wallet' | 'sms') => {
      this.activeFarmerTab = tab;
      this.syncUrlAndStorage();
      this.render();
    };

    w.setAdminTab = (tab: 'disputes' | 'anomalies' | 'kyc' | 'tax_compliance' | 'analytics' | 'sms') => {
      this.activeAdminTab = tab;
      this.syncUrlAndStorage();
      this.render();
    };

    // Legal Document Modal Openers
    w.openInvoiceModal = (orderId: string) => {
      this.activeLegalDocModal = { isOpen: true, type: 'invoice', orderId };
      this.render();
    };

    w.openContractModal = (orderId: string) => {
      this.activeLegalDocModal = { isOpen: true, type: 'contract', orderId };
      this.render();
    };

    w.openWaybillModal = (orderId: string) => {
      this.activeLegalDocModal = { isOpen: true, type: 'waybill', orderId };
      this.render();
    };

    w.openArbitrationModal = (orderId: string) => {
      this.activeLegalDocModal = { isOpen: true, type: 'arbitration', orderId };
      this.render();
    };

    w.closeLegalDocModal = () => {
      this.activeLegalDocModal = null;
      this.render();
    };

    w.printOfficialDocument = () => {
      window.print();
    };

    // Advanced Filters
    w.setMaxDistanceKm = (km: number) => {
      this.maxDistanceKm = km;
      showToast(km === 0 ? 'Showing all produce across Ethiopia' : `Filtering farms within ${km} km radius`, 'fa-location-dot');
      this.render();
    };

    w.setFilterGrade = (grade: string) => {
      this.activeGrade = grade;
      this.render();
    };

    w.setFilterRipeness = (ripeness: string) => {
      this.activeRipeness = ripeness;
      this.render();
    };

    w.toggleOrganicFilter = (checked: boolean) => {
      this.organicOnly = checked;
      this.render();
    };

    w.toggleAdvanceFilter = (checked: boolean) => {
      this.advanceOnly = checked;
      this.render();
    };

    w.setCategory = (cat: string) => {
      this.activeCategory = cat;
      this.render();
    };

    w.resetFilters = () => {
      this.activeCategory = 'All';
      this.selectedRegion = 'All';
      this.searchQuery = '';
      this.maxDistanceKm = 0;
      this.activeGrade = 'All';
      this.activeRipeness = 'All';
      this.organicOnly = false;
      this.advanceOnly = false;
      this.render();
    };

    // Farmer Create Listing Modal & Submission Handlers
    w.toggleCreateListingModal = () => {
      this.isCreateListingModalOpen = !this.isCreateListingModalOpen;
      this.render();
    };

    w.handleCreateListingSubmit = async (e: Event) => {
      e.preventDefault();
      const prodName = (document.getElementById('newProdName') as HTMLInputElement)?.value;
      const prodNameAm = (document.getElementById('newProdNameAm') as HTMLInputElement)?.value;
      const category = (document.getElementById('newCategory') as HTMLSelectElement)?.value || 'Vegetables';
      const qtyKg = Number((document.getElementById('newQtyKg') as HTMLInputElement)?.value || 1000);
      const pricePerKg = Number((document.getElementById('newPricePerKg') as HTMLInputElement)?.value || 45);
      const minOrderKg = Number((document.getElementById('newMinOrderKg') as HTMLInputElement)?.value || 50);
      const grade = (document.getElementById('newGrade') as HTMLSelectElement)?.value || 'Grade 1';
      const ripeness = (document.getElementById('newRipeness') as HTMLSelectElement)?.value || 'Ready Today';
      const isAdvance = (document.getElementById('newIsAdvanceHarvest') as HTMLInputElement)?.checked || false;
      const expectedHarvest = (document.getElementById('newExpectedHarvestDate') as HTMLInputElement)?.value || undefined;
      const voiceTranscript = (document.getElementById('voiceTranscriptText') as HTMLElement)?.innerText?.replace(/^"|"$/g, '') || undefined;
      const requiresColdChain = (document.getElementById('newRequiresColdChain') as HTMLInputElement)?.checked || false;
      const isAggregatedLot = (document.getElementById('newIsAggregatedLot') as HTMLInputElement)?.checked || false;
      const cooperativeName = (document.getElementById('newCooperativeName') as HTMLInputElement)?.value || undefined;

      const user = api.getCurrentUser();
      const newListing = await api.createListing({
        productName: prodName,
        nameAm: prodNameAm || undefined,
        category,
        qtyKg,
        pricePerKg,
        minOrderKg,
        grade,
        ripeness,
        isAdvanceHarvest: isAdvance,
        expectedHarvestDate: expectedHarvest,
        voiceNoteTranscript: voiceTranscript,
        requiresColdChain,
        isAggregatedLot,
        cooperativeName: isAggregatedLot ? (cooperativeName || 'Bishoftu Farmers Cooperative Union') : undefined,
        farmerId: user?.id,
        farmerName: user?.name,
        farmerNameAm: user?.nameAm,
        farmerPhone: user?.phone,
        region: user?.region
      });

      this.isCreateListingModalOpen = false;
      confetti({ particleCount: 90, spread: 60, origin: { y: 0.6 } });
      showToast(this.lang === 'am' ? 'አዲስ ምርት በተሳካ ሁኔታ ተመዝግቧል!' : `Published ${newListing.productName} successfully!`, 'fa-circle-check');
      this.render();
    };

    w.checkFairPriceForNewListing = async () => {
      const prodName = (document.getElementById('newProdName') as HTMLInputElement)?.value || 'Tomatoes';
      const category = (document.getElementById('newCategory') as HTMLSelectElement)?.value || 'Vegetables';
      const grade = (document.getElementById('newGrade') as HTMLSelectElement)?.value || 'Grade 1';
      const qtyKg = Number((document.getElementById('newQtyKg') as HTMLInputElement)?.value || 500);
      const requiresColdChain = (document.getElementById('newRequiresColdChain') as HTMLInputElement)?.checked || false;
      const user = api.getCurrentUser();

      try {
        const rec = await api.getFairPriceRecommendation({
          commodityName: prodName,
          category,
          region: user?.region || 'Oromia',
          grade,
          qtyKg,
          requiresColdChain
        });

        const priceInput = document.getElementById('newPricePerKg') as HTMLInputElement;
        if (priceInput) {
          priceInput.value = rec.recommendedFairPriceEtb.toString();
        }

        showToast(`AI Fair Price Applied: ETB ${rec.recommendedFairPriceEtb}/kg (ECX Benchmarked)`, 'fa-wand-magic-sparkles', 'border-amber-500');
      } catch (err) {
        showToast('Using local standard benchmark rate', 'fa-info-circle', 'border-blue-500');
      }
    };

    // Voice Note Listing Creation Simulation
    w.handleVoiceRecordToggle = () => {
      const btn = document.getElementById('voiceRecordBtn');
      const label = document.getElementById('voiceRecordLabel');
      const wave = document.getElementById('voiceWaveAnimation');
      const result = document.getElementById('voiceTranscriptionResult');
      const transcript = document.getElementById('voiceTranscriptText');

      if (!this.isRecordingVoice) {
        this.isRecordingVoice = true;
        if (label) label.innerText = 'Stop & Transcribe (አቁም)';
        if (btn) {
          btn.classList.remove('bg-emerald-600');
          btn.classList.add('bg-red-600');
        }
        if (wave) wave.classList.remove('hidden');
        if (result) result.classList.add('hidden');

        showToast('Voice Recording in progress... Speak produce details.', 'fa-microphone', 'border-amber-500');

        this.voiceRecordTimer = setTimeout(() => {
          if (this.isRecordingVoice) {
            w.finishVoiceTranscription('am');
          }
        }, 3500);
      } else {
        clearTimeout(this.voiceRecordTimer);
        w.finishVoiceTranscription('am');
      }
    };

    w.finishVoiceTranscription = (spokenLang: 'am' | 'om' | 'en') => {
      this.isRecordingVoice = false;
      const label = document.getElementById('voiceRecordLabel');
      const wave = document.getElementById('voiceWaveAnimation');
      const result = document.getElementById('voiceTranscriptionResult');
      const transcript = document.getElementById('voiceTranscriptText');

      if (label) label.innerText = 'Record Voice Note (ድምጽ ቅጂ)';
      if (wave) wave.classList.add('hidden');

      const parsed = api.simulateVoiceTranscription(4, spokenLang);
      const nameInput = document.getElementById('newProdName') as HTMLInputElement;
      const nameAmInput = document.getElementById('newProdNameAm') as HTMLInputElement;
      const catInput = document.getElementById('newCategory') as HTMLSelectElement;
      const qtyInput = document.getElementById('newQtyKg') as HTMLInputElement;
      const priceInput = document.getElementById('newPricePerKg') as HTMLInputElement;

      if (nameInput) nameInput.value = parsed.productName;
      if (nameAmInput) nameAmInput.value = parsed.nameAm;
      if (catInput) catInput.value = parsed.category;
      if (qtyInput) qtyInput.value = parsed.qtyKg.toString();
      if (priceInput) priceInput.value = parsed.pricePerKg.toString();

      if (result && transcript) {
        transcript.innerText = `"${parsed.transcript}"`;
        result.classList.remove('hidden');
      }

      confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
      showToast(`Voice Note Transcribed! Form auto-filled in Amharic.`, 'fa-wand-magic-sparkles');
    };

    // SMS Fallback Simulator
    w.handleSimulateSms = async (e: Event) => {
      e.preventDefault();
      const phone = (document.getElementById('smsPhone') as HTMLInputElement).value;
      const command = (document.getElementById('smsCommand') as HTMLInputElement).value;

      const responseBox = document.getElementById('smsResponseBox');
      const responseText = document.getElementById('smsResponseText');

      if (responseBox && responseText) {
        responseText.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-1"></i> Processing SMS command via Twilio engine...`;
        responseBox.classList.remove('hidden');
      }

      const reply = await api.sendInboundSms(phone, command);
      if (responseText) {
        responseText.innerHTML = `&gt; ${reply}`;
      }
      showToast('SMS command executed via Twilio engine', 'fa-comment-sms');
    };

    // Farmer Instant Wallet Withdrawal
    w.handleFarmerWithdrawal = () => {
      const currentUser = api.getCurrentUser();
      const balance = currentUser?.walletBalanceEtb || 48200;
      if (balance <= 0) {
        showToast('No available balance to withdraw', 'fa-triangle-exclamation', 'border-amber-500');
        return;
      }

      api.requestWalletWithdrawal(balance, currentUser?.phone || '+251911223344');
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      showToast(`Instant Payout of ${balance.toLocaleString()} ETB deposited to Telebirr (${currentUser?.phone || '+251911223344'})!`, 'fa-money-bill-transfer');
      this.render();
    };

    // Standing Orders
    w.handleCreateStandingOrderModal = (listingId: string) => {
      if (!api.isAuthenticated()) {
        w.openAuthModal('login');
        return;
      }
      api.addStandingOrder(listingId, 150, 'Weekly');
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      showToast('Weekly Recurring Standing Order Scheduled!', 'fa-repeat');
      this.activeBuyerSubTab = 'standing_orders';
      this.render();
    };

    w.toggleStandingOrderStatus = (soId: string) => {
      api.toggleStandingOrder(soId);
      showToast('Standing order status updated', 'fa-check');
      this.render();
    };

    // Dispute Actions
    w.openDisputeModal = (orderId: string) => {
      const order = api.getOrders().find(o => o.id === orderId);
      if (order) {
        this.activeDisputeModal = { isOpen: true, order };
        this.render();
      }
    };

    w.closeDisputeModal = () => {
      this.activeDisputeModal = null;
      this.render();
    };

    w.handleDisputeSubmit = async (e: Event, orderId: string) => {
      e.preventDefault();
      const reason = (document.getElementById('disputeReasonInput') as HTMLTextAreaElement).value;
      const photo = (document.getElementById('disputePhotoUrl') as HTMLInputElement).value;
      const slider = (document.getElementById('disputeRefundSlider') as HTMLInputElement).value;

      await api.disputeOrder(orderId, reason, photo, parseInt(slider, 10));
      this.activeDisputeModal = null;
      this.activeOrderModal = null;
      showToast('Dispute filed! Escrow locked under Admin Arbitration.', 'fa-lock', 'border-red-500');
      this.render();
    };

    // Driver Proof with GPS & Offline Sync
    w.toggleDriverOfflineMode = () => {
      const mode = api.toggleOfflineMode();
      showToast(mode ? 'Switched to Offline Mode (Actions cached locally)' : 'Reconnected to Online Mode', 'fa-wifi');
      this.render();
    };

    w.syncDriverOfflineQueue = async () => {
      const count = await api.syncOfflineQueue();
      showToast(`Synced ${count} offline trip actions to server!`, 'fa-cloud-arrow-up');
      this.render();
    };

    w.handleDriverStopAction = async (stopIdx: number) => {
      const route = api.getOptimizedRoute();
      if (route.stops[stopIdx]) {
        route.stops[stopIdx].completed = true;
        confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
        showToast(`Stop #${stopIdx + 1} verified with GPS timestamp!`, 'fa-circle-check');
        this.render();
      }
    };

    w.driverPickupWithProof = async (orderId: string) => {
      await api.pickupOrderByDriver(orderId, 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80');
      showToast('Produce picked up with GPS photo proof! In transit.', 'fa-truck-fast');
      this.render();
    };

    w.driverCompleteDeliveryProof = async (orderId: string) => {
      await api.confirmDeliveryByBuyer(orderId, 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80', 9.0300, 38.7400);
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
      showToast('Delivery Dropoff Verified with GPS Timestamp! 5% + Rural Subsidy Credited.', 'fa-hand-holding-dollar');
      this.render();
    };

    // Admin KYC & Anomaly Actions
    w.adminVerifyKyc = async (userId: string, approve: boolean) => {
      await api.verifyKyc(userId, approve);
      showToast(approve ? 'Identity & Documents Approved!' : 'KYC verification rejected', approve ? 'fa-user-check' : 'fa-user-xmark');
      this.render();
    };

    w.handleDismissAnomaly = (id: string) => {
      showToast(`Anomaly Alert #${id} dismissed by Admin`, 'fa-check');
    };

    w.handleInvestigateAnomaly = (id: string) => {
      showToast(`Audit trail opened for Anomaly #${id}`, 'fa-magnifying-glass');
    };

    // Authentication Handlers
    w.openAuthModal = (mode: 'login' | 'register' = 'login') => {
      this.authMode = mode;
      this.otpStep = false;
      this.authErrorMessage = '';
      this.matchedUserName = '';
      this.matchedUserRole = '';
      this.matchedUserEmail = '';
      this.isAuthModalOpen = true;
      this.render();
    };

    w.closeAuthModal = () => {
      this.isAuthModalOpen = false;
      this.authErrorMessage = '';
      this.render();
    };

    w.setAuthMode = (mode: 'login' | 'register') => {
      this.authMode = mode;
      this.otpStep = false;
      this.authErrorMessage = '';
      this.render();
    };

    w.resetOtpStep = () => {
      this.otpStep = false;
      this.authErrorMessage = '';
      this.render();
    };

    w.quickFillPhone = (phone: string) => {
      this.pendingPhone = phone.replace('+251', '').trim();
      this.authErrorMessage = '';
      this.render();
      const input = document.getElementById('authPhoneInput') as HTMLInputElement;
      if (input) {
        input.value = this.pendingPhone;
        input.focus();
      }
    };

    w.switchToRegisterWithPhone = (phone: string) => {
      this.authMode = 'register';
      this.otpStep = false;
      this.authErrorMessage = '';
      this.pendingPhone = phone.replace('+251', '').trim();
      this.render();
    };

    w.handleRequestOtp = async (e: Event) => {
      e.preventDefault();
      const phoneInput = (document.getElementById('authPhoneInput') as HTMLInputElement).value.trim();
      if (!phoneInput || phoneInput.length < 8) {
        showToast('Please enter a valid Ethiopian mobile number (e.g. 0911223344)', 'fa-triangle-exclamation', 'border-red-500');
        return;
      }

      const btn = document.getElementById('requestOtpBtn') as HTMLButtonElement;
      if (btn) {
        btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Checking Database...`;
        btn.disabled = true;
      }

      this.pendingPhone = phoneInput;
      this.authErrorMessage = '';

      try {
        const res = await api.requestOtp(phoneInput);
        this.lastSentCode = res.demoCode || '';
        this.matchedUserName = res.userName || '';
        this.matchedUserRole = res.role || '';
        this.matchedUserEmail = res.email || '';
        this.otpStep = true;
        if (res.email) {
          showToast(`Security code dispatched to +251 ${phoneInput} and ${res.email}`, 'fa-shield-halved', 'border-emerald-500');
        } else {
          showToast(`SMS verification code dispatched to +251 ${phoneInput}`, 'fa-comment-sms', 'border-emerald-500');
        }
      } catch (err: any) {
        this.authErrorMessage = err.message || 'No account registered with this phone number. Please register first.';
      }

      this.render();
    };

    w.handleVerifyOtp = async (e: Event) => {
      e.preventDefault();
      const codeInput = ((document.getElementById('authOtpInput') as HTMLInputElement) || (document.getElementById('otpCodeInput') as HTMLInputElement))?.value.trim();
      if (!codeInput || codeInput.length !== 6) {
        showToast('Please enter the 6-digit verification code', 'fa-triangle-exclamation', 'border-red-500');
        return;
      }

      const btn = document.getElementById('verifyOtpBtn') as HTMLButtonElement;
      if (btn) {
        btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Verifying...`;
        btn.disabled = true;
      }

      try {
        const user = await api.verifyOtp(this.pendingPhone, codeInput);
        this.isAuthModalOpen = false;
        this.otpStep = false;
        this.authErrorMessage = '';

        if (user.role === 'superadmin') this.activeTab = 'superadmin';
        else if (user.role === 'farmer') this.activeTab = 'farmer';
        else if (user.role === 'driver') this.activeTab = 'driver';
        else if (user.role === 'admin') this.activeTab = 'admin';
        else this.activeTab = 'marketplace';

        this.syncUrlAndStorage();
        this.cart = this.loadCartFromStorage();

        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        showToast(`Welcome back, ${user.name}! (${user.role.toUpperCase()})`, 'fa-circle-check', 'border-emerald-500');
      } catch (err: any) {
        this.authErrorMessage = err.message || 'Invalid OTP code. Please try again.';
      }

      this.render();
    };

    const registerHandler = async (e: Event) => {
      e.preventDefault();
      const name = (document.getElementById('regName') as HTMLInputElement)?.value.trim() || '';
      const nameAm = (document.getElementById('regNameAm') as HTMLInputElement)?.value.trim() || name;
      const phone = (document.getElementById('regPhone') as HTMLInputElement)?.value.trim() || '';
      const region = (document.getElementById('regRegion') as HTMLSelectElement)?.value || 'Oromia (Bishoftu)';
      const role = (document.querySelector('input[name="regRole"]:checked') as HTMLInputElement)?.value as UserRole || 'buyer';
      const email = (document.getElementById('regEmail') as HTMLInputElement)?.value.trim() || undefined;

      const btn = document.getElementById('registerSubmitBtn') as HTMLButtonElement;
      if (btn) {
        btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Sending SMS OTP...`;
        btn.disabled = true;
      }

      try {
        const res = await api.registerUser(name, nameAm, phone, role, region, email);
        this.pendingPhone = phone.replace('+251', '').trim();
        this.lastSentCode = res.demoCode || '888888';
        this.matchedUserName = res.user.name;
        this.matchedUserRole = res.user.role.toUpperCase();
        this.matchedUserEmail = res.user.email || '';
        this.authMode = 'login';
        this.otpStep = true;
        this.authErrorMessage = '';

        if (res.user.email) {
          showToast(`Verification code sent via SMS to +251 ${this.pendingPhone} and ${res.user.email}`, 'fa-shield-halved', 'border-emerald-500');
        } else {
          showToast(`SMS verification code dispatched to +251 ${this.pendingPhone}`, 'fa-comment-sms', 'border-emerald-500');
        }
      } catch (err: any) {
        const errMsg = err.message || 'Registration failed. Please try a different phone number.';
        this.authErrorMessage = errMsg;

        // If phone already registered, seamlessly switch to OTP sign-in
        if (errMsg.toLowerCase().includes('already exists') || errMsg.toLowerCase().includes('sign in with this number')) {
          this.pendingPhone = phone.replace('+251', '').trim();
          try {
            const otpRes = await api.requestOtp(phone);
            this.lastSentCode = otpRes.demoCode || '';
            this.matchedUserName = otpRes.userName || '';
            this.matchedUserRole = otpRes.role || '';
            this.matchedUserEmail = otpRes.email || '';
            this.authMode = 'login';
            this.otpStep = true;
            this.authErrorMessage = `Account already exists for +251 ${this.pendingPhone}. Verification code ready below:`;
            showToast(`Switched to sign in for +251 ${this.pendingPhone}`, 'fa-shield-halved', 'border-blue-500');
          } catch (otpErr) {
            console.warn('Auto OTP fallback after registration duplicate:', otpErr);
          }
        }
      }

      this.render();
    };

    w.handleRegisterUser = registerHandler;
    w.handleRegisterSubmit = registerHandler;

    w.handleLogout = () => {
      api.logout();
      this.activeTab = 'about';
      this.syncUrlAndStorage();
      // Cart is preserved in localStorage across sessions
      showToast('Logged out successfully', 'fa-arrow-right-from-bracket');
      this.render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Switch Demo User
    w.switchDemoUser = async (phone: string) => {
      try {
        const res = await api.requestOtp(phone);
        if (res.demoCode) {
          const user = await api.verifyOtp(phone, res.demoCode);
          if (user.role === 'superadmin') this.activeTab = 'superadmin';
          else if (user.role === 'farmer') this.activeTab = 'farmer';
          else if (user.role === 'driver') this.activeTab = 'driver';
          else if (user.role === 'admin') this.activeTab = 'admin';
          else this.activeTab = 'marketplace';

          this.syncUrlAndStorage();
          this.cart = this.loadCartFromStorage();

          confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
          showToast(`Switched to profile: ${user.name} (${user.role.toUpperCase()})`, 'fa-user-shield');
        }
      } catch (err: any) {
        showToast('Demo switch failed: ' + err.message, 'fa-circle-xmark', 'border-red-500');
      }
      this.render();
    };

    // Cart Management
    w.addToCart = (listingId: string) => {
      const listing = api.getListingById(listingId);
      if (!listing) return;

      const existing = this.cart.find(c => c.listing.id === listingId);
      if (existing) {
        existing.qtyKg += listing.minOrderKg;
      } else {
        this.cart.push({ listing, qtyKg: listing.minOrderKg });
      }
      this.saveCartToStorage();

      showToast(`Added ${listing.productName} to bulk cart`, 'fa-cart-plus');
      this.render();
    };

    w.updateCartQty = (listingId: string, newQty: number) => {
      const item = this.cart.find(c => c.listing.id === listingId);
      if (item) {
        if (newQty <= 0) {
          this.cart = this.cart.filter(c => c.listing.id !== listingId);
        } else {
          item.qtyKg = newQty;
        }
        this.saveCartToStorage();
      }
      this.render();
    };

    w.toggleCart = () => {
      this.isCartOpen = !this.isCartOpen;
      this.render();
    };

    w.openTelebirrModal = (totalEtb: number) => {
      if (!api.isAuthenticated()) {
        w.openAuthModal('login');
        return;
      }
      this.activeTelebirrModal = { isOpen: true, totalEtb };
      this.render();
    };

    w.closeTelebirrModal = () => {
      this.activeTelebirrModal = null;
      this.render();
    };

    w.handleTelebirrSubmit = async (e: Event) => {
      e.preventDefault();
      try {
        const addressSelect = document.getElementById('checkoutAddress') as HTMLSelectElement | null;
        const payment = document.querySelector<HTMLInputElement>('input[name="checkoutPayment"]:checked');
        const addressId = addressSelect?.value;
        const address = api.getAccountData().addresses.find((item: any) => item.id === addressId);
        if (!address || !payment) {
          showToast('Choose a shipping address and payment method first.', 'fa-circle-exclamation', 'border-amber-500');
          return;
        }
        const deliveryAddress = `${address.street}, ${address.city}, ${address.region}, ${address.country}`;
        const checkoutItems = this.cart.length
          ? this.cart
          : this.activeTelebirrModal?.listingId
            ? [{ listing: api.getListingById(this.activeTelebirrModal.listingId), qtyKg: this.activeTelebirrModal.qtyKg || 0 }]
            : [];
        if (!checkoutItems.length || !checkoutItems[0].listing) {
          throw new Error('The selected produce is no longer available.');
        }
        let placedOrder: Order | null = null;
        let lastPaymentUrl: string | undefined;

        for (const item of checkoutItems) {
          const listing = item.listing;
          if (!listing) throw new Error('The selected produce is no longer available.');
          const res = await api.placeOrder(listing.id, item.qtyKg, deliveryAddress, false, 'Weekly', payment.value === 'telebirr-wallet' ? undefined : payment.value);
          placedOrder = res.order;
          if (res.paymentUrl) lastPaymentUrl = res.paymentUrl;
        }

        this.cart = [];
        this.saveCartToStorage();
        this.isCartOpen = false;
        this.activeTelebirrModal = null;

        if (lastPaymentUrl && (lastPaymentUrl.includes('chapa.co') || lastPaymentUrl.startsWith('https://'))) {
          showToast('Redirecting to Chapa Gateway for payment...', 'fa-arrow-up-right-from-square', 'border-emerald-500');
          window.location.href = lastPaymentUrl;
          return;
        }

        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
        showToast('Payment authorized via Telebirr. Farmer notified.', 'fa-lock', 'border-blue-500');

        if (placedOrder) {
          this.activeOrderModal = placedOrder;
        }
      } catch (err: any) {
        showToast('Order placement failed: ' + err.message, 'fa-circle-xmark', 'border-red-500');
      }
      this.render();
    };

    w.viewOrder = (orderId: string) => {
      const orders = api.getOrders();
      const order = orders.find(o => o.id === orderId);
      if (order) {
        this.activeOrderModal = order;
        this.render();
      }
    };

    w.closeOrderModal = () => {
      this.activeOrderModal = null;
      this.render();
    };

    w.openNotificationsModal = () => {
      if (!api.isAuthenticated() || !api.getCurrentUser()) {
        w.openAuthModal('login');
        return;
      }
      this.isNotificationsModalOpen = true;
      this.render();
    };

    w.closeNotificationsModal = () => {
      this.isNotificationsModalOpen = false;
      this.render();
    };

    w.confirmFarmerOrder = async (orderId: string) => {
      await api.confirmOrderByFarmer(orderId);
      signalRService.joinOrder(orderId);
      showToast('Order confirmed! Driver notified for farm pickup.', 'fa-circle-check');
      this.render();
    };

    w.confirmDelivery = async (orderId: string) => {
      await api.confirmDeliveryByBuyer(orderId);
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      showToast(`Delivery Confirmed! ${api.getPlatformConfig().farmerSharePercent}% released to Farmer, ${api.getPlatformConfig().driverSharePercent}% to Driver.`, 'fa-hand-holding-dollar', 'border-emerald-500');

      // Immediately open Rate & Review modal for real rating and feedback
      const order = api.getOrders().find(o => o.id === orderId);
      this.activeRateModal = {
        isOpen: true,
        orderId,
        rating: 5,
        comment: '',
        selectedTags: ['🌾 Fresh Harvest', '📦 Grade-1 Packaging']
      };
      this.render();
    };

    // ==================== RATINGS & REVIEWS HANDLERS ====================
    w.openRateModal = (orderId: string) => {
      const order = api.getOrders().find(o => o.id === orderId);
      this.activeRateModal = {
        isOpen: true,
        orderId,
        rating: order?.reviewRating || 5,
        comment: order?.reviewComment || '',
        selectedTags: order?.reviewQuickTags && order.reviewQuickTags.length > 0
          ? [...order.reviewQuickTags]
          : ['🌾 Fresh Harvest', '📦 Grade-1 Packaging']
      };
      this.render();
    };

    w.closeRateModal = () => {
      this.activeRateModal = null;
      this.render();
    };

    w.setModalRating = (rating: number) => {
      if (this.activeRateModal) {
        this.activeRateModal.rating = rating;
        this.render();
      }
    };

    w.toggleModalReviewTag = (tag: string) => {
      if (this.activeRateModal) {
        if (this.activeRateModal.selectedTags.includes(tag)) {
          this.activeRateModal.selectedTags = this.activeRateModal.selectedTags.filter(t => t !== tag);
        } else {
          this.activeRateModal.selectedTags.push(tag);
        }
        this.render();
      }
    };

    w.updateModalReviewComment = (comment: string) => {
      if (this.activeRateModal) {
        this.activeRateModal.comment = comment;
        const countEl = document.getElementById('reviewCommentCharCount');
        if (countEl) countEl.innerText = `${comment.length} / 500`;
      }
    };

    w.handleReviewFormSubmit = async (e: Event) => {
      e.preventDefault();
      if (!this.activeRateModal) return;
      const { orderId, rating, comment, selectedTags } = this.activeRateModal;
      const order = api.getOrders().find(o => o.id === orderId);
      if (!order) {
        showToast('Order record not found.', 'fa-circle-xmark', 'border-rose-500');
        return;
      }

      try {
        await api.createReview(orderId, order.farmerId, rating, comment, selectedTags);
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
        showToast(
          this.lang === 'am'
            ? 'እናመሰግናለን! የእርስዎ ደረጃ እና አስተያየት በተሳካ ሁኔታ ተመዝግቧል።'
            : 'Thank you! Your verified rating and review have been recorded.',
          'fa-star',
          'border-amber-500'
        );
        this.activeRateModal = null;
        if (this.activeOrderModal && this.activeOrderModal.id === orderId) {
          this.activeOrderModal.isRated = true;
          this.activeOrderModal.reviewRating = rating;
          this.activeOrderModal.reviewComment = comment;
          this.activeOrderModal.reviewQuickTags = selectedTags;
        }
        this.render();
      } catch (err: any) {
        showToast(err.message || 'Could not submit review.', 'fa-circle-xmark', 'border-rose-500');
      }
    };

    w.adminResolveDispute = async (orderId: string, resolution: 'ReleaseToFarmer' | 'RefundBuyer' | 'PartialSplit') => {
      try {
        await api.resolveDispute(orderId, resolution);
        if (resolution === 'RefundBuyer' || resolution === 'PartialSplit') {
          confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
          showToast(
            this.lang === 'am'
              ? 'ቅሬታው ተፈቷል፡ ለገዢው በቴሌብር ተመላሽ ተደርጓል። ማሳወቂያ ለገዢው ተልኳል።'
              : 'Dispute resolved: Buyer refunded via Telebirr. Immediate notification sent to buyer.',
            'fa-money-bill-transfer',
            'border-emerald-500'
          );
        } else {
          showToast(`Dispute resolved: Escrow released to farmer.`, 'fa-gavel', 'border-purple-500');
        }
        this.render();
      } catch (error: any) {
        showToast(error.message || 'Could not resolve the dispute.', 'fa-circle-xmark', 'border-rose-500');
      }
    };

    w.markAllNotificationsRead = () => {
      api.markAllNotificationsRead();
      this.render();
    };

    w.toggleCreateListingModal = () => {
      this.isCreateListingModalOpen = !this.isCreateListingModalOpen;
      this.render();
    };

    w.handleCreateListingSubmit = async (e: Event) => {
      e.preventDefault();
      const prodName = (document.getElementById('newProdName') as HTMLInputElement).value;
      const prodNameAm = (document.getElementById('newProdNameAm') as HTMLInputElement).value;
      const category = (document.getElementById('newCategory') as HTMLSelectElement).value;
      const qty = parseFloat((document.getElementById('newQtyKg') as HTMLInputElement).value);
      const price = parseFloat((document.getElementById('newPricePerKg') as HTMLInputElement).value);
      const minOrder = parseFloat((document.getElementById('newMinOrderKg') as HTMLInputElement).value);
      const grade = (document.getElementById('newGrade') as HTMLSelectElement).value;
      const ripeness = (document.getElementById('newRipeness') as HTMLSelectElement).value;
      const isAdvance = (document.getElementById('newIsAdvanceHarvest') as HTMLInputElement).checked;
      const harvestDate = (document.getElementById('newExpectedHarvestDate') as HTMLInputElement)?.value;

      try {
        await api.createListing({
          productName: prodName,
          nameAm: prodNameAm,
          category,
          qtyKg: qty,
          pricePerKg: price,
          minOrderKg: minOrder,
          grade,
          ripeness,
          isOrganic: true,
          isAdvanceHarvest: isAdvance,
          expectedHarvestDate: isAdvance ? harvestDate : undefined,
          availableFrom: isAdvance && harvestDate ? harvestDate : new Date().toISOString().split('T')[0]
        });

        this.isCreateListingModalOpen = false;
        showToast(`Published ${prodName} to marketplace!`, 'fa-cloud-arrow-up');
      } catch (err: any) {
        showToast(err.message || 'Failed to publish listing', 'fa-circle-xmark', 'border-red-500');
      }

      this.render();
    };

    w.handleAdminBroadcastSms = async (e: Event) => {
      e.preventDefault();
      const target = (document.getElementById('smsTargetRole') as HTMLSelectElement).value;
      const en = (document.getElementById('smsMsgEn') as HTMLTextAreaElement).value;
      const am = (document.getElementById('smsMsgAm') as HTMLTextAreaElement).value;

      await api.broadcastSms(en, am, target);
      showToast(this.lang === 'am' ? 'የኤስኤምኤስ መልእክት ለአርሶ አደሮች ተልኳል!' : 'SMS Broadcast sent to smallholders via Twilio!', 'fa-paper-plane');
      this.render();
    };

    // ==================== VERIFICATION & FIELD AGENT HANDLERS ====================
    w.openVerificationWizard = (step: number = 1) => {
      this.verificationWizardModal.setLanguage(this.lang);
      this.verificationWizardModal.open(step);
    };

    w.closeVerificationWizard = () => {
      this.verificationWizardModal.close();
    };

    w.setWizardStep = (step: number) => {
      this.verificationWizardModal.setStep(step);
    };

    w.updateWizardField = (field: 'fayda' | 'tin' | 'kebele', value: string) => {
      this.verificationWizardModal.updateField(field, value);
    };

    w.submitVerificationForm = async () => {
      await this.verificationWizardModal.submit();
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      showToast(this.lang === 'am' ? 'ሰነዶችዎ ደርሰውናል! በ24 ሰዓት ውስጥ ይገመገማሉ።' : 'Documents submitted! Verification under 24-hour review.', 'fa-shield-check', 'border-emerald-500');
      this.render();
    };

    w.switchAgentTab = (tab: 'register' | 'roster' | 'ussd_sim') => {
      this.agentView.switchTab(tab);
      this.syncUrlAndStorage();
      this.render();
    };

    w.setUssdInput = (code: string) => {
      this.agentView.setUssdInput(code);
    };

    w.sendUssdCommand = async () => {
      await this.agentView.executeUssd();
    };

    w.sendInboundSms = async () => {
      const inputEl = document.getElementById('inboundSmsBody') as HTMLInputElement;
      const text = inputEl?.value || 'FAYDA FAN-8812-4091-2810';
      showToast(this.lang === 'am' ? `የኤስኤምኤስ ትዕዛዝ ተቀብለናል፡ "${text}"` : `Inbound SMS processed: "${text}"`, 'fa-comment-sms', 'border-blue-500');
      await api.refreshAllData();
      this.render();
    };

    w.handleAgentRegisterSubmit = async (e: Event) => {
      e.preventDefault();
      const name = (document.getElementById('agFarmerName') as HTMLInputElement).value;
      const nameAm = (document.getElementById('agFarmerNameAm') as HTMLInputElement)?.value;
      const phone = (document.getElementById('agFarmerPhone') as HTMLInputElement).value;
      const region = (document.getElementById('agFarmerRegion') as HTMLSelectElement).value;
      const kebele = (document.getElementById('agFarmerKebele') as HTMLInputElement)?.value;
      const crop = (document.getElementById('agFarmerCrop') as HTMLInputElement)?.value;
      const fayda = (document.getElementById('agFarmerFayda') as HTMLInputElement)?.value;
      const tin = (document.getElementById('agFarmerTin') as HTMLInputElement)?.value;

      try {
        await api.agentRegisterFarmer({
          name,
          nameAm,
          phone,
          region,
          kebele,
          primaryCrop: crop,
          faydaId: fayda,
          tinNumber: tin
        });

        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        showToast(this.lang === 'am' ? `${name} ተመዝግቧል! የማረጋገጫ ኤስኤምኤስ ተልኳል።` : `Farmer ${name} registered! Welcome SMS dispatched.`, 'fa-user-check', 'border-emerald-500');
        this.agentView.switchTab('roster');
        this.syncUrlAndStorage();
        this.render();
      } catch (err: any) {
        showToast('Registration failed: ' + err.message, 'fa-circle-xmark', 'border-red-500');
      }
    };

    w.sendAgentFarmerSms = (phone: string) => {
      showToast(this.lang === 'am' ? `ኤስኤምኤስ ወደ ${phone} ተልኳል!` : `SMS dispatch sent to ${phone}!`, 'fa-paper-plane', 'border-blue-500');
    };

    w.adminReviewVerification = async (userId: string, action: 'Approve' | 'Reject') => {
      let notes: string | undefined;
      let rejectionReason: string | undefined;

      if (action === 'Reject') {
        rejectionReason = prompt(
          this.lang === 'am'
            ? 'እባክዎ ውድቅ የተደረገበትን ምክንያት ያስገቡ (ለምሳሌ፡ የፋይዳ ፎቶው ግልጽ አይደለም / የታክስ ቁጥር አልተገኘም):'
            : 'Enter rejection reason to notify the user via SMS (e.g. Blurry ID photo / TIN mismatch):',
          'Blurry Fayda ID photo. Please re-upload clear image.'
        ) || undefined;

        if (!rejectionReason) return; // User cancelled prompt
      } else {
        notes = 'Identity & TIN verified against Ministry of Revenues registry.';
      }

      await api.reviewVerification(userId, action, notes, rejectionReason);
      if (action === 'Approve') {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        showToast(this.lang === 'am' ? 'የተጠቃሚው ማረጋገጫ ጸድቋል! የኤስኤምኤስ መልእክት ተልኳል።' : 'User account APPROVED! SMS confirmation dispatched.', 'fa-circle-check', 'border-emerald-500');
      } else {
        showToast(this.lang === 'am' ? 'ማረጋገጫው ውድቅ ተደርጓል፤ ምክንያቱ በኤስኤምኤስ ተልኳል።' : 'Verification rejected & reason SMS sent to user.', 'fa-triangle-exclamation', 'border-amber-500');
      }
      this.render();
    };

    // ==================== SUPER ADMIN WINDOW HANDLERS ====================
    w.setSuperAdminTab = (tab: SuperAdminTab) => {
      this.activeSuperAdminTab = tab;
      this.syncUrlAndStorage();
      if (tab === 'db_ops') {
        api.fetchDatabaseHealth().then(() => this.render()).catch(err => console.warn('Failed to refresh db health:', err));
      } else {
        api.fetchSuperAdminData().then(() => this.render()).catch(err => console.warn('Failed to refresh superadmin data:', err));
      }
      this.render();
    };

    w.setRbacSelectedRole = (role: UserRole) => {
      this.selectedRbacRole = role;
      this.render();
    };

    w.handleToggleRolePermission = (role: UserRole, key: PermissionKey, enabled: boolean) => {
      api.updateRolePermissionKey(role, key, enabled);
      showToast(
        enabled ? `Granted "${key}" to ${role.toUpperCase()}` : `Revoked "${key}" from ${role.toUpperCase()}`,
        'fa-shield-halved',
        enabled ? 'border-emerald-500' : 'border-amber-500'
      );
      this.render();
    };

    w.resetAllRolePermissions = () => {
      if (!confirm('Reset all roles to factory default permissions?')) return;
      api.resetRolePermissions();
      confetti({ particleCount: 90, spread: 60, origin: { y: 0.6 } });
      showToast('Reset all role permissions to factory defaults!', 'fa-rotate-left', 'border-emerald-500');
      this.render();
    };

    w.setUserRoleFilter = (filter: string) => {
      this.superAdminUserRoleFilter = filter;
      this.render();
    };

    w.setAuditCategoryFilter = (cat: string) => {
      this.superAdminAuditCategoryFilter = cat;
      this.render();
    };

    w.openCreateUserModal = () => {
      if (!api.hasPermission('MANAGE_USERS')) {
        showToast('Unauthorized: You lack MANAGE_USERS permission.', 'fa-lock', 'border-red-500');
        return;
      }
      this.isSuperAdminCreateUserModalOpen = true;
      this.render();
    };

    w.openEditUserModal = (userId: string) => {
      if (!api.hasPermission('MANAGE_USERS')) {
        showToast('Unauthorized: You lack MANAGE_USERS permission.', 'fa-lock', 'border-red-500');
        return;
      }
      this.editTargetUserId = userId;
      this.isSuperAdminEditUserModalOpen = true;
      this.render();
    };

    w.openAddZoneModal = () => {
      if (!api.hasPermission('MANAGE_TRADE_ZONES')) {
        showToast('Unauthorized: You lack MANAGE_TRADE_ZONES permission.', 'fa-lock', 'border-red-500');
        return;
      }
      this.isSuperAdminAddZoneModalOpen = true;
      this.render();
    };

    w.openAddBlacklistModal = () => {
      if (!api.hasPermission('MANAGE_BLACKLIST')) {
        showToast('Unauthorized: You lack MANAGE_BLACKLIST permission.', 'fa-lock', 'border-red-500');
        return;
      }
      this.isSuperAdminAddBlacklistModalOpen = true;
      this.render();
    };

    w.openCreateBannerModal = () => {
      if (!api.hasPermission('MANAGE_BANNERS')) {
        showToast('Unauthorized: You lack MANAGE_BANNERS permission.', 'fa-lock', 'border-red-500');
        return;
      }
      this.editTargetBannerId = null;
      this.isSuperAdminBannerModalOpen = true;
      this.render();
    };

    w.openEditBannerModal = (bannerId: string) => {
      if (!api.hasPermission('MANAGE_BANNERS')) {
        showToast('Unauthorized: You lack MANAGE_BANNERS permission.', 'fa-lock', 'border-red-500');
        return;
      }
      this.editTargetBannerId = bannerId;
      this.isSuperAdminBannerModalOpen = true;
      this.render();
    };

    w.handleSaveBannerSubmit = (e: Event, bannerId?: string) => {
      e.preventDefault();
      const title = (document.getElementById('bannerTitleInput') as HTMLInputElement)?.value;
      const titleAm = (document.getElementById('bannerTitleAmInput') as HTMLInputElement)?.value || undefined;
      const subtitle = (document.getElementById('bannerSubtitleInput') as HTMLTextAreaElement)?.value || undefined;
      const subtitleAm = (document.getElementById('bannerSubtitleAmInput') as HTMLTextAreaElement)?.value || undefined;
      const targetAudience = (document.getElementById('bannerAudienceSelect') as HTMLSelectElement)?.value as any;
      const targetRegion = (document.getElementById('bannerRegionSelect') as HTMLSelectElement)?.value || 'All';
      const priority = Number((document.getElementById('bannerPriorityInput') as HTMLInputElement)?.value) || 5;
      const badgeText = (document.getElementById('bannerBadgeInput') as HTMLInputElement)?.value || undefined;
      const badgeTextAm = (document.getElementById('bannerBadgeAmInput') as HTMLInputElement)?.value || undefined;
      const ctaText = (document.getElementById('bannerCtaTextInput') as HTMLInputElement)?.value || 'Browse Marketplace';
      const ctaLink = (document.getElementById('bannerCtaLinkSelect') as HTMLSelectElement)?.value || 'marketplace';
      const imageUrl = (document.getElementById('bannerImageUrlInput') as HTMLInputElement)?.value;
      const themeGradient = (document.getElementById('bannerGradientSelect') as HTMLSelectElement)?.value;
      const isActive = (document.getElementById('bannerIsActiveCheck') as HTMLInputElement)?.checked ?? true;

      if (bannerId) {
        api.updateBanner(bannerId, {
          title,
          titleAm,
          subtitle,
          subtitleAm,
          targetAudience,
          targetRegion,
          priority,
          badgeText,
          badgeTextAm,
          ctaText,
          ctaLink,
          imageUrl,
          themeGradient,
          isActive
        });
        showToast(`Updated promotional banner: "${title}"`, 'fa-panorama', 'border-emerald-500');
      } else {
        api.createBanner({
          title,
          titleAm,
          subtitle,
          subtitleAm,
          targetAudience,
          targetRegion,
          priority,
          badgeText,
          badgeTextAm,
          ctaText,
          ctaLink,
          imageUrl,
          themeGradient,
          isActive
        });
        confetti({ particleCount: 90, spread: 60, origin: { y: 0.6 } });
        showToast(`Published new banner: "${title}"!`, 'fa-panorama', 'border-emerald-500');
      }

      this.isSuperAdminBannerModalOpen = false;
      this.editTargetBannerId = null;
      this.render();
    };

    w.toggleBannerStatus = (bannerId: string) => {
      const banner = api.getBannerById(bannerId);
      if (!banner) return;
      const nextActive = !banner.isActive;
      api.toggleBannerStatus(bannerId, nextActive);
      showToast(nextActive ? `Activated banner: "${banner.title}"` : `Paused banner: "${banner.title}"`, 'fa-panorama', nextActive ? 'border-emerald-500' : 'border-slate-500');
      this.render();
    };

    w.deleteBanner = (bannerId: string) => {
      const banner = api.getBannerById(bannerId);
      if (!banner) return;
      if (!confirm(`Are you sure you want to delete banner "${banner.title}"?`)) return;
      api.deleteBanner(bannerId);
      showToast(`Deleted banner: "${banner.title}"`, 'fa-trash', 'border-red-500');
      this.render();
    };

    w.openAdminEditListingModal = (listingId: string) => {
      this.editTargetListingId = listingId;
      this.isListingEditModalOpen = true;
      this.render();
    };

    w.handleAdminEditListingSubmit = (e: Event, listingId: string) => {
      e.preventDefault();
      const productName = (document.getElementById('listingNameInput') as HTMLInputElement)?.value;
      const nameAm = (document.getElementById('listingNameAmInput') as HTMLInputElement)?.value || undefined;
      const category = (document.getElementById('listingCategorySelect') as HTMLSelectElement)?.value;
      const grade = (document.getElementById('listingGradeSelect') as HTMLSelectElement)?.value;
      const moderationStatus = (document.getElementById('listingModerationStatusSelect') as HTMLSelectElement)?.value as any;
      const pricePerKg = Number((document.getElementById('listingPriceInput') as HTMLInputElement)?.value);
      const qtyKg = Number((document.getElementById('listingQtyInput') as HTMLInputElement)?.value);
      const minOrderKg = Number((document.getElementById('listingMinOrderInput') as HTMLInputElement)?.value) || 50;
      const region = (document.getElementById('listingRegionInput') as HTMLInputElement)?.value;
      const description = (document.getElementById('listingDescInput') as HTMLTextAreaElement)?.value || undefined;
      const isOrganic = (document.getElementById('listingOrganicCheck') as HTMLInputElement)?.checked ?? false;
      const isAdvanceHarvest = (document.getElementById('listingAdvanceHarvestCheck') as HTMLInputElement)?.checked ?? false;

      api.adminUpdateListing(listingId, {
        productName,
        nameAm,
        category,
        grade,
        moderationStatus,
        pricePerKg,
        qtyKg,
        minOrderKg,
        region,
        description,
        isOrganic,
        isAdvanceHarvest
      });

      this.isListingEditModalOpen = false;
      this.editTargetListingId = null;
      showToast(`Saved moderation changes for "${productName}"!`, 'fa-gavel', 'border-purple-500');
      this.render();
    };

    w.adminDeleteListing = (listingId: string) => {
      const listing = api.getListings().find(l => l.id === listingId);
      if (!listing) return;

      const reason = prompt(
        this.lang === 'am' ? 'እባክዎ የተሰረዘበትን ምክንያት ያስገቡ:' : 'Please enter the reason for removing this listing post:',
        'Violates marketplace quality & pricing policies'
      );
      if (reason === null) return;

      const success = api.adminDeleteListing(listingId, reason);
      if (success) {
        this.isListingEditModalOpen = false;
        this.editTargetListingId = null;
        showToast(`Deleted produce post: "${listing.productName}"`, 'fa-trash', 'border-red-500');
      } else {
        showToast('Failed to delete produce post', 'fa-triangle-exclamation', 'border-red-500');
      }
      this.render();
    };

    w.flagListingAnomaly = (listingId: string) => {
      const listing = api.getListings().find(l => l.id === listingId);
      if (!listing) return;
      api.flagListingAnomaly(listingId, 'Manual Admin Anomaly Flag');
      showToast(`Flagged "${listing.productName}" for price/quality inspection!`, 'fa-flag', 'border-amber-500');
      this.render();
    };

    w.closeSuperAdminModal = () => {
      this.isSuperAdminCreateUserModalOpen = false;
      this.isSuperAdminEditUserModalOpen = false;
      this.isSuperAdminAddZoneModalOpen = false;
      this.isSuperAdminAddBlacklistModalOpen = false;
      this.isSuperAdminBannerModalOpen = false;
      this.isListingEditModalOpen = false;
      this.editTargetUserId = null;
      this.editTargetBannerId = null;
      this.editTargetListingId = null;
      this.render();
    };

    w.handleRoleChangeInModal = (role: string) => {
      const container = document.getElementById('roleSpecificFields');
      if (!container) return;

      if (role === 'farmer') {
        container.innerHTML = `
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block mb-1 font-bold text-slate-700">Primary Produce / Crop</label>
              <input type="text" id="newPrimaryCropInput" placeholder="e.g. Magna Teff, Fresh Tomatoes" class="input-field text-xs font-bold" />
            </div>
            <div>
              <label class="block mb-1 font-bold text-slate-700">Kebele / Farm Location</label>
              <input type="text" id="newKebeleInput" placeholder="e.g. Kebele 03 Farm Cluster" class="input-field text-xs font-bold" />
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block mb-1 font-bold text-slate-700">National ID (Fayda FAN)</label>
              <input type="text" id="newFaydaInput" placeholder="FAN-XXXX-XXXX-XXXX" class="input-field text-xs font-bold font-mono" />
            </div>
            <div>
              <label class="block mb-1 font-bold text-slate-700">Taxpayer ID (TIN Number)</label>
              <input type="text" id="newTinInput" placeholder="10-digit TIN" class="input-field text-xs font-bold font-mono" />
            </div>
          </div>
        `;
      } else if (role === 'driver') {
        container.innerHTML = `
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block mb-1 font-bold text-slate-700">Vehicle Model & Type</label>
              <input type="text" id="newVehicleTypeInput" placeholder="e.g. Isuzu 5-Ton FSR" value="Isuzu 5-Ton" class="input-field text-xs font-bold" />
            </div>
            <div>
              <label class="block mb-1 font-bold text-slate-700">Payload Capacity (kg)</label>
              <input type="number" id="newCapacityInput" placeholder="5000" value="5000" class="input-field text-xs font-bold" />
            </div>
          </div>
          <div>
            <label class="block mb-1 font-bold text-slate-700">Refrigeration / Cargo Mode</label>
            <input type="text" id="newRefrigInput" placeholder="Ventilated, Insulated, or Active Refrigerated" value="Ventilated & Insulated" class="input-field text-xs font-bold" />
          </div>
        `;
      } else if (role === 'buyer') {
        container.innerHTML = `
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block mb-1 font-bold text-slate-700">Business License Number</label>
              <input type="text" id="newLicenseInput" placeholder="BL-AA-XXXXX" class="input-field text-xs font-bold font-mono" />
            </div>
            <div>
              <label class="block mb-1 font-bold text-slate-700">Taxpayer ID (TIN)</label>
              <input type="text" id="newTinInput" placeholder="10-digit TIN" class="input-field text-xs font-bold font-mono" />
            </div>
          </div>
        `;
      } else if (role === 'admin') {
        container.innerHTML = `
          <div>
            <label class="block mb-2 font-bold text-slate-700">Admin Permissions Assigned</label>
            <div class="grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-700">
              <label class="flex items-center gap-1.5"><input type="checkbox" checked class="rounded text-purple-600" /> Manage Users & KYC</label>
              <label class="flex items-center gap-1.5"><input type="checkbox" checked class="rounded text-purple-600" /> Arbitrate Disputes</label>
              <label class="flex items-center gap-1.5"><input type="checkbox" checked class="rounded text-purple-600" /> Broadcast SMS</label>
              <label class="flex items-center gap-1.5"><input type="checkbox" checked class="rounded text-purple-600" /> View Tax Reports</label>
            </div>
          </div>
        `;
      } else if (role === 'superadmin') {
        container.innerHTML = `
          <div class="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-bold">
            👑 Grants full unrestricted platform access, killswitches, impersonation engine, and escrow governance.
          </div>
        `;
      }
    };

    w.handleCreateUserSubmit = async (e: Event) => {
      e.preventDefault();
      const role = (document.getElementById('newRoleSelect') as HTMLSelectElement)?.value as UserRole;
      const name = (document.getElementById('newNameInput') as HTMLInputElement)?.value;
      const nameAm = (document.getElementById('newNameAmInput') as HTMLInputElement)?.value || undefined;
      const phone = (document.getElementById('newPhoneInput') as HTMLInputElement)?.value;
      const region = (document.getElementById('newRegionInput') as HTMLInputElement)?.value;
      const verified = (document.getElementById('newVerifiedCheck') as HTMLInputElement)?.checked ?? true;

      const primaryCrop = (document.getElementById('newPrimaryCropInput') as HTMLInputElement)?.value || undefined;
      const kebele = (document.getElementById('newKebeleInput') as HTMLInputElement)?.value || undefined;
      const faydaId = (document.getElementById('newFaydaInput') as HTMLInputElement)?.value || undefined;
      const tinNumber = (document.getElementById('newTinInput') as HTMLInputElement)?.value || undefined;
      const vehicleType = (document.getElementById('newVehicleTypeInput') as HTMLInputElement)?.value || undefined;
      const vehicleCapacityKg = Number((document.getElementById('newCapacityInput') as HTMLInputElement)?.value) || undefined;
      const refrigerationType = (document.getElementById('newRefrigInput') as HTMLInputElement)?.value || undefined;
      const businessLicenseNumber = (document.getElementById('newLicenseInput') as HTMLInputElement)?.value || undefined;

      try {
        const created = await api.createUser({
          role,
          name,
          nameAm,
          phone,
          region,
          verified,
          status: 'active',
          primaryCrop,
          kebele,
          faydaId,
          tinNumber,
          vehicleType,
          vehicleCapacityKg,
          refrigerationType,
          businessLicenseNumber
        });

        this.isSuperAdminCreateUserModalOpen = false;
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        showToast(
          this.lang === 'am'
            ? `አዲስ ${role.toUpperCase()} መለያ ተፈጥሯል: ${name} (${created.phone}) - አሁን መግባት ይችላሉ!`
            : `Created ${role.toUpperCase()} account: ${name} (${created.phone})! Ready to sign in.`,
          'fa-user-check',
          'border-emerald-500'
        );
        this.render();
      } catch (err: any) {
        showToast(err.message || 'Failed to create user account.', 'fa-circle-xmark', 'border-rose-500');
      }
    };

    w.handleEditUserSubmit = (e: Event, userId: string) => {
      e.preventDefault();
      const name = (document.getElementById('editNameInput') as HTMLInputElement)?.value;
      const phone = (document.getElementById('editPhoneInput') as HTMLInputElement)?.value;
      const role = (document.getElementById('editRoleSelect') as HTMLSelectElement)?.value as UserRole;
      const status = (document.getElementById('editStatusSelect') as HTMLSelectElement)?.value as 'active' | 'suspended';
      const region = (document.getElementById('editRegionInput') as HTMLInputElement)?.value;
      const faydaId = (document.getElementById('editFaydaInput') as HTMLInputElement)?.value || undefined;
      const tinNumber = (document.getElementById('editTinInput') as HTMLInputElement)?.value || undefined;

      api.updateUser(userId, { name, phone, role, status, region, faydaId, tinNumber });
      this.isSuperAdminEditUserModalOpen = false;
      this.editTargetUserId = null;
      showToast(`Updated user profile: ${name}`, 'fa-user-pen', 'border-emerald-500');
      this.render();
    };

    w.toggleUserSuspension = (userId: string) => {
      try {
        const u = api.toggleUserSuspension(userId);
        const isSuspended = u.status === 'suspended';
        showToast(
          isSuspended
            ? (this.lang === 'am' ? `የተጠቃሚ ${u.name} መለያ ታግዷል` : `Suspended account access for ${u.name}`)
            : (this.lang === 'am' ? `የተጠቃሚ ${u.name} መለያ እገዳ ተነስቷል` : `Reinstated account access for ${u.name}`),
          isSuspended ? 'fa-user-slash' : 'fa-user-check',
          isSuspended ? 'border-red-500' : 'border-emerald-500'
        );
      } catch (err: any) {
        showToast(err.message || 'Error updating user status', 'fa-triangle-exclamation', 'border-red-500');
      }
      this.render();
    };

    w.deleteUserAccount = (userId: string) => {
      const user = api.getUserById(userId);
      if (!user) return;

      const confirmMsg = this.lang === 'am'
        ? `ተጠቃሚ '${user.name}' (${user.phone})ን በቋሚነት መሰረዝ ይፈልጋሉ? ይህ እርምጃ ሊመለስ አይችልም።`
        : `Are you sure you want to permanently delete user '${user.name}' (${user.phone})? This action cannot be undone.`;

      if (!confirm(confirmMsg)) return;

      const success = api.deleteUser(userId);
      if (success) {
        showToast(
          this.lang === 'am' ? `ተጠቃሚ '${user.name}' በቋሚነት ተሰርዟል` : `Permanently deleted user: ${user.name}`,
          'fa-trash',
          'border-red-500'
        );
      } else {
        showToast('Failed to delete user account', 'fa-triangle-exclamation', 'border-red-500');
      }
      this.render();
    };

    w.startSuperAdminImpersonation = (userId: string) => {
      const targetUser = api.startImpersonation(userId);
      if (!targetUser) return;

      (window as any).isSuperAdminImpersonating = true;
      showToast(`Logged in as ${targetUser.name} (${targetUser.role.toUpperCase()})`, 'fa-user-secret', 'border-rose-500');

      if (targetUser.role === 'farmer') this.activeTab = 'farmer';
      else if (targetUser.role === 'driver') this.activeTab = 'driver';
      else if (targetUser.role === 'admin') this.activeTab = 'admin';
      else this.activeTab = 'marketplace';

      this.render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    w.stopSuperAdminImpersonation = () => {
      const original = api.stopImpersonation();
      (window as any).isSuperAdminImpersonating = false;
      showToast(`Exited impersonation. Returned to Super Admin dashboard.`, 'fa-crown', 'border-rose-500');
      this.activeTab = 'superadmin';
      this.render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    w.updateEscrowSliders = (source: string) => {
      const farmerEl = document.getElementById('farmerShareInput') as HTMLInputElement;
      const driverEl = document.getElementById('driverShareInput') as HTMLInputElement;
      const platformEl = document.getElementById('platformShareInput') as HTMLInputElement;
      if (!farmerEl || !driverEl || !platformEl) return;

      let farmerVal = Math.round(Number(farmerEl.value));
      let driverVal = Math.round(Number(driverEl.value));
      let platformVal = Math.round(Number(platformEl.value));

      if (source === 'farmer') {
        const remaining = 100 - farmerVal;
        driverVal = Math.floor(remaining / 2);
        platformVal = remaining - driverVal;
        driverEl.value = driverVal.toString();
        platformEl.value = platformVal.toString();
      } else if (source === 'driver') {
        const remaining = 100 - driverVal;
        if (platformVal >= remaining) {
          platformVal = Math.max(1, Math.min(15, remaining - 70));
          platformEl.value = platformVal.toString();
        }
        farmerVal = remaining - platformVal;
        farmerEl.value = farmerVal.toString();
      } else if (source === 'platform') {
        const remaining = 100 - platformVal;
        if (driverVal >= remaining) {
          driverVal = Math.max(1, Math.min(15, remaining - 70));
          driverEl.value = driverVal.toString();
        }
        farmerVal = remaining - driverVal;
        farmerEl.value = farmerVal.toString();
      }

      const farmerDisplay = document.getElementById('farmerShareDisplay');
      const driverDisplay = document.getElementById('driverShareDisplay');
      const platformDisplay = document.getElementById('platformShareDisplay');
      if (farmerDisplay) farmerDisplay.innerText = `${farmerEl.value}%`;
      if (driverDisplay) driverDisplay.innerText = `${driverEl.value}%`;
      if (platformDisplay) platformDisplay.innerText = `${platformEl.value}%`;

      const farmerSub = document.getElementById('farmerShareSubText');
      const driverSub = document.getElementById('driverShareSubText');
      const platformSub = document.getElementById('platformShareSubText');
      if (farmerSub) farmerSub.innerText = `Smallholder receives ${farmerEl.value}% direct payout into Telebirr upon buyer inspection.`;
      if (driverSub) driverSub.innerText = `Freight carrier receives ${driverEl.value}% transit cut + rural route bonuses.`;
      if (platformSub) platformSub.innerText = `Platform maintenance, dispute arbitration, and 15% MOR VAT collection.`;
    };

    w.handleSaveSuperAdminConfig = async (e: Event) => {
      e.preventDefault();
      const farmerSharePercent = Number((document.getElementById('farmerShareInput') as HTMLInputElement)?.value) || 90;
      const driverSharePercent = Number((document.getElementById('driverShareInput') as HTMLInputElement)?.value) || 5;
      const platformFeePercent = Number((document.getElementById('platformShareInput') as HTMLInputElement)?.value) || 5;
      const withholdingTaxPercent = Number((document.getElementById('cfgWithholdingTax') as HTMLInputElement)?.value) || 2;
      const highValuePayoutThresholdEtb = Number((document.getElementById('cfgHighValueThreshold') as HTMLInputElement)?.value) || 50000;

      if (farmerSharePercent + driverSharePercent + platformFeePercent !== 100) {
        showToast('Escrow splits (Farmer + Driver + Platform) must sum to 100%.', 'fa-triangle-exclamation', 'border-amber-500');
        return;
      }

      const currentConfig = api.getPlatformConfig();
      const telebirrAppIdEl = document.getElementById('cfgTelebirrAppId') as HTMLInputElement | null;
      const telebirrShortCodeEl = document.getElementById('cfgTelebirrShortCode') as HTMLInputElement | null;
      const telebirrApiKeyEl = document.getElementById('cfgTelebirrApiKey') as HTMLInputElement | null;
      const twilioSidEl = document.getElementById('cfgTwilioSid') as HTMLInputElement | null;
      const twilioTokenEl = document.getElementById('cfgTwilioToken') as HTMLInputElement | null;
      const twilioFromEl = document.getElementById('cfgTwilioFrom') as HTMLInputElement | null;

      await api.updatePlatformConfig({
        farmerSharePercent,
        driverSharePercent,
        platformFeePercent,
        withholdingTaxPercent,
        highValuePayoutThresholdEtb,
        telebirrAppId: telebirrAppIdEl ? telebirrAppIdEl.value : currentConfig.telebirrAppId,
        telebirrShortCode: telebirrShortCodeEl ? telebirrShortCodeEl.value : currentConfig.telebirrShortCode,
        telebirrApiKey: telebirrApiKeyEl ? telebirrApiKeyEl.value : currentConfig.telebirrApiKey,
        twilioAccountSid: twilioSidEl ? twilioSidEl.value : currentConfig.twilioAccountSid,
        twilioAuthToken: twilioTokenEl ? twilioTokenEl.value : currentConfig.twilioAuthToken,
        twilioFromNumber: twilioFromEl ? twilioFromEl.value : currentConfig.twilioFromNumber
      });

      showToast('Platform configuration & escrow splits successfully saved and synchronized!', 'fa-floppy-disk', 'border-emerald-500');
      this.render();
    };

    w.setSuperAdminFinancialSubTab = (tab: 'payouts' | 'ledger' | 'tax' | 'config') => {
      this.superAdminFinancialSubTab = tab;
      this.render();
    };

    w.setPayoutStatusFilter = (status: string) => {
      this.superAdminPayoutStatusFilter = status;
      this.render();
    };

    w.setPayoutRoleFilter = (role: string) => {
      this.superAdminPayoutRoleFilter = role;
      this.render();
    };

    w.setPayoutRiskFilter = (risk: string) => {
      this.superAdminPayoutRiskFilter = risk;
      this.render();
    };

    w.handlePayoutSearch = (query: string) => {
      this.superAdminPayoutSearchQuery = query;
      this.render();
    };

    w.approveHighValuePayout = (id: string) => {
      const user = api.getCurrentUser();
      const success = api.approvePayout(id, user?.name || 'Dr. Dawit Haile (Super Admin)');
      if (success) {
        confetti({ particleCount: 90, spread: 60, origin: { y: 0.6 } });
        showToast(
          this.lang === 'am' ? 'ከፍተኛ የቴሌብር ክፍያ በዋና አድሚን ፀድቆ ተለቋል!' : 'High-value Telebirr payout approved & released!',
          'fa-circle-check',
          'border-emerald-500'
        );
        this.render();
      }
    };

    w.approveAllPendingPayouts = () => {
      const user = api.getCurrentUser();
      const pendingIds = api.getPendingPayoutApprovals().filter(p => p.status === 'Pending').map(p => p.id);
      if (pendingIds.length === 0) {
        showToast('No pending payouts to authorize.', 'fa-info-circle', 'border-slate-500');
        return;
      }

      const res = api.batchApprovePayouts(pendingIds, user?.name || 'Dr. Dawit Haile (Super Admin)');
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
      showToast(
        this.lang === 'am'
          ? `የ${res.approvedCount} ተጠቃሚዎች ክፍያ (${res.totalAmountEtb.toLocaleString()} ብር) በአንድ ጊዜ ፀድቆ ተለቋል!`
          : `Batch authorized ${res.approvedCount} payouts (${res.totalAmountEtb.toLocaleString()} ETB) simultaneously!`,
        'fa-check-double',
        'border-emerald-500'
      );
      this.render();
    };

    w.openRejectPayoutModal = (id: string) => {
      this.rejectTargetPayoutId = id;
      this.isSuperAdminRejectModalOpen = true;
      this.render();
    };

    w.handleRejectReasonChange = (val: string) => {
      const noteInput = document.getElementById('payoutRejectCustomNote') as HTMLTextAreaElement;
      if (!noteInput) return;
      if (val !== 'custom') {
        noteInput.value = `Flagged for: ${val}. Immediate compliance audit required.`;
      } else {
        noteInput.value = '';
        noteInput.focus();
      }
    };

    w.handleRejectPayoutSubmit = (e: Event, id: string) => {
      e.preventDefault();
      const user = api.getCurrentUser();
      const selectVal = (document.getElementById('payoutRejectReasonSelect') as HTMLSelectElement)?.value || 'Compliance audit flag';
      const customNote = (document.getElementById('payoutRejectCustomNote') as HTMLTextAreaElement)?.value;
      const finalReason = selectVal === 'custom' || customNote ? (customNote || selectVal) : selectVal;

      api.rejectPayout(id, user?.name || 'Dr. Dawit Haile (Super Admin)', finalReason);
      this.isSuperAdminRejectModalOpen = false;
      this.rejectTargetPayoutId = null;

      showToast(
        this.lang === 'am' ? 'የክፍያ ጥያቄው ውድቅ ተደርጎ ለደህንነት ምርመራ ታግዷል።' : 'Payout declined & flagged for compliance investigation.',
        'fa-ban',
        'border-red-500'
      );
      this.render();
    };

    w.openSimulatePayoutModal = () => {
      this.isSuperAdminSimulatePayoutModalOpen = true;
      this.render();
    };

    w.handleSimulatePayoutSubmit = (e: Event) => {
      e.preventDefault();
      const name = (document.getElementById('simPayoutName') as HTMLInputElement)?.value;
      const phone = (document.getElementById('simPayoutPhone') as HTMLInputElement)?.value;
      const role = ((document.getElementById('simPayoutRole') as HTMLSelectElement)?.value || 'farmer') as UserRole;
      const amount = Number((document.getElementById('simPayoutAmount') as HTMLInputElement)?.value) || 75000;
      const risk = ((document.getElementById('simPayoutRisk') as HTMLSelectElement)?.value || 'High') as 'Low' | 'Medium' | 'High';
      const crop = (document.getElementById('simPayoutCrop') as HTMLInputElement)?.value;
      const region = (document.getElementById('simPayoutRegion') as HTMLInputElement)?.value;
      const reason = (document.getElementById('simPayoutReason') as HTMLInputElement)?.value;

      api.createPayoutApproval({
        recipientId: `sim-user-${Date.now().toString().slice(-4)}`,
        recipientName: name,
        recipientPhone: phone,
        recipientRole: role,
        amountEtb: amount,
        riskScore: risk,
        cropName: crop,
        region: region,
        triggerReason: reason
      });

      this.isSuperAdminSimulatePayoutModalOpen = false;
      confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
      showToast(
        this.lang === 'am' ? `አዲስ የ${amount.toLocaleString()} ብር የክፍያ ጥያቄ ተፈጥሯል` : `Injected high-value payout request (${amount.toLocaleString()} ETB)`,
        'fa-money-bill-transfer',
        'border-amber-500'
      );
      this.render();
    };

    w.resetSuperAdminPayouts = () => {
      api.resetPayoutsToDefault();
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      showToast(
        this.lang === 'am' ? 'የክፍያ ጥያቄዎች ወደ መጀመሪያው (4) ተመልሰዋል!' : 'Reset to default initial payout requests (4 pending)!',
        'fa-rotate-left',
        'border-emerald-500'
      );
      this.render();
    };

    w.openPayoutDetailModal = (id: string) => {
      this.detailTargetPayoutId = id;
      this.isSuperAdminPayoutDetailModalOpen = true;
      this.render();
    };

    w.manualReleaseOrderEscrow = (orderId: string) => {
      const user = api.getCurrentUser();
      const note = prompt('Provide authorization rationale for manual escrow release:', 'Super Admin validated physical buyer receipt.');
      if (!note) return;

      const success = api.manualReleaseOrderEscrow(orderId, user?.name || 'Dr. Dawit Haile (Super Admin)', note);
      if (success) {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
        showToast(
          this.lang === 'am' ? 'የትዕዛዝ ገንዘብ በእጅ ተለቋል!' : `Manual escrow release authorized for Order #${orderId.slice(0, 8).toUpperCase()}`,
          'fa-lock-open',
          'border-emerald-500'
        );
        this.render();
      }
    };

    w.exportFinancialStatement = (format: string = 'csv') => {
      const csvData = api.exportFinancialStatementCsv();
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `FarmerMarket_Financial_Ledger_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showToast('Financial ledger exported to CSV successfully!', 'fa-file-arrow-down', 'border-emerald-500');
    };

    w.toggleFeatureFlag = (key: string) => {
      const flag = api.toggleFeatureFlag(key);
      showToast(`${flag.name}: ${flag.enabled ? 'ENABLED' : 'DISABLED'}`, 'fa-toggle-on', flag.enabled ? 'border-emerald-500' : 'border-slate-500');
      this.render();
    };

    w.toggleEmergencyEscrowFreeze = () => {
      const current = api.getPlatformConfig();
      const nextFrozen = !current.emergencyEscrowFrozen;
      api.updatePlatformConfig({ emergencyEscrowFrozen: nextFrozen });

      if (nextFrozen) {
        alert('EMERGENCY ESCROW FREEZE ACTIVATED!\nAll automatic Telebirr payouts and order releases have been halted platform-wide.');
        showToast('EMERGENCY ESCROW FREEZE ACTIVATED!', 'fa-lock', 'border-red-500');
      } else {
        showToast('Platform escrow unfrozen. Normal operations restored.', 'fa-lock-open', 'border-emerald-500');
      }
      this.render();
    };

    w.handleAddZoneSubmit = (e: Event) => {
      e.preventDefault();
      const name = (document.getElementById('zoneNameInput') as HTMLInputElement)?.value;
      const clusterHubName = (document.getElementById('zoneHubInput') as HTMLInputElement)?.value;
      const centerLatitude = Number((document.getElementById('zoneLatInput') as HTMLInputElement)?.value);
      const centerLongitude = Number((document.getElementById('zoneLngInput') as HTMLInputElement)?.value);
      const baseRadiusKm = Number((document.getElementById('zoneRadiusInput') as HTMLInputElement)?.value);
      const ruralSubsidyEtb = Number((document.getElementById('zoneBonusInput') as HTMLInputElement)?.value);

      api.addDeliveryZone({
        name,
        clusterHubName,
        centerLatitude,
        centerLongitude,
        baseRadiusKm,
        maxRadiusKm: baseRadiusKm * 2.5,
        ruralSubsidyEtb,
        active: true,
        smallholdersCount: 500
      });

      this.isSuperAdminAddZoneModalOpen = false;
      showToast(`Added regional delivery zone: ${name}`, 'fa-map-location-dot', 'border-teal-500');
      this.render();
    };

    w.deleteZone = (id: string) => {
      api.deleteDeliveryZone(id);
      showToast('Delivery zone removed.', 'fa-trash', 'border-slate-500');
      this.render();
    };

    w.handleAddBlacklistSubmit = (e: Event) => {
      e.preventDefault();
      const type = (document.getElementById('blTypeSelect') as HTMLSelectElement)?.value as any;
      const value = (document.getElementById('blValueInput') as HTMLInputElement)?.value;
      const reason = (document.getElementById('blReasonInput') as HTMLTextAreaElement)?.value;
      const u = api.getCurrentUser();

      api.addToBlacklist({
        type,
        value,
        reason,
        blacklistedBy: u?.name || 'Super Admin',
        active: true
      });

      this.isSuperAdminAddBlacklistModalOpen = false;
      showToast(`Entity blacklisted: ${value}`, 'fa-ban', 'border-red-500');
      this.render();
    };

    w.removeFromBlacklist = (id: string) => {
      api.removeFromBlacklist(id);
      showToast('Entity removed from blacklist.', 'fa-circle-check', 'border-emerald-500');
      this.render();
    };

    w.handleSaveBusinessRules = (e: Event) => {
      e.preventDefault();
      const minOrderKg = Number((document.getElementById('ruleMinOrderKg') as HTMLInputElement)?.value) || 10;
      const maxOrderKg = Number((document.getElementById('ruleMaxOrderKg') as HTMLInputElement)?.value) || 50000;
      const maxDistanceKm = Number((document.getElementById('ruleMaxDistanceKm') as HTMLInputElement)?.value) || 450;
      const priceCeilingVariancePercent = Number((document.getElementById('rulePriceCeiling') as HTMLInputElement)?.value) || 250;

      api.updateGlobalBusinessRules({
        minOrderKg,
        maxOrderKg,
        maxDistanceKm,
        priceCeilingVariancePercent
      });

      showToast('Global trading business rules saved!', 'fa-gavel', 'border-emerald-500');
      this.render();
    };

    w.triggerDbBackup = () => {
      const backup = api.triggerDatabaseBackup();
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      showToast(`PostgreSQL backup snapshot generated (${backup.backupId})!`, 'fa-database', 'border-blue-500');
      this.render();
    };

    w.runDbMaintenance = () => {
      api.optimizeDatabase();
      showToast('VACUUM ANALYZE and spatial indexing optimization complete!', 'fa-bolt', 'border-emerald-500');
      this.render();
    };

    w.resetSuperAdminZones = () => {
      api.resetDeliveryZonesToDefault();
      showToast('Delivery zones reset to 6 default Ethiopian corridors.', 'fa-rotate-left', 'border-teal-500');
      this.render();
    };

    w.resetSuperAdminFlags = () => {
      api.resetFeatureFlagsToDefault();
      showToast('Feature flags reset to baseline configuration.', 'fa-rotate-left', 'border-indigo-500');
      this.render();
    };

    w.resetSuperAdminBlacklist = () => {
      api.resetBlacklistToDefault();
      showToast('Blacklist reset to default entries.', 'fa-rotate-left', 'border-red-500');
      this.render();
    };

    w.resetSuperAdminRules = () => {
      api.resetBusinessRulesToDefault();
      showToast('Business rules reset to platform defaults.', 'fa-rotate-left', 'border-amber-500');
      this.render();
    };

    w.resetSuperAdminAuditLogs = () => {
      api.resetAuditLogsToDefault();
      showToast('Audit logs reset to baseline entries (5 logs).', 'fa-rotate-left', 'border-blue-500');
      this.render();
    };

    w.resetAllSuperAdminData = () => {
      api.resetAllSuperAdminDataToDefault();
      showToast('All Super Admin governance parameters reset to default.', 'fa-arrows-rotate', 'border-rose-500');
      this.render();
    };

    w.exportPlatformData = (format: 'json' | 'csv') => {
      const exp = api.exportPlatformData(format);
      const link = document.createElement('a');
      link.href = exp.dataUrl;
      link.download = exp.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast(`Downloaded full platform data export (${format.toUpperCase()})!`, 'fa-download', 'border-emerald-500');
      this.render();
    };

    w.openUssdSimulator = (presetCode?: string) => {
      ussdSimulator.open(presetCode);
    };

    w.openMarketIntelligence = () => {
      marketIntelligenceModal.open();
    };
  }
}

new App();

