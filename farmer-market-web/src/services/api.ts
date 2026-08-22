import {
  Listing, Order, User, PlatformStats, PaymentSummary, DriverSummary,
  UserRole, OrderStatus, NotificationItem, PriceBenchmark, StandingOrder,
  AnomalyAlert, KycVerificationItem, RegionalAnalytics, OptimizedRoute, OfflineAction,
  TaxInvoice, TransportWaybill, LegalContract, DisputeMediationRecord
} from '../types';
import { signalRService } from './signalr.service';

class ApiService {
  private token: string | null = localStorage.getItem('token') || null;
  private currentUser: User | null = this.loadStoredUser();
  private isUserLoggedIn: boolean = !!this.token && !!this.currentUser;
  private listeners: Array<() => void> = [];

  // Synced state from PostgreSQL / API
  private listings: Listing[] = [];
  private orders: Order[] = [];
  private notifications: NotificationItem[] = [];
  private standingOrders: StandingOrder[] = [];
  private anomalyAlerts: AnomalyAlert[] = [];
  private kycQueue: KycVerificationItem[] = [];
  private regionalAnalytics: RegionalAnalytics[] = [];
  private priceBenchmarks: PriceBenchmark[] = [];
  private offlineQueue: OfflineAction[] = [];
  private isOfflineMode: boolean = false;

  private farmerSummary: PaymentSummary = {
    totalEarnedEtb: 48200,
    pendingEscrowEtb: 14850,
    releasedEtb: 48200,
    completedOrdersCount: 18,
    pendingOrdersCount: 1,
    totalWithholdingTaxPaidEtb: 964
  };

  private driverSummary: DriverSummary = {
    totalEarnedEtb: 6450,
    pendingEtb: 825,
    deliveredTripsCount: 14,
    ruralBonusEtb: 1250
  };

  private platformStats: PlatformStats = {
    totalUsers: 6,
    totalFarmers: 3,
    totalBuyers: 1,
    totalDrivers: 1,
    totalListings: 6,
    totalOrders: 3,
    totalTransactionVolumeEtb: 34500,
    totalPlatformCommissionEtb: 1725,
    activeEscrowHeldEtb: 25500,
    disputedOrdersCount: 1,
    totalMetricTonsMoved: 145.8,
    middlemanMarginSavedEtb: 480000,
    totalVatRemittedEtb: 258.75,
    totalWithholdingReportedEtb: 690.00
  };

  constructor() {
    this.init();
  }

