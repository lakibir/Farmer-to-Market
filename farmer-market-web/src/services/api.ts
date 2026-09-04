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
  CommodityPriceIndex, FairPriceRecommendationRequest, FairPriceRecommendationResult, UssdRequest, UssdResponse,
  Review
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
  private reviews: Review[] = [];
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

    const defaultAuditLogs: SystemAuditLog[] = [
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
      },
      {
        id: "log-104",
        actorId: "00000000-0000-0000-0000-000000000001",
        actorName: "Dr. Dawit Haile (Super Admin)",
        actorRole: "superadmin",
        action: "HIGH_VALUE_ESCROW_APPROVAL",
        category: "FINANCE",
        targetResource: "PayoutApproval",
        targetId: "payout-appr-001",
        ipAddress: "196.188.12.45",
        userAgent: "Antigravity/2.0 Web Admin Engine",
        details: "Authorized high-value Telebirr payout of 62,400 ETB for Almaz Tadesse (Basona Teff Cooperative).",
        timestamp: "2026-08-23 01:10 PM"
      },
      {
        id: "log-105",
        actorId: "system-orchestrator",
        actorName: "Platform System (Spatial Service)",
        actorRole: "system",
        action: "POSTGIS_SPATIAL_CLUSTER_SYNC",
        category: "CONFIG",
        targetResource: "DeliveryZoneConfig",
        targetId: "ZONE_CORRIDORS_ALL",
        ipAddress: "127.0.0.1",
        userAgent: "PostGIS Geo-Spatial Engine 3.4",
        details: "Synchronized 6 regional delivery zones & road network topologies across Oromia, Amhara, Sidama, SNNPR, and Tigray.",
        timestamp: "2026-08-23 02:00 PM"
      }
    ];

    const savedAuditLogsStr = localStorage.getItem('farmerMarketAuditLogs');
    if (savedAuditLogsStr) {
      try {
        const savedLogs = JSON.parse(savedAuditLogsStr);
        this.systemAuditLogs = Array.isArray(savedLogs) && savedLogs.length > 0 ? savedLogs : defaultAuditLogs;
      } catch {
        this.systemAuditLogs = defaultAuditLogs;
      }
    } else {
      this.systemAuditLogs = defaultAuditLogs;
    }

    const defaultZones: DeliveryZoneConfig[] = [
      { id: "zone-1", name: "Oromia East Shewa Hub", nameAm: "ምስራቅ ሸዋ የግብርና ኮሪደር", centerLatitude: 8.7522, centerLongitude: 38.9785, baseRadiusKm: 45, maxRadiusKm: 120, ruralSubsidyEtb: 150, active: true, clusterHubName: "Bishoftu & Mojo Freight Terminal", smallholdersCount: 4200 },
      { id: "zone-2", name: "Addis Ababa Central Wholesale Depot", nameAm: "አዲስ አበባ ማዕከላዊ የጅምላ ዲፖ", centerLatitude: 9.0222, centerLongitude: 38.7468, baseRadiusKm: 25, maxRadiusKm: 60, ruralSubsidyEtb: 0, active: true, clusterHubName: "Merkato & Jan Meda Distribution", smallholdersCount: 850 },
      { id: "zone-3", name: "Amhara Highland Grain Basin", nameAm: "የአማራ ከፍተኛ የጤፍና እህል ተፋሰስ", centerLatitude: 9.6800, centerLongitude: 39.5300, baseRadiusKm: 60, maxRadiusKm: 180, ruralSubsidyEtb: 250, active: true, clusterHubName: "Debre Berhan & Shewa Robit Hub", smallholdersCount: 3100 },
      { id: "zone-4", name: "Sidama Rift Fruit & Vegetable Zone", nameAm: "የሲዳማ ፍራፍሬ እና አትክልት ዞን", centerLatitude: 7.0504, centerLongitude: 38.4955, baseRadiusKm: 50, maxRadiusKm: 150, ruralSubsidyEtb: 200, active: true, clusterHubName: "Hawassa Lakeview Terminal", smallholdersCount: 1950 },
      { id: "zone-5", name: "SNNPR Gedeo Specialty Coffee Zone", nameAm: "የጌዴኦ ስፔሻሊቲ ቡና ዞን", centerLatitude: 6.1628, centerLongitude: 38.2045, baseRadiusKm: 40, maxRadiusKm: 140, ruralSubsidyEtb: 300, active: true, clusterHubName: "Yirgacheffe Washing Station Depot", smallholdersCount: 1400 },
      { id: "zone-6", name: "Tigray Northern Transit Hub", nameAm: "የትግራይ ሰሜናዊ የንግድ ኮሪደር", centerLatitude: 13.4967, centerLongitude: 39.4753, baseRadiusKm: 55, maxRadiusKm: 160, ruralSubsidyEtb: 350, active: true, clusterHubName: "Mekelle Central Depot", smallholdersCount: 1100 }
    ];

    const savedZonesStr = localStorage.getItem('farmerMarketDeliveryZones');
    if (savedZonesStr) {
      try {
        const savedZones = JSON.parse(savedZonesStr);
        this.deliveryZones = Array.isArray(savedZones) && savedZones.length > 0 ? savedZones : defaultZones;
      } catch {
        this.deliveryZones = defaultZones;
      }
    } else {
      this.deliveryZones = defaultZones;
    }

    const defaultFeatureFlags: FeatureFlag[] = [
      { key: "advance_harvest", name: "Advance Harvest Pre-Ordering", description: "Allows wholesale buyers to secure future harvests 2-4 weeks prior to field collection.", enabled: true, rolloutPercentage: 100, targetRegions: ["all"], targetRoles: ["farmer", "buyer", "admin", "superadmin"] },
      { key: "voice_note_transcription", name: "Voice Note Audio Memos & AI Transcription", description: "Enables Amharic and Afaan Oromoo audio produce memos with automatic speech-to-text.", enabled: true, rolloutPercentage: 100, targetRegions: ["all"], targetRoles: ["farmer", "agent", "admin", "superadmin"] },
      { key: "dynamic_price_benchmarking", name: "Real-time Wholesale Depot Price Benchmarking", description: "Displays live price comparisons vs Merkato, Sholla, and Adama depots on produce cards.", enabled: true, rolloutPercentage: 100, targetRegions: ["all"], targetRoles: ["buyer", "farmer", "superadmin"] },
      { key: "ussd_offline_gateway", name: "USSD Offline Gateway (*990# / *805#)", description: "Permits feature phone registration, balance checks, and SMS listing fallbacks.", enabled: true, rolloutPercentage: 100, targetRegions: ["all"], targetRoles: ["farmer", "agent"] },
      { key: "multisig_escrow_protection", name: "High-Value Escrow Multi-Sig Authorization", description: "Requires Super Admin dual authorization for payouts exceeding 50,000 ETB.", enabled: true, rolloutPercentage: 100, targetRegions: ["all"], targetRoles: ["admin", "superadmin"] }
    ];

    const savedFlagsStr = localStorage.getItem('farmerMarketFeatureFlags');
    if (savedFlagsStr) {
      try {
        const savedFlags = JSON.parse(savedFlagsStr);
        this.featureFlags = Array.isArray(savedFlags) && savedFlags.length > 0 ? savedFlags : defaultFeatureFlags;
      } catch {
        this.featureFlags = defaultFeatureFlags;
      }
    } else {
      this.featureFlags = defaultFeatureFlags;
    }

    const defaultPayouts: PayoutApprovalItem[] = [
      {
        id: "payout-appr-001",
        recipientId: "22222222-2222-2222-2222-222222222222",
        recipientName: "Almaz Tadesse (Basona Teff Cooperative)",
        recipientPhone: "+251922334455",
        recipientRole: "farmer",
        amountEtb: 62400,
        walletBalanceBefore: 62400,
        riskScore: "Low",
        triggerReason: "Exceeds 50,000 ETB platform threshold (100 Quintals Magna Teff Settlement)",
        status: "Pending",
        requestedAt: "Today 10:45 AM",
        cropName: "Magna Teff (Grade 1)",
        region: "Amhara (Debre Berhan / Basona)",
        tinNumber: "0038912345",
        faydaId: "FAN-9821-4432-1100",
        withholdingTaxEtb: 1248,
        netDisbursedEtb: 61152,
        telebirrTxId: "TB-ET-982104"
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
        triggerReason: "High-frequency multi-trip batch withdrawal (5 Cross-Regional Trips: Adama-Addis)",
        status: "Pending",
        requestedAt: "Today 01:20 PM",
        cropName: "Cold-Chain Produce Logistics",
        region: "Oromia (Adama / Modjo Corridor)",
        tinNumber: "0057812904",
        faydaId: "FAN-4412-9901-7788",
        withholdingTaxEtb: 1084,
        netDisbursedEtb: 53116,
        telebirrTxId: "TB-ET-551299"
      },
      {
        id: "payout-appr-003",
        recipientId: "11111111-1111-1111-1111-111111111111",
        recipientName: "Abebe Bekele (Bishoftu Agro-Hub)",
        recipientPhone: "+251911223344",
        recipientRole: "farmer",
        amountEtb: 78500,
        walletBalanceBefore: 78500,
        riskScore: "Low",
        triggerReason: "Commercial contract fulfilment (2.5 Tons Premium Dutch Tomatoes)",
        status: "Pending",
        requestedAt: "Today 03:15 PM",
        cropName: "Fresh Red Tomatoes",
        region: "Oromia (Bishoftu / Ada'a)",
        tinNumber: "0012345678",
        faydaId: "FAN-1029-3847-5610",
        withholdingTaxEtb: 1570,
        netDisbursedEtb: 76930,
        telebirrTxId: "TB-ET-883012"
      },
      {
        id: "payout-appr-004",
        recipientId: "33333333-3333-3333-3333-333333333333",
        recipientName: "Fatuma Ahmed (Harar Coffee Growers Union)",
        recipientPhone: "+251933445566",
        recipientRole: "farmer",
        amountEtb: 145000,
        walletBalanceBefore: 145000,
        riskScore: "High",
        triggerReason: "Large-scale single consignment withdrawal (>100,000 ETB multi-sig trigger)",
        status: "Pending",
        requestedAt: "Yesterday 04:30 PM",
        cropName: "Specialty Grade 1 Yirgacheffe / Harar Coffee",
        region: "Harari / Eastern Oromia",
        tinNumber: "0091238471",
        faydaId: "FAN-8832-1920-4491",
        withholdingTaxEtb: 2900,
        netDisbursedEtb: 142100,
        telebirrTxId: "TB-ET-449011"
      },
      {
        id: "payout-appr-005",
        recipientId: "66666666-6666-6666-6666-666666666666",
        recipientName: "Solomon Getachew (Sidama Avocado Syndicate)",
        recipientPhone: "+251944556677",
        recipientRole: "farmer",
        amountEtb: 92000,
        walletBalanceBefore: 92000,
        riskScore: "Low",
        triggerReason: "Export-grade Hass Avocado bulk delivery",
        status: "Approved",
        requestedAt: "2026-09-02 09:10 AM",
        reviewedBy: "Dr. Dawit Haile (Super Admin)",
        reviewedAt: "2026-09-02 10:05 AM",
        cropName: "Export-Grade Hass Avocado",
        region: "Sidama (Hawassa / Wondo Genet)",
        tinNumber: "0048192039",
        faydaId: "FAN-3399-2810-7712",
        withholdingTaxEtb: 1840,
        netDisbursedEtb: 90160,
        telebirrTxId: "TB-ET-771920"
      },
      {
        id: "payout-appr-006",
        recipientId: "77777777-7777-7777-7777-777777777777",
        recipientName: "Yared Haile (Ethio-Logistics Freight)",
        recipientPhone: "+251988990011",
        recipientRole: "driver",
        amountEtb: 68000,
        walletBalanceBefore: 68000,
        riskScore: "High",
        triggerReason: "Suspected duplicate delivery verification claim (Flagged by AI Anomaly Engine)",
        status: "Rejected",
        rejectionReason: "Kebele checkpoint GPS telemetry mismatch during freight transit. Under formal compliance review.",
        requestedAt: "2026-09-01 02:40 PM",
        reviewedBy: "Dr. Dawit Haile (Super Admin)",
        reviewedAt: "2026-09-01 03:15 PM",
        cropName: "Refrigerated Onion Haulage",
        region: "Dire Dawa / East Hararghe",
        tinNumber: "0078192831",
        faydaId: "FAN-1120-4491-0023",
        withholdingTaxEtb: 1360,
        netDisbursedEtb: 66640,
        telebirrTxId: "TB-ET-110944"
      }
    ];

    const savedPayoutsStr = localStorage.getItem('farmerMarketPayoutApprovals');
    if (savedPayoutsStr) {
      try {
        const saved = JSON.parse(savedPayoutsStr);
        if (Array.isArray(saved) && saved.length > 0) {
          this.payoutApprovals = saved;
        } else {
          this.payoutApprovals = defaultPayouts;
        }
      } catch {
        this.payoutApprovals = defaultPayouts;
      }
    } else {
      this.payoutApprovals = defaultPayouts;
    }

    const savedConfigStr = localStorage.getItem('farmerMarketPlatformConfig');
    if (savedConfigStr) {
      try {
        const savedConfig = JSON.parse(savedConfigStr);
        this.platformConfig = { ...this.platformConfig, ...savedConfig };
      } catch (e) {
        console.warn('Failed to parse platform config', e);
      }
    }

    const defaultBlacklist: BlacklistEntry[] = [
      {
        id: "bl-01",
        type: "Phone",
        value: "+251900112233",
        reason: "Repeated non-delivery and fraudulent off-platform bypass attempt.",
        blacklistedBy: "Sara Mengistu (Admin)",
        blacklistedAt: "2026-08-15",
        active: true
      },
      {
        id: "bl-02",
        type: "NationalId",
        value: "FAN-9999-8888-7777",
        reason: "Forged Ethiopian national ID presented during tier-2 verification.",
        blacklistedBy: "Dr. Dawit Haile (Super Admin)",
        blacklistedAt: "2026-08-18",
        active: true
      },
      {
        id: "bl-03",
        type: "TinNumber",
        value: "0099887766",
        reason: "Tax revenue evasion & revoked trade license flagged by MOR audit.",
        blacklistedBy: "Dr. Dawit Haile (Super Admin)",
        blacklistedAt: "2026-08-21",
        active: true
      }
    ];

    const savedBlacklistStr = localStorage.getItem('farmerMarketBlacklist');
    if (savedBlacklistStr) {
      try {
        const savedBl = JSON.parse(savedBlacklistStr);
        this.blacklist = Array.isArray(savedBl) && savedBl.length > 0 ? savedBl : defaultBlacklist;
      } catch {
        this.blacklist = defaultBlacklist;
      }
    } else {
      this.blacklist = defaultBlacklist;
    }

    const defaultRules: GlobalBusinessRules = {
      minOrderKg: 50,
      maxOrderKg: 50000,
      maxDistanceKm: 850,
      priceFloorVariancePercent: -30,
      priceCeilingVariancePercent: 250,
      requireFaydaForOrdersAboveKg: 500,
      autoArbitrateAfterHours: 48
    };

    const savedRulesStr = localStorage.getItem('farmerMarketBusinessRules');
    if (savedRulesStr) {
      try {
        const savedRules = JSON.parse(savedRulesStr);
        this.globalBusinessRules = { ...defaultRules, ...savedRules };
      } catch {
        this.globalBusinessRules = defaultRules;
      }
    } else {
      this.globalBusinessRules = defaultRules;
    }

    const defaultReviews: Review[] = [
      {
        id: "rev-001",
        orderId: "b1b2c3d4-0001-0000-0000-000000000001",
        reviewerId: "44444444-4444-4444-4444-444444444444",
        reviewerName: "Bethlehem Tsegaye (FreshMart Wholesale)",
        reviewerRole: "buyer",
        revieweeId: "11111111-1111-1111-1111-111111111111",
        revieweeName: "Abebe Bekele",
        rating: 5,
        comment: "Outstanding tomatoes! Freshly harvested from Bishoftu farm, zero transit bruises, and exact weight. Will reorder weekly with Telebirr escrow.",
        quickTags: ["🌾 Fresh Produce", "📦 Great Packaging", "⏱️ Fast Dispatch", "🌿 Grade-A Quality"],
        createdAt: "Yesterday 2:30 PM"
      },
      {
        id: "rev-002",
        orderId: "b1b2c3d4-0002-0000-0000-000000000002",
        reviewerId: "44444444-4444-4444-4444-444444444444",
        reviewerName: "FreshMart Bole Depot",
        reviewerRole: "buyer",
        revieweeId: "11111111-1111-1111-1111-111111111111",
        revieweeName: "Abebe Bekele",
        rating: 5,
        comment: "Excellent communication and quality Grade-1 tomatoes. Escrow release was fast and driver arrived on time.",
        quickTags: ["🤝 Polite & Responsive", "🌿 Grade-A Quality", "💰 Great Price"],
        createdAt: "3 days ago"
      },
      {
        id: "rev-003",
        orderId: "b1b2c3d4-0003-0000-0000-000000000003",
        reviewerId: "44444444-4444-4444-4444-444444444444",
        reviewerName: "Addis Agro Processing",
        reviewerRole: "buyer",
        revieweeId: "22222222-2222-2222-2222-222222222222",
        revieweeName: "Almaz Tadesse",
        rating: 5,
        comment: "Magna white teff quality is unmatched in Addis. Clean, stone-free, and well bagged with official waybill.",
        quickTags: ["🌿 Grade-A Quality", "🌾 Fresh Produce", "📦 Great Packaging"],
        createdAt: "5 days ago"
      },
      {
        id: "rev-004",
        orderId: "b1b2c3d4-0004-0000-0000-000000000004",
        reviewerId: "44444444-4444-4444-4444-444444444444",
        reviewerName: "Kaliti Juice & Fresh Hub",
        reviewerRole: "buyer",
        revieweeId: "33333333-3333-3333-3333-333333333333",
        revieweeName: "Chala Gemechu",
        rating: 4,
        comment: "Great ripe Hass avocados. Fast freight transit from Hawassa corridor. Very satisfied with the harvest grade.",
        quickTags: ["⏱️ Fast Dispatch", "💰 Great Price", "🌾 Fresh Produce"],
        createdAt: "1 week ago"
      }
    ];

    const savedReviewsStr = localStorage.getItem('farmerMarketReviews');
    if (savedReviewsStr) {
      try {
        const saved: Review[] = JSON.parse(savedReviewsStr);
        if (Array.isArray(saved) && saved.length > 0) {
          this.reviews = saved;
        } else {
          this.reviews = defaultReviews;
        }
      } catch {
        this.reviews = defaultReviews;
      }
    } else {
      this.reviews = defaultReviews;
    }

    const defaultNotifications: NotificationItem[] = [
      // ── Buyer Notifications ──
      {
        id: "notif-b-1",
        userId: "44444444-4444-4444-4444-444444444444",
        type: "order",
        channel: "sms",
        messageEn: "🌾 [Order Confirmed] Farmer Abebe Bekele confirmed your 150 kg Tomato order. Farm dispatch in progress.",
        messageAm: "🌾 [ትዕዛዝ ተረጋግጧል] አርሶ አደር አበበ በቀለ የ 150 ኪ.ግ ቲማቲም ትዕዛዝዎን አረጋግጠዋል። ማጓጓዝ ተጀምሯል።",
        read: false,
        createdAt: new Date(Date.now() - 1800000).toISOString()
      },
      {
        id: "notif-b-2",
        userId: "44444444-4444-4444-4444-444444444444",
        type: "refund",
        channel: "in_app",
        messageEn: "💰 [Telebirr Escrow Refund] Admin approved a Full Refund of 4,500 ETB for Order #B1B2C3D4. Funds credited to your Telebirr wallet.",
        messageAm: "💰 [የቴሌብር ተመላሽ ገንዘብ] አስተዳዳሪው ለትዕዛዝ #B1B2C3D4 የ 4,500 ብር ሙሉ ተመላሽ አጽድቀዋል። ገንዘቡ ወደ ቴሌብር ሂሳብዎ ገብቷል።",
        read: false,
        createdAt: new Date(Date.now() - 7200000).toISOString()
      },
      {
        id: "notif-b-3",
        userId: "44444444-4444-4444-4444-444444444444",
        type: "dispatch",
        channel: "sms",
        messageEn: "🚚 [Freight GPS Update] Driver Dawit is 15 minutes away from your Bole distribution depot.",
        messageAm: "🚚 [የጭነት መገኛ መረጃ] አሽከርካሪ ዳዊት ወደ ቦሌ ማዕከልዎ ለመድረስ 15 ደቂቃ ይቀረዋል።",
        read: true,
        createdAt: new Date(Date.now() - 14400000).toISOString()
      },

      // ── Farmer Notifications ──
      {
        id: "notif-f-1",
        userId: "11111111-1111-1111-1111-111111111111",
        type: "order",
        channel: "sms",
        messageEn: "🌾 [New Wholesale Order] FreshMart Bole placed an order for 200 kg Red Tomatoes (9,000 ETB). Please confirm harvest readiness.",
        messageAm: "🌾 [አዲስ የጅምላ ትዕዛዝ] ፍሬሽማርት ቦሌ ለ 200 ኪ.ግ ቀይ ቲማቲም (ብር 9,000) ትዕዛዝ ሰጥተዋል። እባክዎ ያረጋግጡ።",
        read: false,
        createdAt: new Date(Date.now() - 900000).toISOString()
      },
      {
        id: "notif-f-2",
        userId: "11111111-1111-1111-1111-111111111111",
        type: "review",
        channel: "in_app",
        messageEn: "⭐ [New 5-Star Rating] Buyer Bethlehem left a verified 5★ rating: \"Outstanding tomatoes! Freshly harvested and zero transit bruises.\"",
        messageAm: "⭐ [አዲስ 5-ኮከብ ደረጃ] ደንበኛ ቤተልሔም የ 5★ ደረጃ ሰጥተውዎታል፡ \"እጅግ በጣም ምርጥ ቲማቲም! ትኩስ እና ጥራት ያለው።\"",
        read: false,
        createdAt: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: "notif-f-3",
        userId: "11111111-1111-1111-1111-111111111111",
        type: "payout",
        channel: "sms",
        messageEn: "💰 [Telebirr Payout Received] 48,200 ETB (90% produce share) deposited to your Telebirr wallet for completed deliveries.",
        messageAm: "💰 [የቴሌብር ክፍያ ገቢ ሆነ] ብር 48,200 (90% የምርት ዋጋ) ለተጠናቀቁ ትዕዛዞች ወደ ቴሌብር ሂሳብዎ ገብቷል።",
        read: true,
        createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: "notif-f-4",
        userId: "11111111-1111-1111-1111-111111111111",
        type: "kyc",
        channel: "in_app",
        messageEn: "🛡️ [Fayda KYC Verified] Your Kebele farming certification and National ID have been approved. Verified Producer badge activated!",
        messageAm: "🛡️ [የፋይዳ ማረጋገጫ ጸድቋል] የቀበሌ እርሻ ማረጋገጫዎ እና ብሔራዊ መታወቂያዎ ጸድቋል። የተረጋገጠ አምራች ባጅ ነቅቷል!",
        read: true,
        createdAt: new Date(Date.now() - 172800000).toISOString()
      },

      // ── Driver / Transporter Notifications ──
      {
        id: "notif-d-1",
        userId: "55555555-5555-5555-5555-555555555555",
        type: "dispatch",
        channel: "in_app",
        messageEn: "🚚 [New Freight Route] Bishoftu → Addis Ababa East Shewa multi-farm route ready for pickup. Commission: 1,450 ETB + 350 ETB rural subsidy.",
        messageAm: "🚚 [አዲስ የጉዞ መስመር] የቢሾፍቱ → አዲስ አበባ የጭነት መስመር ተዘጋጅቷል። ኮሚሽን፡ ብር 1,450 + ብር 350 ድጎማ።",
        read: false,
        createdAt: new Date(Date.now() - 1200000).toISOString()
      },
      {
        id: "notif-d-2",
        userId: "55555555-5555-5555-5555-555555555555",
        type: "payout",
        channel: "sms",
        messageEn: "💰 [Trip Settlement] 5% freight fee (650 ETB) credited to Telebirr wallet for verified GPS drop-off.",
        messageAm: "💰 [የጉዞ ክፍያ] 5% የትራንስፖርት ክፍያ (ብር 650) በ GPS ለተረጋገጠ ርክክብ ወደ ቴሌብር ሂሳብዎ ገብቷል።",
        read: true,
        createdAt: new Date(Date.now() - 10800000).toISOString()
      },

      // ── Admin & SuperAdmin Notifications ──
      {
        id: "notif-a-1",
        userId: "99999999-9999-9999-9999-999999999999",
        type: "admin_alert",
        channel: "in_app",
        messageEn: "🛡️ [KYC Verification Queue] 3 new smallholder farmers submitted Kebele certifications for Fayda validation.",
        messageAm: "🛡️ [የማረጋገጫ ወረፋ] 3 አዳዲስ አርሶ አደሮች የቀበሌ ማረጋገጫ ሰነዶችን አቅርበዋል።",
        read: false,
        createdAt: new Date(Date.now() - 600000).toISOString()
      },
      {
        id: "notif-a-2",
        userId: "99999999-9999-9999-9999-999999999999",
        type: "dispute",
        channel: "in_app",
        messageEn: "⚖️ [Legal Arbitration Closed] Order #B1B2C3D4 dispute arbitrated. Full refund executed via Telebirr API.",
        messageAm: "⚖️ [የግልግል ዳኝነት ተጠናቀቀ] ለትዕዛዝ #B1B2C3D4 የተደረገው ክርክር ተጠናቆ ተመላሽ ተደርጓል።",
        read: true,
        createdAt: new Date(Date.now() - 5400000).toISOString()
      }
    ];

    const savedNotifsStr = localStorage.getItem('farmerMarketNotifications');
    if (savedNotifsStr) {
      try {
        const savedN: NotificationItem[] = JSON.parse(savedNotifsStr);
        if (Array.isArray(savedN) && savedN.length > 0) {
          // Merge defaults with any saved so new users get proper notifications
          const combined = [...savedN];
          defaultNotifications.forEach(defN => {
            if (!combined.some(n => n.id === defN.id || (n.userId === defN.userId && n.messageEn === defN.messageEn))) {
              combined.push(defN);
            }
          });
          this.notifications = combined;
        } else {
          this.notifications = defaultNotifications;
        }
      } catch {
        this.notifications = defaultNotifications;
      }
    } else {
      this.notifications = defaultNotifications;
    }
  }

  public saveNotificationsToStorage() {
    try {
      localStorage.setItem('farmerMarketNotifications', JSON.stringify(this.notifications));
    } catch (e) {
      console.warn('Failed to save notifications to storage', e);
    }
  }

  public savePayoutsToStorage() {
    try {
      localStorage.setItem('farmerMarketPayoutApprovals', JSON.stringify(this.payoutApprovals));
    } catch (e) {
      console.warn('Failed to save payouts to storage', e);
    }
  }

  public savePlatformConfigToStorage() {
    try {
      localStorage.setItem('farmerMarketPlatformConfig', JSON.stringify(this.platformConfig));
    } catch (e) {
      console.warn('Failed to save platform config to storage', e);
    }
  }

  public saveOrdersToStorage(): void {
    try {
      localStorage.setItem('farmerMarketOrders', JSON.stringify(this.orders));
    } catch (e) {
      console.warn('Failed to save orders to storage', e);
    }
  }

  private async requestSuperAdmin(path: string, options: RequestInit = {}): Promise<any> {
    try {
      const res = await fetch(path, {
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeaders(),
          ...(options.headers || {})
        },
        ...options
      });
      if (res.ok) {
        return await res.json().catch(() => ({}));
      }
    } catch (err) {
      console.debug(`SuperAdmin sync [${path}] fallback to localStorage:`, err);
    }
    return null;
  }

  public resetPayoutsToDefault(): PayoutApprovalItem[] {
    try {
      localStorage.removeItem('farmerMarketPayoutApprovals');
    } catch (e) {
      console.warn('Failed to clear payouts storage', e);
    }
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
        triggerReason: "Exceeds 50,000 ETB platform threshold (100 Quintals Magna Teff Settlement)",
        status: "Pending",
        requestedAt: "Today 10:45 AM",
        cropName: "Magna Teff (Grade 1)",
        region: "Amhara (Debre Berhan / Basona)",
        tinNumber: "0038912345",
        faydaId: "FAN-9821-4432-1100",
        withholdingTaxEtb: 1248,
        netDisbursedEtb: 61152,
        telebirrTxId: "TB-ET-982104"
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
        triggerReason: "High-frequency multi-trip batch withdrawal (5 Cross-Regional Trips: Adama-Addis)",
        status: "Pending",
        requestedAt: "Today 01:20 PM",
        cropName: "Cold-Chain Produce Logistics",
        region: "Oromia (Adama / Modjo Corridor)",
        tinNumber: "0057812904",
        faydaId: "FAN-4412-9901-7788",
        withholdingTaxEtb: 1084,
        netDisbursedEtb: 53116,
        telebirrTxId: "TB-ET-551299"
      },
      {
        id: "payout-appr-003",
        recipientId: "11111111-1111-1111-1111-111111111111",
        recipientName: "Abebe Bekele (Bishoftu Agro-Hub)",
        recipientPhone: "+251911223344",
        recipientRole: "farmer",
        amountEtb: 78500,
        walletBalanceBefore: 78500,
        riskScore: "Low",
        triggerReason: "Commercial contract fulfilment (2.5 Tons Premium Dutch Tomatoes)",
        status: "Pending",
        requestedAt: "Today 03:15 PM",
        cropName: "Fresh Red Tomatoes",
        region: "Oromia (Bishoftu / Ada'a)",
        tinNumber: "0012345678",
        faydaId: "FAN-1029-3847-5610",
        withholdingTaxEtb: 1570,
        netDisbursedEtb: 76930,
        telebirrTxId: "TB-ET-883012"
      },
      {
        id: "payout-appr-004",
        recipientId: "33333333-3333-3333-3333-333333333333",
        recipientName: "Fatuma Ahmed (Harar Coffee Growers Union)",
        recipientPhone: "+251933445566",
        recipientRole: "farmer",
        amountEtb: 145000,
        walletBalanceBefore: 145000,
        riskScore: "High",
        triggerReason: "Large-scale single consignment withdrawal (>100,000 ETB multi-sig trigger)",
        status: "Pending",
        requestedAt: "Yesterday 04:30 PM",
        cropName: "Specialty Grade 1 Yirgacheffe / Harar Coffee",
        region: "Harari / Eastern Oromia",
        tinNumber: "0091238471",
        faydaId: "FAN-8832-1920-4491",
        withholdingTaxEtb: 2900,
        netDisbursedEtb: 142100,
        telebirrTxId: "TB-ET-449011"
      },
      {
        id: "payout-appr-005",
        recipientId: "66666666-6666-6666-6666-666666666666",
        recipientName: "Solomon Getachew (Sidama Avocado Syndicate)",
        recipientPhone: "+251944556677",
        recipientRole: "farmer",
        amountEtb: 92000,
        walletBalanceBefore: 92000,
        riskScore: "Low",
        triggerReason: "Export-grade Hass Avocado bulk delivery",
        status: "Approved",
        requestedAt: "2026-09-02 09:10 AM",
        reviewedBy: "Dr. Dawit Haile (Super Admin)",
        reviewedAt: "2026-09-02 10:05 AM",
        cropName: "Export-Grade Hass Avocado",
        region: "Sidama (Hawassa / Wondo Genet)",
        tinNumber: "0048192039",
        faydaId: "FAN-3399-2810-7712",
        withholdingTaxEtb: 1840,
        netDisbursedEtb: 90160,
        telebirrTxId: "TB-ET-771920"
      },
      {
        id: "payout-appr-006",
        recipientId: "77777777-7777-7777-7777-777777777777",
        recipientName: "Yared Haile (Ethio-Logistics Freight)",
        recipientPhone: "+251988990011",
        recipientRole: "driver",
        amountEtb: 68000,
        walletBalanceBefore: 68000,
        riskScore: "High",
        triggerReason: "Suspected duplicate delivery verification claim (Flagged by AI Anomaly Engine)",
        status: "Rejected",
        rejectionReason: "Kebele checkpoint GPS telemetry mismatch during freight transit. Under formal compliance review.",
        requestedAt: "2026-09-01 02:40 PM",
        reviewedBy: "Dr. Dawit Haile (Super Admin)",
        reviewedAt: "2026-09-01 03:15 PM",
        cropName: "Refrigerated Onion Haulage",
        region: "Dire Dawa / East Hararghe",
        tinNumber: "0078192831",
        faydaId: "FAN-1120-4491-0023",
        withholdingTaxEtb: 1360,
        netDisbursedEtb: 66640,
        telebirrTxId: "TB-ET-110944"
      }
    ];
    this.savePayoutsToStorage();
    this.notify();
    return this.payoutApprovals;
  }

  private saveReviewsToStorage() {
    try {
      localStorage.setItem('farmerMarketReviews', JSON.stringify(this.reviews));
    } catch (e) {
      console.warn('Failed to save reviews to storage', e);
    }
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

  public async requestOtp(phone: string): Promise<{ demoCode?: string; message: string; phone: string; userName?: string; role?: string; email?: string }> {
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

      const err = await res.json().catch(() => ({ error: 'Failed to request OTP' }));
      throw new Error(err.error || 'Failed to request OTP. Please check your phone number.');
    } catch (err: any) {
      if (err.message && !err.message.includes('Failed to fetch')) {
        throw err;
      }

      // Network unreachable fallback for offline demo
      const localUser = this.allUsers.find(u => u.phone.replace(/\s+/g, '') === cleanPhone);
      if (localUser) {
        return {
          demoCode: '888888',
          message: `Verification code dispatched via SMS simulator for ${localUser.name}.`,
          phone: cleanPhone,
          userName: localUser.name,
          role: localUser.role,
          email: localUser.email
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
          email: data.user.email,
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

      const err = await res.json().catch(() => ({ error: 'Invalid verification code' }));
      throw new Error(err.error || 'Invalid verification code');
    } catch (e: any) {
      if (e.message && !e.message.includes('Failed to fetch')) {
        throw e;
      }
      console.warn('Network verifyOtp failed, checking local seed users', e);
    }

    // Local fallback only for network failure on Super Admin and seeded accounts
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

  public async registerUser(name: string, nameAm: string | undefined, phone: string, role: UserRole, region: string, email?: string): Promise<User> {
    const cleanPhone = phone.startsWith('+251') ? phone.replace(/\s+/g, '') : '+251' + phone.replace(/^0+/, '').replace(/\s+/g, '');
    const roleFormatted = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
    const cleanEmail = email && email.trim() ? email.trim() : undefined;

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
          region,
          email: cleanEmail || null
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
          email: data.user.email || cleanEmail,
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
      if (err.message && !err.message.includes('Failed to fetch')) {
        // Real API rejection error from backend (e.g. duplicate number, validation failure)
        throw err;
      }
      console.warn('Backend register call offline fallback to local state', err);
      createdUser = {
        id: 'user-' + Date.now(),
        phone: cleanPhone,
        name,
        nameAm: nameAm || name,
        email: cleanEmail,
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
          farmerRating: this.getFarmerRatingStats(l.farmerId).reviewCount > 0 ? this.getFarmerRatingStats(l.farmerId).averageRating : (l.farmerRating || 4.9),
          reviewCount: this.getFarmerRatingStats(l.farmerId).reviewCount > 0 ? this.getFarmerRatingStats(l.farmerId).reviewCount : (l.reviewCount || 14),
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
            disputeResolutionNotes: o.disputeResolutionNotes,
            isRecurring: o.isRecurring || false,
            recurringFrequency: o.recurringFrequency,
            confirmedAt: o.confirmedAt,
            isRated: !!this.reviews.find(r => r.orderId === o.id) || o.isRated,
            reviewRating: this.reviews.find(r => r.orderId === o.id)?.rating || o.reviewRating,
            reviewComment: this.reviews.find(r => r.orderId === o.id)?.comment || o.reviewComment,
            reviewQuickTags: this.reviews.find(r => r.orderId === o.id)?.quickTags || o.reviewQuickTags,
            reviewedAt: this.reviews.find(r => r.orderId === o.id)?.createdAt || o.reviewedAt,
            createdAt: o.createdAt
          };
        });
        this.recalculateAllFarmerRatings();
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

  public async placeOrder(listingId: string, qtyKg: number, deliveryAddress?: string, isRecurring = false, frequency = 'Weekly', paymentMethodId?: string): Promise<{ order: Order; paymentUrl?: string; outTradeNo?: string }> {
    const listing = this.listings.find(l => l.id === listingId);
    if (!listing) throw new Error("Listing not found");

    const isGuid = (val?: string) => !!val && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val);
    const validPaymentMethodId = isGuid(paymentMethodId) ? paymentMethodId : null;

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({
        listingId,
        qtyKg,
        deliveryAddress: deliveryAddress || this.currentUser?.region || 'Addis Ababa (Bole)',
        paymentMethodId: validPaymentMethodId,
        isRecurring,
        recurringFrequency: isRecurring ? frequency : null
      })
    });

    if (!res.ok) {
      if (res.status === 401) {
        throw new Error('Please sign in first to place your order.');
      }
      if (res.status === 403) {
        throw new Error('Your account permissions do not allow placing this order.');
      }
      const err = await res.json().catch(() => null);
      let errorMsg = err?.error || err?.message;
      if (!errorMsg && err?.errors) {
        errorMsg = Object.values(err.errors).flat().join(', ');
      }
      throw new Error(errorMsg || `Failed to place order (HTTP ${res.status})`);
    }

    const initData = await res.json().catch(() => null);

    await this.fetchOrders();
    await this.fetchListings();
    const order = this.orders[0] || this.orders.find(o => o.listingId === listingId)!;
    const paymentUrl = initData?.telebirrPaymentUrl || initData?.TelebirrPaymentUrl || initData?.paymentUrl || initData?.checkoutUrl || undefined;
    const outTradeNo = initData?.outTradeNo || initData?.OutTradeNo || undefined;

    // ── Dispatch notifications for Farmer, Buyer, and Transporters ──
    const buyerName = this.currentUser?.name || 'Wholesale Buyer';
    const prodName = listing.productName;
    const prodNameAm = listing.nameAm || prodName;
    const totalEtb = order ? order.totalEtb : Math.round(qtyKg * listing.pricePerKg);

    // 1. Farmer notification
    this.addNotification({
      id: 'notif-ord-f-' + Date.now(),
      userId: listing.farmerId,
      type: 'order',
      channel: 'sms',
      messageEn: `🌾 [New Order Alert] ${buyerName} placed an order for ${qtyKg} kg of ${prodName} (${totalEtb.toLocaleString()} ETB). Telebirr escrow held. Please confirm dispatch.`,
      messageAm: `🌾 [አዲስ ትዕዛዝ] ${buyerName} ለ ${qtyKg} ኪ.ግ ${prodNameAm} ትዕዛዝ አቅርበዋል (ብር ${totalEtb.toLocaleString()})። የቴሌብር ክፍያ በዋስትና ተይዟል። እባክዎ ያረጋግጡ።`,
      read: false,
      createdAt: new Date().toISOString()
    });

    // 2. Buyer confirmation notification
    if (this.currentUser) {
      this.addNotification({
        id: 'notif-ord-b-' + Date.now(),
        userId: this.currentUser.id,
        type: 'order',
        channel: 'in_app',
        messageEn: `📦 [Order Placed] Order placed for ${qtyKg} kg ${prodName} (${totalEtb.toLocaleString()} ETB). Farmer ${listing.farmerName} notified for pickup dispatch.`,
        messageAm: `📦 [ትዕዛዝ ተቀምጧል] ለ ${qtyKg} ኪ.ግ ${prodNameAm} (ብር ${totalEtb.toLocaleString()}) ትዕዛዝዎ ተልኳል። አርሶ አደር ${listing.farmerNameAm || listing.farmerName} እንዲያረጋግጡ ተልኳል።`,
        read: false,
        createdAt: new Date().toISOString()
      });
    }

    // 3. Driver dispatch notification
    this.addNotification({
      id: 'notif-ord-d-' + Date.now(),
      userId: '55555555-5555-5555-5555-555555555555',
      type: 'dispatch',
      channel: 'in_app',
      messageEn: `🚚 [New Freight Dispatch] ${qtyKg} kg ${prodName} route available from ${listing.region} to ${deliveryAddress || 'Addis Ababa'}. Pickup ready soon.`,
      messageAm: `🚚 [አዲስ የጭነት መስመር] የ ${qtyKg} ኪ.ግ ${prodNameAm} ጭነት ከ${listing.region} ወደ ${deliveryAddress || 'አዲስ አበባ'} ይገኛል።`,
      read: false,
      createdAt: new Date().toISOString()
    });

    return {
      order,
      paymentUrl,
      outTradeNo
    };
  }

  public async verifyChapaPayment(txRef: string): Promise<any> {
    try {
      const res = await fetch(`/api/payments/chapa/verify/${encodeURIComponent(txRef)}`);
      if (res.ok) {
        const data = await res.json();
        await this.fetchOrders();
        this.notify();
        return data;
      }
    } catch (e) {
      console.warn('Verify Chapa payment error', e);
    }
    return null;
  }

  public async confirmOrderByFarmer(orderId: string) {
    const order = this.orders.find(o => o.id === orderId);
    await fetch(`/api/orders/${orderId}/confirm`, {
      method: 'PUT',
      headers: this.getAuthHeaders()
    });
    await this.fetchOrders();

    if (order) {
      // 1. Notify Buyer
      this.addNotification({
        id: 'notif-conf-b-' + Date.now(),
        userId: order.buyerId,
        type: 'order',
        channel: 'sms',
        messageEn: `✅ [Order Confirmed] Farmer ${order.farmerName} has packaged and confirmed order #${order.id.slice(0, 8).toUpperCase()} (${order.productName}). Driver dispatching to farm.`,
        messageAm: `✅ [ትዕዛዝ ተረጋግጧል] አርሶ አደር ${order.farmerNameAm || order.farmerName} ትዕዛዝ #${order.id.slice(0, 8).toUpperCase()} አረጋግጠዋል። አሽከርካሪ ወደ እርሻው በመጓዝ ላይ ነው።`,
        read: false,
        createdAt: new Date().toISOString()
      });

      // 2. Notify Driver
      this.addNotification({
        id: 'notif-conf-d-' + Date.now(),
        userId: order.driverId || '55555555-5555-5555-5555-555555555555',
        type: 'dispatch',
        channel: 'in_app',
        messageEn: `🚚 [Ready for Pickup] Order #${order.id.slice(0, 8).toUpperCase()} (${order.qtyKg} kg ${order.productName}) is packaged and ready for farm loading at ${order.farmerRegion || 'Oromia'}.`,
        messageAm: `🚚 [ለመጫን ዝግጁ] ትዕዛዝ #${order.id.slice(0, 8).toUpperCase()} (${order.qtyKg} ኪ.ግ ${order.productNameAm || order.productName}) በእርሻው ላይ ተዘጋጅቷል።`,
        read: false,
        createdAt: new Date().toISOString()
      });
    }
  }

  public async pickupOrderByDriver(orderId: string, photo?: string) {
    const order = this.orders.find(o => o.id === orderId);
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

    if (order) {
      // 1. Notify Buyer
      this.addNotification({
        id: 'notif-pick-b-' + Date.now(),
        userId: order.buyerId,
        type: 'dispatch',
        channel: 'sms',
        messageEn: `🚚 [Produce In Transit] Driver ${order.driverName || 'Dawit'} picked up your ${order.qtyKg} kg ${order.productName} with verified GPS photo proof. In transit to destination.`,
        messageAm: `🚚 [በጉዞ ላይ ነው] አሽከርካሪ ${order.driverName || 'ዳዊት'} ${order.qtyKg} ኪ.ግ ${order.productNameAm || order.productName} ከእርሻው ተረክቦ በመጓዝ ላይ ነው።`,
        read: false,
        createdAt: new Date().toISOString()
      });

      // 2. Notify Farmer
      this.addNotification({
        id: 'notif-pick-f-' + Date.now(),
        userId: order.farmerId,
        type: 'order',
        channel: 'in_app',
        messageEn: `🚚 [Farm Pickup Complete] Driver ${order.driverName || 'Dawit'} loaded order #${order.id.slice(0, 8).toUpperCase()}. Payout will release upon buyer delivery confirmation.`,
        messageAm: `🚚 [ምርት ተጭኗል] አሽከርካሪ ${order.driverName || 'ዳዊት'} ትዕዛዝ #${order.id.slice(0, 8).toUpperCase()} ጭኗል። ክፍያው ደንበኛው ሲረከብ ይለቀቃል።`,
        read: false,
        createdAt: new Date().toISOString()
      });
    }
  }

  public async confirmDeliveryByBuyer(orderId: string, proofPhoto?: string, lat?: number, lng?: number) {
    const order = this.orders.find(o => o.id === orderId);
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

    if (order) {
      const farmerCut = order.farmerCut || Math.round(order.totalEtb * 0.90);
      const driverCut = order.driverCut || Math.round(order.totalEtb * 0.05);

      // 1. Notify Farmer: Payout released
      this.addNotification({
        id: 'notif-del-f-' + Date.now(),
        userId: order.farmerId,
        type: 'payout',
        channel: 'sms',
        messageEn: `💰 [Telebirr Payout Released] Buyer confirmed delivery for order #${order.id.slice(0, 8).toUpperCase()}. 90% produce share (${farmerCut.toLocaleString()} ETB) credited to your Telebirr wallet!`,
        messageAm: `💰 [የቴሌብር ክፍያ ተለቋል] ደንበኛው የትዕዛዝ #${order.id.slice(0, 8).toUpperCase()} ርክክብ አረጋግጠዋል። 90% የምርት ዋጋ (${farmerCut.toLocaleString()} ብር) ወደ ቴሌብር ሂሳብዎ ገብቷል!`,
        read: false,
        createdAt: new Date().toISOString()
      });

      // 2. Notify Driver: Delivery fee + Subsidy credited
      this.addNotification({
        id: 'notif-del-d-' + Date.now(),
        userId: order.driverId || '55555555-5555-5555-5555-555555555555',
        type: 'payout',
        channel: 'sms',
        messageEn: `💰 [Freight Fee Credited] 5% delivery fee (${driverCut.toLocaleString()} ETB) + rural road subsidy deposited to your Telebirr driver wallet.`,
        messageAm: `💰 [የትራንስፖርት ክፍያ ገቢ ሆነ] 5% የትራንስፖርት ክፍያ (${driverCut.toLocaleString()} ብር) እና የገጠር ድጎማ ወደ ቴሌብር ሂሳብዎ ገብቷል።`,
        read: false,
        createdAt: new Date().toISOString()
      });

      // 3. Notify Buyer: Rate Farmer prompt
      this.addNotification({
        id: 'notif-del-b-' + Date.now(),
        userId: order.buyerId,
        type: 'review',
        channel: 'in_app',
        messageEn: `⭐ [Rate Your Farmer] Delivery of ${order.qtyKg} kg ${order.productName} completed. Leave a verified star rating to help farmer ${order.farmerName}.`,
        messageAm: `⭐ [አርሶ አደሩን ደረጃ ይስጡ] የ ${order.qtyKg} ኪ.ግ ${order.productNameAm || order.productName} ርክክብ ተጠናቋል። እባክዎ ለአርሶ አደር ${order.farmerNameAm || order.farmerName} ደረጃ ይስጡ።`,
        read: false,
        createdAt: new Date().toISOString()
      });
    }
  }

  public async disputeOrder(orderId: string, reason: string, photo?: string, refundPercent = 50) {
    const order = this.orders.find(o => o.id === orderId);
    const res = await fetch(`/api/orders/${orderId}/dispute`, {
      method: 'POST',
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

    if (order) {
      // 1. Notify Admin
      this.addNotification({
        id: 'notif-disp-a-' + Date.now(),
        userId: '99999999-9999-9999-9999-999999999999',
        type: 'dispute',
        channel: 'in_app',
        messageEn: `⚠️ [Dispute Raised] Order #${order.id.slice(0, 8).toUpperCase()} (${order.productName}) disputed by Buyer ${order.buyerName}. Reason: "${reason}". Escrow frozen under arbitration.`,
        messageAm: `⚠️ [ቅሬታ ቀርቧል] ለትዕዛዝ #${order.id.slice(0, 8).toUpperCase()} በገዢ ${order.buyerName} ቅሬታ ቀርቧል። ምክንያት፡ "${reason}"። ክፍያው በግልግል ሂደት ታግዷል።`,
        read: false,
        createdAt: new Date().toISOString()
      });

      // 2. Notify Farmer
      this.addNotification({
        id: 'notif-disp-f-' + Date.now(),
        userId: order.farmerId,
        type: 'dispute',
        channel: 'sms',
        messageEn: `⚠️ [Dispute Notice] Buyer filed a dispute for Order #${order.id.slice(0, 8).toUpperCase()} (${order.productName}). Reason: "${reason}". Admin arbitration is in progress.`,
        messageAm: `⚠️ [የቅሬታ ማስታወቂያ] ለትዕዛዝ #${order.id.slice(0, 8).toUpperCase()} ቅሬታ ቀርቧል። ምክንያት፡ "${reason}"። የአስተዳዳሪ ግልግል በሂደት ላይ ነው።`,
        read: false,
        createdAt: new Date().toISOString()
      });
    }
  }

  public async resolveDispute(orderId: string, resolution: 'ReleaseToFarmer' | 'RefundBuyer' | 'PartialSplit', farmerShare = 50, buyerRefund = 50) {
    const order = this.orders.find(o => o.id === orderId);

    try {
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
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        console.warn('Backend resolve dispute returned error', data);
      }
    } catch (e) {
      console.warn('Backend resolve dispute error, proceeding with local resolution', e);
    }

    if (order) {
      order.status = resolution === 'RefundBuyer' ? 'cancelled' : 'delivered';
      order.escrowHeld = false;
      order.disputeStatus = resolution === 'RefundBuyer' ? 'ResolvedRefundBuyer' : resolution === 'PartialSplit' ? 'ResolvedPartialSplit' : 'ResolvedReleaseFarmer';
      order.disputeResolutionNotes = `Arbitrated via Admin Console (${resolution})`;

      const totalEtb = order.totalEtb;
      const refundAmount = resolution === 'RefundBuyer'
        ? totalEtb
        : resolution === 'PartialSplit'
          ? Math.round(totalEtb * (buyerRefund / 100))
          : 0;

      // ── CREATE BUYER IN-APP & SMS REFUND NOTIFICATIONS ──
      if (refundAmount > 0) {
        const buyerNotif: NotificationItem = {
          id: 'ref-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
          userId: order.buyerId,
          type: 'refund',
          channel: 'in_app',
          messageEn: `💰 [Telebirr Escrow Refund] Admin approved a ${resolution === 'RefundBuyer' ? 'Full 100%' : `${buyerRefund}% Partial`} Refund of ${refundAmount.toLocaleString()} ETB for order #${order.id.slice(0, 8).toUpperCase()} (${order.productName}). Funds have been credited to your Telebirr wallet.`,
          messageAm: `💰 [የቴሌብር ተመላሽ ገንዘብ] አስተዳዳሪው ለትዕዛዝ #${order.id.slice(0, 8).toUpperCase()} (${order.productNameAm || order.productName}) የ ${refundAmount.toLocaleString()} ብር ተመላሽ አጽድቀዋል። ገንዘቡ ወደ ቴሌብር ሂሳብዎ ገብቷል።`,
          read: false,
          createdAt: new Date().toISOString(),
          sentAt: new Date().toISOString()
        };

        const buyerSmsNotif: NotificationItem = {
          id: 'sms-ref-' + Date.now(),
          userId: order.buyerId,
          type: 'refund',
          channel: 'sms',
          messageEn: `[Telebirr SMS] Refund of ${refundAmount.toLocaleString()} ETB for Order #${order.id.slice(0, 8).toUpperCase()} completed. Ref: TB-REF-${order.id.slice(0, 6).toUpperCase()}. Wallet updated.`,
          messageAm: `[የቴሌብር SMS] ለትዕዛዝ #${order.id.slice(0, 8).toUpperCase()} የ ${refundAmount.toLocaleString()} ብር ተመላሽ ተጠናቋል። ማጣቀሻ ቁጥር: TB-REF-${order.id.slice(0, 6).toUpperCase()}።`,
          read: false,
          createdAt: new Date().toISOString(),
          sentAt: new Date().toISOString()
        };

        this.notifications.unshift(buyerNotif, buyerSmsNotif);
        this.saveNotificationsToStorage();

        // Update buyer wallet balance if found
        const buyerUser = this.allUsers.find(u => u.id === order.buyerId);
        if (buyerUser) {
          buyerUser.walletBalanceEtb = (buyerUser.walletBalanceEtb || 0) + refundAmount;
        }
        if (this.currentUser && this.currentUser.id === order.buyerId) {
          this.currentUser.walletBalanceEtb = (this.currentUser.walletBalanceEtb || 0) + refundAmount;
        }

        // Add audit log
        this.addAuditLog({
          actorId: this.currentUser?.id || 'admin',
          actorName: this.currentUser?.name || 'Compliance Admin',
          actorRole: 'admin',
          action: 'DISPUTE_REFUND_BUYER',
          category: 'DISPUTE',
          targetResource: 'Order',
          targetId: order.id,
          ipAddress: '196.188.12.45',
          userAgent: navigator.userAgent,
          details: `Processed ${resolution === 'RefundBuyer' ? 'Full' : `${buyerRefund}% Partial`} refund of ${refundAmount.toLocaleString()} ETB for Buyer ${order.buyerName} on order #${order.id.slice(0, 8)}.`
        });
      } else {
        const buyerNotif: NotificationItem = {
          id: 'disp-close-' + Date.now(),
          userId: order.buyerId,
          type: 'dispute_resolution',
          channel: 'in_app',
          messageEn: `⚖️ [Arbitration Decree] Dispute for Order #${order.id.slice(0, 8).toUpperCase()} (${order.productName}) has been concluded. Escrow released to Farmer ${order.farmerName}.`,
          messageAm: `⚖️ [የግልግል ዳኝነት ውሳኔ] ለትዕዛዝ #${order.id.slice(0, 8).toUpperCase()} የቀረበው ቅሬታ ተዘግቷል። ክፍያው ለአርሶ አደር ${order.farmerNameAm || order.farmerName} ተለቋል።`,
          read: false,
          createdAt: new Date().toISOString()
        };
        this.notifications.unshift(buyerNotif);
        this.saveNotificationsToStorage();
      }
    }

    await this.fetchOrders();
    this.notify();
  }

  // ==================== RATINGS & REVIEWS API ====================

  public getReviews(revieweeId?: string): Review[] {
    if (revieweeId) {
      return this.reviews.filter(r => r.revieweeId === revieweeId);
    }
    return this.reviews;
  }

  public getReviewsForFarmer(farmerId: string): Review[] {
    const cleanId = (farmerId || '').toLowerCase().trim();
    if (!cleanId) return [];
    const farmerUser = this.getUserById(farmerId);
    const farmerName = farmerUser?.name?.toLowerCase().trim();

    return this.reviews.filter(r => {
      const rId = (r.revieweeId || '').toLowerCase().trim();
      const rName = (r.revieweeName || '').toLowerCase().trim();
      if (rId && (rId === cleanId || cleanId.includes(rId) || rId.includes(cleanId))) return true;
      if (farmerName && rName && (rName.includes(farmerName) || farmerName.includes(rName))) return true;
      return false;
    });
  }

  public getReviewsForListing(listingId: string): Review[] {
    const listing = this.getListingById(listingId);
    if (!listing) return [];
    return this.getReviewsForFarmer(listing.farmerId);
  }

  public getFarmerRatingStats(farmerId: string): {
    averageRating: number;
    reviewCount: number;
    distribution: Record<number, number>;
    distributionCounts: Record<number, number>;
  } {
    const farmerReviews = this.getReviewsForFarmer(farmerId);
    if (farmerReviews.length === 0) {
      return {
        averageRating: 5.0,
        reviewCount: 0,
        distribution: { 5: 100, 4: 0, 3: 0, 2: 0, 1: 0 },
        distributionCounts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
      };
    }

    const total = farmerReviews.length;
    const sum = farmerReviews.reduce((acc, r) => acc + r.rating, 0);
    const avg = Number((sum / total).toFixed(1));

    const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    farmerReviews.forEach(r => {
      const rounded = Math.min(5, Math.max(1, Math.round(r.rating)));
      counts[rounded] = (counts[rounded] || 0) + 1;
    });

    const distribution: Record<number, number> = {
      5: Math.round((counts[5] / total) * 100),
      4: Math.round((counts[4] / total) * 100),
      3: Math.round((counts[3] / total) * 100),
      2: Math.round((counts[2] / total) * 100),
      1: Math.round((counts[1] / total) * 100)
    };

    return {
      averageRating: avg,
      reviewCount: total,
      distribution,
      distributionCounts: counts
    };
  }

  public recalculateFarmerRatings(farmerId: string) {
    const stats = this.getFarmerRatingStats(farmerId);
    const cleanId = (farmerId || '').toLowerCase().trim();
    this.listings.forEach(l => {
      const lFarmerId = (l.farmerId || '').toLowerCase().trim();
      if (lFarmerId === cleanId || (cleanId && lFarmerId.includes(cleanId))) {
        l.farmerRating = stats.averageRating;
        l.reviewCount = stats.reviewCount;
      }
    });
    this.notify();
  }

  public recalculateAllFarmerRatings() {
    this.listings.forEach(l => {
      const stats = this.getFarmerRatingStats(l.farmerId);
      if (stats.reviewCount > 0) {
        l.farmerRating = stats.averageRating;
        l.reviewCount = stats.reviewCount;
      }
    });
    this.orders.forEach(o => {
      const matched = this.reviews.find(r => r.orderId === o.id);
      if (matched) {
        o.isRated = true;
        o.reviewRating = matched.rating;
        o.reviewComment = matched.comment;
        o.reviewQuickTags = matched.quickTags;
        o.reviewedAt = matched.createdAt;
      }
    });
  }

  public async fetchReviewsForUser(userId: string): Promise<Review[]> {
    try {
      const res = await fetch(`/api/reviews/user/${userId}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          const fetched: Review[] = data.map((d: any) => ({
            id: d.id,
            orderId: d.orderId,
            reviewerId: d.reviewerId,
            reviewerName: d.reviewerName,
            reviewerRole: 'buyer',
            revieweeId: d.revieweeId,
            revieweeName: d.revieweeName,
            rating: d.rating,
            comment: d.comment,
            createdAt: d.createdAt ? new Date(d.createdAt).toLocaleDateString() : 'Recently'
          }));

          fetched.forEach(fr => {
            if (!this.reviews.some(r => r.id === fr.id || (r.orderId && r.orderId === fr.orderId))) {
              this.reviews.unshift(fr);
            }
          });
          localStorage.setItem('farmerMarketReviews', JSON.stringify(this.reviews));
          this.recalculateFarmerRatings(userId);
          return this.getReviewsForFarmer(userId);
        }
      }
    } catch (e) {
      console.warn('Fetch reviews for user failed, using local cache', e);
    }
    return this.getReviewsForFarmer(userId);
  }

  public async fetchReviews(): Promise<Review[]> {
    try {
      const res = await fetch('/api/reviews');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          const fetched: Review[] = data.map((d: any) => ({
            id: d.id,
            orderId: d.orderId,
            reviewerId: d.reviewerId,
            reviewerName: d.reviewerName,
            reviewerRole: 'buyer',
            revieweeId: d.revieweeId,
            revieweeName: d.revieweeName,
            rating: d.rating,
            comment: d.comment,
            createdAt: d.createdAt ? new Date(d.createdAt).toLocaleDateString() : 'Recently'
          }));

          fetched.forEach(fr => {
            if (!this.reviews.some(r => r.id === fr.id || (r.orderId && r.orderId === fr.orderId))) {
              this.reviews.unshift(fr);
            }
          });
          localStorage.setItem('farmerMarketReviews', JSON.stringify(this.reviews));
          this.recalculateAllFarmerRatings();
        }
      }
    } catch (e) {
      console.warn('Fetch all reviews failed, using local cache', e);
    }
    return this.reviews;
  }

  public async createReview(
    orderId: string,
    revieweeId: string,
    rating: number,
    comment?: string,
    quickTags?: string[]
  ): Promise<Review> {
    const clampedRating = Math.max(1, Math.min(5, Math.round(rating)));
    const reviewer = this.currentUser || {
      id: "44444444-4444-4444-4444-444444444444",
      name: "Bethlehem Tsegaye",
      role: "buyer" as UserRole
    };

    const revieweeUser = this.getUserById(revieweeId);
    const revieweeName = revieweeUser?.name || "Farmer";

    const newReview: Review = {
      id: "rev-" + Date.now(),
      orderId,
      reviewerId: reviewer.id,
      reviewerName: reviewer.name,
      reviewerRole: reviewer.role,
      revieweeId,
      revieweeName,
      rating: clampedRating,
      comment: comment?.trim() || undefined,
      quickTags: quickTags && quickTags.length > 0 ? quickTags : undefined,
      createdAt: "Just now"
    };

    // 1. Try sending to backend API
    const isGuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (this.token && isGuid.test(orderId) && isGuid.test(revieweeId)) {
      try {
        const res = await fetch('/api/reviews', {
          method: 'POST',
          headers: this.getAuthHeaders(),
          body: JSON.stringify({
            orderId,
            revieweeId,
            rating: clampedRating,
            comment: comment?.trim() || null
          })
        });
        if (res.ok) {
          const created = await res.json();
          if (created && created.id) {
            newReview.id = created.id;
          }
        }
      } catch (err) {
        console.warn('Remote review submission fallback to local state', err);
      }
    }

    // 2. Add to local reviews list
    this.reviews.unshift(newReview);
    this.saveReviewsToStorage();

    // 3. Mark the order as rated in local state
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.isRated = true;
      order.reviewRating = clampedRating;
      order.reviewComment = comment?.trim() || undefined;
      order.reviewQuickTags = quickTags;
      order.reviewedAt = new Date().toISOString();
    }

    // 4. Recalculate farmer dynamic ratings
    this.recalculateFarmerRatings(revieweeId);

    // 5. Notify farmer of new customer review
    this.addNotification({
      id: 'notif-rev-' + Date.now(),
      userId: revieweeId,
      type: 'review',
      channel: 'in_app',
      messageEn: `⭐ [New Customer Rating] ${reviewer.name} rated you ${clampedRating}/5 stars: "${comment?.trim() || 'Verified produce delivery'}"`,
      messageAm: `⭐ [አዲስ የደንበኛ አስተያየት] ${reviewer.name} የ ${clampedRating}/5 ኮከብ ደረጃ ሰጥተውዎታል፡ "${comment?.trim() || 'ጥሩ ጥራት ያለው ምርት'}"`,
      read: false,
      createdAt: new Date().toISOString()
    });

    // 6. Add audit log
    this.addAuditLog({
      actorId: reviewer.id,
      actorName: reviewer.name,
      actorRole: reviewer.role || 'buyer',
      action: 'SUBMIT_PRODUCE_REVIEW',
      category: 'FINANCE',
      targetResource: 'Review',
      targetId: newReview.id,
      ipAddress: '196.188.12.45',
      userAgent: navigator.userAgent,
      details: `Submitted ${clampedRating}-star review for order #${orderId.slice(0, 8)} (${revieweeName}). Comment: "${(comment || '').slice(0, 40)}..."`
    });

    this.notify();
    return newReview;
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

      // Notify the verified user
      this.addNotification({
        id: 'notif-kyc-' + Date.now(),
        userId,
        type: 'kyc',
        channel: 'sms',
        messageEn: approve
          ? `🛡️ [Fayda KYC Verification Approved] Your national ID, Kebele farming certification, and business documents have been verified. Verified Producer badge activated!`
          : `⚠️ [KYC Verification Notice] Your document submission requires revision. Please check your account profile or re-upload documents.`,
        messageAm: approve
          ? `🛡️ [የፋይዳ ማረጋገጫ ጸድቋል] የእርስዎ ብሔራዊ መታወቂያ እና የቀበሌ እርሻ ሰነዶች ተረጋግጠዋል። የተረጋገጠ አምራች ባጅ ነቅቷል!`
          : `⚠️ [የሰነድ ማረጋገጫ ማስታወቂያ] ያስገቡት ሰነድ ማስተካከያ ይፈልጋል። እባክዎ ሰነዶችን እንደገና ያስገቡ።`,
        read: false,
        createdAt: new Date().toISOString()
      });

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
    if (!this.isUserLoggedIn || !this.currentUser || !this.isAuthenticated()) {
      return [];
    }
    const currentId = (this.currentUser.id || '').toLowerCase().trim();
    const currentRole = (this.currentUser.role || 'buyer').toLowerCase();

    return this.notifications.filter(n => {
      const nUserId = (n.userId || '').toLowerCase().trim();
      // Admin / SuperAdmin see all management and dispute alerts
      if (currentRole === 'admin' || currentRole === 'superadmin') {
        return true;
      }
      // Direct user ID match
      if (nUserId && (nUserId === currentId || currentId.includes(nUserId) || nUserId.includes(currentId))) return true;
      // Broadcast messages
      if (n.type === 'broadcast') return true;
      // Farmer notifications
      if (currentRole === 'farmer' && (n.type === 'order' || n.type === 'review' || n.type === 'payout' || n.type === 'kyc' || n.type === 'dispute') && (!nUserId || nUserId.startsWith('11111111') || nUserId === currentId)) return true;
      // Driver notifications
      if (currentRole === 'driver' && (n.type === 'dispatch' || n.type === 'payout') && (!nUserId || nUserId.startsWith('55555555') || nUserId === currentId)) return true;
      // Buyer notifications
      if (currentRole === 'buyer' && (n.type === 'refund' || n.type === 'order' || n.type === 'dispatch' || n.type === 'dispute_resolution' || n.type === 'review') && (!nUserId || nUserId.startsWith('44444444') || nUserId === currentId)) return true;
      return false;
    });
  }

  public markAllNotificationsRead() {
    const list = this.getNotifications();
    list.forEach(n => {
      n.read = true;
    });
    this.saveNotificationsToStorage();
    this.notify();
  }

  public addNotification(notif: NotificationItem) {
    this.notifications.unshift(notif);
    this.saveNotificationsToStorage();
    this.notify();
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
      this.fetchReviews(),
      this.fetchSummaries(),
      this.fetchVerificationQueue(),
      this.fetchUsers()
    ]);
    this.recalculateAllFarmerRatings();
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

    this.savePlatformConfigToStorage();
    this.notify();

    // Async sync with ASP.NET backend
    this.requestSuperAdmin('/api/superadmin/platform-config', {
      method: 'PUT',
      body: JSON.stringify(this.platformConfig)
    });

    return this.platformConfig;
  }

  // Audit Logs
  public saveAuditLogsToStorage(): void {
    try {
      localStorage.setItem('farmerMarketAuditLogs', JSON.stringify(this.systemAuditLogs));
    } catch (e) {
      console.warn('Failed to save audit logs', e);
    }
  }

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
    this.saveAuditLogsToStorage();

    // Async sync with ASP.NET backend
    this.requestSuperAdmin('/api/superadmin/audit-logs', {
      method: 'POST',
      body: JSON.stringify(log)
    });

    return log;
  }

  public resetAuditLogsToDefault(): void {
    localStorage.removeItem('farmerMarketAuditLogs');
    const defaultAuditLogs: SystemAuditLog[] = [
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
      },
      {
        id: "log-104",
        actorId: "00000000-0000-0000-0000-000000000001",
        actorName: "Dr. Dawit Haile (Super Admin)",
        actorRole: "superadmin",
        action: "HIGH_VALUE_ESCROW_APPROVAL",
        category: "FINANCE",
        targetResource: "PayoutApproval",
        targetId: "payout-appr-001",
        ipAddress: "196.188.12.45",
        userAgent: "Antigravity/2.0 Web Admin Engine",
        details: "Authorized high-value Telebirr payout of 62,400 ETB for Almaz Tadesse (Basona Teff Cooperative).",
        timestamp: "2026-08-23 01:10 PM"
      },
      {
        id: "log-105",
        actorId: "system-orchestrator",
        actorName: "Platform System (Spatial Service)",
        actorRole: "system",
        action: "POSTGIS_SPATIAL_CLUSTER_SYNC",
        category: "CONFIG",
        targetResource: "DeliveryZoneConfig",
        targetId: "ZONE_CORRIDORS_ALL",
        ipAddress: "127.0.0.1",
        userAgent: "PostGIS Geo-Spatial Engine 3.4",
        details: "Synchronized 6 regional delivery zones & road network topologies across Oromia, Amhara, Sidama, SNNPR, and Tigray.",
        timestamp: "2026-08-23 02:00 PM"
      }
    ];
    this.systemAuditLogs = defaultAuditLogs;
    this.saveAuditLogsToStorage();
    this.notify();
  }

  // Delivery Zones
  public saveDeliveryZonesToStorage(): void {
    try {
      localStorage.setItem('farmerMarketDeliveryZones', JSON.stringify(this.deliveryZones));
    } catch (e) {
      console.warn('Failed to save delivery zones', e);
    }
  }

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

    this.saveDeliveryZonesToStorage();
    this.notify();

    // Async sync with ASP.NET backend
    this.requestSuperAdmin('/api/superadmin/zones', {
      method: 'POST',
      body: JSON.stringify(newZone)
    });

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

    this.saveDeliveryZonesToStorage();
    this.notify();

    // Async sync with ASP.NET backend
    this.requestSuperAdmin(`/api/superadmin/zones/${id}`, {
      method: 'PUT',
      body: JSON.stringify(this.deliveryZones[idx])
    });

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

    this.saveDeliveryZonesToStorage();
    this.notify();

    // Async sync with ASP.NET backend
    this.requestSuperAdmin(`/api/superadmin/zones/${id}`, {
      method: 'DELETE'
    });

    return true;
  }

  public resetDeliveryZonesToDefault(): void {
    localStorage.removeItem('farmerMarketDeliveryZones');
    const defaultZones: DeliveryZoneConfig[] = [
      { id: "zone-1", name: "Oromia East Shewa Hub", nameAm: "ምስራቅ ሸዋ የግብርና ኮሪደር", centerLatitude: 8.7522, centerLongitude: 38.9785, baseRadiusKm: 45, maxRadiusKm: 120, ruralSubsidyEtb: 150, active: true, clusterHubName: "Bishoftu & Mojo Freight Terminal", smallholdersCount: 4200 },
      { id: "zone-2", name: "Addis Ababa Central Wholesale Depot", nameAm: "አዲስ አበባ ማዕከላዊ የጅምላ ዲፖ", centerLatitude: 9.0222, centerLongitude: 38.7468, baseRadiusKm: 25, maxRadiusKm: 60, ruralSubsidyEtb: 0, active: true, clusterHubName: "Merkato & Jan Meda Distribution", smallholdersCount: 850 },
      { id: "zone-3", name: "Amhara Highland Grain Basin", nameAm: "የአማራ ከፍተኛ የጤፍና እህል ተፋሰስ", centerLatitude: 9.6800, centerLongitude: 39.5300, baseRadiusKm: 60, maxRadiusKm: 180, ruralSubsidyEtb: 250, active: true, clusterHubName: "Debre Berhan & Shewa Robit Hub", smallholdersCount: 3100 },
      { id: "zone-4", name: "Sidama Rift Fruit & Vegetable Zone", nameAm: "የሲዳማ ፍራፍሬ እና አትክልት ዞን", centerLatitude: 7.0504, centerLongitude: 38.4955, baseRadiusKm: 50, maxRadiusKm: 150, ruralSubsidyEtb: 200, active: true, clusterHubName: "Hawassa Lakeview Terminal", smallholdersCount: 1950 },
      { id: "zone-5", name: "SNNPR Gedeo Specialty Coffee Zone", nameAm: "የጌዴኦ ስፔሻሊቲ ቡና ዞን", centerLatitude: 6.1628, centerLongitude: 38.2045, baseRadiusKm: 40, maxRadiusKm: 140, ruralSubsidyEtb: 300, active: true, clusterHubName: "Yirgacheffe Washing Station Depot", smallholdersCount: 1400 },
      { id: "zone-6", name: "Tigray Northern Transit Hub", nameAm: "የትግራይ ሰሜናዊ የንግድ ኮሪደር", centerLatitude: 13.4967, centerLongitude: 39.4753, baseRadiusKm: 55, maxRadiusKm: 160, ruralSubsidyEtb: 350, active: true, clusterHubName: "Mekelle Central Depot", smallholdersCount: 1100 }
    ];
    this.deliveryZones = defaultZones;
    this.saveDeliveryZonesToStorage();
    this.notify();

    // Async sync with ASP.NET backend
    this.requestSuperAdmin('/api/superadmin/zones/reset-defaults', {
      method: 'POST'
    });
  }

  // Feature Flags
  public saveFeatureFlagsToStorage(): void {
    try {
      localStorage.setItem('farmerMarketFeatureFlags', JSON.stringify(this.featureFlags));
    } catch (e) {
      console.warn('Failed to save feature flags', e);
    }
  }

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

    this.saveFeatureFlagsToStorage();
    this.notify();

    // Async sync with ASP.NET backend
    this.requestSuperAdmin(`/api/superadmin/feature-flags/${key}`, {
      method: 'PUT',
      body: JSON.stringify({ enabled: flag.enabled, rolloutPercentage: flag.rolloutPercentage })
    });

    return flag;
  }

  public resetFeatureFlagsToDefault(): void {
    localStorage.removeItem('farmerMarketFeatureFlags');
    const defaultFeatureFlags: FeatureFlag[] = [
      { key: "advance_harvest", name: "Advance Harvest Pre-Ordering", description: "Allows wholesale buyers to secure future harvests 2-4 weeks prior to field collection.", enabled: true, rolloutPercentage: 100, targetRegions: ["all"], targetRoles: ["farmer", "buyer", "admin", "superadmin"] },
      { key: "voice_note_transcription", name: "Voice Note Audio Memos & AI Transcription", description: "Enables Amharic and Afaan Oromoo audio produce memos with automatic speech-to-text.", enabled: true, rolloutPercentage: 100, targetRegions: ["all"], targetRoles: ["farmer", "agent", "admin", "superadmin"] },
      { key: "dynamic_price_benchmarking", name: "Real-time Wholesale Depot Price Benchmarking", description: "Displays live price comparisons vs Merkato, Sholla, and Adama depots on produce cards.", enabled: true, rolloutPercentage: 100, targetRegions: ["all"], targetRoles: ["buyer", "farmer", "superadmin"] },
      { key: "ussd_offline_gateway", name: "USSD Offline Gateway (*990# / *805#)", description: "Permits feature phone registration, balance checks, and SMS listing fallbacks.", enabled: true, rolloutPercentage: 100, targetRegions: ["all"], targetRoles: ["farmer", "agent"] },
      { key: "multisig_escrow_protection", name: "High-Value Escrow Multi-Sig Authorization", description: "Requires Super Admin dual authorization for payouts exceeding 50,000 ETB.", enabled: true, rolloutPercentage: 100, targetRegions: ["all"], targetRoles: ["admin", "superadmin"] }
    ];
    this.featureFlags = defaultFeatureFlags;
    this.saveFeatureFlagsToStorage();
    this.notify();
  }

  // Payout Approvals & Financial Oversight
  public getPendingPayoutApprovals(): PayoutApprovalItem[] {
    return this.payoutApprovals;
  }

  public getAllPayoutApprovals(): PayoutApprovalItem[] {
    return this.payoutApprovals;
  }

  public createPayoutApproval(dto: {
    recipientId: string;
    recipientName: string;
    recipientPhone: string;
    recipientRole: UserRole;
    amountEtb: number;
    riskScore?: 'Low' | 'Medium' | 'High';
    triggerReason: string;
    cropName?: string;
    region?: string;
  }): PayoutApprovalItem {
    const tax = Math.round(dto.amountEtb * ((this.platformConfig.withholdingTaxPercent || 2) / 100));
    const net = dto.amountEtb - tax;
    const newItem: PayoutApprovalItem = {
      id: `payout-appr-${Date.now().toString().slice(-4)}`,
      recipientId: dto.recipientId,
      recipientName: dto.recipientName,
      recipientPhone: dto.recipientPhone,
      recipientRole: dto.recipientRole,
      amountEtb: dto.amountEtb,
      walletBalanceBefore: dto.amountEtb,
      riskScore: dto.riskScore || (dto.amountEtb > 100000 ? 'High' : dto.amountEtb > 75000 ? 'Medium' : 'Low'),
      triggerReason: dto.triggerReason || 'High-value Telebirr disbursement threshold trigger',
      status: 'Pending',
      requestedAt: 'Just now',
      cropName: dto.cropName || 'High-volume Agricultural Trade',
      region: dto.region || 'National Settlement Pool',
      withholdingTaxEtb: tax,
      netDisbursedEtb: net,
      telebirrTxId: `TB-ET-${Math.floor(Math.random() * 899999 + 100000)}`
    };

    this.payoutApprovals.unshift(newItem);

    this.addAuditLog({
      actorId: this.currentUser?.id || 'superadmin-01',
      actorName: this.currentUser?.name || 'Super Admin',
      actorRole: 'superadmin',
      action: 'CREATE_PAYOUT_REQUEST',
      category: 'FINANCE',
      targetResource: 'PayoutApproval',
      targetId: newItem.id,
      ipAddress: '196.188.12.45',
      userAgent: navigator.userAgent,
      details: `Generated new payout request for ${newItem.recipientName} of ${newItem.amountEtb.toLocaleString()} ETB.`
    });

    this.savePayoutsToStorage();
    this.notify();

    // Async sync with ASP.NET backend
    this.requestSuperAdmin('/api/superadmin/payouts', {
      method: 'POST',
      body: JSON.stringify(newItem)
    });

    return newItem;
  }

  public approvePayout(id: string, reviewerName: string): boolean {
    const item = this.payoutApprovals.find(p => p.id === id);
    if (!item) return false;
    item.status = 'Approved';
    item.reviewedBy = reviewerName;
    item.reviewedAt = new Date().toLocaleString();
    if (!item.telebirrTxId) {
      item.telebirrTxId = `TB-ET-${Math.floor(Math.random() * 899999 + 100000)}`;
    }

    // Add notification to recipient
    this.notifications.unshift({
      id: `notif-payout-${Date.now()}`,
      userId: item.recipientId,
      type: 'payout',
      channel: 'sms',
      messageEn: `💰 [Telebirr Payout Released] High-value payout of ${item.amountEtb.toLocaleString()} ETB has been authorized by Super Admin and deposited to your Telebirr wallet (${item.recipientPhone}). Ref: ${item.telebirrTxId}`,
      messageAm: `💰 [የቴሌብር ክፍያ ተለቋል] የ${item.amountEtb.toLocaleString()} ብር ክፍያ በዋና አድሚን ተረጋግጦ ወደ ቴሌብር አካውንትዎ (${item.recipientPhone}) ገብቷል። ማጣቀሻ: ${item.telebirrTxId}`,
      createdAt: new Date().toISOString(),
      read: false
    });

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
      details: `Authorized high-value Telebirr payout of ${item.amountEtb.toLocaleString()} ETB for ${item.recipientName} (${item.recipientPhone}). Telebirr Tx: ${item.telebirrTxId}`
    });

    this.savePayoutsToStorage();
    this.saveNotificationsToStorage();
    this.notify();

    // Async sync with ASP.NET backend
    this.requestSuperAdmin(`/api/superadmin/payouts/${id}/approve`, {
      method: 'POST',
      body: JSON.stringify({ reviewerName })
    });

    return true;
  }

  public batchApprovePayouts(ids: string[], reviewerName: string): { approvedCount: number; totalAmountEtb: number } {
    let approvedCount = 0;
    let totalAmountEtb = 0;

    ids.forEach(id => {
      const item = this.payoutApprovals.find(p => p.id === id && p.status === 'Pending');
      if (item) {
        item.status = 'Approved';
        item.reviewedBy = reviewerName;
        item.reviewedAt = new Date().toLocaleString();
        if (!item.telebirrTxId) {
          item.telebirrTxId = `TB-ET-${Math.floor(Math.random() * 899999 + 100000)}`;
        }
        approvedCount++;
        totalAmountEtb += item.amountEtb;

        this.notifications.unshift({
          id: `notif-payout-${Date.now()}-${approvedCount}`,
          userId: item.recipientId,
          type: 'payout',
          channel: 'sms',
          messageEn: `💰 [Telebirr Payout Released] Batch payout of ${item.amountEtb.toLocaleString()} ETB authorized by Super Admin. Ref: ${item.telebirrTxId}`,
          messageAm: `💰 [የቴሌብር ክፍያ ተለቋል] የ${item.amountEtb.toLocaleString()} ብር ክፍያ በዋና አድሚን ተረጋግጦ ተለቋል። ማጣቀሻ: ${item.telebirrTxId}`,
          createdAt: new Date().toISOString(),
          read: false
        });
      }
    });

    if (approvedCount > 0) {
      this.addAuditLog({
        actorId: this.currentUser?.id || 'superadmin-01',
        actorName: reviewerName,
        actorRole: 'superadmin',
        action: 'BATCH_APPROVE_PAYOUTS',
        category: 'FINANCE',
        targetResource: 'PayoutApproval',
        ipAddress: '196.188.12.45',
        userAgent: navigator.userAgent,
        details: `Batch authorized ${approvedCount} high-value payouts totaling ${totalAmountEtb.toLocaleString()} ETB.`
      });
      this.savePayoutsToStorage();
      this.saveNotificationsToStorage();
      this.notify();

      // Async sync with ASP.NET backend
      this.requestSuperAdmin('/api/superadmin/payouts/batch-approve', {
        method: 'POST',
        body: JSON.stringify({ ids, reviewerName })
      });
    }

    return { approvedCount, totalAmountEtb };
  }

  public rejectPayout(id: string, reviewerName: string, reason: string = 'High-risk audit anomaly'): boolean {
    const item = this.payoutApprovals.find(p => p.id === id);
    if (!item) return false;
    item.status = 'Rejected';
    item.rejectionReason = reason;
    item.reviewedBy = reviewerName;
    item.reviewedAt = new Date().toLocaleString();

    this.notifications.unshift({
      id: `notif-payout-rej-${Date.now()}`,
      userId: item.recipientId,
      type: 'dispute',
      channel: 'sms',
      messageEn: `⚠️ [Payout Audit Hold] Your payout request of ${item.amountEtb.toLocaleString()} ETB was flagged by Super Admin audit: ${reason}. Please contact support with KYC documents.`,
      messageAm: `⚠️ [የክፍያ ምርመራ እገዳ] የ${item.amountEtb.toLocaleString()} ብር የክፍያ ጥያቄዎ በዋና አድሚን ታግዷል: ${reason}። እባክዎ ተጨማሪ ማረጋገጫ ይዘው ድጋፍ ሰጪን ያነጋግሩ።`,
      createdAt: new Date().toISOString(),
      read: false
    });

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

    this.savePayoutsToStorage();
    this.saveNotificationsToStorage();
    this.notify();

    // Async sync with ASP.NET backend
    this.requestSuperAdmin(`/api/superadmin/payouts/${id}/reject`, {
      method: 'POST',
      body: JSON.stringify({ reviewerName, reason })
    });

    return true;
  }

  public manualReleaseOrderEscrow(orderId: string, reviewerName: string, note: string): boolean {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) return false;
    order.escrowHeld = false;
    order.status = 'delivered';
    order.deliveredAt = new Date().toLocaleString();

    this.addAuditLog({
      actorId: this.currentUser?.id || 'superadmin-01',
      actorName: reviewerName,
      actorRole: 'superadmin',
      action: 'MANUAL_ESCROW_RELEASE',
      category: 'FINANCE',
      targetResource: 'Order',
      targetId: orderId,
      ipAddress: '196.188.12.45',
      userAgent: navigator.userAgent,
      details: `Manual escrow release of ${order.totalEtb.toLocaleString()} ETB for Order #${orderId.slice(0, 8)}. Reason: ${note}`
    });

    this.saveOrdersToStorage();
    this.notify();
    return true;
  }

  public exportFinancialStatementCsv(): string {
    const headers = [
      'Payout ID',
      'Recipient Name',
      'Phone Number',
      'Role',
      'Gross Amount (ETB)',
      'MOR Tax Deduction (2%)',
      'Net Disbursed (ETB)',
      'Risk Score',
      'Status',
      'Telebirr Tx Ref',
      'Trigger Reason',
      'Requested At',
      'Reviewed By',
      'Reviewed At',
      'Rejection Reason'
    ];

    const rows = this.payoutApprovals.map(p => [
      `"${p.id}"`,
      `"${p.recipientName}"`,
      `"${p.recipientPhone}"`,
      `"${p.recipientRole}"`,
      p.amountEtb,
      p.withholdingTaxEtb || Math.round(p.amountEtb * 0.02),
      p.netDisbursedEtb || (p.amountEtb - Math.round(p.amountEtb * 0.02)),
      `"${p.riskScore}"`,
      `"${p.status}"`,
      `"${p.telebirrTxId || ''}"`,
      `"${(p.triggerReason || '').replace(/"/g, '""')}"`,
      `"${p.requestedAt}"`,
      `"${p.reviewedBy || ''}"`,
      `"${p.reviewedAt || ''}"`,
      `"${(p.rejectionReason || '').replace(/"/g, '""')}"`
    ]);

    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  }

  // Global Business Rules
  public saveBusinessRulesToStorage(): void {
    try {
      localStorage.setItem('farmerMarketBusinessRules', JSON.stringify(this.globalBusinessRules));
    } catch (e) {
      console.warn('Failed to save business rules', e);
    }
  }

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

    this.saveBusinessRulesToStorage();
    this.notify();

    // Async sync with ASP.NET backend
    this.requestSuperAdmin('/api/superadmin/business-rules', {
      method: 'PUT',
      body: JSON.stringify(this.globalBusinessRules)
    });

    return this.globalBusinessRules;
  }

  public resetBusinessRulesToDefault(): void {
    localStorage.removeItem('farmerMarketBusinessRules');
    this.globalBusinessRules = {
      minOrderKg: 50,
      maxOrderKg: 50000,
      maxDistanceKm: 850,
      priceFloorVariancePercent: -30,
      priceCeilingVariancePercent: 250,
      requireFaydaForOrdersAboveKg: 500,
      autoArbitrateAfterHours: 48
    };
    this.saveBusinessRulesToStorage();
    this.notify();
  }

  // Blacklist
  public saveBlacklistToStorage(): void {
    try {
      localStorage.setItem('farmerMarketBlacklist', JSON.stringify(this.blacklist));
    } catch (e) {
      console.warn('Failed to save blacklist', e);
    }
  }

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

    this.saveBlacklistToStorage();
    this.notify();

    // Async sync with ASP.NET backend
    this.requestSuperAdmin('/api/superadmin/blacklist', {
      method: 'POST',
      body: JSON.stringify(newEntry)
    });

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

    this.saveBlacklistToStorage();
    this.notify();

    // Async sync with ASP.NET backend
    this.requestSuperAdmin(`/api/superadmin/blacklist/${id}`, {
      method: 'DELETE'
    });

    return true;
  }

  public resetBlacklistToDefault(): void {
    localStorage.removeItem('farmerMarketBlacklist');
    const defaultBlacklist: BlacklistEntry[] = [
      {
        id: "bl-01",
        type: "Phone",
        value: "+251900112233",
        reason: "Repeated non-delivery and fraudulent off-platform bypass attempt.",
        blacklistedBy: "Sara Mengistu (Admin)",
        blacklistedAt: "2026-08-15",
        active: true
      },
      {
        id: "bl-02",
        type: "NationalId",
        value: "FAN-9999-8888-7777",
        reason: "Forged Ethiopian national ID presented during tier-2 verification.",
        blacklistedBy: "Dr. Dawit Haile (Super Admin)",
        blacklistedAt: "2026-08-18",
        active: true
      },
      {
        id: "bl-03",
        type: "TinNumber",
        value: "0099887766",
        reason: "Tax revenue evasion & revoked trade license flagged by MOR audit.",
        blacklistedBy: "Dr. Dawit Haile (Super Admin)",
        blacklistedAt: "2026-08-21",
        active: true
      }
    ];
    this.blacklist = defaultBlacklist;
    this.saveBlacklistToStorage();
    this.notify();
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

    // Async sync with ASP.NET backend
    this.requestSuperAdmin('/api/superadmin/db/backup', {
      method: 'POST'
    });

    return backup;
  }

  public optimizeDatabase(): void {
    this.addAuditLog({
      actorId: this.currentUser?.id || 'superadmin-01',
      actorName: this.currentUser?.name || 'Super Admin',
      actorRole: 'superadmin',
      action: 'DATABASE_MAINTENANCE_VACUUM',
      category: 'CONFIG',
      targetResource: 'PostgreSQL_Engine',
      ipAddress: '196.188.12.45',
      userAgent: navigator.userAgent,
      details: 'Executed VACUUM ANALYZE and PostGIS spatial index re-indexing across all tables.'
    });
    this.notify();

    // Async sync with ASP.NET backend
    this.requestSuperAdmin('/api/superadmin/db/optimize', {
      method: 'POST'
    });
  }

  public resetAllSuperAdminDataToDefault(): void {
    this.resetPayoutsToDefault();
    this.resetAuditLogsToDefault();
    this.resetDeliveryZonesToDefault();
    this.resetFeatureFlagsToDefault();
    this.resetBlacklistToDefault();
    this.resetBusinessRulesToDefault();
    localStorage.removeItem('farmerMarketPlatformConfig');
    this.platformConfig = {
      farmerSharePercent: 90,
      driverSharePercent: 5,
      platformFeePercent: 5,
      withholdingTaxPercent: 2,
      vatOnCommissionPercent: 15,
      highValuePayoutThresholdEtb: 50000,
      emergencyEscrowFrozen: false,
      telebirrAppId: "TB_LIVE_ETH_882190",
      telebirrShortCode: "8055",
      telebirrApiKey: "sk_live_eth_99281746281920",
      telebirrEscrowVaultKey: "vault_sec_eth_telebirr_90_5_5",
      twilioAccountSid: "AC_LIVE_AFROMESSAGE_ETH_001",
      twilioAuthToken: "auth_live_afromsg_99218201",
      twilioFromNumber: "8055",
      mapsGeocodingApiKey: "AIzaSy_Ethiopia_AgroCorridor_Spatial_2026",
      postgisSpatialIndexEnabled: true
    };
    this.savePlatformConfigToStorage();
    this.notify();
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


