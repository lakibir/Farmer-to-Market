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
import { AgentView } from './components/AgentView';
import { VerificationWizardModal } from './components/VerificationWizardModal';
import { renderNotificationsModal } from './components/NotificationsModal';
import { renderAuthModal } from './components/AuthModal';
import { documentModal } from './components/DocumentModal';

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
  private activeDisputeModal: { isOpen: boolean; order: Order } | null = null;

  // Legal & Official Document Modal State
  private activeLegalDocModal: { isOpen: boolean; type: 'invoice' | 'waybill' | 'contract' | 'arbitration'; orderId: string } | null = null;

  // Advanced Filters
  private maxDistanceKm: number = 0;
  private activeGrade: string = 'All';
  private activeRipeness: string = 'All';
  private organicOnly: boolean = false;
  private advanceOnly: boolean = false;
  private activeBuyerSubTab: 'marketplace' | 'orders' | 'standing_orders' = 'marketplace';

  // Farmer & Admin Sub-Tabs
  private activeFarmerTab: 'listings' | 'wallet' | 'sms' = 'listings';
  private activeAdminTab: 'disputes' | 'anomalies' | 'kyc' | 'tax_compliance' | 'analytics' | 'sms' = 'disputes';

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
    if (this.activeTab === 'farmer' && isAuthenticated && currentUser?.role === 'farmer') {
      const farmerListings = api.getListings().filter(l => l.farmerId === currentUser.id);
      const farmerOrders = api.getOrders('farmer');
      const summary = api.getFarmerSummary();
      viewHtml = renderFarmerView(
        this.lang,
        farmerListings,
        farmerOrders,
        summary,
        this.isCreateListingModalOpen,
        this.activeFarmerTab,
        api.getPriceBenchmarks(),
        currentUser
      );
    } else if (this.activeTab === 'driver' && isAuthenticated && currentUser?.role === 'driver') {
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
    } else if (this.activeTab === 'admin' && isAuthenticated && currentUser?.role === 'admin') {
      const stats = api.getPlatformStats();
      const disputedOrders = api.getOrders().filter(o => o.status === 'disputed');
      viewHtml = renderAdminView(
        this.lang,
        stats,
        disputedOrders,
        api.getAnomalyAlerts(),
        api.getKycQueue(),
        api.getRegionalAnalytics(),
        this.activeAdminTab
      );
    } else if (this.activeTab === 'agent' || (isAuthenticated && currentUser?.role === 'agent')) {
      this.agentView.setLanguage(this.lang);
      viewHtml = this.agentView.render();
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
              <li><span class="text-slate-300">90% Direct Farmer Payout (Tax-Exempt Produce)</span></li>
              <li><span class="text-slate-300">5% Transport Logistics with Official FTA Waybills</span></li>
              <li><span class="text-slate-300">15% VAT on Platform Service Remitted to MOR</span></li>
              <li><span class="text-slate-300">2% Withholding Declaration Compliance (Proclamation 979)</span></li>
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
      this.authErrorMessage
    ) : ''}
      
      <!-- Notifications Modal -->
      ${this.isNotificationsModalOpen ? renderNotificationsModal(this.lang, notifications) : ''}

      <!-- Verification Wizard Modal Container -->
      <div id="verificationWizardModal"></div>

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

    // Sub-Tab Switchers
    w.setBuyerSubTab = (tab: 'marketplace' | 'orders' | 'standing_orders') => {
      this.activeBuyerSubTab = tab;
      this.render();
    };

    w.toggleFarmerTab = (tab: 'listings' | 'wallet' | 'sms') => {
      this.activeFarmerTab = tab;
      this.render();
    };

    w.setAdminTab = (tab: 'disputes' | 'anomalies' | 'kyc' | 'tax_compliance' | 'analytics' | 'sms') => {
      this.activeAdminTab = tab;
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

        if (user.role === 'farmer') this.activeTab = 'farmer';
        else if (user.role === 'driver') this.activeTab = 'driver';
        else if (user.role === 'admin') this.activeTab = 'admin';
        else this.activeTab = 'marketplace';

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

      const btn = document.getElementById('registerSubmitBtn') as HTMLButtonElement;
      if (btn) {
        btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Registering in PostgreSQL...`;
        btn.disabled = true;
      }

      try {
        const user = await api.registerUser(name, nameAm, phone, role, region);
        this.isAuthModalOpen = false;
        this.authErrorMessage = '';

        if (user.role === 'farmer') this.activeTab = 'farmer';
        else if (user.role === 'driver') this.activeTab = 'driver';
        else if (user.role === 'admin') this.activeTab = 'admin';
        else this.activeTab = 'marketplace';

        confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
        showToast(`Welcome to Farmer-to-Market, ${user.name}!`, 'fa-circle-check', 'border-emerald-500');
      } catch (err: any) {
        this.authErrorMessage = err.message || 'Registration failed. Please try a different phone number.';
      }

      this.render();
    };

    w.handleRegisterUser = registerHandler;
    w.handleRegisterSubmit = registerHandler;

    w.handleLogout = () => {
      api.logout();
      this.activeTab = 'marketplace';
      this.cart = [];
      showToast('Logged out successfully', 'fa-arrow-right-from-bracket');
      this.render();
    };

    // Switch Demo User
    w.switchDemoUser = async (phone: string) => {
      try {
        const res = await api.requestOtp(phone);
        if (res.demoCode) {
          const user = await api.verifyOtp(phone, res.demoCode);
          if (user.role === 'farmer') this.activeTab = 'farmer';
          else if (user.role === 'driver') this.activeTab = 'driver';
          else if (user.role === 'admin') this.activeTab = 'admin';
          else this.activeTab = 'marketplace';

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
        let placedOrder: Order | null = null;
        for (const item of this.cart) {
          placedOrder = await api.placeOrder(item.listing.id, item.qtyKg);
        }
        this.cart = [];
        this.isCartOpen = false;
        this.activeTelebirrModal = null;

        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
        showToast('Payment Authorized! Funds locked in Telebirr Escrow. Order Dispatched.', 'fa-lock', 'border-blue-500');

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

    w.confirmFarmerOrder = async (orderId: string) => {
      await api.confirmOrderByFarmer(orderId);
      signalRService.joinOrder(orderId);
      showToast('Order confirmed! Driver notified for farm pickup.', 'fa-circle-check');
      this.render();
    };

    w.confirmDelivery = async (orderId: string) => {
      await api.confirmDeliveryByBuyer(orderId);
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      showToast('Delivery Confirmed! 90% released to Farmer, 5% to Driver.', 'fa-hand-holding-dollar', 'border-emerald-500');
      this.render();
    };

    w.adminResolveDispute = async (orderId: string, resolution: 'ReleaseToFarmer' | 'RefundBuyer' | 'PartialSplit') => {
      await api.resolveDispute(orderId, resolution);
      showToast(`Dispute resolved: ${resolution}. Decree generated.`, 'fa-gavel', 'border-purple-500');
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
  }
}

new App();