  private loadStoredUser(): User | null {
    try {
      const stored = localStorage.getItem('currentUser');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  private async init() {
    this.loadOfflineQueue();
    this.initDefaultData();
    if (this.token) {
      await this.fetchMe();
    }
    await this.refreshAllData();
  }

  private initDefaultData() {
    this.priceBenchmarks = [
      { cropName: "Fresh Sholla Red Tomatoes", cropNameAm: "ቀይ ቲማቲም", marketName: "Merkato Wholesale / Sholla", minPriceEtb: 38, avgPriceEtb: 45, maxPriceEtb: 52, trend: "Down", lastUpdated: "Today 6:00 AM" },
      { cropName: "Organic Magna White Teff", cropNameAm: "የማኛ ነጭ ጤፍ", marketName: "EABC / Addis Depot", minPriceEtb: 108, avgPriceEtb: 115, maxPriceEtb: 125, trend: "Up", lastUpdated: "Today 7:30 AM" },
      { cropName: "Awash Valley Red Onions", cropNameAm: "ቀይ ሽንኩርት", marketName: "Adama Wholesale Market", minPriceEtb: 48, avgPriceEtb: 55, maxPriceEtb: 62, trend: "Stable", lastUpdated: "Today 6:15 AM" },
      { cropName: "Hawassa Hass Avocados", cropNameAm: "ሀስ አቮካዶ", marketName: "Hawassa Central / Merkato", minPriceEtb: 50, avgPriceEtb: 60, maxPriceEtb: 72, trend: "Up", lastUpdated: "Today 8:00 AM" },
      { cropName: "Specialty Green Coffee Beans", cropNameAm: "ስፔሻሊቲ ቡና", marketName: "ECX Central Exchange", minPriceEtb: 340, avgPriceEtb: 380, maxPriceEtb: 420, trend: "Up", lastUpdated: "Yesterday" },
      { cropName: "Bishoftu Sweet Strawberries", cropNameAm: "የቢሾፍቱ እንጆሪ", marketName: "Bole Fresh Produce Hub", minPriceEtb: 85, avgPriceEtb: 95, maxPriceEtb: 110, trend: "Stable", lastUpdated: "Today 7:00 AM" }
    ];

    this.standingOrders = [
      {
        id: "so-1",
        listingId: "a1b2c3d4-0001-0000-0000-000000000001",
        productName: "Fresh Sholla Red Tomatoes",
        productNameAm: "የሾላ ቀይ ቲማቲም",
        farmerName: "Abebe Bekele",
        qtyKg: 150,
        pricePerKg: 45,
        frequency: "Weekly",
        nextDeliveryDate: "Next Monday, 8:00 AM",
        active: true,
        createdAt: new Date().toISOString()
      },
      {
        id: "so-2",
        listingId: "a1b2c3d4-0003-0000-0000-000000000003",
        productName: "Awash Valley Red Onions",
        productNameAm: "የአዋሽ ቀይ ሽንኩርት",
        farmerName: "Abebe Bekele",
        qtyKg: 200,
        pricePerKg: 55,
        frequency: "Bi-Weekly",
        nextDeliveryDate: "Next Thursday, 9:00 AM",
        active: true,
        createdAt: new Date().toISOString()
      }
    ];

    this.anomalyAlerts = [
      {
        id: "ANOM-101",
        severity: "High",
        type: "PriceManipulation",
        title: "Unusual Price Spike Detected",
        description: "Tomato listing posted at 180 ETB/kg (290% above regional market average). Flagged for review.",
        entityType: "Listing",
        entityId: "a1b2c3d4-0001-0000-0000-000000000001",
        detectedAt: "35 mins ago"
      },
      {
        id: "ANOM-102",
        severity: "Medium",
        type: "DuplicateProofPhoto",
        title: "Driver Proof Image Hash Match",
        description: "Driver Dawit submitted a delivery confirmation photo identical to an order completed yesterday.",
        entityType: "Order",
        entityId: "b1b2c3d4-0002-0000-0000-000000000002",
        detectedAt: "2 hours ago"
      },
      {
        id: "ANOM-103",
        severity: "Low",
        type: "FakeAccount",
        title: "Rapid Registration Cluster",
        description: "Three buyer accounts created within 90 seconds in Kaliti cluster. IP rate limiter triggered.",
        entityType: "User",
        entityId: "44444444-4444-4444-4444-444444444444",
        detectedAt: "5 hours ago"
      }
    ];

    this.kycQueue = [
      {
        userId: "55555555-5555-5555-5555-555555555555",
        userName: "Dawit Kebede (Driver)",
        userRole: "Driver",
        phone: "+251977889900",
        region: "Addis Ababa (Kaliti)",
        documentType: "Commercial Vehicle Logbook & License",
        documentNumber: "ET-LOG-5T-98214",
        tinNumber: "TIN-DRV-981244",
        kycTier: 3,
        status: "Pending",
        submittedAt: "Yesterday"
      },
      {
        userId: "11111111-1111-1111-1111-111111111111",
        userName: "Abebe Bekele (Farmer)",
        userRole: "Farmer",
        phone: "+251911223344",
        region: "Oromia (Bishoftu)",
        documentType: "National ID (Fayda)",
        documentNumber: "FAYDA-ET-8829104",
        tinNumber: "TIN-FARM-882910",
        kycTier: 2,
        status: "Verified",
        submittedAt: "3 days ago"
      },
      {
        userId: "33333333-3333-3333-3333-333333333333",
        userName: "Chala Gemechu (Farmer)",
        userRole: "Farmer",
        phone: "+251933445566",
        region: "Sidama (Hawassa)",
        documentType: "Kebele Smallholder ID",
        documentNumber: "HAW-KEB-4410",
        kycTier: 1,
        status: "Pending",
        submittedAt: "12 hours ago"
      }
    ];

    this.regionalAnalytics = [
      { region: "Oromia (East Shewa / Bishoftu)", smallholdersCount: 4200, volumeMetricTons: 68.5, totalGmvEtb: 3850000, topCrop: "Tomatoes & Onions" },
      { region: "Amhara (Debre Berhan / Gojjam)", smallholdersCount: 3100, volumeMetricTons: 42.0, totalGmvEtb: 4830000, topCrop: "Magna White Teff" },
      { region: "Sidama (Hawassa / Yirgalem)", smallholdersCount: 1950, volumeMetricTons: 24.8, totalGmvEtb: 1488000, topCrop: "Hass Avocados & Fruits" },
      { region: "SNNPR (Gedeo / Yirgacheffe)", smallholdersCount: 1400, volumeMetricTons: 10.5, totalGmvEtb: 3990000, topCrop: "Specialty Green Coffee" }
    ];
  }

  private loadOfflineQueue() {
    try {
      const stored = localStorage.getItem('offlineQueue');
      if (stored) this.offlineQueue = JSON.parse(stored);
    } catch {
      this.offlineQueue = [];
    }
  }

  private saveOfflineQueue() {
    localStorage.setItem('offlineQueue', JSON.stringify(this.offlineQueue));
  }

  private getAuthHeaders(): HeadersInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  public subscribe(fn: () => void) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }

  private notify() {
    this.listeners.forEach(fn => fn());
  }

  public isAuthenticated(): boolean {
    return this.isUserLoggedIn && !!this.currentUser;
  }

  public getCurrentUser(): User | null {
    return this.currentUser;
  }

  public getToken(): string | null {
    return this.token;
  }

  // ==================== AUTHENTICATION API ====================

  public async fetchMe(): Promise<User | null> {
    if (!this.token) return null;
    try {
      const res = await fetch('/api/auth/me', { headers: this.getAuthHeaders() });
      if (res.ok) {
        const data = await res.json();
        const user: User = {
          id: data.id,
          phone: data.phone,
          name: data.name,
          nameAm: data.nameAm,
          role: (data.role || 'buyer').toLowerCase() as UserRole,
          region: data.region,
          verified: data.verified,
          tinNumber: data.tinNumber || (data.role === 'buyer' ? 'TIN-ET-9912001' : 'TIN-FARM-882910'),
          businessLicenseNumber: data.businessLicenseNumber || 'MOT-LIC-2026-98124',
          vehicleType: data.vehicleType || "Isuzu 5-Ton",
          refrigerationType: data.refrigerationType || "Ventilated",
          vehicleCapacityKg: data.vehicleCapacityKg || 5000,
          kycDocumentType: data.kycDocumentType,
          kycDocumentNumber: data.kycDocumentNumber,
          kycStatus: data.kycStatus || "Verified",
          kycTier: data.kycTier || 2,
          repeatBuyerCount: data.repeatBuyerCount || 14,
          onTimeDeliveryRate: data.onTimeDeliveryRate || 99,
          walletBalanceEtb: data.walletBalanceEtb || 48200,
          createdAt: data.createdAt
        };
        this.currentUser = user;
        this.isUserLoggedIn = true;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.notify();
        return user;
      } else if (res.status === 401) {
        this.logout();
      }
    } catch (err) {
      console.warn('Could not fetch user profile from backend', err);
    }
    return this.currentUser;
  }

  public async requestOtp(phone: string): Promise<{ demoCode?: string; message: string; phone: string; userName?: string; role?: string }> {
    const cleanPhone = phone.startsWith('+251') ? phone : '+251' + phone.replace(/^0+/, '');
    const res = await fetch('/api/auth/request-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: cleanPhone })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to request OTP' }));
      throw new Error(err.error || 'Failed to request OTP. Please check your phone number.');
    }

    return await res.json();
  }

  public async verifyOtp(phone: string, code: string): Promise<User> {
    const cleanPhone = phone.startsWith('+251') ? phone : '+251' + phone.replace(/^0+/, '');
    const res = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: cleanPhone, code: code.trim() })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Invalid verification code or phone' }));
      throw new Error(err.error || 'Authentication failed');
    }

    const data = await res.json();
    this.token = data.token;
    localStorage.setItem('token', data.token);

    const user: User = {
      id: data.user.id,
      phone: data.user.phone,
      name: data.user.name,
      nameAm: data.user.nameAm,
      role: (data.user.role || 'buyer').toLowerCase() as UserRole,
      region: data.user.region,
      verified: data.user.verified,
      tinNumber: data.user.role === 'buyer' ? 'TIN-ET-9912001' : 'TIN-FARM-882910',
      businessLicenseNumber: 'MOT-LIC-2026-98124',
      vehicleType: data.user.vehicleType || "Isuzu 5-Ton",
      refrigerationType: data.user.refrigerationType || "Ventilated",
      vehicleCapacityKg: data.user.vehicleCapacityKg || 5000,
      kycDocumentType: data.user.kycDocumentType,
      kycDocumentNumber: data.user.kycDocumentNumber,
      kycStatus: data.user.kycStatus || "Verified",
      kycTier: 2,
      repeatBuyerCount: data.user.repeatBuyerCount || 14,
      onTimeDeliveryRate: data.user.onTimeDeliveryRate || 99,
      walletBalanceEtb: data.user.walletBalanceEtb || 48200,
      createdAt: data.user.createdAt
    };

    this.currentUser = user;
    this.isUserLoggedIn = true;
    localStorage.setItem('currentUser', JSON.stringify(user));

    signalRService.startConnection(this.token || undefined);
    await this.refreshAllData();
    this.notify();
    return user;
  }

  public async registerUser(name: string, nameAm: string | undefined, phone: string, role: UserRole, region: string): Promise<User> {
    const cleanPhone = phone.startsWith('+251') ? phone : '+251' + phone.replace(/^0+/, '');
    const roleFormatted = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        nameAm: nameAm || null,
        phone: cleanPhone,
        role: roleFormatted,
        region
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Registration failed' }));
      throw new Error(err.error || 'Registration failed');
    }

    const data = await res.json();
    this.token = data.token;
    localStorage.setItem('token', data.token);

    const user: User = {
      id: data.user.id,
      phone: data.user.phone,
      name: data.user.name,
      nameAm: data.user.nameAm,
      role: (data.user.role || 'buyer').toLowerCase() as UserRole,
      region: data.user.region,
      verified: data.user.verified,
      tinNumber: 'TIN-NEW-' + Math.floor(100000 + Math.random() * 900000),
      businessLicenseNumber: 'MOT-LIC-2026-NEW',
      vehicleType: role === 'driver' ? 'Isuzu 5-Ton' : undefined,
      refrigerationType: role === 'driver' ? 'Ventilated' : undefined,
      vehicleCapacityKg: role === 'driver' ? 5000 : undefined,
      kycDocumentType: 'National ID (Fayda)',
      kycDocumentNumber: 'FAYDA-NEW-' + Math.floor(100000 + Math.random() * 900000),
      kycStatus: 'Verified',
      kycTier: 2,
      repeatBuyerCount: 5,
      onTimeDeliveryRate: 98,
      walletBalanceEtb: 0,
      createdAt: data.user.createdAt
    };

    this.currentUser = user;
    this.isUserLoggedIn = true;
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

    signalRService.startConnection(this.token || undefined);
    await this.refreshAllData();
    this.notify();
    return this.currentUser;
  }

  public logout() {
    this.isUserLoggedIn = false;
    this.currentUser = null;
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.notify();
  }

  // ==================== LISTINGS API ====================

  public async fetchListings(): Promise<Listing[]> {
    try {
      const res = await fetch('/api/listings');
      if (res.ok) {
        const data = await res.json();
        const rawItems = Array.isArray(data) ? data : (data.items || []);
        this.listings = rawItems.map((l: any) => ({
          id: l.id,
          farmerId: l.farmerId,
          farmerName: l.farmerName,
          farmerNameAm: l.farmerNameAm,
          farmerPhone: l.farmerPhone,
          region: l.region,
          productName: l.productName,
          nameAm: l.nameAm,
          category: l.category,
          qtyKg: Number(l.qtyKg),
          pricePerKg: Number(l.pricePerKg),
          minOrderKg: Number(l.minOrderKg),
          latitude: l.latitude,
          longitude: l.longitude,
          distanceKm: l.distanceKm,
          photos: l.photos && l.photos.length > 0 ? l.photos : ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80'],
          availableFrom: l.availableFrom || new Date().toISOString().split('T')[0],
          status: (l.status || 'Active').toLowerCase() as any,
          grade: l.grade || "Grade 1",
          ripeness: l.ripeness || "Ready Today",
          isOrganic: l.isOrganic ?? true,
          isAdvanceHarvest: l.isAdvanceHarvest ?? false,
          expectedHarvestDate: l.expectedHarvestDate,
          voiceNoteUrl: l.voiceNoteUrl,
          voiceNoteTranscript: l.voiceNoteTranscript,
          marketBenchmarkPrice: l.marketBenchmarkPrice || l.pricePerKg,
          moderationStatus: l.moderationStatus || 'Approved',
          farmerRating: l.farmerRating || 4.9,
          reviewCount: l.reviewCount || 14,
          repeatBuyerCount: 18,
          onTimeDeliveryRate: 99,
          createdAt: l.createdAt
        }));
        this.notify();
        return this.listings;
      }
    } catch (err) {
      console.warn('Fetch listings from backend failed', err);
    }
    return this.listings;
  }

  public getListings(
    category?: string,
    region?: string,
    search?: string,
    maxDistanceKm?: number,
    grade?: string,
    ripeness?: string,
    organicOnly?: boolean,
    advanceOnly?: boolean
  ): Listing[] {
    return this.listings.filter(l => {
      if (l.status !== 'active') return false;
      if (category && category !== 'All' && l.category.toLowerCase() !== category.toLowerCase()) return false;
      if (region && region !== 'All' && !l.region.toLowerCase().includes(region.toLowerCase())) return false;
      if (grade && grade !== 'All' && l.grade !== grade) return false;
      if (ripeness && ripeness !== 'All' && l.ripeness !== ripeness) return false;
      if (organicOnly && !l.isOrganic) return false;
      if (advanceOnly && !l.isAdvanceHarvest) return false;
      if (maxDistanceKm && l.distanceKm && l.distanceKm > maxDistanceKm) return false;
      if (search) {
        const s = search.toLowerCase();
        const match = l.productName.toLowerCase().includes(s) ||
          (l.nameAm && l.nameAm.includes(s)) ||
          l.farmerName.toLowerCase().includes(s) ||
          l.region.toLowerCase().includes(s);
        if (!match) return false;
      }
      return true;
    });
  }

  public getListingById(id: string): Listing | undefined {
    return this.listings.find(l => l.id === id);
  }

  public async createListing(data: Partial<Listing>): Promise<Listing> {
    const payload = {
      productName: data.productName,
      nameAm: data.nameAm || null,
      category: data.category || 'Vegetables',
      qtyKg: data.qtyKg,
      pricePerKg: data.pricePerKg,
      minOrderKg: data.minOrderKg,
      latitude: data.latitude || 8.7523,
      longitude: data.longitude || 38.9785,
      photos: data.photos,
      availableFrom: data.availableFrom || new Date().toISOString().split('T')[0],
      grade: data.grade || 'Grade 1',
      ripeness: data.ripeness || 'Ready Today',
      isOrganic: data.isOrganic ?? true,
      isAdvanceHarvest: data.isAdvanceHarvest ?? false,
      expectedHarvestDate: data.expectedHarvestDate || null,
      voiceNoteUrl: data.voiceNoteUrl || null,
      voiceNoteTranscript: data.voiceNoteTranscript || null,
      marketBenchmarkPrice: data.marketBenchmarkPrice || data.pricePerKg
    };

    const res = await fetch('/api/listings', {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      throw new Error('Failed to create listing in database');
    }

    const created = await res.json();
    const newListing: Listing = {
      id: created.id,
      farmerId: created.farmerId,
      farmerName: created.farmerName || this.currentUser?.name || 'Abebe Bekele',
      farmerNameAm: created.farmerNameAm || this.currentUser?.nameAm || 'አበበ በቀለ',
      farmerPhone: created.farmerPhone || this.currentUser?.phone || '+251911223344',
      region: created.region || this.currentUser?.region || 'Oromia (Bishoftu)',
      productName: created.productName,
      nameAm: created.nameAm,
      category: created.category,
      qtyKg: Number(created.qtyKg),
      pricePerKg: Number(created.pricePerKg),
      minOrderKg: Number(created.minOrderKg),
      latitude: created.latitude,
      longitude: created.longitude,
      distanceKm: created.distanceKm || 45,
      photos: created.photos && created.photos.length > 0 ? created.photos : (data.photos || ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80']),
      availableFrom: created.availableFrom,
      status: 'active',
      grade: created.grade || data.grade || 'Grade 1',
      ripeness: created.ripeness || data.ripeness || 'Ready Today',
      isOrganic: created.isOrganic ?? data.isOrganic ?? true,
      isAdvanceHarvest: created.isAdvanceHarvest ?? data.isAdvanceHarvest ?? false,
      expectedHarvestDate: created.expectedHarvestDate || data.expectedHarvestDate,
      voiceNoteUrl: created.voiceNoteUrl || data.voiceNoteUrl,
      voiceNoteTranscript: created.voiceNoteTranscript || data.voiceNoteTranscript,
      marketBenchmarkPrice: created.marketBenchmarkPrice || data.pricePerKg,
      moderationStatus: 'Approved',
      farmerRating: 5.0,
      reviewCount: 0,
      repeatBuyerCount: 18,
      onTimeDeliveryRate: 99,
      createdAt: created.createdAt
    };

    this.listings.unshift(newListing);
    this.notify();
    return newListing;
  }

  // ==================== ORDERS API ====================

  public async fetchOrders(): Promise<Order[]> {
    if (!this.isAuthenticated()) {
      this.orders = [];
      return [];
    }
    try {
      const res = await fetch('/api/orders', { headers: this.getAuthHeaders() });
      if (res.ok) {
        const items = await res.json();
        this.orders = items.map((o: any) => {
          const totalEtb = Number(o.totalEtb);
          const farmerCut = Number(o.farmerCut || (totalEtb * 0.90));
          const driverCut = Number(o.driverCut || (totalEtb * 0.05));
          const platformCut = Number(o.platformCut || (totalEtb * 0.05));
          const withholdingTax = Math.round(totalEtb * 0.02); // 2% Withholding
          const platformVat = Math.round(platformCut * 0.15); // 15% VAT on service fee

          return {
            id: o.id,
            listingId: o.listingId,
            productName: o.productName,
            productNameAm: o.productNameAm,
            category: o.category,
            farmerId: o.farmerId,
            farmerName: o.farmerName,
            farmerNameAm: o.farmerNameAm,
            farmerPhone: o.farmerPhone,
            farmerRegion: o.farmerRegion,
            buyerId: o.buyerId,
            buyerName: o.buyerName,
            buyerPhone: o.buyerPhone,
            driverId: o.driverId,
            driverName: o.driverName,
            driverPhone: o.driverPhone,
            qtyKg: Number(o.qtyKg),
            pricePerKg: Number(o.pricePerKg),
            totalEtb,
            farmerCut,
            driverCut,
            platformCut,
            driverSubsidyEtb: Number(o.driverSubsidyEtb || 150),
            withholdingTaxEtb: withholdingTax,
            platformVatEtb: platformVat,
            status: (o.status || 'Pending').toLowerCase() as OrderStatus,
            escrowHeld: o.escrowHeld,
            paymentRef: o.paymentRef || `TB-${o.id.slice(0, 8).toUpperCase()}`,
            invoiceNumber: `ET-INV-2026-${o.id.slice(0, 6).toUpperCase()}`,
            waybillNumber: `WB-FTA-${o.id.slice(0, 6).toUpperCase()}`,
            contractNumber: `AGR-ET-${o.id.slice(0, 6).toUpperCase()}`,
            arbitrationDecreeNumber: o.status === 'disputed' ? `ARB-DEC-${o.id.slice(0, 6).toUpperCase()}` : undefined,
            pickupPhoto: o.pickupPhoto,
            deliveryPhoto: o.deliveryPhoto,
            deliveryGpsLat: o.deliveryGpsLat,
            deliveryGpsLng: o.deliveryGpsLng,
            deliveredAt: o.deliveredAt,
            deliveryAddress: o.deliveryAddress,
            deliveryNotes: o.deliveryNotes,
            disputeReason: o.disputeReason,
            disputePhoto: o.disputePhoto,
            requestedRefundPercent: o.requestedRefundPercent || 100,
            disputeStatus: o.disputeStatus || 'None',
            disputeResolutionNotes: o.disputeResolutionNotes,
            isRecurring: o.isRecurring || false,
            recurringFrequency: o.recurringFrequency,
            confirmedAt: o.confirmedAt,
            createdAt: o.createdAt
          };
        });
        this.notify();
        return this.orders;
      }
    } catch (err) {
      console.warn('Fetch orders failed', err);
    }
    return this.orders;
  }

  public getOrders(role?: UserRole): Order[] {
    if (!this.currentUser) return [];
    const r = role || this.currentUser.role;
    if (r === 'farmer') return this.orders.filter(o => o.farmerId === this.currentUser!.id);
    if (r === 'buyer') return this.orders.filter(o => o.buyerId === this.currentUser!.id);
    if (r === 'driver') return this.orders.filter(o => o.driverId === this.currentUser!.id || (o.status === 'confirmed' && !o.driverId));
    return this.orders; // Admin
  }

  public async placeOrder(listingId: string, qtyKg: number, deliveryAddress?: string, isRecurring = false, frequency = 'Weekly'): Promise<Order> {
    const listing = this.listings.find(l => l.id === listingId);
    if (!listing) throw new Error("Listing not found");

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({
        listingId,
        qtyKg,
        deliveryAddress: deliveryAddress || this.currentUser?.region || 'Addis Ababa (Bole)',
        isRecurring,
        recurringFrequency: isRecurring ? frequency : null
      })
    });

    if (!res.ok) {
      throw new Error('Failed to place order in database');
    }

    await this.fetchOrders();
    await this.fetchListings();
    return this.orders[0] || this.orders.find(o => o.listingId === listingId)!;
  }

  public async confirmOrderByFarmer(orderId: string) {
    await fetch(`/api/orders/${orderId}/confirm`, {
      method: 'PUT',
      headers: this.getAuthHeaders()
    });
    await this.fetchOrders();
  }

  public async pickupOrderByDriver(orderId: string, photo?: string) {
    if (this.isOfflineMode) {
      this.offlineQueue.push({
        id: 'off-' + Date.now(),
        type: 'pickup',
        orderId,
        timestamp: new Date().toISOString(),
        data: { photo },
        synced: false
      });
      this.saveOfflineQueue();
      const order = this.orders.find(o => o.id === orderId);
      if (order) {
        order.status = 'picked_up';
        order.pickupPhoto = photo;
      }
      this.notify();
      return;
    }

    await fetch(`/api/orders/${orderId}/pickup`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ pickupPhoto: photo || 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80' })
    });
    await this.fetchOrders();
  }

  public async confirmDeliveryByBuyer(orderId: string, proofPhoto?: string, lat?: number, lng?: number) {
    await fetch(`/api/orders/${orderId}/deliver`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({
        deliveryPhoto: proofPhoto || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
        deliveryGpsLat: lat || 9.0300,
        deliveryGpsLng: lng || 38.7400
      })
    });
    await this.fetchOrders();
  }

  public async disputeOrder(orderId: string, reason: string, photo?: string, refundPercent = 50) {
    await fetch(`/api/orders/${orderId}/dispute`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({
        reason,
        disputePhoto: photo || 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80',
        requestedRefundPercent: refundPercent
      })
    });
    await this.fetchOrders();
  }

  public async resolveDispute(orderId: string, resolution: 'ReleaseToFarmer' | 'RefundBuyer' | 'PartialSplit', farmerShare = 50, buyerRefund = 50) {
    await fetch(`/api/admin/orders/${orderId}/resolve-dispute`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({
        resolution,
        notes: `Arbitrated via Admin Console (${resolution})`,
        farmerSharePercent: farmerShare,
        buyerRefundPercent: buyerRefund
      })
    });
    await this.fetchOrders();
  }

  // ==================== LEGAL & COMPLIANCE DOCUMENTS ====================

  public getTaxInvoice(orderId: string): TaxInvoice {
    const o = this.orders.find(ord => ord.id === orderId) || this.orders[0] || {
      id: orderId,
      productName: 'Fresh Sholla Red Tomatoes',
      qtyKg: 200,
      pricePerKg: 45,
      totalEtb: 9000,
      farmerCut: 8100,
      driverCut: 450,
      platformCut: 450,
      farmerName: 'Abebe Bekele',
      farmerRegion: 'Oromia (Bishoftu)',
      farmerPhone: '+251 911 223 344',
      buyerName: 'Bethlehem Tilahun (FreshMart)',
      buyerRegion: 'Addis Ababa (Bole)',
      buyerPhone: '+251 955 667 788',
      paymentRef: 'TB-TXN-98217391',
      invoiceNumber: 'ET-INV-2026-001',
      createdAt: new Date().toISOString()
    };

    const platformVat = Math.round(o.platformCut * 0.15);
    const withholding = Math.round(o.totalEtb * 0.02);

    return {
      invoiceNumber: o.invoiceNumber || `ET-INV-2026-${o.id.slice(0, 6).toUpperCase()}`,
      orderId: o.id,
      issueDate: o.createdAt ? new Date(o.createdAt).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB'),
      paymentRef: o.paymentRef || `TB-C2B-${o.id.slice(0, 8).toUpperCase()}`,
      sellerName: o.farmerName,
      sellerTin: 'TIN-FARM-8829104',
      sellerRegion: o.farmerRegion,
      sellerPhone: o.farmerPhone,
      sellerType: 'Registered Agricultural Smallholder Producer',
      buyerName: o.buyerName,
      buyerTin: 'TIN-ET-9912001',
      buyerRegion: 'Addis Ababa (Bole)',
      buyerPhone: o.buyerPhone,
      productName: o.productName,
      productNameAm: o.productNameAm,
      grade: 'Grade 1 (Certified Farm Standard)',
      qtyKg: o.qtyKg,
      unitPriceEtb: o.pricePerKg,
      grossAmountEtb: o.totalEtb,
      farmerPayoutEtb: o.farmerCut,
      driverFreightEtb: o.driverCut,
      platformServiceFeeEtb: o.platformCut,
      platformVatEtb: platformVat,
      withholdingTaxEtb: withholding,
      totalPaidViaTelebirr: o.totalEtb,
      regulatoryAct: 'Ethiopian Tax Proclamation No. 979/2016 (Primary Agricultural Goods)',
      qrVerificationCode: `ET-TAX-AUTH-2026-VERIFIED-${o.id.slice(0, 8).toUpperCase()}`,
      isVatExemptAgriculturalGoods: true
    };
  }

  public getTransportWaybill(orderId: string): TransportWaybill {
    const o = this.orders.find(ord => ord.id === orderId) || this.orders[0];

    return {
      waybillNumber: o?.waybillNumber || `WB-FTA-2026-${orderId.slice(0, 6).toUpperCase()}`,
      orderId: o?.id || orderId,
      dispatchDate: new Date().toLocaleDateString('en-GB'),
      consignorName: o?.farmerName || 'Abebe Bekele',
      consignorFarmLocation: o?.farmerRegion || 'Bishoftu Green Farms, Oromia',
      consignorPhone: o?.farmerPhone || '+251 911 223 344',
      consigneeName: o?.buyerName || 'FreshMart Central Wholesale Hub',
      consigneeDepotAddress: o?.deliveryAddress || 'Bole Depot, Addis Ababa',
      consigneePhone: o?.buyerPhone || '+251 955 667 788',
      carrierDriverName: o?.driverName || 'Dawit Kebede',
      driverLicenseNumber: 'ET-CDL-COMM-89104',
      vehiclePlateNumber: 'ET-3-B98124-AA',
      vehicleModel: 'Isuzu 5-Ton Commercial Freight Carrier',
      refrigerationStatus: 'Ventilated Agri-Body Cargo (18°C)',
      insurancePolicyNumber: 'NIC-ET-CARGO-771920',
      cargoDescription: `${o?.productName || 'Fresh Sholla Red Tomatoes'} (Grade 1)`,
      packageCount: Math.ceil((o?.qtyKg || 200) / 25),
      netWeightKg: o?.qtyKg || 200,
      grossWeightKg: (o?.qtyKg || 200) + 18,
      tareWeightKg: 18,
      temperatureLogCelsius: 17.5,
      farmerHandoffTimestamp: '06:30 AM (Farm Gate)',
      driverSignatureRef: 'DAWIT-KEBEDE-VERIFIED-LOG',
      buyerReceivedTimestamp: o?.status === 'delivered' ? '09:45 AM (Bole Depot)' : undefined,
      transitStatus: o?.status === 'delivered' ? 'DeliveredWithGPS' : o?.status === 'picked_up' ? 'InTransit' : 'Dispatched'
    };
  }

  public getLegalContract(orderId: string): LegalContract {
    const o = this.orders.find(ord => ord.id === orderId) || this.orders[0];

    return {
      contractNumber: o?.contractNumber || `AGR-CONTR-2026-${orderId.slice(0, 6).toUpperCase()}`,
      orderId: o?.id || orderId,
      agreementDate: new Date().toLocaleDateString('en-GB'),
      effectiveDate: new Date().toLocaleDateString('en-GB'),
      sellerName: o?.farmerName || 'Abebe Bekele',
      sellerIdNumber: 'FAYDA-ET-8829104',
      sellerLocation: o?.farmerRegion || 'Bishoftu, Oromia, Ethiopia',
      buyerName: o?.buyerName || 'Bethlehem Tilahun (FreshMart Wholesale)',
      buyerTinNumber: 'TIN-ET-9912001',
      buyerLocation: o?.deliveryAddress || 'Addis Ababa, Ethiopia',
      cropType: o?.productName || 'Fresh Sholla Red Tomatoes',
      contractedQuantityKg: o?.qtyKg || 200,
      agreedPricePerKg: o?.pricePerKg || 45,
      totalContractValueEtb: o?.totalEtb || 9000,
      qualityStandardClause: 'Produce shall conform to Grade 1 Ethiopian Commodity Quality Standards (Maximum defect tolerance 2.5%, moisture within physiological thresholds).',
      deliveryTimeline: 'Direct farm-to-depot transit guaranteed within 12 hours of farmer harvest confirmation.',
      escrowClauseText: 'Purchase consideration is locked in Telebirr C2B Escrow and shall be automatically disbursed (90% Farmer / 5% Driver / 5% Platform) upon buyer delivery verification.',
      forceMajeureClauseText: 'Neither party shall be liable for delivery failure caused by natural agricultural catastrophes, unseasonal frost, or national logistical force majeure.',
      disputeJurisdiction: 'Federal Democratic Republic of Ethiopia Commercial Code and Ethiopian Agricultural Authority Arbitration Rules.',
      eSignatures: {
        sellerSigned: true,
        sellerSignDate: 'Digitally Authenticated via OTP/Fayda',
        buyerSigned: true,
        buyerSignDate: 'Digitally Authenticated via Telebirr Escrow Lock',
        platformWitnessHash: `EABC-FM-TRUST-SEAL-${orderId.slice(0, 8).toUpperCase()}`
      }
    };
  }

  public getDisputeMediationRecord(orderId: string): DisputeMediationRecord {
    const o = this.orders.find(ord => ord.id === orderId) || this.orders[0];

    return {
      caseNumber: o?.arbitrationDecreeNumber || `ARB-CASE-2026-${orderId.slice(0, 6).toUpperCase()}`,
      orderId: o?.id || orderId,
      filingDate: 'Yesterday 3:15 PM',
      resolutionDate: o?.status === 'disputed' ? undefined : 'Today 11:30 AM',
      status: o?.status === 'disputed' ? 'UnderInvestigation' : 'Settled',
      claimantBuyer: o?.buyerName || 'Bethlehem Tilahun',
      respondentFarmer: o?.farmerName || 'Chala Gemechu',
      freightCarrier: o?.driverName || 'Dawit Kebede',
      totalDisputedAmountEtb: o?.totalEtb || 9000,
      disputeReason: o?.disputeReason || 'Delivered avocados were overripe and 20% bruised during transit from Hawassa.',
      claimedDefectPercentage: o?.requestedRefundPercent || 50,
      inspectionReport: 'Independent physical inspection at Bole Cold Storage Depot confirmed 18.5% transit softening on batch packaging.',
      photoEvidenceUrl: o?.disputePhoto || 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80',
      leadArbitratorName: 'Sara Mengistu (Marketplace Compliance Arbitrator)',
      legalFindingSummary: 'Partial packaging failure during transit. Fair 50/50 equitable split awarded under Ethiopian Commercial Code Art. 2289.',
      arbitrationVerdict: 'FiftyFiftySplit',
      farmerSettlementEtb: Math.round((o?.totalEtb || 9000) * 0.5),
      buyerRefundEtb: Math.round((o?.totalEtb || 9000) * 0.5),
      platformDecreeHash: `LEGAL-DECREE-ARB-${orderId.slice(0, 8).toUpperCase()}`
    };
  }

  // ==================== EXISTING ADVANCED MODULES ====================

  public getPriceBenchmarks(): PriceBenchmark[] {
    return this.priceBenchmarks;
  }

  public getStandingOrders(): StandingOrder[] {
    return this.standingOrders;
  }

  public addStandingOrder(listingId: string, qtyKg: number, frequency: 'Weekly' | 'Bi-Weekly' | 'Monthly'): StandingOrder {
    const listing = this.listings.find(l => l.id === listingId);
    const so: StandingOrder = {
      id: 'so-' + Date.now(),
      listingId,
      productName: listing?.productName || 'Fresh Produce',
      productNameAm: listing?.nameAm,
      farmerName: listing?.farmerName || 'Abebe Bekele',
      qtyKg,
      pricePerKg: listing?.pricePerKg || 45,
      frequency,
      nextDeliveryDate: frequency === 'Weekly' ? 'Next Monday, 8:00 AM' : 'Every 2nd Thursday',
      active: true,
      createdAt: new Date().toISOString()
    };
    this.standingOrders.unshift(so);
    this.notify();
    return so;
  }

  public toggleStandingOrder(id: string) {
    const item = this.standingOrders.find(s => s.id === id);
    if (item) {
      item.active = !item.active;
      this.notify();
    }
  }

  public getKycQueue(): KycVerificationItem[] {
    return this.kycQueue;
  }

  public async verifyKyc(userId: string, approve: boolean) {
    const item = this.kycQueue.find(k => k.userId === userId);
    if (item) {
      item.status = approve ? 'Verified' : 'Rejected';
      try {
        await fetch(`/api/admin/users/${userId}/verify?verified=${approve}&kycStatus=${item.status}`, {
          method: 'PUT',
          headers: this.getAuthHeaders()
        });
      } catch (e) {
        console.warn('KYC update remote failed, updating local state', e);
      }
      this.notify();
    }
  }

  public getAnomalyAlerts(): AnomalyAlert[] {
    return this.anomalyAlerts;
  }

  public getRegionalAnalytics(): RegionalAnalytics[] {
    return this.regionalAnalytics;
  }

  public getOptimizedRoute(): OptimizedRoute {
    return {
      id: "route-oromia-addis-01",
      title: "Consolidated East Shewa Multi-Farm Route",
      totalDistanceKm: 68.4,
      estimatedHours: 2.5,
      totalWeightKg: 2800,
      driverCommissionEtb: 1450,
      ruralSubsidyEtb: 350,
      stops: [
        {
          stopNumber: 1,
          type: 'pickup',
          locationName: 'Bishoftu Green Farms (Abebe Bekele)',
          contactName: 'Abebe Bekele',
          phone: '+251 911 223 344',
          cargoDetails: 'Fresh Sholla Red Tomatoes',
          weightKg: 1200,
          completed: true
        },
        {
          stopNumber: 2,
          type: 'pickup',
          locationName: 'Mojo Valley Farm (Almaz Hailu)',
          contactName: 'Almaz Hailu',
          phone: '+251 922 334 455',
          cargoDetails: 'Awash Valley Red Onions',
          weightKg: 1600,
          completed: false
        },
        {
          stopNumber: 3,
          type: 'dropoff',
          locationName: 'FreshMart Central Wholesale Hub (Bole, Addis Ababa)',
          contactName: 'Bethlehem Tilahun',
          phone: '+251 955 667 788',
          cargoDetails: 'Consolidated Wholesale Dropoff (2,800 kg total)',
          weightKg: 2800,
          completed: false
        }
      ]
    };
  }

  public updateDriverVehicle(vehicleType: string, refrigerationType: string, capacityKg: number) {
    if (this.currentUser && this.currentUser.role === 'driver') {
      this.currentUser.vehicleType = vehicleType;
      this.currentUser.refrigerationType = refrigerationType;
      this.currentUser.vehicleCapacityKg = capacityKg;
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      this.notify();
    }
  }

  public toggleOfflineMode(): boolean {
    this.isOfflineMode = !this.isOfflineMode;
    this.notify();
    return this.isOfflineMode;
  }

  public getIsOfflineMode(): boolean {
    return this.isOfflineMode;
  }

  public getOfflineQueue(): OfflineAction[] {
    return this.offlineQueue;
  }

  public async syncOfflineQueue(): Promise<number> {
    const unsynced = this.offlineQueue.filter(a => !a.synced);
    for (const action of unsynced) {
      if (action.type === 'pickup') {
        await this.pickupOrderByDriver(action.orderId, action.data?.photo);
      }
      action.synced = true;
    }
    const count = unsynced.length;
    this.offlineQueue = [];
    this.saveOfflineQueue();
    this.notify();
    return count;
  }

  public async sendInboundSms(from: string, body: string): Promise<string> {
    try {
      const res = await fetch('/api/sms/inbound', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, body })
      });
      if (res.ok) {
        const json = await res.json();
        await this.refreshAllData();
        return json.response;
      }
    } catch (e) {
      console.warn('SMS Webhook call failed, simulating response', e);
    }
    return `[SIMULATED SMS ACK] Received: "${body}". Processed successfully in offline cache.`;
  }

  public simulateVoiceTranscription(audioBlobLengthSec: number, spokenLanguage: 'am' | 'om' | 'en'): {
    productName: string;
    nameAm: string;
    category: string;
    qtyKg: number;
    pricePerKg: number;
    region: string;
    transcript: string;
  } {
    if (spokenLanguage === 'am') {
      return {
        productName: "Fresh Sholla Red Tomatoes",
        nameAm: "የሾላ ቀይ ቲማቲም",
        category: "Vegetables",
        qtyKg: 1500,
        pricePerKg: 45,
        region: "Oromia (Bishoftu)",
        transcript: "1,500 ኪሎ ቀይ የሾላ ቲማቲም አለኝ። ዋጋው በኪሎ 45 ብር። ቢሾፍቱ እርሻችን ይገኛል።"
      };
    } else if (spokenLanguage === 'om') {
      return {
        productName: "Awash Red Onions",
        nameAm: "የአዋሽ ቀይ ሽንኩርት",
        category: "Vegetables",
        qtyKg: 2000,
        pricePerKg: 55,
        region: "Oromia (Adama)",
        transcript: "Qullubbii diimaa kiiloo 2,000 qabna. Gatiin kiiloo tokkoo Qr 55. Qophii dha."
      };
    } else {
      return {
        productName: "Grade 1 Specialty Green Coffee",
        nameAm: "የይርጋጨፌ ስፔሻሊቲ ቡና",
        category: "Coffee",
        qtyKg: 800,
        pricePerKg: 380,
        region: "SNNPR (Yirgacheffe)",
        transcript: "We have 800kg of Grade 1 organic specialty green coffee harvested in Yirgacheffe at 380 ETB per kg."
      };
    }
  }

  public requestWalletWithdrawal(amountEtb: number, phone: string): boolean {
    if (this.currentUser) {
      this.currentUser.walletBalanceEtb = Math.max(0, (this.currentUser.walletBalanceEtb || 48200) - amountEtb);
      this.farmerSummary.releasedEtb += amountEtb;
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      this.notify();
      return true;
    }
    return false;
  }

  public async fetchSummaries() {
    if (!this.currentUser) return;
    try {
      if (this.currentUser.role === 'farmer') {
        const res = await fetch('/api/payments/farmer-summary', { headers: this.getAuthHeaders() });
        if (res.ok) {
          const data = await res.json();
          this.farmerSummary = {
            totalEarnedEtb: Number(data.totalEarnedEtb),
            pendingEscrowEtb: Number(data.pendingEscrowEtb),
            releasedEtb: Number(data.releasedEtb),
            completedOrdersCount: data.completedOrdersCount,
            pendingOrdersCount: data.pendingOrdersCount,
            totalWithholdingTaxPaidEtb: Math.round(Number(data.totalEarnedEtb) * 0.02)
          };
        }
      } else if (this.currentUser.role === 'driver') {
        const res = await fetch('/api/payments/driver-summary', { headers: this.getAuthHeaders() });
        if (res.ok) {
          const data = await res.json();
          this.driverSummary = {
            totalEarnedEtb: Number(data.totalEarnedEtb),
            pendingEtb: Number(data.pendingEtb),
            deliveredTripsCount: data.deliveredTripsCount,
            ruralBonusEtb: 1250
          };
        }
      } else if (this.currentUser.role === 'admin') {
        const res = await fetch('/api/admin/stats', { headers: this.getAuthHeaders() });
        if (res.ok) {
          const data = await res.json();
          this.platformStats = {
            totalUsers: data.totalUsers,
            totalFarmers: data.totalFarmers,
            totalBuyers: data.totalBuyers,
            totalDrivers: data.totalDrivers,
            totalListings: data.totalListings,
            totalOrders: data.totalOrders,
            totalTransactionVolumeEtb: Number(data.totalTransactionVolumeEtb),
            totalPlatformCommissionEtb: Number(data.totalPlatformCommissionEtb),
            activeEscrowHeldEtb: Number(data.activeEscrowHeldEtb),
            disputedOrdersCount: data.disputedOrdersCount,
            totalMetricTonsMoved: Number(data.totalMetricTonsMoved || 145.8),
            middlemanMarginSavedEtb: Number(data.middlemanMarginSavedEtb || 480000),
            totalVatRemittedEtb: Number(data.totalPlatformCommissionEtb) * 0.15,
            totalWithholdingReportedEtb: Number(data.totalTransactionVolumeEtb) * 0.02
          };
        }
      }
    } catch (err) {
      console.warn('Fetch summaries failed', err);
    }
  }

  public getFarmerSummary(): PaymentSummary {
    const farmerOrders = this.orders.filter(o => o.farmerId === this.currentUser?.id);
    const totalEarned = farmerOrders.filter(o => o.status === 'delivered').reduce((s, o) => s + o.farmerCut, 0);
    const pendingEscrow = farmerOrders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').reduce((s, o) => s + o.farmerCut, 0);

    return {
      totalEarnedEtb: (totalEarned || this.farmerSummary.totalEarnedEtb),
      pendingEscrowEtb: (pendingEscrow || this.farmerSummary.pendingEscrowEtb),
      releasedEtb: (totalEarned || this.farmerSummary.releasedEtb),
      completedOrdersCount: farmerOrders.filter(o => o.status === 'delivered').length || this.farmerSummary.completedOrdersCount,
      pendingOrdersCount: farmerOrders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').length || this.farmerSummary.pendingOrdersCount,
      totalWithholdingTaxPaidEtb: Math.round((totalEarned || this.farmerSummary.totalEarnedEtb) * 0.02)
    };
  }

  public getDriverSummary(): DriverSummary {
    const driverOrders = this.orders.filter(o => o.driverId === this.currentUser?.id);
    const totalEarned = driverOrders.filter(o => o.status === 'delivered').reduce((s, o) => s + o.driverCut, 0);
    const pending = driverOrders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').reduce((s, o) => s + o.driverCut, 0);

    return {
      totalEarnedEtb: totalEarned || this.driverSummary.totalEarnedEtb,
      pendingEtb: pending || this.driverSummary.pendingEtb,
      deliveredTripsCount: driverOrders.filter(o => o.status === 'delivered').length || this.driverSummary.deliveredTripsCount,
      ruralBonusEtb: 1250
    };
  }

  public getPlatformStats(): PlatformStats {
    const totalVolume = this.orders.reduce((s, o) => s + o.totalEtb, 0);
    const totalCommission = this.orders.filter(o => o.status === 'delivered').reduce((s, o) => s + o.platformCut, 0);
    const activeEscrow = this.orders.filter(o => o.escrowHeld).reduce((s, o) => s + o.totalEtb, 0);
    const disputed = this.orders.filter(o => o.status === 'disputed').length;

    return {
      totalUsers: this.platformStats.totalUsers,
      totalFarmers: this.platformStats.totalFarmers,
      totalBuyers: this.platformStats.totalBuyers,
      totalDrivers: this.platformStats.totalDrivers,
      totalListings: this.listings.length || this.platformStats.totalListings,
      totalOrders: this.orders.length || this.platformStats.totalOrders,
      totalTransactionVolumeEtb: totalVolume || this.platformStats.totalTransactionVolumeEtb,
      totalPlatformCommissionEtb: totalCommission || this.platformStats.totalPlatformCommissionEtb,
      activeEscrowHeldEtb: activeEscrow || this.platformStats.activeEscrowHeldEtb,
      disputedOrdersCount: disputed || this.platformStats.disputedOrdersCount,
      totalMetricTonsMoved: 145.8,
      middlemanMarginSavedEtb: 480000,
      totalVatRemittedEtb: (totalCommission || this.platformStats.totalPlatformCommissionEtb) * 0.15,
      totalWithholdingReportedEtb: (totalVolume || this.platformStats.totalTransactionVolumeEtb) * 0.02
    };
  }

  public getNotifications(): NotificationItem[] {
    if (!this.isUserLoggedIn || !this.currentUser) return [];
    return this.notifications.filter(n => n.userId === this.currentUser!.id || this.currentUser!.role === 'admin');
  }

  public async broadcastSms(msgEn: string, msgAm: string, targetRole: string) {
    try {
      await fetch('/api/admin/broadcast-sms', {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ messageEn: msgEn, messageAm: msgAm, targetRole })
      });
    } catch (err) {
      console.warn('Broadcast SMS API call error', err);
    }

    if (this.currentUser) {
      this.notifications.unshift({
        id: 'b-' + Date.now(),
        userId: this.currentUser.id,
        type: 'broadcast',
        channel: 'sms',
        messageEn: `[SMS to ${targetRole.toUpperCase()}] ${msgEn}`,
        messageAm: `[ኤስኤምኤስ ለ${targetRole}] ${msgAm}`,
        read: false,
        sentAt: new Date().toISOString()
      });
      this.notify();
    }
  }

  public async refreshAllData() {
    await Promise.allSettled([
      this.fetchListings(),
      this.fetchOrders(),
      this.fetchSummaries()
    ]);
    this.notify();
  }
}

export const api = new ApiService();
