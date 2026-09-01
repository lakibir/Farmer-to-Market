import {
  Listing, Order, User, PlatformStats, PaymentSummary, DriverSummary,
  UserRole, OrderStatus, NotificationItem, PriceBenchmark, StandingOrder,
  AnomalyAlert, KycVerificationItem, RegionalAnalytics, OptimizedRoute, OfflineAction,
  TaxInvoice, TransportWaybill, LegalContract, DisputeMediationRecord,
  VerificationQueueItem, AgentRegisteredFarmer, UserDocument, VerificationStatus,
  AdminPermission, PlatformConfig, SystemAuditLog, DeliveryZoneConfig, FeatureFlag,
  PayoutApprovalItem, GlobalBusinessRules, BlacklistEntry, CreateUserDto,
  Banner, CreateBannerDto, UpdateListingDto,
  PermissionKey, PermissionDefinition, RolePermissionsMap,
  CommodityPriceIndex, FairPriceRecommendationRequest, FairPriceRecommendationResult, UssdRequest, UssdResponse
} from '../types';
import { signalRService } from './signalr.service';

class ApiService {
  private token: string | null = localStorage.getItem('token') || null;
  private currentUser: User | null = this.loadStoredUser();
  private isUserLoggedIn: boolean = !!this.token && !!this.currentUser;
  private listeners: Array<() => void> = [];

  // Impersonation state
  private impersonationOriginalUser: User | null = null;

  // Synced state from PostgreSQL / API
  private listings: Listing[] = [];
  private orders: Order[] = [];
  private notifications: NotificationItem[] = [];
  private standingOrders: StandingOrder[] = [];
  private anomalyAlerts: AnomalyAlert[] = [];
  private kycQueue: KycVerificationItem[] = [];
  private verificationQueue: VerificationQueueItem[] = [];
  private agentRegisteredFarmers: AgentRegisteredFarmer[] = [];
  private regionalAnalytics: RegionalAnalytics[] = [];
  private priceBenchmarks: PriceBenchmark[] = [];
  private offlineQueue: OfflineAction[] = [];
  private isOfflineMode: boolean = false;
  private banners: Banner[] = [];
  private accountData = { addresses: [] as any[], paymentMethods: [] as any[], coupons: [] as any[], notificationPreferences: [] as any[], sessions: [] as any[], twoFactor: null as any };

  // RBAC & Permissions State
  private rolePermissions: RolePermissionsMap = this.loadStoredRolePermissions();

  // Super Admin governance state
  private deletedUserIds: Set<string> = this.loadDeletedUsers();
  private allUsers: User[] = [];
  private platformConfig: PlatformConfig = {
    farmerSharePercent: 90,
    driverSharePercent: 5,
    platformFeePercent: 5,
    withholdingTaxPercent: 2,
    vatOnCommissionPercent: 15,
    highValuePayoutThresholdEtb: 50000,
    emergencyEscrowFrozen: false,
    // IMPORTANT: Payment credentials are NEVER stored in the frontend.
    // These are managed server-side only. SuperAdmin can view configured
    // provider names (not keys) via GET /api/superadmin/platform-config.
    telebirrAppId: "",
    telebirrShortCode: "",
    telebirrApiKey: "",
    telebirrEscrowVaultKey: "",
    twilioAccountSid: "",
    twilioAuthToken: "",
    twilioFromNumber: "",
    mapsGeocodingApiKey: "",
    postgisSpatialIndexEnabled: true
  };
  private systemAuditLogs: SystemAuditLog[] = [];
  private deliveryZones: DeliveryZoneConfig[] = [];
  private featureFlags: FeatureFlag[] = [];
  private payoutApprovals: PayoutApprovalItem[] = [];
  private globalBusinessRules: GlobalBusinessRules = {
    minOrderKg: 10,
    maxOrderKg: 50000,
    maxDistanceKm: 450,
    priceFloorVariancePercent: -30,
    priceCeilingVariancePercent: 250,
    requireFaydaForOrdersAboveKg: 500,
    autoArbitrateAfterHours: 48
  };
  private blacklist: BlacklistEntry[] = [];

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

  private loadDeletedUsers(): Set<string> {
    try {
      const stored = localStorage.getItem('farmerMarketDeletedUsers');
      if (stored) {
        const arr = JSON.parse(stored);
        if (Array.isArray(arr)) {
          return new Set(arr.map(x => String(x).toLowerCase().replace(/\s+/g, '')));
        }
      }
    } catch (e) {
      console.warn('Failed to load deleted users list', e);
    }
    return new Set();
  }

  private saveDeletedUsers() {
    try {
      localStorage.setItem('farmerMarketDeletedUsers', JSON.stringify(Array.from(this.deletedUserIds)));
    } catch (e) {
      console.warn('Failed to save deleted users list', e);
    }
  }

  public isDeletedUser(id?: string, phone?: string): boolean {
    if (id && this.deletedUserIds.has(id.toLowerCase())) return true;
    if (phone) {
      const cleanPhone = phone.toLowerCase().replace(/\s+/g, '');
      if (this.deletedUserIds.has(cleanPhone)) return true;
      const stripped = cleanPhone.replace(/\D/g, '');
      if (stripped && this.deletedUserIds.has(stripped)) return true;
    }
    return false;
  }

