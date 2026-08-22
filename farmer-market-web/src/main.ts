import confetti from 'canvas-confetti';
import { Language } from './i18n/translations';
import { api } from './services/api';
import { signalRService } from './services/signalr.service';
import { CartItem, Order, UserRole, Listing } from './types';
import { renderNavbar } from './components/Navbar';
import { renderBuyerView } from './components/BuyerView';
import { renderFarmerView } from './components/FarmerView';
import { renderDriverView } from './components/DriverView';
import { renderAdminView } from './components/AdminView';
import { renderNotificationsModal } from './components/NotificationsModal';
import { renderAuthModal } from './components/AuthModal';

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
  private activeTab: string = 'marketplace';
  private activeCategory: string = 'All';
  private selectedRegion: string = 'All';
  private searchQuery: string = '';
  private cart: CartItem[] = [];
  private isCartOpen: boolean = false;
  private isNotificationsModalOpen: boolean = false;
  private isCreateListingModalOpen: boolean = false;
  private activeOrderModal: Order | null = null;
  private activeTelebirrModal: { isOpen: boolean; totalEtb: number; listingId?: string; qtyKg?: number } | null = null;

  // Auth Modal State
  private isAuthModalOpen: boolean = false;
  private authMode: 'login' | 'register' = 'login';
  private otpStep: boolean = false;
  private pendingPhone: string = '';
  private lastSentCode: string = '';
  private matchedUserName: string = '';
  private matchedUserRole: string = '';
  private authErrorMessage: string = '';

  constructor() {
    this.init();
  }

  private async init() {
    this.attachGlobalWindowHandlers();

    // Connect to SignalR Order Hub
    signalRService.startConnection(api.getToken() || undefined);
    signalRService.onOrderStatusChanged(async (orderId, status, message) => {
      console.log(`[SignalR Live Status Update] Order ${orderId} -> ${status}: ${message}`);
      if (this.activeOrderModal && this.activeOrderModal.id === orderId) {
        this.activeOrderModal.status = status;
      }
      showToast(`Live Update: Order #${orderId.slice(0, 8).toUpperCase()} is now ${status.toUpperCase()}`, 'fa-bolt', 'border-blue-500');
      await api.refreshAllData();
      this.render();
    });

    api.subscribe(() => {
      this.render();
    });

    // Initial fetch from PostgreSQL backend
    await api.refreshAllData();

    // Auto-navigate to role's home view if logged in
    const u = api.getCurrentUser();
    if (u) {
      if (u.role === 'farmer') this.activeTab = 'farmer';
      else if (u.role === 'driver') this.activeTab = 'driver';
      else if (u.role === 'admin') this.activeTab = 'admin';
      else this.activeTab = 'marketplace';
    }

    this.render();
  }

  public render() {
    const appEl = document.getElementById('app');
    if (!appEl) return;

    const currentUser = api.getCurrentUser();
    const isAuthenticated = api.isAuthenticated();
    const notifications = api.getNotifications();
    const unreadCount = notifications.filter(n => !n.read).length;

    // Filter produce
    const listings = api.getListings(this.activeCategory, this.selectedRegion, this.searchQuery);

    let viewHtml = '';
    if (this.activeTab === 'farmer' && isAuthenticated && currentUser?.role === 'farmer') {
      const farmerListings = api.getListings().filter(l => l.farmerId === currentUser.id);
      const farmerOrders = api.getOrders('farmer');
      const summary = api.getFarmerSummary();
      viewHtml = renderFarmerView(this.lang, farmerListings, farmerOrders, summary, this.isCreateListingModalOpen);
    } else if (this.activeTab === 'driver' && isAuthenticated && currentUser?.role === 'driver') {
      const driverOrders = api.getOrders('driver');
      const summary = api.getDriverSummary();
      viewHtml = renderDriverView(this.lang, driverOrders, summary);
    } else if (this.activeTab === 'admin' && isAuthenticated && currentUser?.role === 'admin') {
      const stats = api.getPlatformStats();
      const disputedOrders = api.getOrders().filter(o => o.status === 'disputed');
      viewHtml = renderAdminView(this.lang, stats, disputedOrders);
    } else {
      // Default Wholesale Produce Marketplace (for Buyers or Logged Out Guests)
      viewHtml = renderBuyerView(
        this.lang,
        listings,
        this.activeCategory,
        this.selectedRegion,
        this.searchQuery,
        this.cart,
        this.isCartOpen,
        this.activeOrderModal,
        this.activeTelebirrModal
      );
    }

    appEl.innerHTML = `
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
              Ethiopia's leading bilingual B2B produce exchange. Directly linking 15M+ smallholder farmers with wholesale buyers, hotels, and supermarkets.
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
            <h4 class="font-bold text-white text-sm">Escrow & Governance</h4>
            <ul class="space-y-1.5 text-slate-400">
              <li><span class="text-slate-300">90% Direct Farmer Payout</span></li>
              <li><span class="text-slate-300">5% Dedicated Isuzu Freight Logistics</span></li>
              <li><span class="text-slate-300">5% Platform Operational Commission</span></li>
              <li><span class="text-slate-300">100% Buyer Quality Guarantee</span></li>
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
            <span>Powered by .NET 9 Clean Architecture + Vite + PostgreSQL PostGIS</span>
          </div>
        </div>
      </footer>

      <!-- Real Authentication Modal -->
      ${this.isAuthModalOpen ? renderAuthModal(
      this.lang,
      this.authMode,
      this.otpStep,
      this.pendingPhone,
      this.lastSentCode,
      this.matchedUserName,
      this.matchedUserRole,
      this.authErrorMessage
    ) : ''}
      ${this.isNotificationsModalOpen ? renderNotificationsModal(this.lang, notifications) : ''}
    `;
  }

  private attachGlobalWindowHandlers() {
    const w = window as any;

    w.navigateTab = (tab: string) => {
      this.activeTab = tab;
      this.render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    w.toggleLanguage = () => {
      this.lang = this.lang === 'en' ? 'am' : 'en';
      localStorage.setItem('lang', this.lang);
      showToast(this.lang === 'am' ? 'ቋንቋ ወደ አማርኛ ተቀይሯል' : 'Language switched to English', 'fa-globe');
      this.render();
    };

    // Authentication Handlers
    w.openAuthModal = (mode: 'login' | 'register' = 'login') => {
      this.authMode = mode;
      this.otpStep = false;
      this.authErrorMessage = '';
      this.matchedUserName = '';
      this.matchedUserRole = '';
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
        this.otpStep = true;
        showToast(`SMS verification code dispatched to +251 ${phoneInput}`, 'fa-comment-sms', 'border-emerald-500');
      } catch (err: any) {
        this.authErrorMessage = err.message || 'No account registered with this phone number. Please register first.';
        this.otpStep = false;
        showToast(this.authErrorMessage, 'fa-circle-xmark', 'border-red-500');
      }

      this.render();
    };

    w.handleVerifyOtp = async (e: Event) => {
      e.preventDefault();
      const otp = (document.getElementById('authOtpInput') as HTMLInputElement).value.trim();
      if (!otp) {
        showToast('Please enter the 6-digit verification code', 'fa-triangle-exclamation', 'border-red-500');
        return;
      }

      const btn = document.getElementById('verifyOtpBtn') as HTMLButtonElement;
      if (btn) {
        btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Verifying...`;
        btn.disabled = true;
      }

      try {
        const user = await api.verifyOtp(this.pendingPhone, otp);
        this.isAuthModalOpen = false;
        this.authErrorMessage = '';

        // Auto-navigate to user's portal
        if (user.role === 'farmer') this.activeTab = 'farmer';
        else if (user.role === 'driver') this.activeTab = 'driver';
        else if (user.role === 'admin') this.activeTab = 'admin';
        else this.activeTab = 'marketplace';

        confetti({ particleCount: 100, spread: 60, origin: { y: 0.6 } });
        showToast(`Welcome back, ${user.name}!`, 'fa-user-check');
      } catch (err: any) {
        this.authErrorMessage = err.message || 'Invalid verification code. Please check your SMS or try again.';
        showToast(this.authErrorMessage, 'fa-circle-xmark', 'border-red-500');
      }

      this.render();
    };

    w.handleRegisterUser = async (e: Event) => {
      e.preventDefault();
      const name = (document.getElementById('regName') as HTMLInputElement).value.trim();
      const nameAm = (document.getElementById('regNameAm') as HTMLInputElement).value.trim();
      const phone = (document.getElementById('regPhone') as HTMLInputElement).value.trim();
      const region = (document.getElementById('regRegion') as HTMLSelectElement).value;
      const role = ((document.querySelector('input[name="regRole"]:checked') as HTMLInputElement)?.value || 'farmer') as UserRole;

      if (!name || !phone) {
        showToast('Please fill in all required fields', 'fa-triangle-exclamation', 'border-red-500');
        return;
      }

      const btn = document.getElementById('registerSubmitBtn') as HTMLButtonElement;
      if (btn) {
        btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Registering in Database...`;
        btn.disabled = true;
      }

      this.authErrorMessage = '';

      try {
        const newUser = await api.registerUser(name, nameAm, phone, role, region);
        this.isAuthModalOpen = false;

        if (newUser.role === 'farmer') this.activeTab = 'farmer';
        else if (newUser.role === 'driver') this.activeTab = 'driver';
        else if (newUser.role === 'admin') this.activeTab = 'admin';
        else this.activeTab = 'marketplace';

        confetti({ particleCount: 140, spread: 80, origin: { y: 0.6 } });
        showToast(`Registration Complete! Welcome to Farmer-to-Market, ${name}.`, 'fa-champagne-glasses');
      } catch (err: any) {
        this.authErrorMessage = err.message || 'Registration failed. Please try again.';
        showToast(this.authErrorMessage, 'fa-circle-xmark', 'border-red-500');
      }

      this.render();
    };

    w.handleLogout = () => {
      api.logout();
      this.activeTab = 'marketplace';
      showToast('You have been signed out.', 'fa-arrow-right-from-bracket', 'border-slate-500');
      this.render();
    };

    w.openNotificationsModal = () => {
      this.isNotificationsModalOpen = true;
      this.render();
    };

    w.closeNotificationsModal = () => {
      this.isNotificationsModalOpen = false;
      this.render();
    };

    w.setCategory = (cat: string) => {
      this.activeCategory = cat;
      this.render();
    };

    w.setRegion = (region: string) => {
      this.selectedRegion = region;
      this.render();
    };

    w.setSearchQuery = (query: string) => {
      this.searchQuery = query;
      this.render();
    };

    w.toggleCart = () => {
      this.isCartOpen = !this.isCartOpen;
      this.render();
    };

    w.quickBuy = (listingId: string) => {
      if (!api.isAuthenticated()) {
        w.openAuthModal('login');
        showToast('Please sign in to place wholesale orders', 'fa-right-to-bracket', 'border-amber-500');
        return;
      }

      const listing = api.getListingById(listingId);
      if (!listing) return;

      const existing = this.cart.find(c => c.listing.id === listingId);
      if (existing) {
        existing.qtyKg += listing.minOrderKg;
      } else {
        this.cart.push({ listing, qtyKg: listing.minOrderKg });
      }
      this.isCartOpen = true;
      showToast(`Added ${listing.minOrderKg}kg of ${listing.productName} to bulk cart`, 'fa-cart-plus');
      this.render();
    };

    w.updateCartQty = (listingId: string, delta: number) => {
      const item = this.cart.find(c => c.listing.id === listingId);
      if (item) {
        item.qtyKg = Math.max(item.listing.minOrderKg, item.qtyKg + delta);
        this.render();
      }
    };

    w.removeFromCart = (listingId: string) => {
      this.cart = this.cart.filter(c => c.listing.id !== listingId);
      showToast('Item removed from cart', 'fa-trash-can', 'border-red-500');
      this.render();
    };

    w.openTelebirrModal = () => {
      if (!api.isAuthenticated()) {
        w.openAuthModal('login');
        return;
      }
      const total = this.cart.reduce((sum, item) => sum + (item.qtyKg * item.listing.pricePerKg), 0);
      this.activeTelebirrModal = {
        isOpen: true,
        totalEtb: total
      };
      this.render();
    };

    w.closeTelebirrModal = () => {
      this.activeTelebirrModal = null;
      this.render();
    };

    w.processTelebirrPayment = async (e: Event) => {
      e.preventDefault();
      const btn = document.getElementById('telebirrSubmitBtn') as HTMLButtonElement;
      if (btn) {
        btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Authorizing with Telebirr Escrow...`;
        btn.disabled = true;
      }

      try {
        let lastOrder: Order | null = null;
        for (const item of this.cart) {
          lastOrder = await api.placeOrder(item.listing.id, item.qtyKg);
        }

        this.cart = [];
        this.isCartOpen = false;
        this.activeTelebirrModal = null;

        // Confetti celebration
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });

        showToast('Payment secured via Telebirr Escrow! Order dispatched to farmer.', 'fa-lock', 'border-blue-500');

        if (lastOrder) {
          this.activeOrderModal = lastOrder;
        }
      } catch (err: any) {
        showToast(err.message || 'Payment authorization failed.', 'fa-circle-xmark', 'border-red-500');
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

    w.confirmFarmerOrder = async (orderId: string) => {
      await api.confirmOrderByFarmer(orderId);
      signalRService.joinOrder(orderId);
      showToast('Order confirmed! Driver notified for farm pickup.', 'fa-circle-check');
      this.render();
    };

    w.driverPickup = async (orderId: string) => {
      await api.pickupOrderByDriver(orderId, 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80');
      showToast('Produce picked up! Transit to buyer depot started.', 'fa-truck-fast', 'border-amber-500');
      this.render();
    };

    w.driverCompleteDelivery = (orderId: string) => {
      showToast('Trip destination reached. Awaiting buyer confirmation.', 'fa-location-dot');
      this.render();
    };

    w.confirmDelivery = async (orderId: string) => {
      await api.confirmDeliveryByBuyer(orderId);

      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });

      showToast('Delivery Confirmed! 90% released to Farmer, 5% to Driver.', 'fa-hand-holding-dollar', 'border-emerald-500');
      this.render();
    };

    w.raiseDispute = async (orderId: string) => {
      await api.disputeOrder(orderId, 'Product quality damaged during delivery');
      showToast('Dispute registered. Escrow locked under Admin review.', 'fa-triangle-exclamation', 'border-red-500');
      this.render();
    };

    w.adminResolveDispute = async (orderId: string, resolution: 'ReleaseToFarmer' | 'RefundBuyer') => {
      await api.resolveDispute(orderId, resolution);
      showToast(`Dispute resolved: ${resolution}`, 'fa-gavel', 'border-purple-500');
      this.render();
    };

    w.toggleCreateListingModal = () => {
      this.isCreateListingModalOpen = !this.isCreateListingModalOpen;
      this.render();
    };

    w.handleCreateListing = async (e: Event) => {
      e.preventDefault();
      const prodName = (document.getElementById('newProdName') as HTMLInputElement).value;
      const prodNameAm = (document.getElementById('newProdNameAm') as HTMLInputElement).value;
      const category = (document.getElementById('newProdCategory') as HTMLSelectElement).value;
      const qty = parseFloat((document.getElementById('newProdQty') as HTMLInputElement).value);
      const price = parseFloat((document.getElementById('newProdPrice') as HTMLInputElement).value);
      const minOrder = parseFloat((document.getElementById('newProdMinOrder') as HTMLInputElement).value);
      const region = (document.getElementById('newProdRegion') as HTMLInputElement).value;
      const photo = (document.getElementById('newProdPhoto') as HTMLInputElement).value;

      try {
        await api.createListing({
          productName: prodName,
          nameAm: prodNameAm,
          category,
          qtyKg: qty,
          pricePerKg: price,
          minOrderKg: minOrder,
          region,
          farmerNameAm: prodNameAm ? 'አበበ በቀለ' : undefined,
          latitude: 8.7523,
          longitude: 38.9785,
          photos: [photo],
          availableFrom: new Date().toISOString().split('T')[0]
        });

        this.isCreateListingModalOpen = false;
        showToast(`Published ${prodName} to PostgreSQL database!`, 'fa-cloud-arrow-up');
      } catch (err: any) {
        showToast(err.message || 'Failed to publish listing', 'fa-circle-xmark', 'border-red-500');
      }

      this.render();
    };

    w.handleBroadcastSms = async (e: Event) => {
      e.preventDefault();
      const en = (document.getElementById('broadcastEn') as HTMLTextAreaElement).value;
      const am = (document.getElementById('broadcastAm') as HTMLTextAreaElement).value;
      const target = (document.getElementById('broadcastTarget') as HTMLSelectElement).value;

      await api.broadcastSms(en, am, target);
      showToast(this.lang === 'am' ? 'የኤስኤምኤስ መልእክት ለአርሶ አደሮች ተልኳል!' : 'SMS Broadcast sent to all registered farmers via Twilio!', 'fa-paper-plane');
      this.render();
    };
  }
}

new App();