  private async init() {
    this.loadOfflineQueue();
    this.initDefaultData();
    if (this.token) {
      await this.fetchMe();
    }
    await this.refreshAllData();
    if (this.token) await this.fetchAccountData();
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
        userId: "88888888-8888-8888-8888-888888888888",
        userName: "Girma Wondimu (Farmer)",
        userRole: "Farmer",
        phone: "+251944556677",
        region: "Oromia (Bishoftu / Ada'a)",
        documentType: "National ID (Fayda)",
        documentNumber: "FAN-8812-4091-2810",
        tinNumber: "0099881122",
        kycTier: 2,
        status: "Pending",
        submittedAt: "1 day ago"
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

    this.verificationQueue = [
      {
        userId: "88888888-8888-8888-8888-888888888888",
        userName: "Girma Wondimu",
        userNameAm: "ግርማ ወንዲሙ",
        userRole: "Farmer",
        phone: "+251944556677",
        region: "Oromia (Bishoftu / Ada'a)",
        registrationMethod: "Agent",
        registeredByAgentName: "Kassahun Tolessa (Field Agent)",
        verificationStatus: "UnderReview",
        tinNumber: "0099881122",
        registeredAt: "Yesterday 4:15 PM",
        documents: [
          {
            id: "doc-1",
            userId: "88888888-8888-8888-8888-888888888888",
            documentType: "FaydaId",
            documentNumber: "FAN-8812-4091-2810",
            frontImageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80",
            backImageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",
            status: "UnderReview",
            submittedAt: "Yesterday 4:15 PM"
          },
          {
            id: "doc-2",
            userId: "88888888-8888-8888-8888-888888888888",
            documentType: "TinCertificate",
            documentNumber: "0099881122",
            frontImageUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80",
            status: "UnderReview",
            submittedAt: "Yesterday 4:15 PM"
          }
        ],
        reviews: []
      },
      {
        userId: "55555555-5555-5555-5555-555555555555",
        userName: "Dawit Kebede",
        userNameAm: "ዳዊት ከበደ",
        userRole: "Driver",
        phone: "+251977889900",
        region: "Addis Ababa (Kaliti)",
        registrationMethod: "Self",
        verificationStatus: "UnderReview",
        tinNumber: "TIN-DRV-981244",
        registeredAt: "2 days ago",
        documents: [
          {
            id: "doc-3",
            userId: "55555555-5555-5555-5555-555555555555",
            documentType: "VehicleLogbook",
            documentNumber: "ET-LOG-5T-98214",
            frontImageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",
            status: "UnderReview",
            submittedAt: "2 days ago"
          }
        ],
        reviews: []
      },
      {
        userId: "33333333-3333-3333-3333-333333333333",
        userName: "Chala Gemechu",
        userNameAm: "ጫላ ገመቹ",
        userRole: "Farmer",
        phone: "+251933445566",
        region: "Sidama (Hawassa)",
        registrationMethod: "Self",
        verificationStatus: "UnderReview",
        registeredAt: "3 days ago",
        documents: [
          {
            id: "doc-4",
            userId: "33333333-3333-3333-3333-333333333333",
            documentType: "KebeleId",
            documentNumber: "HAW-KEB-4410",
            frontImageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80",
            status: "UnderReview",
            submittedAt: "3 days ago"
          }
        ],
        reviews: []
      },
      {
        userId: "11111111-1111-1111-1111-111111111111",
        userName: "Abebe Bekele",
        userNameAm: "አበበ በቀለ",
        userRole: "Farmer",
        phone: "+251911223344",
        region: "Oromia (Bishoftu)",
        registrationMethod: "Self",
        verificationStatus: "Approved",
        tinNumber: "TIN-FARM-882910",
        registeredAt: "1 month ago",
        documents: [
          {
            id: "doc-5",
            userId: "11111111-1111-1111-1111-111111111111",
            documentType: "FaydaId",
            documentNumber: "FAYDA-ET-8829104",
            status: "Approved",
            submittedAt: "1 month ago"
          }
        ],
        reviews: [
          {
            id: "rev-1",
            userId: "11111111-1111-1111-1111-111111111111",
            reviewerName: "Sara Mengistu",
            actionTaken: "Approved",
            notes: "National ID and Bishoftu farm registry confirmed.",
            timestamp: "1 month ago"
          }
        ]
      }
    ];

    this.agentRegisteredFarmers = [
      {
        id: "88888888-8888-8888-8888-888888888888",
        name: "Girma Wondimu",
        nameAm: "ግርማ ወንዲሙ",
        phone: "+251944556677",
        region: "Oromia (Bishoftu / Ada'a)",
        kebele: "Ada'a Kebele 04",
        primaryCrop: "Magna Teff & Tomatoes",
        faydaId: "FAN-8812-4091-2810",
        tinNumber: "0099881122",
        status: "UnderReview",
        registeredAt: "Yesterday 4:15 PM",
        faydaFrontImageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80"
      },
      {
        id: "f-agent-02",
        name: "Tadesse Roba",
        nameAm: "ታደሰ ሮባ",
        phone: "+251911889900",
        region: "Oromia (Bishoftu)",
        kebele: "Bishoftu Rural Kebele 02",
        primaryCrop: "Red Onions & Garlic",
        faydaId: "FAN-1029-4819-2041",
        tinNumber: "0088772211",
        status: "Approved",
        registeredAt: "5 days ago"
      },
      {
        id: "f-agent-03",
        name: "Desta Wolde",
        nameAm: "ደስታ ወልዴ",
        phone: "+251922776655",
        region: "Oromia (Ada'a)",
        kebele: "Dukem Farm Zone",
        primaryCrop: "Wheat & Chickpeas",
        faydaId: "FAN-7766-5544-3322",
        status: "Approved",
        registeredAt: "1 week ago"
      }
    ];

    this.regionalAnalytics = [
      { region: "Oromia (East Shewa / Bishoftu)", smallholdersCount: 4200, volumeMetricTons: 68.5, totalGmvEtb: 3850000, topCrop: "Tomatoes & Onions" },
      { region: "Amhara (Debre Berhan / Gojjam)", smallholdersCount: 3100, volumeMetricTons: 42.0, totalGmvEtb: 4830000, topCrop: "Magna White Teff" },
      { region: "Sidama (Hawassa / Yirgalem)", smallholdersCount: 1950, volumeMetricTons: 24.8, totalGmvEtb: 1488000, topCrop: "Hass Avocados & Fruits" },
      { region: "SNNPR (Gedeo / Yirgacheffe)", smallholdersCount: 1400, volumeMetricTons: 10.5, totalGmvEtb: 3990000, topCrop: "Specialty Green Coffee" }
    ];

    this.allUsers = [
      {
        id: "00000000-0000-0000-0000-000000000001",
        name: "Dr. Dawit Haile (Super Admin)",
        nameAm: "ዶ/ር ዳዊት ኃይሌ",
        phone: "+251900000001",
        role: "superadmin",
        region: "Addis Ababa (Headquarters)",
        verified: true,
        verificationStatus: "Approved",
        status: "active",
        createdAt: "2025-01-01"
      },
      {
        id: "66666666-6666-6666-6666-666666666666",
        name: "Sara Mengistu (Marketplace Admin)",
        nameAm: "ሳራ መንግስቱ",
        phone: "+251900112233",
        role: "admin",
        region: "Addis Ababa",
        verified: true,
        verificationStatus: "Approved",
        status: "active",
        createdAt: "2025-03-15"
      },
      {
        id: "77777777-7777-7777-7777-777777777777",
        name: "Kassahun Tolessa (Field Agent)",
        nameAm: "ካሳሁን ቶለሳ",
        phone: "+251988776655",
        role: "agent",
        region: "Oromia (East Shewa / Bishoftu)",
        verified: true,
        verificationStatus: "Approved",
        status: "active",
        tinNumber: "TIN-AG-881920",
        createdAt: "2025-04-10"
      },
      {
        id: "11111111-1111-1111-1111-111111111111",
        name: "Abebe Bekele",
        nameAm: "አበበ በቀለ",
        phone: "+251911223344",
        role: "farmer",
        region: "Oromia (Bishoftu / Ada'a)",
        verified: true,
        verificationStatus: "Approved",
        status: "active",
        primaryCrop: "Fresh Sholla Tomatoes",
        faydaId: "FAN-1122-3344-5566",
        tinNumber: "0011223344",
        walletBalanceEtb: 48200,
        createdAt: "2025-02-01"
      },
      {
        id: "22222222-2222-2222-2222-222222222222",
        name: "Almaz Tadesse",
        nameAm: "አልማዝ ታደሰ",
        phone: "+251922334455",
        role: "farmer",
        region: "Amhara (Debre Berhan / Basona)",
        verified: true,
        verificationStatus: "Approved",
        status: "active",
        primaryCrop: "Organic Magna White Teff",
        faydaId: "FAN-2233-4455-6677",
        tinNumber: "0022334455",
        walletBalanceEtb: 62400,
        createdAt: "2025-02-15"
      },
      {
        id: "33333333-3333-3333-3333-333333333333",
        name: "Chala Gemechu",
        nameAm: "ጫላ ገመቹ",
        phone: "+251933445566",
        role: "farmer",
        region: "Sidama (Hawassa / Wondo Genet)",
        verified: true,
        verificationStatus: "Approved",
        status: "active",
        primaryCrop: "Hawassa Hass Avocados",
        faydaId: "FAN-3344-5566-7788",
        tinNumber: "0033445566",
        walletBalanceEtb: 39100,
        createdAt: "2025-03-01"
      },
      {
        id: "88888888-8888-8888-8888-888888888888",
        name: "Girma Wondimu",
        nameAm: "ግርማ ወንዲሙ",
        phone: "+251944556677",
        role: "farmer",
        region: "Oromia (Bishoftu / Ada'a)",
        verified: false,
        verificationStatus: "UnderReview",
        status: "active",
        primaryCrop: "Magna Teff",
        faydaId: "FAN-8812-4091-2810",
        tinNumber: "0099881122",
        createdAt: "2026-08-20"
      },
      {
        id: "44444444-4444-4444-4444-444444444444",
        name: "Bethlehem Tsegaye",
        nameAm: "ቤተልሔም ፀጋዬ",
        phone: "+251912345678",
        role: "buyer",
        region: "Addis Ababa (Bole Sub-City)",
        verified: true,
        verificationStatus: "Approved",
        status: "active",
        businessLicenseNumber: "BL-AA-998812",
        tinNumber: "0044556677",
        createdAt: "2025-01-20"
      },
      {
        id: "55555555-5555-5555-5555-555555555555",
        name: "Dawit Kebede (Freight Logistics)",
        nameAm: "ዳዊት ከበደ",
        phone: "+251977889900",
        role: "driver",
        region: "Addis Ababa / Oromia Freight Corridor",
        verified: true,
        verificationStatus: "Approved",
        status: "active",
        vehicleType: "Isuzu 5-Ton Refrigerated",
        vehicleCapacityKg: 5000,
        refrigerationType: "Ventilated & Insulated",
        walletBalanceEtb: 6450,
        createdAt: "2025-02-10"
      },
      {
        id: "f-agent-02",
        name: "Tadesse Roba",
        nameAm: "ታደሰ ሮባ",
        phone: "+251911889900",
        role: "farmer",
        region: "Oromia (Bishoftu)",
        kebele: "Bishoftu Rural Kebele 02",
        primaryCrop: "Red Onions & Garlic",
        faydaId: "FAN-1029-4819-2041",
        tinNumber: "0088772211",
        verified: true,
        verificationStatus: "Approved",
        status: "active",
        createdAt: "2025-04-12"
      },
      {
        id: "f-agent-03",
        name: "Desta Wolde",
        nameAm: "ደስታ ወልዴ",
        phone: "+251922776655",
        role: "farmer",
        region: "Oromia (Ada'a)",
        kebele: "Dukem Farm Zone",
        primaryCrop: "Wheat & Chickpeas",
        faydaId: "FAN-7766-5544-3322",
        verified: true,
        verificationStatus: "Approved",
        status: "active",
        createdAt: "2025-04-15"
      }
    ];

    // Restore any newly registered users from localStorage
    const savedUsersStr = localStorage.getItem('farmerMarketAllUsers');
    let loadedUsers: User[] = [];
    if (savedUsersStr) {
      try {
        const saved: User[] = JSON.parse(savedUsersStr);
        if (Array.isArray(saved) && saved.length > 0) {
          loadedUsers = saved;
        }
      } catch (e) {
        console.warn('Could not parse stored users, using default seed', e);
      }
    }

    if (loadedUsers.length > 0) {
      const defaultList = [...this.allUsers];
      const combined = [...loadedUsers];
      defaultList.forEach(defUser => {
        const cleanDefPhone = defUser.phone.replace(/\s+/g, '');
        if (!this.isDeletedUser(defUser.id, cleanDefPhone) && !combined.some(u => u.id === defUser.id || u.phone.replace(/\s+/g, '') === cleanDefPhone)) {
          combined.push(defUser);
        }
      });
      this.allUsers = combined.filter(u => !this.isDeletedUser(u.id, u.phone));
    } else {
      this.allUsers = this.allUsers.filter(u => !this.isDeletedUser(u.id, u.phone));
    }

    // Initialize Platform Promotional Banners & Announcements
    const defaultBanners: Banner[] = [
      {
        id: "banner-01",
        title: "Fresh Harvest Direct From Bishoftu & Hawassa",
        titleAm: "የቢሾፍቱ እና የሀዋሳ አዳዲስ ምርቶች በቀጥታ ከእርሻ",
        subtitle: "Order Grade-A Teff, Organic Tomatoes & Hass Avocados directly from verified smallholder farmers with 100% Telebirr Escrow protection.",
        subtitleAm: "ከደላላ ጣልቃ ገብነት ነፃ የሆኑ ምርጥ የማኛ ጤፍ፣ የቢሾፍቱ ቀይ ቲማቲም እና ሀስ አቮካዶ በቴሌብር የዋስትና ክፍያ ያግኙ።",
        badgeText: "Harvest Season 2026",
        badgeTextAm: "የ2018 ምርት ወቅት",
        imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200",
        targetAudience: "Buyer",
        targetRegion: "All",
        ctaText: "Browse Marketplace",
        ctaTextAm: "ገበያውን ይመልከቱ",
        ctaLink: "marketplace",
        themeGradient: "from-emerald-900 via-teal-900 to-slate-900",
        priority: 10,
        isActive: true,
        createdAt: "2026-08-20",
        createdBy: "Dr. Dawit Haile (Super Admin)"
      },
      {
        id: "banner-02",
        title: "National Smallholder Fayda ID & TIN Onboarding",
        titleAm: "የአነስተኛ አርሶ አደሮች የፋይዳ (Fayda ID) እና TIN ምዝገባ",
        subtitle: "Verify your digital national ID to unlock instant 90% direct payouts, MOR tax withholding exemptions, and local extension agent farm visits.",
        subtitleAm: "ምርቶን በቀጥታ ለጅምላ ገዢዎች ለመሸጥ እና ክፍያ በቴሌብር ለመቀበል የፋይዳ መታወቂያዎን አሁኑኑ ያረጋግጡ።",
        badgeText: "Legal Compliance",
        badgeTextAm: "ህጋዊ ማረጋገጫ",
        imageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d6910a711?auto=format&fit=crop&q=80&w=1200",
        targetAudience: "Farmer",
        targetRegion: "All",
        ctaText: "Verify Identity Now",
        ctaTextAm: "መታወቂያዎን ያረጋግጡ",
        ctaLink: "farmer",
        themeGradient: "from-blue-900 via-indigo-950 to-slate-900",
        priority: 8,
        isActive: true,
        createdAt: "2026-08-22",
        createdBy: "Sara Mengistu (Admin)"
      },
      {
        id: "banner-03",
        title: "Cold Chain Freight Route Subsidies: Modjo - Addis Corridor",
        titleAm: "የማቀዝቀዣ የጭነት ማጓጓዣ ድጋፍ፡ የሞጆ-አዲስ አበባ መስመር",
        subtitle: "Verified 5-ton & 10-ton refrigerated truck drivers earn guaranteed 5% escrow share with instant fuel advance and digital waybill tracking.",
        subtitleAm: "የተረጋገጡ የጭነት ሹፌሮች የ5% የዋስትና ክፍያ እና ዲጂታል የመንገድ ማረጋገጫ ወዲያውኑ ያገኛሉ።",
        badgeText: "Logistics Incentive",
        badgeTextAm: "የሎጂስቲክስ ማበረታቻ",
        imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200",
        targetAudience: "Driver",
        targetRegion: "Oromia",
        ctaText: "View Available Dispatches",
        ctaTextAm: "የተዘጋጁ ጭነቶችን ይመልከቱ",
        ctaLink: "driver",
        themeGradient: "from-amber-900 via-orange-950 to-slate-900",
        priority: 7,
        isActive: true,
        createdAt: "2026-08-25",
        createdBy: "Sara Mengistu (Admin)"
      }
    ];

    const savedBannersStr = localStorage.getItem('farmerMarketBanners');
    if (savedBannersStr) {
      try {
        const savedBanners = JSON.parse(savedBannersStr);
        if (Array.isArray(savedBanners) && savedBanners.length > 0) {
          this.banners = savedBanners;
        } else {
          this.banners = defaultBanners;
        }
      } catch (e) {
        this.banners = defaultBanners;
      }
    } else {
      this.banners = defaultBanners;
    }

    this.systemAuditLogs = [
      {
        id: "log-101",
        actorId: "00000000-0000-0000-0000-000000000001",
        actorName: "Dr. Dawit Haile (Super Admin)",
        actorRole: "superadmin",
        action: "INITIALIZE_PLATFORM_GOVERNANCE",
        category: "CONFIG",
        targetResource: "PlatformConfig",
        targetId: "ESCROW-90-5-5",
        ipAddress: "196.188.12.45 (Addis Ababa, Ethio Telecom)",
        userAgent: "Antigravity/2.0 Web Admin Engine",
        details: "Established baseline 90/5/5 escrow split, 15% VAT on platform fee, and MOR withholding tax schedule.",
        timestamp: "2026-08-23 08:30 AM"
      },
      {
        id: "log-102",
        actorId: "66666666-6666-6666-6666-666666666666",
        actorName: "Sara Mengistu",
        actorRole: "admin",
        action: "APPROVE_KYC_VERIFICATION",
        category: "USER_CRUD",
        targetResource: "UserDocument",
        targetId: "11111111-1111-1111-1111-111111111111",
        ipAddress: "196.189.44.12",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        details: "Approved Abebe Bekele Fayda National ID (FAN-1122-3344-5566) and TIN (0011223344).",
        timestamp: "2026-08-23 10:15 AM"
      },
      {
        id: "log-103",
        actorId: "66666666-6666-6666-6666-666666666666",
        actorName: "Sara Mengistu",
        actorRole: "admin",
        action: "DISPUTE_ARBITRATION_DECREE",
        category: "DISPUTE",
        targetResource: "Order",
        targetId: "ord-dispute-001",
        ipAddress: "196.189.44.12",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        details: "Resolved moisture defect dispute with 50/50 partial split under EABC arbitration rules.",
        timestamp: "2026-08-23 11:45 AM"
      }
    ];

    this.deliveryZones = [
      { id: "zone-1", name: "Oromia East Shewa Hub", nameAm: "ምስራቅ ሸዋ የግብርና ኮሪደር", centerLatitude: 8.7522, centerLongitude: 38.9785, baseRadiusKm: 45, maxRadiusKm: 120, ruralSubsidyEtb: 150, active: true, clusterHubName: "Bishoftu & Mojo Freight Terminal", smallholdersCount: 4200 },
      { id: "zone-2", name: "Addis Ababa Central Wholesale Depot", nameAm: "አዲስ አበባ ማዕከላዊ የጅምላ ዲፖ", centerLatitude: 9.0222, centerLongitude: 38.7468, baseRadiusKm: 25, maxRadiusKm: 60, ruralSubsidyEtb: 0, active: true, clusterHubName: "Merkato & Jan Meda Distribution", smallholdersCount: 850 },
      { id: "zone-3", name: "Amhara Highland Grain Basin", nameAm: "የአማራ ከፍተኛ የጤፍና እህል ተፋሰስ", centerLatitude: 9.6800, centerLongitude: 39.5300, baseRadiusKm: 60, maxRadiusKm: 180, ruralSubsidyEtb: 250, active: true, clusterHubName: "Debre Berhan & Shewa Robit Hub", smallholdersCount: 3100 },
      { id: "zone-4", name: "Sidama Rift Fruit & Vegetable Zone", nameAm: "የሲዳማ ፍራፍሬ እና አትክልት ዞን", centerLatitude: 7.0504, centerLongitude: 38.4955, baseRadiusKm: 50, maxRadiusKm: 150, ruralSubsidyEtb: 200, active: true, clusterHubName: "Hawassa Lakeview Terminal", smallholdersCount: 1950 },
      { id: "zone-5", name: "SNNPR Gedeo Specialty Coffee Zone", nameAm: "የጌዴኦ ስፔሻሊቲ ቡና ዞን", centerLatitude: 6.1628, centerLongitude: 38.2045, baseRadiusKm: 40, maxRadiusKm: 140, ruralSubsidyEtb: 300, active: true, clusterHubName: "Yirgacheffe Washing Station Depot", smallholdersCount: 1400 },
      { id: "zone-6", name: "Tigray Northern Transit Hub", nameAm: "የትግራይ ሰሜናዊ የንግድ ኮሪደር", centerLatitude: 13.4967, centerLongitude: 39.4753, baseRadiusKm: 55, maxRadiusKm: 160, ruralSubsidyEtb: 350, active: true, clusterHubName: "Mekelle Central Depot", smallholdersCount: 1100 }
    ];

    this.featureFlags = [
      { key: "advance_harvest", name: "Advance Harvest Pre-Ordering", description: "Allows wholesale buyers to secure future harvests 2-4 weeks prior to field collection.", enabled: true, rolloutPercentage: 100, targetRegions: ["all"], targetRoles: ["farmer", "buyer", "admin", "superadmin"] },
      { key: "voice_note_transcription", name: "Voice Note Audio Memos & AI Transcription", description: "Enables Amharic and Afaan Oromoo audio produce memos with automatic speech-to-text.", enabled: true, rolloutPercentage: 100, targetRegions: ["all"], targetRoles: ["farmer", "agent", "admin", "superadmin"] },
      { key: "dynamic_price_benchmarking", name: "Real-time Wholesale Depot Price Benchmarking", description: "Displays live price comparisons vs Merkato, Sholla, and Adama depots on produce cards.", enabled: true, rolloutPercentage: 100, targetRegions: ["all"], targetRoles: ["buyer", "farmer", "superadmin"] },
      { key: "ussd_offline_gateway", name: "USSD Offline Gateway (*990# / *805#)", description: "Permits feature phone registration, balance checks, and SMS listing fallbacks.", enabled: true, rolloutPercentage: 100, targetRegions: ["all"], targetRoles: ["farmer", "agent"] },
      { key: "multisig_escrow_protection", name: "High-Value Escrow Multi-Sig Authorization", description: "Requires Super Admin dual authorization for payouts exceeding 50,000 ETB.", enabled: true, rolloutPercentage: 100, targetRegions: ["all"], targetRoles: ["admin", "superadmin"] }
    ];

    this.payoutApprovals = [
      {
        id: "payout-appr-001",
        recipientId: "22222222-2222-2222-2222-222222222222",
        recipientName: "Almaz Tadesse (Basona Teff Cooperative)",
        recipientPhone: "+251922334455",
        recipientRole: "farmer",
        amountEtb: 62400,
        walletBalanceBefore: 62400,
        riskScore: "Low",
        triggerReason: "Exceeds 50,000 ETB platform threshold (100 Quintals Teff Settlement)",
        status: "Pending",
        requestedAt: "Today 10:45 AM"
      },
      {
        id: "payout-appr-002",
        recipientId: "55555555-5555-5555-5555-555555555555",
        recipientName: "Dawit Kebede (Bulk Freight Fleet)",
        recipientPhone: "+251977889900",
        recipientRole: "driver",
        amountEtb: 54200,
        walletBalanceBefore: 54200,
        riskScore: "Medium",
        triggerReason: "High-frequency multi-trip batch withdrawal (5 Cross-Regional Trips)",
        status: "Pending",
        requestedAt: "Today 01:20 PM"
      }
    ];

    this.blacklist = [
      {
        id: "bl-01",
        type: "Phone",
        value: "+251911999888",
        reason: "Repeated fraudulent non-delivery claims in Adama market",
        blacklistedBy: "Dr. Dawit Haile (Super Admin)",
        blacklistedAt: "2026-08-15",
        active: true
      },
      {
        id: "bl-02",
        type: "NationalId",
        value: "FAN-9999-0000-1111",
        reason: "Forged Kebele farming certification and duplicate TIN submission",
        blacklistedBy: "Dr. Dawit Haile (Super Admin)",
        blacklistedAt: "2026-08-18",
        active: true
      }
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
        const vStatus: VerificationStatus = data.verificationStatus || (data.verified ? 'Approved' : 'PendingSubmission');
        const user: User = {
          id: data.id,
          phone: data.phone,
          name: data.name,
          nameAm: data.nameAm,
          email: data.email,
          languagePreference: data.languagePreference,
          savedDeliveryAddress: data.savedDeliveryAddress,
          defaultDeliveryLat: data.defaultDeliveryLat,
          defaultDeliveryLng: data.defaultDeliveryLng,
          role: (data.role || 'buyer').toLowerCase() as UserRole,
          region: data.region,
          verified: data.verified ?? (vStatus === 'Approved'),
          verificationStatus: vStatus,
          rejectionReason: data.rejectionReason,
          tinNumber: data.tinNumber || (vStatus === 'Approved' && data.role === 'buyer' ? 'TIN-ET-9912001' : undefined),
          businessLicenseNumber: data.businessLicenseNumber || (vStatus === 'Approved' ? 'MOT-LIC-2026-98124' : undefined),
          vehicleType: data.vehicleType || (data.role === 'driver' ? "Isuzu 5-Ton" : undefined),
          refrigerationType: data.refrigerationType || (data.role === 'driver' ? "Ventilated" : undefined),
          vehicleCapacityKg: data.vehicleCapacityKg || (data.role === 'driver' ? 5000 : undefined),
          kycDocumentType: data.kycDocumentType || (vStatus === 'Approved' ? "National ID (Fayda)" : undefined),
          kycDocumentNumber: data.kycDocumentNumber,
          kycStatus: vStatus === 'Approved' ? "Verified" : vStatus === 'UnderReview' ? "Pending" : "Pending",
          kycTier: data.kycTier || 2,
          repeatBuyerCount: data.repeatBuyerCount || (data.role === 'farmer' ? 14 : undefined),
          onTimeDeliveryRate: data.onTimeDeliveryRate || (data.role === 'farmer' || data.role === 'driver' ? 99 : undefined),
          walletBalanceEtb: data.walletBalanceEtb ?? 0,
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

  public async updateProfile(dto: {
    name: string;
    nameAm?: string;
    region: string;
    email?: string;
    languagePreference?: string;
    savedDeliveryAddress?: string;
    defaultDeliveryLat?: number;
    defaultDeliveryLng?: number;
  }): Promise<User> {
    if (!this.token) throw new Error('You must be signed in to update your profile.');
    const res = await fetch('/api/auth/profile', {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({
        Name: dto.name,
        NameAm: dto.nameAm || null,
        Region: dto.region,
        Email: dto.email || null,
        LanguagePreference: dto.languagePreference || null,
        SavedDeliveryAddress: dto.savedDeliveryAddress || null,
        DefaultDeliveryLat: dto.defaultDeliveryLat ?? null,
        DefaultDeliveryLng: dto.defaultDeliveryLng ?? null
      })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Could not save your profile.');
    await this.fetchMe();
    return this.currentUser as User;
  }

  public async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    if (!this.token) throw new Error('You must be signed in to change your password.');
    const res = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ currentPassword, newPassword })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Could not change your password.');
  }

  private async accountRequest(path: string, init?: RequestInit): Promise<any> {
    const res = await fetch(`/api/account/${path}`, { ...init, headers: { ...this.getAuthHeaders(), ...(init?.headers || {}) } });
    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error(data?.error || 'Account request failed.');
    return data;
  }

  public async fetchAccountData(): Promise<typeof this.accountData> {
    if (!this.token) return this.accountData;
    const [addresses, paymentMethods, coupons, notificationPreferences, sessions, twoFactor] = await Promise.all([
      this.accountRequest('addresses'), this.accountRequest('payment-methods'), this.accountRequest('coupons'),
      this.accountRequest('notification-preferences'), this.accountRequest('sessions'), this.accountRequest('two-factor')
    ]);
    this.accountData = { addresses, paymentMethods, coupons, notificationPreferences, sessions, twoFactor };
    return this.accountData;
  }

  public getAccountData() { return this.accountData; }
  public async saveAddress(address: any) { const result = await this.accountRequest('addresses', { method: 'POST', body: JSON.stringify(address) }); await this.fetchAccountData(); return result; }
  public async updateAddress(id: string, address: any) { const result = await this.accountRequest(`addresses/${id}`, { method: 'PUT', body: JSON.stringify(address) }); await this.fetchAccountData(); return result; }
  public async deleteAddress(id: string) { await this.accountRequest(`addresses/${id}`, { method: 'DELETE' }); await this.fetchAccountData(); }
  public async addPaymentMethod(method: any) { const result = await this.accountRequest('payment-methods', { method: 'POST', body: JSON.stringify(method) }); await this.fetchAccountData(); return result; }
  public async setPrimaryPaymentMethod(id: string) { await this.accountRequest(`payment-methods/${id}/primary`, { method: 'PUT' }); await this.fetchAccountData(); }
  public async deletePaymentMethod(id: string) { await this.accountRequest(`payment-methods/${id}`, { method: 'DELETE' }); await this.fetchAccountData(); }
  public async setNotificationPreference(preference: any) { const result = await this.accountRequest('notification-preferences', { method: 'PUT', body: JSON.stringify(preference) }); await this.fetchAccountData(); return result; }
  public async updateTwoFactor(setting: any) { const result = await this.accountRequest('two-factor', { method: 'PUT', body: JSON.stringify(setting) }); await this.fetchAccountData(); return result; }
  public async revokeOtherSessions() { await this.accountRequest('sessions/revoke-others', { method: 'POST' }); await this.fetchAccountData(); }

  public async requestOtp(phone: string): Promise<{ demoCode?: string; message: string; phone: string; userName?: string; role?: string }> {
    const cleanPhone = phone.startsWith('+251') ? phone.replace(/\s+/g, '') : '+251' + phone.replace(/^0+/, '').replace(/\s+/g, '');
    try {
      const res = await fetch('/api/auth/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanPhone })
      });

      if (res.ok) {
        return await res.json();
      }

      // Check if user exists in local seed list
      const localUser = this.allUsers.find(u => u.phone.replace(/\s+/g, '') === cleanPhone);
      if (localUser) {
        return {
          demoCode: '888888',
          message: `Verification code dispatched via SMS simulator for ${localUser.name}.`,
          phone: cleanPhone,
          userName: localUser.name,
          role: localUser.role
        };
      }

      const err = await res.json().catch(() => ({ error: 'Failed to request OTP' }));
      throw new Error(err.error || 'Failed to request OTP. Please check your phone number.');
    } catch (err: any) {
      const localUser = this.allUsers.find(u => u.phone.replace(/\s+/g, '') === cleanPhone);
      if (localUser) {
        return {
          demoCode: '888888',
          message: `Verification code dispatched via SMS simulator for ${localUser.name}.`,
          phone: cleanPhone,
          userName: localUser.name,
          role: localUser.role
        };
      }
      throw err;
    }
  }

  public async verifyOtp(phone: string, code: string): Promise<User> {
    const cleanPhone = phone.startsWith('+251') ? phone.replace(/\s+/g, '') : '+251' + phone.replace(/^0+/, '').replace(/\s+/g, '');
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanPhone, code: code.trim() })
      });

      if (res.ok) {
        const data = await res.json();
        this.token = data.token;
        localStorage.setItem('token', data.token);

        const vStatus: VerificationStatus = data.user.verificationStatus || (data.user.verified ? 'Approved' : 'PendingSubmission');
        const user: User = {
          id: data.user.id,
          phone: data.user.phone,
          name: data.user.name,
          nameAm: data.user.nameAm,
          role: (data.user.role || 'buyer').toLowerCase() as UserRole,
          region: data.user.region,
          verified: data.user.verified ?? (vStatus === 'Approved'),
          verificationStatus: vStatus,
          rejectionReason: data.user.rejectionReason,
          tinNumber: data.user.tinNumber,
          businessLicenseNumber: data.user.businessLicenseNumber,
          vehicleType: data.user.vehicleType || (data.user.role === 'driver' ? "Isuzu 5-Ton" : undefined),
          refrigerationType: data.user.refrigerationType || (data.user.role === 'driver' ? "Ventilated" : undefined),
          vehicleCapacityKg: data.user.vehicleCapacityKg || (data.user.role === 'driver' ? 5000 : undefined),
          kycDocumentType: data.user.kycDocumentType,
          kycDocumentNumber: data.user.kycDocumentNumber,
          kycStatus: vStatus === 'Approved' ? "Verified" : "Pending",
          kycTier: 2,
          repeatBuyerCount: data.user.repeatBuyerCount || (data.user.role === 'farmer' ? 14 : undefined),
          onTimeDeliveryRate: data.user.onTimeDeliveryRate || (data.user.role === 'farmer' || data.user.role === 'driver' ? 99 : undefined),
          walletBalanceEtb: data.user.walletBalanceEtb ?? 0,
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
    } catch (e) {
      console.warn('Network verifyOtp failed, checking local seed users', e);
    }

    // Local fallback for Super Admin and seeded accounts
    const localUser = this.allUsers.find(u => u.phone.replace(/\s+/g, '') === cleanPhone);
    if (localUser) {
      this.currentUser = localUser;
      this.isUserLoggedIn = true;
      this.token = 'demo-jwt-token-' + localUser.id;
      localStorage.setItem('token', this.token);
      localStorage.setItem('currentUser', JSON.stringify(localUser));
      this.notify();
      return localUser;
    }

    throw new Error('Invalid verification code or phone number.');
  }

  public async registerUser(name: string, nameAm: string | undefined, phone: string, role: UserRole, region: string): Promise<User> {
    const cleanPhone = phone.startsWith('+251') ? phone.replace(/\s+/g, '') : '+251' + phone.replace(/^0+/, '').replace(/\s+/g, '');
    const roleFormatted = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();

    let createdUser: User;

    try {
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

      if (res.ok) {
        const data = await res.json();
        this.token = data.token;
        localStorage.setItem('token', data.token);

        createdUser = {
          id: data.user.id,
          phone: data.user.phone,
          name: data.user.name,
          nameAm: data.user.nameAm,
          role: (data.user.role || 'buyer').toLowerCase() as UserRole,
          region: data.user.region,
          verified: false,
          verificationStatus: 'PendingSubmission',
          status: 'active',
          tinNumber: undefined,
          businessLicenseNumber: undefined,
          vehicleType: role === 'driver' ? 'Isuzu 5-Ton' : undefined,
          refrigerationType: role === 'driver' ? 'Ventilated' : undefined,
          vehicleCapacityKg: role === 'driver' ? 5000 : undefined,
          kycDocumentType: undefined,
          kycDocumentNumber: undefined,
          kycStatus: 'Pending',
          kycTier: 1,
          repeatBuyerCount: 0,
          onTimeDeliveryRate: 100,
          walletBalanceEtb: 0,
          createdAt: data.user.createdAt || new Date().toISOString()
        };
      } else {
        const err = await res.json().catch(() => ({ error: 'Registration failed' }));
        throw new Error(err.error || 'Registration failed');
      }
    } catch (err: any) {
      console.warn('Backend register call fallback to local state', err);
      createdUser = {
        id: 'user-' + Date.now(),
        phone: cleanPhone,
        name,
        nameAm: nameAm || name,
        role,
        region,
        verified: false,
        verificationStatus: 'PendingSubmission',
        status: 'active',
        walletBalanceEtb: 0,
        createdAt: new Date().toISOString()
      };
      this.token = 'demo-jwt-token-' + createdUser.id;
      localStorage.setItem('token', this.token);
    }

    this.currentUser = createdUser;
    this.isUserLoggedIn = true;
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

    // CRITICAL: Ensure newly registered user is added to allUsers for Super Admin visibility
    const existingIdx = this.allUsers.findIndex(u => u.id === createdUser.id || u.phone === createdUser.phone);
    if (existingIdx !== -1) {
      this.allUsers[existingIdx] = { ...this.allUsers[existingIdx], ...createdUser };
    } else {
      this.allUsers.unshift(createdUser);
    }
    this.saveUsersToStorage();

    this.addAuditLog({
      actorId: createdUser.id,
      actorName: createdUser.name,
      actorRole: createdUser.role,
      action: 'USER_REGISTRATION',
      category: 'AUTH',
      targetResource: 'User',
      targetId: createdUser.id,
      ipAddress: '196.188.12.45',
      userAgent: navigator.userAgent,
      details: `Self-registered new ${createdUser.role.toUpperCase()} account: ${createdUser.name} (${createdUser.phone}) in ${createdUser.region}.`
    });

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

    let createdItem: Listing | null = null;

    try {
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const created = await res.json();
        createdItem = {
          id: created.id,
          farmerId: created.farmerId || this.currentUser?.id || '11111111-1111-1111-1111-111111111111',
          farmerName: created.farmerName || this.currentUser?.name || 'Abebe Bekele',
          farmerNameAm: created.farmerNameAm || this.currentUser?.nameAm,
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
          createdAt: created.createdAt || new Date().toISOString()
        };
      }
    } catch (e) {
      console.warn('Create listing network call fallback to local state', e);
    }

    if (!createdItem) {
      createdItem = {
        id: 'list-local-' + Date.now(),
        farmerId: this.currentUser?.id || '11111111-1111-1111-1111-111111111111',
        farmerName: this.currentUser?.name || 'Abebe Bekele',
        farmerNameAm: this.currentUser?.nameAm,
        farmerPhone: this.currentUser?.phone || '+251911223344',
        region: this.currentUser?.region || 'Oromia (Bishoftu)',
        productName: data.productName || 'Fresh Farm Produce',
        nameAm: data.nameAm,
        category: data.category || 'Vegetables',
        qtyKg: Number(data.qtyKg || 1000),
        pricePerKg: Number(data.pricePerKg || 45),
        minOrderKg: Number(data.minOrderKg || 100),
        latitude: data.latitude || 8.7523,
        longitude: data.longitude || 38.9785,
        distanceKm: 45,
        photos: data.photos && data.photos.length > 0 ? data.photos : ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80'],
        availableFrom: data.availableFrom || new Date().toISOString().split('T')[0],
        status: 'active',
        grade: data.grade || 'Grade 1',
        ripeness: data.ripeness || 'Ready Today',
        isOrganic: data.isOrganic ?? true,
        isAdvanceHarvest: data.isAdvanceHarvest ?? false,
        expectedHarvestDate: data.expectedHarvestDate,
        voiceNoteUrl: data.voiceNoteUrl,
        voiceNoteTranscript: data.voiceNoteTranscript,
        marketBenchmarkPrice: data.marketBenchmarkPrice || data.pricePerKg,
        moderationStatus: 'Approved',
        farmerRating: 5.0,
        reviewCount: 0,
        repeatBuyerCount: 18,
        onTimeDeliveryRate: 99,
        createdAt: new Date().toISOString()
      };
    }

    this.listings.unshift(createdItem);
    this.notify();
    return createdItem;
  }

  public async deleteListing(id: string): Promise<void> {
    const res = await fetch(`/api/listings/${id}`, { method: 'DELETE', headers: this.getAuthHeaders() });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Could not delete the listing.');
    await this.fetchListings();
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

  public async placeOrder(listingId: string, qtyKg: number, deliveryAddress?: string, isRecurring = false, frequency = 'Weekly', paymentMethodId?: string): Promise<Order> {
    const listing = this.listings.find(l => l.id === listingId);
    if (!listing) throw new Error("Listing not found");

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({
        listingId,
        qtyKg,
        deliveryAddress: deliveryAddress || this.currentUser?.region || 'Addis Ababa (Bole)',
        paymentMethodId: paymentMethodId || null,
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
    const res = await fetch(`/api/orders/${orderId}/dispute`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({
        reason,
        disputePhoto: photo || 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80',
        requestedRefundPercent: refundPercent
      })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Could not submit the dispute.');
    await this.fetchOrders();
  }

  public async resolveDispute(orderId: string, resolution: 'ReleaseToFarmer' | 'RefundBuyer' | 'PartialSplit', farmerShare = 50, buyerRefund = 50) {
    const res = await fetch(`/api/admin/orders/${orderId}/resolve-dispute`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({
        resolution,
        notes: `Arbitrated via Admin Console (${resolution})`,
        farmerSharePercent: farmerShare,
        buyerRefundPercent: buyerRefund
      })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Could not resolve the dispute.');
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
        createdAt: new Date().toISOString()
      });
      this.notify();
    }
  }

  // ==================== VERIFICATION & FIELD AGENT ONBOARDING ====================

  public async submitVerificationDocuments(
    tinNumber: string,
    docs: Array<{ documentType: string; documentNumber: string; frontImageUrl?: string; backImageUrl?: string }>
  ) {
    if (this.currentUser) {
      this.currentUser.tinNumber = tinNumber;
      this.currentUser.verificationStatus = 'UnderReview';
      this.currentUser.rejectionReason = undefined;

      const userDocs: UserDocument[] = docs.map((d, idx) => ({
        id: 'doc-self-' + idx + '-' + Date.now(),
        userId: this.currentUser!.id,
        documentType: d.documentType,
        documentNumber: d.documentNumber,
        frontImageUrl: d.frontImageUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
        backImageUrl: d.backImageUrl || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
        status: 'UnderReview',
        submittedAt: new Date().toISOString()
      }));

      this.currentUser.documents = userDocs;
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

      const queueItem: VerificationQueueItem = {
        userId: this.currentUser.id,
        userName: this.currentUser.name,
        userNameAm: this.currentUser.nameAm,
        userRole: this.currentUser.role.charAt(0).toUpperCase() + this.currentUser.role.slice(1),
        phone: this.currentUser.phone,
        region: this.currentUser.region,
        registrationMethod: 'Self',
        verificationStatus: 'UnderReview',
        tinNumber: tinNumber,
        registeredAt: 'Just now',
        documents: userDocs,
        reviews: []
      };

      const existingIdx = this.verificationQueue.findIndex(q => q.userId === this.currentUser!.id);
      if (existingIdx >= 0) {
        this.verificationQueue[existingIdx] = queueItem;
      } else {
        this.verificationQueue.unshift(queueItem);
      }
    }

    try {
      await fetch('/api/verification/submit', {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ tinNumber, documents: docs })
      });
    } catch (e) {
      console.warn('Backend verification submit fallback to local state', e);
    }

    this.notify();
  }

  public async agentRegisterFarmer(payload: {
    name: string;
    nameAm?: string;
    phone: string;
    region: string;
    kebele?: string;
    primaryCrop?: string;
    faydaId?: string;
    tinNumber?: string;
    faydaFrontImageUrl?: string;
    faydaBackImageUrl?: string;
  }) {
    const cleanPhone = payload.phone.startsWith('+251') ? payload.phone : '+251' + payload.phone.replace(/^0+/, '');
    const newFarmerId = 'agent-f-' + Date.now();

    const registeredFarmer: AgentRegisteredFarmer = {
      id: newFarmerId,
      name: payload.name,
      nameAm: payload.nameAm || payload.name,
      phone: cleanPhone,
      region: payload.region,
      kebele: payload.kebele,
      primaryCrop: payload.primaryCrop,
      faydaId: payload.faydaId,
      tinNumber: payload.tinNumber,
      status: 'UnderReview',
      registeredAt: 'Just now',
      faydaFrontImageUrl: payload.faydaFrontImageUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80'
    };

    this.agentRegisteredFarmers.unshift(registeredFarmer);

    const queueItem: VerificationQueueItem = {
      userId: newFarmerId,
      userName: payload.name,
      userNameAm: payload.nameAm,
      userRole: 'Farmer',
      phone: cleanPhone,
      region: payload.region,
      registrationMethod: 'Agent',
      registeredByAgentName: this.currentUser?.name || 'Community Field Agent',
      verificationStatus: 'UnderReview',
      tinNumber: payload.tinNumber,
      registeredAt: 'Just now',
      documents: [
        {
          id: 'doc-ag-1-' + Date.now(),
          userId: newFarmerId,
          documentType: 'FaydaId',
          documentNumber: payload.faydaId || 'FAN-PENDING',
          frontImageUrl: payload.faydaFrontImageUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
          backImageUrl: payload.faydaBackImageUrl || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
          status: 'UnderReview',
          submittedAt: new Date().toISOString()
        }
      ],
      reviews: []
    };

    this.verificationQueue.unshift(queueItem);

    // Also add to allUsers for SuperAdmin management
    const newFarmerUser: User = {
      id: newFarmerId,
      name: payload.name,
      nameAm: payload.nameAm || payload.name,
      phone: cleanPhone,
      role: 'farmer',
      region: payload.region,
      kebele: payload.kebele,
      primaryCrop: payload.primaryCrop,
      faydaId: payload.faydaId,
      tinNumber: payload.tinNumber,
      verified: false,
      verificationStatus: 'UnderReview',
      status: 'active',
      walletBalanceEtb: 0,
      createdAt: new Date().toISOString()
    };

    const existingIdx = this.allUsers.findIndex(u => u.id === newFarmerId || u.phone === cleanPhone);
    if (existingIdx !== -1) {
      this.allUsers[existingIdx] = { ...this.allUsers[existingIdx], ...newFarmerUser };
    } else {
      this.allUsers.unshift(newFarmerUser);
    }
    this.saveUsersToStorage();

    this.addAuditLog({
      actorId: this.currentUser?.id || 'agent-01',
      actorName: this.currentUser?.name || 'Field Agent',
      actorRole: this.currentUser?.role || 'agent',
      action: 'AGENT_ONBOARD_FARMER',
      category: 'USER_CRUD',
      targetResource: 'User',
      targetId: newFarmerId,
      ipAddress: '196.188.12.45',
      userAgent: navigator.userAgent,
      details: `Field agent onboarded farmer: ${payload.name} (${cleanPhone}) in ${payload.region}.`
    });

    try {
      await fetch('/api/verification/agent-register', {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(payload)
      });
    } catch (e) {
      console.warn('Agent register farmer fallback to local state', e);
    }

    this.notify();
    return registeredFarmer;
  }

  public async reviewVerification(userId: string, action: 'Approve' | 'Reject' | 'RequestChanges', notes?: string, rejectionReason?: string) {
    const queueItem = this.verificationQueue.find(q => q.userId === userId);
    if (queueItem) {
      queueItem.verificationStatus = action === 'Approve' ? 'Approved' : 'Rejected';
      queueItem.rejectionReason = action === 'Reject' ? (rejectionReason || notes || 'Document image was illegible') : undefined;
      queueItem.reviews.unshift({
        id: 'rev-' + Date.now(),
        userId: userId,
        reviewerName: this.currentUser?.name || 'Sara Mengistu (Admin)',
        actionTaken: action,
        notes: notes || rejectionReason || (action === 'Approve' ? 'All records verified.' : 'Verification rejected.'),
        timestamp: 'Just now'
      });
      queueItem.documents.forEach(d => {
        d.status = action === 'Approve' ? 'Approved' : 'Rejected';
        d.rejectionReason = queueItem.rejectionReason;
      });
    }

    const agentItem = this.agentRegisteredFarmers.find(f => f.id === userId);
    if (agentItem) {
      agentItem.status = action === 'Approve' ? 'Approved' : 'Rejected';
    }

    if (this.currentUser && this.currentUser.id === userId) {
      this.currentUser.verificationStatus = action === 'Approve' ? 'Approved' : 'Rejected';
      this.currentUser.verified = action === 'Approve';
      this.currentUser.rejectionReason = queueItem?.rejectionReason;
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }

    try {
      await fetch(`/api/verification/${userId}/review`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ action, notes, rejectionReason })
      });
    } catch (e) {
      console.warn('Review verification remote call failed, updated local state', e);
    }

    this.notify();
  }

  public getVerificationQueue(role?: string, status?: string): VerificationQueueItem[] {
    let result = [...this.verificationQueue];
    if (role && role !== 'All') {
      result = result.filter(q => q.userRole.toLowerCase() === role.toLowerCase());
    }
    if (status && status !== 'All') {
      result = result.filter(q => q.verificationStatus === status);
    }
    return result;
  }

  public async fetchVerificationQueue(): Promise<VerificationQueueItem[]> {
    if (!this.isAuthenticated()) return this.verificationQueue;
    try {
      const res = await fetch('/api/verification/queue', { headers: this.getAuthHeaders() });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          this.verificationQueue = data;
          this.notify();
        }
      }
    } catch (e) {
      console.warn('Fetch verification queue failed, using local queue', e);
    }
    return this.verificationQueue;
  }

  public getAgentRegisteredFarmers(): AgentRegisteredFarmer[] {
    return this.agentRegisteredFarmers;
  }

  public getVerificationStatus(userId?: string): VerificationStatus {
    if (userId) {
      const q = this.verificationQueue.find(x => x.userId === userId);
      if (q) return q.verificationStatus;
    }
    return this.currentUser?.verificationStatus || (this.currentUser?.verified ? 'Approved' : 'PendingSubmission');
  }

  public async sendInboundUssdSimulation(phone: string, ussdCode: string): Promise<string> {
    if (ussdCode.includes('*990#') || ussdCode.includes('*805#')) {
      return `Farmer-to-Market USSD\n1. Register as Farmer\n2. Submit Fayda ID\n3. Check Escrow Balance\n4. Request Extension Agent Visit\nReply with number:`;
    }
    if (ussdCode === '1') {
      return `Welcome! Enter your Name & Woreda (e.g., Bekele Bishoftu):`;
    }
    if (ussdCode === '2') {
      return `Enter your 16-digit Fayda ID Number or FAN-XXXX-XXXX-XXXX:`;
    }
    if (ussdCode === '3') {
      return `Your Telebirr Escrow Balance is 48,200 ETB. Payout available at local agent.`;
    }
    if (ussdCode === '4') {
      return `Agent Kassahun Tolessa (+251988776655) has been assigned to visit your farm within 48 hours.`;
    }
    return `Farmer-to-Market: Command received. SMS confirmation dispatched to ${phone}.`;
  }

  private saveUsersToStorage() {
    try {
      localStorage.setItem('farmerMarketAllUsers', JSON.stringify(this.allUsers));
    } catch (e) {
      console.warn('Failed to persist users to localStorage', e);
    }
  }

  public async fetchUsers(): Promise<User[]> {
    try {
      const res = await fetch('/api/auth/demo-users');
      if (res.ok) {
        const dbUsers: any[] = await res.json();
        if (Array.isArray(dbUsers)) {
          let updated = false;
          dbUsers.forEach(dbU => {
            const cleanPhone = dbU.phone.replace(/\s+/g, '');
            if (!this.isDeletedUser(dbU.id, cleanPhone)) {
              const existing = this.allUsers.find(u => u.phone.replace(/\s+/g, '') === cleanPhone);
              if (!existing) {
                const u: User = {
                  id: dbU.id || 'db-' + cleanPhone.replace(/\D/g, ''),
                  phone: dbU.phone,
                  name: dbU.name,
                  nameAm: dbU.nameAm,
                  role: (dbU.role || 'buyer').toLowerCase() as UserRole,
                  region: dbU.region || 'Addis Ababa',
                  verified: true,
                  verificationStatus: 'Approved',
                  status: 'active',
                  createdAt: new Date().toISOString()
                };
                this.allUsers.push(u);
                updated = true;
              }
            }
          });
          if (updated) {
            this.saveUsersToStorage();
            this.notify();
          }
        }
      }
    } catch (e) {
      console.warn('Fetch remote users failed, using local user list', e);
    }
    return this.getAllUsers();
  }

  public async refreshAllData() {
    await Promise.allSettled([
      this.fetchListings(),
      this.fetchOrders(),
      this.fetchSummaries(),
      this.fetchVerificationQueue(),
      this.fetchUsers()
    ]);
    this.notify();
  }

  // ==================== SUPER ADMIN METHODS ====================

  public getAllUsers(): User[] {
    const userMap = new Map<string, User>();

    // 1. Base allUsers
    this.allUsers.forEach(u => {
      if (!this.isDeletedUser(u.id, u.phone)) {
        if (u.phone) userMap.set(u.phone.replace(/\s+/g, ''), u);
        else if (u.id) userMap.set(u.id, u);
      }
    });

    // 2. Verification Queue users (sync into master userMap)
    this.verificationQueue.forEach(q => {
      const cleanPhone = q.phone.replace(/\s+/g, '');
      if (!this.isDeletedUser(q.userId, cleanPhone)) {
        if (!userMap.has(cleanPhone)) {
          const newUser: User = {
            id: q.userId || 'vq-' + cleanPhone.replace(/\D/g, ''),
            name: q.userName,
            nameAm: q.userNameAm,
            phone: q.phone,
            role: (q.userRole || 'farmer').toLowerCase() as UserRole,
            region: q.region || 'Addis Ababa',
            verified: q.verificationStatus === 'Approved',
            verificationStatus: q.verificationStatus as any,
            status: 'active',
            tinNumber: q.tinNumber,
            faydaId: q.documents?.find(d => d.documentType === 'FaydaId')?.documentNumber,
            createdAt: q.registeredAt || new Date().toISOString()
          };
          userMap.set(cleanPhone, newUser);
          this.allUsers.push(newUser);
        } else {
          const existing = userMap.get(cleanPhone)!;
          existing.verificationStatus = q.verificationStatus as any;
          existing.verified = q.verificationStatus === 'Approved';
          if (q.tinNumber) existing.tinNumber = q.tinNumber;
        }
      }
    });

    // 3. KYC Queue users
    this.kycQueue.forEach(k => {
      const cleanPhone = k.phone.replace(/\s+/g, '');
      if (!this.isDeletedUser(k.userId, cleanPhone)) {
        if (!userMap.has(cleanPhone)) {
          const newUser: User = {
            id: k.userId || 'kyc-' + cleanPhone.replace(/\D/g, ''),
            name: k.userName,
            phone: k.phone,
            role: (k.userRole || 'farmer').toLowerCase() as UserRole,
            region: k.region || 'Addis Ababa',
            verified: k.status === 'Verified',
            verificationStatus: k.status === 'Verified' ? 'Approved' : 'UnderReview',
            status: 'active',
            tinNumber: k.tinNumber,
            faydaId: k.documentNumber,
            createdAt: k.submittedAt || new Date().toISOString()
          };
          userMap.set(cleanPhone, newUser);
          this.allUsers.push(newUser);
        }
      }
    });

    // 4. Agent Registered Farmers
    this.agentRegisteredFarmers.forEach(af => {
      const cleanPhone = af.phone.replace(/\s+/g, '');
      if (!this.isDeletedUser(af.id, cleanPhone)) {
        if (!userMap.has(cleanPhone)) {
          const newUser: User = {
            id: af.id,
            name: af.name,
            nameAm: af.nameAm,
            phone: af.phone,
            role: 'farmer',
            region: af.region,
            kebele: af.kebele,
            primaryCrop: af.primaryCrop,
            faydaId: af.faydaId,
            tinNumber: af.tinNumber,
            verified: af.status === 'Approved',
            verificationStatus: af.status as any,
            status: 'active',
            createdAt: af.registeredAt || new Date().toISOString()
          };
          userMap.set(cleanPhone, newUser);
          this.allUsers.push(newUser);
        }
      }
    });

    // 5. Current logged-in user if not present
    if (this.currentUser && this.currentUser.phone && !this.isDeletedUser(this.currentUser.id, this.currentUser.phone)) {
      const cleanPhone = this.currentUser.phone.replace(/\s+/g, '');
      if (!userMap.has(cleanPhone)) {
        userMap.set(cleanPhone, this.currentUser);
        this.allUsers.push(this.currentUser);
      }
    }

    return Array.from(userMap.values()).filter(u => !this.isDeletedUser(u.id, u.phone));
  }

  public getUserById(id: string): User | undefined {
    const cleanId = (id || '').trim();
    if (!cleanId) return undefined;
    return this.getAllUsers().find(u =>
      u.id === cleanId ||
      u.phone === cleanId ||
      u.phone.replace(/\s+/g, '') === cleanId.replace(/\s+/g, '')
    );
  }

  public createUser(dto: CreateUserDto): User {
    const cleanPhone = dto.phone.startsWith('+251') ? dto.phone.replace(/\s+/g, '') : '+251' + dto.phone.replace(/^0+/, '').replace(/\s+/g, '');

    // Remove from deleted list if re-creating
    this.deletedUserIds.delete(cleanPhone.toLowerCase());
    this.deletedUserIds.delete(cleanPhone.replace(/\D/g, ''));
    this.saveDeletedUsers();

    const newUser: User = {
      id: crypto.randomUUID ? crypto.randomUUID() : 'user-' + Date.now(),
      name: dto.name,
      nameAm: dto.nameAm,
      phone: cleanPhone,
      role: dto.role,
      region: dto.region,
      verified: dto.verified ?? true,
      verificationStatus: (dto.verified ?? true) ? 'Approved' : 'PendingSubmission',
      status: dto.status ?? 'active',
      tinNumber: dto.tinNumber,
      businessLicenseNumber: dto.businessLicenseNumber,
      vehicleType: dto.vehicleType,
      refrigerationType: dto.refrigerationType,
      vehicleCapacityKg: dto.vehicleCapacityKg,
      primaryCrop: dto.primaryCrop,
      kebele: dto.kebele,
      faydaId: dto.faydaId,
      permissions: dto.permissions,
      createdAt: new Date().toISOString()
    };

    // Remove any previous occurrence and unshift
    this.allUsers = this.allUsers.filter(u => u.phone.replace(/\s+/g, '') !== cleanPhone);
    this.allUsers.unshift(newUser);
    this.saveUsersToStorage();

    this.addAuditLog({
      actorId: this.currentUser?.id || '00000000-0000-0000-0000-000000000001',
      actorName: this.currentUser?.name || 'Super Admin',
      actorRole: this.currentUser?.role || 'superadmin',
      action: 'CREATE_USER_ACCOUNT',
      category: 'USER_CRUD',
      targetResource: 'User',
      targetId: newUser.id,
      ipAddress: '196.188.12.45',
      userAgent: navigator.userAgent,
      details: `Created new ${newUser.role.toUpperCase()} account: ${newUser.name} (${newUser.phone}) in ${newUser.region}.`
    });

    this.notify();
    return newUser;
  }

  public updateUser(id: string, dto: Partial<User>): User {
    let userIdx = this.allUsers.findIndex(u =>
      u.id === id ||
      u.phone === id ||
      u.phone.replace(/\s+/g, '') === id.replace(/\s+/g, '')
    );

    if (userIdx === -1) {
      const found = this.getUserById(id);
      if (found) {
        this.allUsers.push(found);
        userIdx = this.allUsers.length - 1;
      }
    }

    if (userIdx === -1) throw new Error('User not found');

    const preState = { ...this.allUsers[userIdx] };
    this.allUsers[userIdx] = { ...this.allUsers[userIdx], ...dto };
    const updated = this.allUsers[userIdx];
    const cleanPhone = updated.phone.replace(/\s+/g, '');

    // Sync with verification queue if present
    this.verificationQueue.forEach(q => {
      if (q.userId === updated.id || q.phone.replace(/\s+/g, '') === cleanPhone) {
        q.userName = updated.name;
        if (updated.nameAm) q.userNameAm = updated.nameAm;
        q.userRole = updated.role;
        q.region = updated.region;
        if (updated.tinNumber) q.tinNumber = updated.tinNumber;
      }
    });

    // If current logged-in user was updated
    if (this.currentUser && (this.currentUser.id === updated.id || this.currentUser.phone.replace(/\s+/g, '') === cleanPhone)) {
      this.currentUser = { ...this.currentUser, ...updated };
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }

    this.saveUsersToStorage();

    this.addAuditLog({
      actorId: this.currentUser?.id || '00000000-0000-0000-0000-000000000001',
      actorName: this.currentUser?.name || 'Super Admin',
      actorRole: this.currentUser?.role || 'superadmin',
      action: 'UPDATE_USER_ACCOUNT',
      category: 'USER_CRUD',
      targetResource: 'User',
      targetId: updated.id,
      ipAddress: '196.188.12.45',
      userAgent: navigator.userAgent,
      details: `Updated user profile for ${updated.name} (${updated.role.toUpperCase()}, ${updated.phone}). Status: ${updated.status || 'active'}.`,
      preState,
      postState: updated
    });

    this.notify();
    return updated;
  }

  public deleteUser(id: string): boolean {
    const user = this.getUserById(id);
    if (!user) return false;

    const cleanPhone = user.phone.replace(/\s+/g, '');
    const cleanId = user.id;

    // Record in deleted set
    this.deletedUserIds.add(cleanId.toLowerCase());
    this.deletedUserIds.add(cleanPhone.toLowerCase());
    this.deletedUserIds.add(cleanPhone.replace(/\D/g, ''));
    this.saveDeletedUsers();

    // Filter out of all in-memory collections
    this.allUsers = this.allUsers.filter(u => u.id !== cleanId && u.phone.replace(/\s+/g, '') !== cleanPhone);
    this.verificationQueue = this.verificationQueue.filter(q => q.userId !== cleanId && q.phone.replace(/\s+/g, '') !== cleanPhone);
    this.kycQueue = this.kycQueue.filter(k => k.userId !== cleanId && k.phone.replace(/\s+/g, '') !== cleanPhone);
    this.agentRegisteredFarmers = this.agentRegisteredFarmers.filter(a => a.id !== cleanId && a.phone.replace(/\s+/g, '') !== cleanPhone);

    // If current logged-in user is deleted
    if (this.currentUser && (this.currentUser.id === cleanId || this.currentUser.phone.replace(/\s+/g, '') === cleanPhone)) {
      if (this.impersonationOriginalUser) {
        this.stopImpersonation();
      }
    }

    this.saveUsersToStorage();

    // Call backend API asynchronously if valid GUID
    const isGuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(cleanId);
    if (isGuid && this.token) {
      fetch(`/api/superadmin/users/${cleanId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${this.token}`, 'Content-Type': 'application/json' }
      }).catch(e => console.warn('Backend user delete sync skipped/failed:', e));
    }

    this.addAuditLog({
      actorId: this.currentUser?.id || '00000000-0000-0000-0000-000000000001',
      actorName: this.currentUser?.name || 'Super Admin',
      actorRole: this.currentUser?.role || 'superadmin',
      action: 'DELETE_USER_ACCOUNT',
      category: 'USER_CRUD',
      targetResource: 'User',
      targetId: cleanId,
      ipAddress: '196.188.12.45',
      userAgent: navigator.userAgent,
      details: `Permanently deleted user account: ${user.name} (${user.role.toUpperCase()}, ${user.phone}).`
    });

    this.notify();
    return true;
  }

  public toggleUserSuspension(id: string, status?: 'active' | 'suspended'): User {
    let user = this.allUsers.find(u =>
      u.id === id ||
      u.phone === id ||
      u.phone.replace(/\s+/g, '') === id.replace(/\s+/g, '')
    );

    if (!user) {
      user = this.getUserById(id);
      if (user && !this.allUsers.some(u => u.id === user!.id)) {
        this.allUsers.push(user);
      }
    }

    if (!user) throw new Error('User not found');

    const nextStatus: 'active' | 'suspended' = status || (user.status === 'suspended' ? 'active' : 'suspended');
    user.status = nextStatus;

    // Sync status across all matching user instances
    const cleanPhone = user.phone.replace(/\s+/g, '');
    this.allUsers.forEach(u => {
      if (u.id === user!.id || u.phone.replace(/\s+/g, '') === cleanPhone) {
        u.status = nextStatus;
      }
    });

    // If current logged-in or impersonated user
    if (this.currentUser && (this.currentUser.id === user.id || this.currentUser.phone.replace(/\s+/g, '') === cleanPhone)) {
      this.currentUser.status = nextStatus;
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }

    this.saveUsersToStorage();

    // Sync with backend API asynchronously if valid GUID
    const isGuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(user.id);
    if (isGuid && this.token) {
      const endpoint = user.role === 'admin'
        ? `/api/superadmin/admins/${user.id}/status`
        : `/api/admin/users/${user.id}/status`;

      fetch(endpoint, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${this.token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      }).catch(e => console.warn('Backend user status sync skipped/failed:', e));
    }

    this.addAuditLog({
      actorId: this.currentUser?.id || '00000000-0000-0000-0000-000000000001',
      actorName: this.currentUser?.name || 'Super Admin',
      actorRole: this.currentUser?.role || 'superadmin',
      action: nextStatus === 'suspended' ? 'SUSPEND_USER_ACCOUNT' : 'REINSTATE_USER_ACCOUNT',
      category: 'EMERGENCY',
      targetResource: 'User',
      targetId: user.id,
      ipAddress: '196.188.12.45',
      userAgent: navigator.userAgent,
      details: `${nextStatus === 'suspended' ? 'Suspended account access' : 'Reinstated account access'} for ${user.name} (${user.role.toUpperCase()}, ${user.phone}).`
    });

    this.notify();
    return user;
  }

  // Impersonation
  public startImpersonation(userId: string): User | null {
    const targetUser = this.allUsers.find(u => u.id === userId);
    if (!targetUser) return null;

    if (!this.impersonationOriginalUser && this.currentUser?.role === 'superadmin') {
      this.impersonationOriginalUser = { ...this.currentUser };
    }

    this.currentUser = targetUser;
    localStorage.setItem('currentUser', JSON.stringify(targetUser));

    this.addAuditLog({
      actorId: this.impersonationOriginalUser?.id || 'superadmin-01',
      actorName: this.impersonationOriginalUser?.name || 'Super Admin',
      actorRole: 'superadmin',
      action: 'START_IMPERSONATION_SESSION',
      category: 'IMPERSONATION',
      targetResource: 'User',
      targetId: targetUser.id,
      ipAddress: '196.188.12.45',
      userAgent: navigator.userAgent,
      details: `Super Admin initiated live impersonation support session as '${targetUser.name}' (${targetUser.role}).`
    });

    this.notify();
    return targetUser;
  }

  public stopImpersonation(): User | null {
    if (!this.impersonationOriginalUser) return this.currentUser;

    const original = { ...this.impersonationOriginalUser };
    const impersonated = this.currentUser;

    this.currentUser = original;
    this.impersonationOriginalUser = null;
    localStorage.setItem('currentUser', JSON.stringify(original));

    this.addAuditLog({
      actorId: original.id,
      actorName: original.name,
      actorRole: 'superadmin',
      action: 'END_IMPERSONATION_SESSION',
      category: 'IMPERSONATION',
      targetResource: 'User',
      targetId: impersonated?.id,
      ipAddress: '196.188.12.45',
      userAgent: navigator.userAgent,
      details: `Super Admin exited impersonation session for '${impersonated?.name}'. Returned to Super Admin dashboard.`
    });

    this.notify();
    return original;
  }

  public isImpersonating(): boolean {
    return !!this.impersonationOriginalUser;
  }

  public getOriginalSuperAdmin(): User | null {
    return this.impersonationOriginalUser;
  }

  // Platform Config
  public getPlatformConfig(): PlatformConfig {
    return this.platformConfig;
  }

  public updatePlatformConfig(config: Partial<PlatformConfig>): PlatformConfig {
    const preState = { ...this.platformConfig };
    this.platformConfig = { ...this.platformConfig, ...config };

    this.addAuditLog({
      actorId: this.currentUser?.id || 'superadmin-01',
      actorName: this.currentUser?.name || 'Super Admin',
      actorRole: this.currentUser?.role || 'superadmin',
      action: 'UPDATE_PLATFORM_CONFIG',
      category: 'CONFIG',
      targetResource: 'PlatformConfig',
      ipAddress: '196.188.12.45',
      userAgent: navigator.userAgent,
      details: `Updated platform configuration: Escrow split (${this.platformConfig.farmerSharePercent}/${this.platformConfig.driverSharePercent}/${this.platformConfig.platformFeePercent}), Escrow Frozen: ${this.platformConfig.emergencyEscrowFrozen}.`,
      preState,
      postState: this.platformConfig
    });

    this.notify();
    return this.platformConfig;
  }

  // Audit Logs
  public getSystemAuditLogs(): SystemAuditLog[] {
    return this.systemAuditLogs;
  }

  public addAuditLog(entry: Omit<SystemAuditLog, 'id' | 'timestamp'>): SystemAuditLog {
    const log: SystemAuditLog = {
      ...entry,
      id: 'log-' + (this.systemAuditLogs.length + 101),
      timestamp: new Date().toLocaleString()
    };
    this.systemAuditLogs.unshift(log);
    return log;
  }

  // Delivery Zones
  public getDeliveryZones(): DeliveryZoneConfig[] {
    return this.deliveryZones;
  }

  public addDeliveryZone(zone: Omit<DeliveryZoneConfig, 'id'>): DeliveryZoneConfig {
    const newZone: DeliveryZoneConfig = {
      ...zone,
      id: 'zone-' + (this.deliveryZones.length + 1)
    };
    this.deliveryZones.push(newZone);

    this.addAuditLog({
      actorId: this.currentUser?.id || 'superadmin-01',
      actorName: this.currentUser?.name || 'Super Admin',
      actorRole: this.currentUser?.role || 'superadmin',
      action: 'ADD_DELIVERY_ZONE',
      category: 'CONFIG',
      targetResource: 'DeliveryZoneConfig',
      targetId: newZone.id,
      ipAddress: '196.188.12.45',
      userAgent: navigator.userAgent,
      details: `Added new regional delivery zone: ${newZone.name} (Base radius ${newZone.baseRadiusKm} km).`
    });

    this.notify();
    return newZone;
  }

  public updateDeliveryZone(id: string, zone: Partial<DeliveryZoneConfig>): DeliveryZoneConfig {
    const idx = this.deliveryZones.findIndex(z => z.id === id);
    if (idx === -1) throw new Error('Zone not found');
    this.deliveryZones[idx] = { ...this.deliveryZones[idx], ...zone };

    this.addAuditLog({
      actorId: this.currentUser?.id || 'superadmin-01',
      actorName: this.currentUser?.name || 'Super Admin',
      actorRole: this.currentUser?.role || 'superadmin',
      action: 'UPDATE_DELIVERY_ZONE',
      category: 'CONFIG',
      targetResource: 'DeliveryZoneConfig',
      targetId: id,
      ipAddress: '196.188.12.45',
      userAgent: navigator.userAgent,
      details: `Updated delivery zone '${this.deliveryZones[idx].name}' configuration.`
    });

    this.notify();
    return this.deliveryZones[idx];
  }

  public deleteDeliveryZone(id: string): boolean {
    const z = this.deliveryZones.find(x => x.id === id);
    if (!z) return false;
    this.deliveryZones = this.deliveryZones.filter(x => x.id !== id);

    this.addAuditLog({
      actorId: this.currentUser?.id || 'superadmin-01',
      actorName: this.currentUser?.name || 'Super Admin',
      actorRole: this.currentUser?.role || 'superadmin',
      action: 'DELETE_DELIVERY_ZONE',
      category: 'CONFIG',
      targetResource: 'DeliveryZoneConfig',
      targetId: id,
      ipAddress: '196.188.12.45',
      userAgent: navigator.userAgent,
      details: `Deleted delivery zone: ${z.name}.`
    });

    this.notify();
    return true;
  }

  // Feature Flags
  public getFeatureFlags(): FeatureFlag[] {
    return this.featureFlags;
  }

  public toggleFeatureFlag(key: string, enabled?: boolean): FeatureFlag {
    const flag = this.featureFlags.find(f => f.key === key);
    if (!flag) throw new Error('Feature flag not found');
    flag.enabled = enabled !== undefined ? enabled : !flag.enabled;

    this.addAuditLog({
      actorId: this.currentUser?.id || 'superadmin-01',
      actorName: this.currentUser?.name || 'Super Admin',
      actorRole: this.currentUser?.role || 'superadmin',
      action: 'TOGGLE_FEATURE_FLAG',
      category: 'CONFIG',
      targetResource: 'FeatureFlag',
      targetId: key,
      ipAddress: '196.188.12.45',
      userAgent: navigator.userAgent,
      details: `${flag.enabled ? 'Enabled' : 'Disabled'} feature flag: ${flag.name} (${key}).`
    });

    this.notify();
    return flag;
  }

  // Payout Approvals
  public getPendingPayoutApprovals(): PayoutApprovalItem[] {
    return this.payoutApprovals;
  }

  public approvePayout(id: string, reviewerName: string): boolean {
    const item = this.payoutApprovals.find(p => p.id === id);
    if (!item) return false;
    item.status = 'Approved';
    item.reviewedBy = reviewerName;
    item.reviewedAt = new Date().toLocaleString();

    this.addAuditLog({
      actorId: this.currentUser?.id || 'superadmin-01',
      actorName: reviewerName,
      actorRole: 'superadmin',
      action: 'APPROVE_HIGH_VALUE_PAYOUT',
      category: 'FINANCE',
      targetResource: 'PayoutApproval',
      targetId: id,
      ipAddress: '196.188.12.45',
      userAgent: navigator.userAgent,
      details: `Authorized high-value Telebirr payout of ${item.amountEtb.toLocaleString()} ETB for ${item.recipientName} (${item.recipientPhone}).`
    });

    this.notify();
    return true;
  }

  public rejectPayout(id: string, reviewerName: string, reason: string = 'High-risk audit anomaly'): boolean {
    const item = this.payoutApprovals.find(p => p.id === id);
    if (!item) return false;
    item.status = 'Rejected';
    item.reviewedBy = reviewerName;
    item.reviewedAt = new Date().toLocaleString();

    this.addAuditLog({
      actorId: this.currentUser?.id || 'superadmin-01',
      actorName: reviewerName,
      actorRole: 'superadmin',
      action: 'REJECT_HIGH_VALUE_PAYOUT',
      category: 'FINANCE',
      targetResource: 'PayoutApproval',
      targetId: id,
      ipAddress: '196.188.12.45',
      userAgent: navigator.userAgent,
      details: `Declined payout of ${item.amountEtb.toLocaleString()} ETB for ${item.recipientName}. Reason: ${reason}.`
    });

    this.notify();
    return true;
  }

  // Global Business Rules
  public getGlobalBusinessRules(): GlobalBusinessRules {
    return this.globalBusinessRules;
  }

  public updateGlobalBusinessRules(rules: Partial<GlobalBusinessRules>): GlobalBusinessRules {
    this.globalBusinessRules = { ...this.globalBusinessRules, ...rules };

    this.addAuditLog({
      actorId: this.currentUser?.id || 'superadmin-01',
      actorName: this.currentUser?.name || 'Super Admin',
      actorRole: this.currentUser?.role || 'superadmin',
      action: 'UPDATE_BUSINESS_RULES',
      category: 'CONFIG',
      targetResource: 'GlobalBusinessRules',
      ipAddress: '196.188.12.45',
      userAgent: navigator.userAgent,
      details: `Updated global trading rules: Min ${this.globalBusinessRules.minOrderKg} kg, Max ${this.globalBusinessRules.maxOrderKg} kg, Max Distance ${this.globalBusinessRules.maxDistanceKm} km.`
    });

    this.notify();
    return this.globalBusinessRules;
  }

  // Blacklist
  public getBlacklist(): BlacklistEntry[] {
    return this.blacklist;
  }

  public addToBlacklist(entry: Omit<BlacklistEntry, 'id' | 'blacklistedAt'>): BlacklistEntry {
    const newEntry: BlacklistEntry = {
      ...entry,
      id: 'bl-' + (this.blacklist.length + 1).toString().padStart(2, '0'),
      blacklistedAt: new Date().toISOString().split('T')[0]
    };
    this.blacklist.unshift(newEntry);

    this.addAuditLog({
      actorId: this.currentUser?.id || 'superadmin-01',
      actorName: entry.blacklistedBy,
      actorRole: 'superadmin',
      action: 'ADD_TO_BLACKLIST',
      category: 'EMERGENCY',
      targetResource: 'BlacklistEntry',
      targetId: newEntry.id,
      ipAddress: '196.188.12.45',
      userAgent: navigator.userAgent,
      details: `Blacklisted ${newEntry.type}: ${newEntry.value}. Reason: ${newEntry.reason}.`
    });

    this.notify();
    return newEntry;
  }

  public removeFromBlacklist(id: string): boolean {
    const entry = this.blacklist.find(b => b.id === id);
    if (!entry) return false;
    this.blacklist = this.blacklist.filter(b => b.id !== id);

    this.addAuditLog({
      actorId: this.currentUser?.id || 'superadmin-01',
      actorName: this.currentUser?.name || 'Super Admin',
      actorRole: 'superadmin',
      action: 'REMOVE_FROM_BLACKLIST',
      category: 'EMERGENCY',
      targetResource: 'BlacklistEntry',
      targetId: id,
      ipAddress: '196.188.12.45',
      userAgent: navigator.userAgent,
      details: `Removed ${entry.type} (${entry.value}) from platform blacklist.`
    });

    this.notify();
    return true;
  }

  // Database Backups & Exports
  public triggerDatabaseBackup(): { backupId: string; sizeMb: number; timestamp: string; downloadUrl: string } {
    const backup = {
      backupId: 'BK-PG16-' + Date.now(),
      sizeMb: 248.5,
      timestamp: new Date().toLocaleString(),
      downloadUrl: '#pg-backup-download'
    };

    this.addAuditLog({
      actorId: this.currentUser?.id || 'superadmin-01',
      actorName: this.currentUser?.name || 'Super Admin',
      actorRole: 'superadmin',
      action: 'TRIGGER_DATABASE_BACKUP',
      category: 'CONFIG',
      targetResource: 'PostgreSQL_Snapshot',
      targetId: backup.backupId,
      ipAddress: '196.188.12.45',
      userAgent: navigator.userAgent,
      details: `Generated encrypted PostgreSQL schema and transaction data snapshot (${backup.backupId}, 248.5 MB).`
    });

    this.notify();
    return backup;
  }

  public exportPlatformData(format: 'json' | 'csv'): { filename: string; dataUrl: string } {
    const filename = `FarmerMarket_FullExport_${new Date().toISOString().split('T')[0]}.${format}`;
    let content = '';
    if (format === 'json') {
      content = JSON.stringify({
        users: this.allUsers,
        listings: this.listings,
        orders: this.orders,
        platformConfig: this.platformConfig,
        deliveryZones: this.deliveryZones,
        auditLogs: this.systemAuditLogs
      }, null, 2);
    } else {
      content = "Type,Id,Name,Phone,Role,Region,Status,CreatedAt\n" +
        this.allUsers.map(u => `User,${u.id},"${u.name}",${u.phone},${u.role},"${u.region}",${u.status || 'active'},${u.createdAt}`).join("\n");
    }

    const blob = new Blob([content], { type: format === 'json' ? 'application/json' : 'text/csv' });
    const dataUrl = URL.createObjectURL(blob);

    this.addAuditLog({
      actorId: this.currentUser?.id || 'superadmin-01',
      actorName: this.currentUser?.name || 'Super Admin',
      actorRole: 'superadmin',
      action: 'EXPORT_PLATFORM_DATA',
      category: 'CONFIG',
      targetResource: 'DataExport',
      ipAddress: '196.188.12.45',
      userAgent: navigator.userAgent,
      details: `Exported full platform data snapshot in ${format.toUpperCase()} format (${filename}).`
    });

    return { filename, dataUrl };
  }

  // ==================== BANNER & ANNOUNCEMENT MANAGEMENT ====================
  public getBanners(): Banner[] {
    return [...this.banners].sort((a, b) => b.priority - a.priority);
  }

  public getActiveBanners(targetAudience: string = 'All', targetRegion: string = 'All'): Banner[] {
    return this.banners
      .filter(b => b.isActive)
      .filter(b => b.targetAudience === 'All' || b.targetAudience.toLowerCase() === targetAudience.toLowerCase() || targetAudience === 'All')
      .filter(b => !b.targetRegion || b.targetRegion === 'All' || b.targetRegion.toLowerCase() === targetRegion.toLowerCase() || targetRegion === 'All')
      .sort((a, b) => b.priority - a.priority);
  }

  public getBannerById(id: string): Banner | undefined {
    return this.banners.find(b => b.id === id);
  }

  public createBanner(dto: CreateBannerDto): Banner {
    const newBanner: Banner = {
      id: crypto.randomUUID ? crypto.randomUUID() : 'banner-' + Date.now(),
      title: dto.title,
      titleAm: dto.titleAm,
      subtitle: dto.subtitle,
      subtitleAm: dto.subtitleAm,
      badgeText: dto.badgeText,
      badgeTextAm: dto.badgeTextAm,
      imageUrl: dto.imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200',
      targetAudience: dto.targetAudience || 'All',
      targetRegion: dto.targetRegion || 'All',
      ctaText: dto.ctaText,
      ctaTextAm: dto.ctaTextAm,
      ctaLink: dto.ctaLink || 'marketplace',
      themeGradient: dto.themeGradient || 'from-emerald-900 via-teal-900 to-slate-900',
      priority: Number(dto.priority) || 5,
      isActive: dto.isActive ?? true,
      createdAt: new Date().toISOString(),
      createdBy: this.currentUser?.name || 'Platform Admin'
    };

    this.banners.unshift(newBanner);
    this.saveBannersToStorage();

    this.addAuditLog({
      actorId: this.currentUser?.id || 'admin-01',
      actorName: this.currentUser?.name || 'Administrator',
      actorRole: this.currentUser?.role || 'admin',
      action: 'CREATE_PROMOTIONAL_BANNER',
      category: 'CONFIG',
      targetResource: 'Banner',
      targetId: newBanner.id,
      ipAddress: '196.188.12.45',
      userAgent: navigator.userAgent,
      details: `Created promotional banner: "${newBanner.title}" for audience: ${newBanner.targetAudience}.`
    });

    this.notify();
    return newBanner;
  }

  public updateBanner(id: string, dto: Partial<Banner>): Banner | null {
    const idx = this.banners.findIndex(b => b.id === id);
    if (idx === -1) return null;

    this.banners[idx] = { ...this.banners[idx], ...dto };
    this.saveBannersToStorage();

    this.addAuditLog({
      actorId: this.currentUser?.id || 'admin-01',
      actorName: this.currentUser?.name || 'Administrator',
      actorRole: this.currentUser?.role || 'admin',
      action: 'UPDATE_PROMOTIONAL_BANNER',
      category: 'CONFIG',
      targetResource: 'Banner',
      targetId: id,
      ipAddress: '196.188.12.45',
      userAgent: navigator.userAgent,
      details: `Updated promotional banner "${this.banners[idx].title}". Status: ${this.banners[idx].isActive ? 'Active' : 'Inactive'}.`
    });

    this.notify();
    return this.banners[idx];
  }

  public toggleBannerStatus(id: string, isActive?: boolean): boolean {
    const banner = this.banners.find(b => b.id === id);
    if (!banner) return false;

    banner.isActive = isActive !== undefined ? isActive : !banner.isActive;
    this.saveBannersToStorage();

    this.addAuditLog({
      actorId: this.currentUser?.id || 'admin-01',
      actorName: this.currentUser?.name || 'Administrator',
      actorRole: this.currentUser?.role || 'admin',
      action: banner.isActive ? 'ACTIVATE_BANNER' : 'DEACTIVATE_BANNER',
      category: 'CONFIG',
      targetResource: 'Banner',
      targetId: id,
      ipAddress: '196.188.12.45',
      userAgent: navigator.userAgent,
      details: `${banner.isActive ? 'Activated' : 'Deactivated'} banner: "${banner.title}".`
    });

    this.notify();
    return true;
  }

  public deleteBanner(id: string): boolean {
    const banner = this.banners.find(b => b.id === id);
    if (!banner) return false;

    this.banners = this.banners.filter(b => b.id !== id);
    this.saveBannersToStorage();

    this.addAuditLog({
      actorId: this.currentUser?.id || 'admin-01',
      actorName: this.currentUser?.name || 'Administrator',
      actorRole: this.currentUser?.role || 'admin',
      action: 'DELETE_PROMOTIONAL_BANNER',
      category: 'CONFIG',
      targetResource: 'Banner',
      targetId: id,
      ipAddress: '196.188.12.45',
      userAgent: navigator.userAgent,
      details: `Deleted promotional banner: "${banner.title}".`
    });

    this.notify();
    return true;
  }

  private saveBannersToStorage() {
    try {
      localStorage.setItem('farmerMarketBanners', JSON.stringify(this.banners));
    } catch (e) {
      console.warn('Failed to save banners to localStorage', e);
    }
  }

  // ==================== POST / LISTING MODERATION & MANAGEMENT ====================
  public adminDeleteListing(id: string, reason: string = 'Violates marketplace standards'): boolean {
    const listing = this.listings.find(l => l.id === id);
    if (!listing) return false;

    this.listings = this.listings.filter(l => l.id !== id);

    // Call backend API if valid GUID
    const isGuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    if (isGuid && this.token) {
      fetch(`/api/listings/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${this.token}`, 'Content-Type': 'application/json' }
      }).catch(e => console.warn('Backend listing delete failed/skipped:', e));
    }

    this.addAuditLog({
      actorId: this.currentUser?.id || 'admin-01',
      actorName: this.currentUser?.name || 'Administrator',
      actorRole: this.currentUser?.role || 'admin',
      action: 'DELETE_LISTING_POST',
      category: 'USER_CRUD',
      targetResource: 'Listing',
      targetId: id,
      ipAddress: '196.188.12.45',
      userAgent: navigator.userAgent,
      details: `Deleted listing post "${listing.productName}" (Farmer: ${listing.farmerName}, ${listing.farmerPhone}). Reason: ${reason}`
    });

    this.notify();
    return true;
  }

  public adminUpdateListing(id: string, dto: UpdateListingDto): Listing | null {
    const idx = this.listings.findIndex(l => l.id === id);
    if (idx === -1) return null;

    const preState = { ...this.listings[idx] };
    this.listings[idx] = {
      ...this.listings[idx],
      ...dto
    };

    const updated = this.listings[idx];

    // Call backend API if valid GUID
    const isGuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    if (isGuid && this.token) {
      fetch(`/api/listings/${id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${this.token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(dto)
      }).catch(e => console.warn('Backend listing update failed/skipped:', e));
    }

    this.addAuditLog({
      actorId: this.currentUser?.id || 'admin-01',
      actorName: this.currentUser?.name || 'Administrator',
      actorRole: this.currentUser?.role || 'admin',
      action: 'MODERATE_LISTING_POST',
      category: 'USER_CRUD',
      targetResource: 'Listing',
      targetId: id,
      ipAddress: '196.188.12.45',
      userAgent: navigator.userAgent,
      details: `Moderated/Updated listing "${updated.productName}". Price: ${updated.pricePerKg} ETB/kg, Stock: ${updated.qtyKg} kg, Status: ${updated.moderationStatus || 'Approved'}.`,
      preState,
      postState: updated
    });

    this.notify();
    return updated;
  }

  public flagListingAnomaly(id: string, reason: string = 'Severe Price Variance Detected', details?: string, sendSmsAlert: boolean = true, benchmarkPrice?: number): boolean {
    const listing = this.listings.find(l => l.id === id);
    if (!listing) return false;

    listing.moderationStatus = 'Flagged';
    const benchmark = benchmarkPrice || listing.marketBenchmarkPrice || 50;
    const variance = Math.round(((listing.pricePerKg - benchmark) / benchmark) * 100);

    const newAnomaly: AnomalyAlert = {
      id: 'ANOM-' + Date.now().toString().slice(-4),
      severity: 'High',
      type: 'PriceManipulation',
      title: `Price Anomaly: ${listing.productName}`,
      description: `${listing.productName} listed by ${listing.farmerName} (${listing.farmerPhone}) at ${listing.pricePerKg} ETB/kg (${variance > 0 ? '+' : ''}${variance}% vs benchmark of ${benchmark} ETB/kg). ${reason}`,
      entityType: 'Listing',
      entityId: listing.id,
      detectedAt: 'Just now'
    };

    this.anomalyAlerts.unshift(newAnomaly);

    this.addAuditLog({
      actorId: this.currentUser?.id || 'admin-01',
      actorName: this.currentUser?.name || 'Administrator',
      actorRole: this.currentUser?.role || 'admin',
      action: 'FLAG_LISTING_ANOMALY',
      category: 'EMERGENCY',
      targetResource: 'Listing',
      targetId: id,
      ipAddress: '196.188.12.45',
      userAgent: navigator.userAgent,
      details: `Flagged listing "${listing.productName}" for price anomaly: ${variance > 0 ? '+' : ''}${variance}% variance against benchmark.`
    });

    this.notify();
    return true;
  }

  // ─── RBAC & PERMISSION MATRIX ENGINE ─────────────────────────────────────

  public static readonly ALL_PERMISSIONS: PermissionDefinition[] = [
    // Governance & Root
    { key: 'MANAGE_USERS', label: 'User Master CRUD & Suspension', labelAm: 'የተጠቃሚዎች አስተዳደር እና እገዳ', category: 'Governance & Root', description: 'Create, update, suspend, and delete users across all roles.' },
    { key: 'MANAGE_RBAC_PERMISSIONS', label: 'RBAC Permission Matrix', labelAm: 'የሚናዎች እና ፈቃዶች ማትሪክስ', category: 'Governance & Root', description: 'Configure and assign granular capabilities for roles and users.' },
    { key: 'MANAGE_PLATFORM_CONFIG', label: 'Platform Financial Configuration', labelAm: 'የፕላትፎርም የፋይናንስ ውቅር', category: 'Governance & Root', description: 'Adjust escrow split percentages (90/5/5), withholding tax, and gateway keys.' },
    { key: 'EMERGENCY_ESCROW_FREEZE', label: 'Emergency Escrow Killswitch', labelAm: 'የአስቸኳይ ጊዜ የገንዘብ እገዳ (Killswitch)', category: 'Governance & Root', description: 'Halt all Telebirr fund payouts and freeze system escrow in emergency.' },
    { key: 'APPROVE_HIGH_VALUE_PAYOUTS', label: 'High-Value Payout Approval', labelAm: 'ከፍተኛ የገንዘብ ክፍያዎችን ማጽደቅ', category: 'Governance & Root', description: 'Authorize manual audits for payouts exceeding platform threshold.' },
    { key: 'IMPERSONATE_USERS', label: 'Shadow Impersonation Engine', labelAm: 'የተጠቃሚ መለያዎችን በመወከል መግባት', category: 'Governance & Root', description: 'Log in as any user to inspect and debug live issues.' },
    { key: 'VIEW_AUDIT_LOGS', label: 'System Audit Logs', labelAm: 'የስርዓት ኦዲት ምዝግብ ማስታወሻዎች', category: 'Governance & Root', description: 'Review tamper-evident security audit trails and actor actions.' },
    { key: 'MANAGE_TRADE_ZONES', label: 'Geo-Fenced Trade Corridors', labelAm: 'የንግድ ኮሪደሮች እና የድንበር ዞኖች', category: 'Governance & Root', description: 'Configure transport corridors, checkpoints, and regional hubs.' },
    { key: 'MANAGE_BLACKLIST', label: 'National Fraud Blacklist', labelAm: 'የማጭበርበር ጥቁር መዝገብ', category: 'Governance & Root', description: 'Enforce restrictions on banned phone numbers, TINs, and Fayda IDs.' },

    // Operational Moderation
    { key: 'MODERATE_LISTINGS', label: 'Produce Listing Moderation', labelAm: 'የምርት ምዝገባ ቁጥጥር እና ማረም', category: 'Operational Moderation', description: 'Force edit price, stock, grade, and delete fraudulent produce posts.' },
    { key: 'MANAGE_BANNERS', label: 'Promotional Marketing Banners', labelAm: 'የማስተዋወቂያ ባነሮች አስተዳደር', category: 'Operational Moderation', description: 'Publish, edit, pause, and delete promotional announcements.' },
    { key: 'RESOLVE_DISPUTES', label: 'Arbitrate Produce Disputes', labelAm: 'የምርት አለመግባባቶችን መፍታት', category: 'Operational Moderation', description: 'Render legally binding arbitration decrees and execute escrow splits.' },
    { key: 'VERIFY_KYC', label: 'KYC & Document Verification', labelAm: 'የማንነት እና ሰነድ ማረጋገጫ', category: 'Operational Moderation', description: 'Approve or reject Fayda ID, TIN certificates, and vehicle logbooks.' },
    { key: 'BROADCAST_SMS', label: 'Twilio Mass SMS Broadcast', labelAm: 'የጅምላ ኤስኤምኤስ ማሰራጫ', category: 'Operational Moderation', description: 'Broadcast agricultural bulletins and alerts to farmers, drivers, and buyers.' },
    { key: 'VIEW_ANOMALY_ALERTS', label: 'AI Anomaly Scanner', labelAm: 'የዋጋ እና ማጭበርበር ስካነር', category: 'Operational Moderation', description: 'Monitor price spikes, duplicate photo proofs, and volume surges.' },
    { key: 'VIEW_TAX_COMPLIANCE', label: 'Tax & Fiscal Compliance Invoicing', labelAm: 'የግብር እና ህጋዊ ደረሰኝ', category: 'Operational Moderation', description: 'Inspect electronic tax invoices (e-VAT) and MOR 2% withholding receipts.' },
    { key: 'VIEW_REGIONAL_ANALYTICS', label: 'Regional Analytics & Volume', labelAm: 'የክልሎች የንግድ ትንታኔ', category: 'Operational Moderation', description: 'Analyze GMV, metric tons moved, and price averages per region.' },

    // Field & Logistics
    { key: 'FIELD_AGENT_ONBOARDING', label: 'In-Field Farmer Onboarding', labelAm: 'አርሶ አደሮችን በአካል መመዝገብ', category: 'Field & Logistics', description: 'Onboard smallholders with camera capture of Kebele ID & Fayda National ID.' },
    { key: 'EXECUTE_USSD', label: 'Offline USSD Engine', labelAm: 'ከኢንተርኔት ውጭ USSD መጠቀም', category: 'Field & Logistics', description: 'Execute *988# USSD command simulation for low-connectivity rural hubs.' },
    { key: 'VIEW_DELIVERY_ROUTES', label: 'GPS Dispatch & Waybills', labelAm: 'የማጓጓዣ መንገዶች እና ዌይቢል', category: 'Field & Logistics', description: 'Access multi-stop route optimization and cargo load manifests.' },
    { key: 'SUBMIT_DELIVERY_PROOF', label: 'GPS Dropoff Photo Proof', labelAm: 'የማድረሻ ፎቶ ማረጋገጫ ማስገባት', category: 'Field & Logistics', description: 'Submit geo-tagged timestamped photos of produce pickup & delivery.' },
    { key: 'OFFLINE_TRIP_SYNC', label: 'Offline Trip Sync', labelAm: 'የከመስመር ውጭ ጉዞ ማመሳሰል', category: 'Field & Logistics', description: 'Cache trip confirmations in localStorage and sync when cellular resumes.' },

    // Marketplace & Trade
    { key: 'PUBLISH_PRODUCE', label: 'Publish Produce Listings', labelAm: 'የእርሻ ምርት ለገበያ ማቅረብ', category: 'Marketplace & Trade', description: 'Post crops with pricing, stock quantity, and audio voice memo transcription.' },
    { key: 'MANAGE_FARM_ORDERS', label: 'Confirm & Fulfill Farm Orders', labelAm: 'የትዕዛዝ መቀበያ እና ማረጋገጫ', category: 'Marketplace & Trade', description: 'Accept purchase orders and prepare harvest for driver pickup.' },
    { key: 'REQUEST_WALLET_WITHDRAWAL', label: 'Telebirr Instant Payouts', labelAm: 'ገንዘብ ወደ ቴሌብር ማውጣት', category: 'Marketplace & Trade', description: 'Withdraw wallet balance directly to Telebirr mobile wallet.' },
    { key: 'PLACE_ORDERS', label: 'Bulk Wholesale Ordering', labelAm: 'የጅምላ ምርት መግዛት', category: 'Marketplace & Trade', description: 'Purchase fresh produce directly from verified farmers across Ethiopia.' },
    { key: 'TELEBIRR_CHECKOUT', label: 'Telebirr C2B Escrow Checkout', labelAm: 'በቴሌብር ክፍያ መፈጸም', category: 'Marketplace & Trade', description: 'Authorize secure payments held in Telebirr escrow.' },
    { key: 'CREATE_STANDING_ORDERS', label: 'Recurring Standing Orders', labelAm: 'ተደጋጋሚ ቋሚ ትዕዛዝ ማዘዝ', category: 'Marketplace & Trade', description: 'Schedule automatic weekly and bi-weekly harvest deliveries.' },
    { key: 'FILE_DISPUTES', label: 'File Escrow Dispute', labelAm: 'የቅሬታ ማመልከቻ ማስገባት', category: 'Marketplace & Trade', description: 'Report damaged goods or delivery delays to pause escrow release.' }
  ];

  public static readonly DEFAULT_ROLE_PERMISSIONS: RolePermissionsMap = {
    superadmin: {
      MANAGE_USERS: true,
      MANAGE_RBAC_PERMISSIONS: true,
      MANAGE_PLATFORM_CONFIG: true,
      EMERGENCY_ESCROW_FREEZE: true,
      APPROVE_HIGH_VALUE_PAYOUTS: true,
      IMPERSONATE_USERS: true,
      VIEW_AUDIT_LOGS: true,
      MANAGE_TRADE_ZONES: true,
      MANAGE_BLACKLIST: true,
      MODERATE_LISTINGS: true,
      MANAGE_BANNERS: true,
      RESOLVE_DISPUTES: true,
      VERIFY_KYC: true,
      BROADCAST_SMS: true,
      VIEW_ANOMALY_ALERTS: true,
      VIEW_TAX_COMPLIANCE: true,
      VIEW_REGIONAL_ANALYTICS: true,
      FIELD_AGENT_ONBOARDING: true,
      EXECUTE_USSD: true,
      VIEW_DELIVERY_ROUTES: true,
      SUBMIT_DELIVERY_PROOF: true,
      OFFLINE_TRIP_SYNC: true,
      PUBLISH_PRODUCE: true,
      MANAGE_FARM_ORDERS: true,
      REQUEST_WALLET_WITHDRAWAL: true,
      PLACE_ORDERS: true,
      TELEBIRR_CHECKOUT: true,
      CREATE_STANDING_ORDERS: true,
      FILE_DISPUTES: true
    },
    admin: {
      MANAGE_USERS: true,
      MANAGE_RBAC_PERMISSIONS: false,
      MANAGE_PLATFORM_CONFIG: false,
      EMERGENCY_ESCROW_FREEZE: false,
      APPROVE_HIGH_VALUE_PAYOUTS: false,
      IMPERSONATE_USERS: false,
      VIEW_AUDIT_LOGS: true,
      MANAGE_TRADE_ZONES: true,
      MANAGE_BLACKLIST: true,
      MODERATE_LISTINGS: true,
      MANAGE_BANNERS: true,
      RESOLVE_DISPUTES: true,
      VERIFY_KYC: true,
      BROADCAST_SMS: true,
      VIEW_ANOMALY_ALERTS: true,
      VIEW_TAX_COMPLIANCE: true,
      VIEW_REGIONAL_ANALYTICS: true,
      FIELD_AGENT_ONBOARDING: true,
      EXECUTE_USSD: true,
      VIEW_DELIVERY_ROUTES: true,
      SUBMIT_DELIVERY_PROOF: false,
      OFFLINE_TRIP_SYNC: false,
      PUBLISH_PRODUCE: false,
      MANAGE_FARM_ORDERS: false,
      REQUEST_WALLET_WITHDRAWAL: false,
      PLACE_ORDERS: false,
      TELEBIRR_CHECKOUT: false,
      CREATE_STANDING_ORDERS: false,
      FILE_DISPUTES: false
    },
    agent: {
      MANAGE_USERS: false,
      MANAGE_RBAC_PERMISSIONS: false,
      MANAGE_PLATFORM_CONFIG: false,
      EMERGENCY_ESCROW_FREEZE: false,
      APPROVE_HIGH_VALUE_PAYOUTS: false,
      IMPERSONATE_USERS: false,
      VIEW_AUDIT_LOGS: false,
      MANAGE_TRADE_ZONES: false,
      MANAGE_BLACKLIST: false,
      MODERATE_LISTINGS: false,
      MANAGE_BANNERS: false,
      RESOLVE_DISPUTES: false,
      VERIFY_KYC: false,
      BROADCAST_SMS: false,
      VIEW_ANOMALY_ALERTS: false,
      VIEW_TAX_COMPLIANCE: false,
      VIEW_REGIONAL_ANALYTICS: true,
      FIELD_AGENT_ONBOARDING: true,
      EXECUTE_USSD: true,
      VIEW_DELIVERY_ROUTES: false,
      SUBMIT_DELIVERY_PROOF: false,
      OFFLINE_TRIP_SYNC: false,
      PUBLISH_PRODUCE: true,
      MANAGE_FARM_ORDERS: false,
      REQUEST_WALLET_WITHDRAWAL: true,
      PLACE_ORDERS: false,
      TELEBIRR_CHECKOUT: false,
      CREATE_STANDING_ORDERS: false,
      FILE_DISPUTES: false
    },
    farmer: {
      MANAGE_USERS: false,
      MANAGE_RBAC_PERMISSIONS: false,
      MANAGE_PLATFORM_CONFIG: false,
      EMERGENCY_ESCROW_FREEZE: false,
      APPROVE_HIGH_VALUE_PAYOUTS: false,
      IMPERSONATE_USERS: false,
      VIEW_AUDIT_LOGS: false,
      MANAGE_TRADE_ZONES: false,
      MANAGE_BLACKLIST: false,
      MODERATE_LISTINGS: false,
      MANAGE_BANNERS: false,
      RESOLVE_DISPUTES: false,
      VERIFY_KYC: false,
      BROADCAST_SMS: false,
      VIEW_ANOMALY_ALERTS: false,
      VIEW_TAX_COMPLIANCE: false,
      VIEW_REGIONAL_ANALYTICS: false,
      FIELD_AGENT_ONBOARDING: false,
      EXECUTE_USSD: true,
      VIEW_DELIVERY_ROUTES: false,
      SUBMIT_DELIVERY_PROOF: false,
      OFFLINE_TRIP_SYNC: false,
      PUBLISH_PRODUCE: true,
      MANAGE_FARM_ORDERS: true,
      REQUEST_WALLET_WITHDRAWAL: true,
      PLACE_ORDERS: false,
      TELEBIRR_CHECKOUT: false,
      CREATE_STANDING_ORDERS: false,
      FILE_DISPUTES: false
    },
    driver: {
      MANAGE_USERS: false,
      MANAGE_RBAC_PERMISSIONS: false,
      MANAGE_PLATFORM_CONFIG: false,
      EMERGENCY_ESCROW_FREEZE: false,
      APPROVE_HIGH_VALUE_PAYOUTS: false,
      IMPERSONATE_USERS: false,
      VIEW_AUDIT_LOGS: false,
      MANAGE_TRADE_ZONES: false,
      MANAGE_BLACKLIST: false,
      MODERATE_LISTINGS: false,
      MANAGE_BANNERS: false,
      RESOLVE_DISPUTES: false,
      VERIFY_KYC: false,
      BROADCAST_SMS: false,
      VIEW_ANOMALY_ALERTS: false,
      VIEW_TAX_COMPLIANCE: false,
      VIEW_REGIONAL_ANALYTICS: false,
      FIELD_AGENT_ONBOARDING: false,
      EXECUTE_USSD: true,
      VIEW_DELIVERY_ROUTES: true,
      SUBMIT_DELIVERY_PROOF: true,
      OFFLINE_TRIP_SYNC: true,
      PUBLISH_PRODUCE: false,
      MANAGE_FARM_ORDERS: false,
      REQUEST_WALLET_WITHDRAWAL: true,
      PLACE_ORDERS: false,
      TELEBIRR_CHECKOUT: false,
      CREATE_STANDING_ORDERS: false,
      FILE_DISPUTES: false
    },
    buyer: {
      MANAGE_USERS: false,
      MANAGE_RBAC_PERMISSIONS: false,
      MANAGE_PLATFORM_CONFIG: false,
      EMERGENCY_ESCROW_FREEZE: false,
      APPROVE_HIGH_VALUE_PAYOUTS: false,
      IMPERSONATE_USERS: false,
      VIEW_AUDIT_LOGS: false,
      MANAGE_TRADE_ZONES: false,
      MANAGE_BLACKLIST: false,
      MODERATE_LISTINGS: false,
      MANAGE_BANNERS: false,
      RESOLVE_DISPUTES: false,
      VERIFY_KYC: false,
      BROADCAST_SMS: false,
      VIEW_ANOMALY_ALERTS: false,
      VIEW_TAX_COMPLIANCE: false,
      VIEW_REGIONAL_ANALYTICS: false,
      FIELD_AGENT_ONBOARDING: false,
      EXECUTE_USSD: false,
      VIEW_DELIVERY_ROUTES: false,
      SUBMIT_DELIVERY_PROOF: false,
      OFFLINE_TRIP_SYNC: false,
      PUBLISH_PRODUCE: false,
      MANAGE_FARM_ORDERS: false,
      REQUEST_WALLET_WITHDRAWAL: false,
      PLACE_ORDERS: true,
      TELEBIRR_CHECKOUT: true,
      CREATE_STANDING_ORDERS: true,
      FILE_DISPUTES: true
    }
  };

  private loadStoredRolePermissions(): RolePermissionsMap {
    try {
      const stored = localStorage.getItem('farmerMarketRolePermissions');
      if (stored) {
        const parsed = JSON.parse(stored);
        const merged: RolePermissionsMap = JSON.parse(JSON.stringify(ApiService.DEFAULT_ROLE_PERMISSIONS));
        for (const r of Object.keys(ApiService.DEFAULT_ROLE_PERMISSIONS) as UserRole[]) {
          if (parsed[r]) {
            merged[r] = { ...merged[r], ...parsed[r] };
          }
        }
        return merged;
      }
    } catch (e) {
      console.warn('Failed to parse stored role permissions, using defaults.', e);
    }
    return JSON.parse(JSON.stringify(ApiService.DEFAULT_ROLE_PERMISSIONS));
  }

  public reloadRolePermissionsFromStorage(): RolePermissionsMap {
    this.rolePermissions = this.loadStoredRolePermissions();
    this.notify();
    return this.rolePermissions;
  }

  public saveRolePermissionsToStorage(): void {
    try {
      localStorage.setItem('farmerMarketRolePermissions', JSON.stringify(this.rolePermissions));
    } catch (e) {
      console.error('Failed to persist role permissions to localStorage', e);
    }
  }

  public getPermissionsList(): PermissionDefinition[] {
    return ApiService.ALL_PERMISSIONS;
  }

  public getAllRolePermissions(): RolePermissionsMap {
    return this.rolePermissions;
  }

  public getRolePermissions(role: UserRole): Record<PermissionKey, boolean> {
    return this.rolePermissions[role] || ApiService.DEFAULT_ROLE_PERMISSIONS[role];
  }

  public hasRolePermission(role: UserRole, permission: PermissionKey): boolean {
    if (role === 'superadmin') return true;
    const rolePerms = this.rolePermissions[role] || ApiService.DEFAULT_ROLE_PERMISSIONS[role];
    if (!rolePerms) return false;
    return !!rolePerms[permission];
  }

  public hasPermission(permission: PermissionKey, customUser?: User | null): boolean {
    const user = customUser !== undefined ? customUser : this.currentUser;
    if (!user) return false;

    // Super Admin root override: SuperAdmin always has full access
    if (user.role === 'superadmin') return true;

    // Check Role-Based Access Control matrix
    const rolePerms = this.rolePermissions[user.role] || ApiService.DEFAULT_ROLE_PERMISSIONS[user.role];
    if (rolePerms && rolePerms[permission] === true) {
      return true;
    }

    // User-level specific override if assigned
    if (user.permissions && Array.isArray(user.permissions) && user.permissions.length > 0) {
      if (user.permissions.includes(permission)) return true;
    }

    return false;
  }

  public hasEffectivePermission(permission: PermissionKey, targetRole?: UserRole): boolean {
    if (this.isImpersonating()) {
      return this.hasPermission(permission);
    }
    const user = this.currentUser;
    if (user && user.role !== 'superadmin') {
      return this.hasPermission(permission, user);
    }
    if (targetRole) {
      return this.hasRolePermission(targetRole, permission);
    }
    return this.hasPermission(permission, user);
  }

  public updateRolePermissionKey(role: UserRole, key: PermissionKey, enabled: boolean): boolean {
    if (!this.rolePermissions[role]) {
      this.rolePermissions[role] = { ...ApiService.DEFAULT_ROLE_PERMISSIONS[role] };
    }
    this.rolePermissions[role][key] = enabled;
    this.saveRolePermissionsToStorage();

    this.addAuditLog({
      actorId: this.currentUser?.id || 'superadmin-01',
      actorName: this.currentUser?.name || 'Super Administrator',
      actorRole: this.currentUser?.role || 'superadmin',
      action: 'UPDATE_ROLE_PERMISSION',
      category: 'CONFIG',
      targetResource: `Role:${role}`,
      targetId: key,
      ipAddress: '196.188.12.45',
      userAgent: navigator.userAgent,
      details: `Set permission "${key}" for role "${role}" to ${enabled ? 'ENABLED' : 'DISABLED'}.`
    });

    this.notify();
    return true;
  }

  public updateRolePermissions(role: UserRole, permissions: Partial<Record<PermissionKey, boolean>>): boolean {
    if (!this.rolePermissions[role]) {
      this.rolePermissions[role] = { ...ApiService.DEFAULT_ROLE_PERMISSIONS[role] };
    }
    this.rolePermissions[role] = { ...this.rolePermissions[role], ...permissions };
    this.saveRolePermissionsToStorage();

    this.addAuditLog({
      actorId: this.currentUser?.id || 'superadmin-01',
      actorName: this.currentUser?.name || 'Super Administrator',
      actorRole: this.currentUser?.role || 'superadmin',
      action: 'BATCH_UPDATE_ROLE_PERMISSIONS',
      category: 'CONFIG',
      targetResource: `Role:${role}`,
      ipAddress: '196.188.12.45',
      userAgent: navigator.userAgent,
      details: `Updated permission bundle for role "${role}".`
    });

    this.notify();
    return true;
  }

  public resetRolePermissions(): RolePermissionsMap {
    this.rolePermissions = JSON.parse(JSON.stringify(ApiService.DEFAULT_ROLE_PERMISSIONS));
    this.saveRolePermissionsToStorage();

    this.addAuditLog({
      actorId: this.currentUser?.id || 'superadmin-01',
      actorName: this.currentUser?.name || 'Super Administrator',
      actorRole: this.currentUser?.role || 'superadmin',
      action: 'RESET_ROLE_PERMISSIONS_TO_DEFAULT',
      category: 'CONFIG',
      targetResource: 'RBACMatrix',
      ipAddress: '196.188.12.45',
      userAgent: navigator.userAgent,
      details: 'Reset all platform RBAC role permissions to factory defaults.'
    });

    this.notify();
    return this.rolePermissions;
  }

  // Market Intelligence & Price Indices
  public async getMarketPriceIndices(category?: string, region?: string): Promise<CommodityPriceIndex[]> {
    try {
      const params = new URLSearchParams();
      if (category && category !== 'All') params.append('category', category);
      if (region && region !== 'All') params.append('region', region);
      const res = await fetch(`/api/market-intelligence/indices?${params.toString()}`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Fallback to local market price indices:', e);
    }
    // Fallback static data
    return [
      {
        commodityId: 'teff-white',
        name: 'Teff (White Magna)',
        nameAm: 'ነጭ ማግና ጤፍ',
        category: 'Grain',
        unit: 'kg',
        nationalAvgPriceEtb: 128.50,
        eczBenchmarkEtb: 126.00,
        weeklyChangePercent: 3.8,
        trendDirection: 'Up',
        volatilityRating: 'Moderate',
        regionalPrices: [
          { regionName: 'Addis Ababa', marketName: 'Merkato Ehil Berenda', minPriceEtb: 125, avgPriceEtb: 132, maxPriceEtb: 138 },
          { regionName: 'Oromia', marketName: "Ada'a / Bishoftu Central", minPriceEtb: 120, avgPriceEtb: 126, maxPriceEtb: 130 },
          { regionName: 'Amhara', marketName: 'East Gojjam / Debre Markos', minPriceEtb: 115, avgPriceEtb: 122, maxPriceEtb: 126 }
        ],
        historical7Days: [
          { date: 'D-6', priceEtb: 124 }, { date: 'D-5', priceEtb: 125.2 }, { date: 'D-4', priceEtb: 125 },
          { date: 'D-3', priceEtb: 126.5 }, { date: 'D-2', priceEtb: 127 }, { date: 'D-1', priceEtb: 127.8 }, { date: 'Today', priceEtb: 128.5 }
        ]
      },
      {
        commodityId: 'coffee-sidama-g1',
        name: 'Coffee (Sidama Washed Grade 1)',
        nameAm: 'ሲዳማ የታጠበ ቡና (ደረጃ 1)',
        category: 'Coffee',
        unit: 'kg',
        nationalAvgPriceEtb: 485.00,
        eczBenchmarkEtb: 490.00,
        weeklyChangePercent: 5.2,
        trendDirection: 'Up',
        volatilityRating: 'High',
        regionalPrices: [
          { regionName: 'Addis Ababa', marketName: 'ECX Central Terminal', minPriceEtb: 475, avgPriceEtb: 492, maxPriceEtb: 510 },
          { regionName: 'Sidama', marketName: 'Hawassa Wholesale Exchange', minPriceEtb: 460, avgPriceEtb: 480, maxPriceEtb: 495 }
        ],
        historical7Days: [
          { date: 'D-6', priceEtb: 460 }, { date: 'D-5', priceEtb: 465 }, { date: 'D-4', priceEtb: 472 },
          { date: 'D-3', priceEtb: 475 }, { date: 'D-2', priceEtb: 480 }, { date: 'D-1', priceEtb: 482 }, { date: 'Today', priceEtb: 485 }
        ]
      },
      {
        commodityId: 'onions-adama-red',
        name: 'Adama Red Onions',
        nameAm: 'የአዳማ ቀይ ሽንኩርት',
        category: 'Vegetable',
        unit: 'kg',
        nationalAvgPriceEtb: 82.00,
        eczBenchmarkEtb: 80.00,
        weeklyChangePercent: -2.4,
        trendDirection: 'Down',
        volatilityRating: 'High',
        regionalPrices: [
          { regionName: 'Addis Ababa', marketName: 'Piazza & Janmeda Market', minPriceEtb: 82, avgPriceEtb: 88, maxPriceEtb: 95 },
          { regionName: 'Oromia', marketName: 'Adama Bulbula Terminal', minPriceEtb: 72, avgPriceEtb: 78, maxPriceEtb: 82 }
        ],
        historical7Days: [
          { date: 'D-6', priceEtb: 86 }, { date: 'D-5', priceEtb: 85 }, { date: 'D-4', priceEtb: 84.5 },
          { date: 'D-3', priceEtb: 83 }, { date: 'D-2', priceEtb: 83.5 }, { date: 'D-1', priceEtb: 82.2 }, { date: 'Today', priceEtb: 82 }
        ]
      },
      {
        commodityId: 'tomatoes-meki',
        name: 'Tomatoes (Meki Plum)',
        nameAm: 'የመቂ ቲማቲም',
        category: 'Vegetable',
        unit: 'kg',
        nationalAvgPriceEtb: 65.00,
        eczBenchmarkEtb: 64.00,
        weeklyChangePercent: 8.1,
        trendDirection: 'Up',
        volatilityRating: 'High',
        regionalPrices: [
          { regionName: 'Addis Ababa', marketName: 'Atkilt Tera Merkato', minPriceEtb: 65, avgPriceEtb: 72, maxPriceEtb: 80 },
          { regionName: 'Oromia', marketName: 'Meki Lake Ziway Hub', minPriceEtb: 52, avgPriceEtb: 58, maxPriceEtb: 64 }
        ],
        historical7Days: [
          { date: 'D-6', priceEtb: 58 }, { date: 'D-5', priceEtb: 60 }, { date: 'D-4', priceEtb: 61.5 },
          { date: 'D-3', priceEtb: 62 }, { date: 'D-2', priceEtb: 63.8 }, { date: 'D-1', priceEtb: 64.5 }, { date: 'Today', priceEtb: 65 }
        ]
      }
    ];
  }

  public async getFairPriceRecommendation(request: FairPriceRecommendationRequest): Promise<FairPriceRecommendationResult> {
    try {
      const res = await fetch('/api/market-intelligence/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Fallback to local fair price calculation:', e);
    }
    const base = 85.0;
    const gradeMult = request.grade === 'Export Grade' ? 1.25 : request.grade === 'Grade 1' ? 1.05 : 0.95;
    const coldPrem = request.requiresColdChain ? 0.12 : 0;
    const fair = Math.round(base * gradeMult * (1 + coldPrem) * 100) / 100;
    return {
      commodityName: request.commodityName,
      region: request.region,
      grade: request.grade,
      recommendedMinEtb: Math.round(fair * 0.9 * 100) / 100,
      recommendedFairPriceEtb: fair,
      recommendedMaxEtb: Math.round(fair * 1.15 * 100) / 100,
      ecxBenchmarkEtb: 82.0,
      supplyCondition: 'Moderate',
      volatility: 'Moderate',
      guidanceMessageEn: `Recommended fair price for ${request.commodityName} (${request.grade}) is ETB ${fair}/kg based on current market trends.`,
      guidanceMessageAm: `ለ${request.commodityName} (${request.grade}) ተስማሚ የገበያ መሸጫ ዋጋ ${fair} ብር/ኪ.ግ ነው።`,
      coldChainPremiumPercent: coldPrem * 100,
      cooperativeBulkDiscountPercent: 5
    };
  }

  // USSD Simulation
  public async simulateUssd(request: UssdRequest): Promise<UssdResponse> {
    try {
      const res = await fetch('/api/ussd/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Fallback to local USSD state machine:', e);
    }

    const isAm = request.language === 'am';
    const text = (request.text || '').trim();

    if (!text || text === '*804#') {
      return {
        sessionId: request.sessionId,
        message: isAm
          ? "🌾 ወደ ገበያ-ለአርሶ አደር (*804#) እንኳን ደህና መጡ\n\n1. 📈 የገበያ ዋጋ መረጃ (ECX)\n2. 💰 የሒሳብ ቀሪ (Telebirr)\n3. 📦 የትዕዛዝ ሁኔታ\n4. 🚜 አዲስ ምርት መመዝገብ\n5. 🌐 Switch to English\n0. መውጫ"
          : "🌾 Welcome to Farmer-to-Market (*804#)\n\n1. 📈 Market Price Index (ECX)\n2. 💰 Wallet Balance (Telebirr)\n3. 📦 Pending Orders\n4. 🚜 List New Produce\n5. 🌐 ወደ አማርኛ ቀይር\n0. Exit",
        action: 'CON'
      };
    }

    if (text === '1') {
      return {
        sessionId: request.sessionId,
        message: isAm
          ? "የወቅቱ የኢትዮጵያ ምርት ገበያ (ECX) ዋጋዎች፡\n1. ነጭ ጤፍ - 128 ETB/kg\n2. ቡና (ሲዳማ) - 485 ETB/kg\n3. ቀይ ሽንኩርት - 82 ETB/kg\n4. ቲማቲም - 65 ETB/kg\n0. ዋና ማውጫ"
          : "Live ECX Market Prices (ETB/kg):\n1. Teff White - 128 ETB\n2. Coffee Sidama - 485 ETB\n3. Red Onion - 82 ETB\n4. Tomatoes - 65 ETB\n0. Main Menu",
        action: 'CON'
      };
    }

    if (text === '2') {
      return {
        sessionId: request.sessionId,
        message: isAm
          ? "💰 የቴሌብር (Telebirr) የሒሳብዎ ቀሪ፡ 28,450.00 ብር\nበኤስክሮው (Escrow) የተያዘ፡ 12,500.00 ብር\nያለቀ ክፍያ ወዲያውኑ ወደ ስልክዎ ይገባል።"
          : "💰 Telebirr Escrow Balance: ETB 28,450.00\nHeld in Active Escrow: ETB 12,500.00\nPayouts auto-release on delivery confirmation.",
        action: 'END'
      };
    }

    if (text === '3') {
      return {
        sessionId: request.sessionId,
        message: isAm
          ? "📦 የትዕዛዝዎ ሁኔታ፡\n• በመጓጓዝ ላይ ያሉ ትዕዛዞች: 2\n• ሹፌር የተመደበለት: 1 Isuzu 5-Ton\n• ለመውሰድ የታቀደበት ቀን፡ ዛሬ 9:00 ሰዓት"
          : "📦 Active Order Status:\n• In-transit shipments: 2\n• Assigned Driver: 1 Isuzu 5-Ton\n• Scheduled Pickup: Today 3:00 PM",
        action: 'END'
      };
    }

    if (text === '4') {
      return {
        sessionId: request.sessionId,
        message: isAm
          ? "🚜 የሚሸጡትን ምርት ይምረጡ፡\n1. ጤፍ (Teff)\n2. ቀይ ሽንኩርት (Onion)\n3. ቲማቲም (Tomato)\n4. ስንዴ (Wheat)\n0. ተመለስ"
          : "🚜 Select produce to list:\n1. Teff\n2. Red Onion\n3. Tomato\n4. Wheat\n0. Back",
        action: 'CON'
      };
    }

    return {
      sessionId: request.sessionId,
      message: isAm ? "✅ እናመሰግናለን! ትዕዛዝዎ በስኬት ተከናውኗል።" : "✅ Thank you! Operation completed successfully.",
      action: 'END'
    };
  }
}

export const api = new ApiService();

