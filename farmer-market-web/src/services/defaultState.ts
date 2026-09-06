import {
  PriceBenchmark,
  StandingOrder,
  AnomalyAlert,
  KycVerificationItem,
  VerificationQueueItem,
  AgentRegisteredFarmer,
  RegionalAnalytics,
  User,
  Banner,
  SystemAuditLog,
  DeliveryZoneConfig,
  FeatureFlag,
  BlacklistEntry,
  CommodityPriceIndex,
  PayoutApprovalItem,
  GlobalBusinessRules,
  Review,
  NotificationItem
} from '../types';

export const DEFAULT_PRICE_BENCHMARKS: PriceBenchmark[] = [
  { cropName: "Fresh Sholla Red Tomatoes", cropNameAm: "ቀይ ቲማቲም", marketName: "Merkato Wholesale / Sholla", minPriceEtb: 38, avgPriceEtb: 45, maxPriceEtb: 52, trend: "Down", lastUpdated: "Today 6:00 AM" },
  { cropName: "Organic Magna White Teff", cropNameAm: "የማኛ ነጭ ጤፍ", marketName: "EABC / Addis Depot", minPriceEtb: 108, avgPriceEtb: 115, maxPriceEtb: 125, trend: "Up", lastUpdated: "Today 7:30 AM" },
  { cropName: "Awash Valley Red Onions", cropNameAm: "ቀይ ሽንኩርት", marketName: "Adama Wholesale Market", minPriceEtb: 48, avgPriceEtb: 55, maxPriceEtb: 62, trend: "Stable", lastUpdated: "Today 6:15 AM" },
  { cropName: "Hawassa Hass Avocados", cropNameAm: "ሀስ አቮካዶ", marketName: "Hawassa Central / Merkato", minPriceEtb: 50, avgPriceEtb: 60, maxPriceEtb: 72, trend: "Up", lastUpdated: "Today 8:00 AM" },
  { cropName: "Specialty Green Coffee Beans", cropNameAm: "ስፔሻሊቲ ቡና", marketName: "ECX Central Exchange", minPriceEtb: 340, avgPriceEtb: 380, maxPriceEtb: 420, trend: "Up", lastUpdated: "Yesterday" },
  { cropName: "Bishoftu Sweet Strawberries", cropNameAm: "የቢሾፍቱ እንጆሪ", marketName: "Bole Fresh Produce Hub", minPriceEtb: 85, avgPriceEtb: 95, maxPriceEtb: 110, trend: "Stable", lastUpdated: "Today 7:00 AM" }
];

export const DEFAULT_STANDING_ORDERS: StandingOrder[] = [
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

export const DEFAULT_ANOMALY_ALERTS: AnomalyAlert[] = [
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

export const DEFAULT_KYC_QUEUE: KycVerificationItem[] = [
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

export const DEFAULT_VERIFICATION_QUEUE: VerificationQueueItem[] = [
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

export const DEFAULT_AGENT_FARMERS: AgentRegisteredFarmer[] = [
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

export const DEFAULT_REGIONAL_ANALYTICS: RegionalAnalytics[] = [
  { region: "Oromia (East Shewa / Bishoftu)", smallholdersCount: 4200, volumeMetricTons: 68.5, totalGmvEtb: 3850000, topCrop: "Tomatoes & Onions" },
  { region: "Amhara (Debre Berhan / Gojjam)", smallholdersCount: 3100, volumeMetricTons: 42.0, totalGmvEtb: 4830000, topCrop: "Magna White Teff" },
  { region: "Sidama (Hawassa / Yirgalem)", smallholdersCount: 1950, volumeMetricTons: 24.8, totalGmvEtb: 1488000, topCrop: "Hass Avocados & Fruits" },
  { region: "SNNPR (Gedeo / Yirgacheffe)", smallholdersCount: 1400, volumeMetricTons: 10.5, totalGmvEtb: 3990000, topCrop: "Specialty Green Coffee" }
];

export const DEFAULT_USERS: User[] = [
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

export const DEFAULT_BANNERS: Banner[] = [
  {
    id: "banner-01",
    title: "Fresh Harvest Direct From Farmer to Market",
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
    createdBy: "Platform Admin"
  },
  {
    id: "banner-02",
    title: "National Smallholder Fayda ID & TIN Onboarding",
    titleAm: "የአነስተኛ አርሶ አደሮች የፋይዳ (Fayda ID) እና TIN ምዝገባ",
    subtitle: "Verify your digital national ID to unlock instant direct farmgate payouts, MOR tax withholding exemptions, and local extension agent farm visits.",
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
    createdBy: "Platform Admin"
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
    createdBy: "Platform Admin"
  }
];

export const DEFAULT_AUDIT_LOGS: SystemAuditLog[] = [
  {
    id: "log-101",
    actorId: "system-01",
    actorName: "Platform System",
    actorRole: "superadmin",
    action: "INITIALIZE_PLATFORM_GOVERNANCE",
    category: "CONFIG",
    targetResource: "PlatformConfig",
    targetId: "ESCROW-90-5-5",
    ipAddress: "127.0.0.1",
    userAgent: "FarmerMarket Web Client",
    details: "Established baseline 90/5/5 escrow split, 15% VAT on platform fee, and MOR withholding tax schedule.",
    timestamp: "2026-08-23 08:30 AM"
  },
  {
    id: "log-102",
    actorId: "admin-66",
    actorName: "Compliance Team",
    actorRole: "admin",
    action: "APPROVE_KYC_VERIFICATION",
    category: "USER_CRUD",
    targetResource: "UserDocument",
    targetId: "11111111-1111-1111-1111-111111111111",
    ipAddress: "127.0.0.1",
    userAgent: "FarmerMarket Web Client",
    details: "Approved Abebe Bekele Fayda National ID (FAN-1122-3344-5566) and TIN (0011223344).",
    timestamp: "2026-08-23 10:15 AM"
  },
  {
    id: "log-103",
    actorId: "admin-66",
    actorName: "Arbitration Desk",
    actorRole: "admin",
    action: "DISPUTE_ARBITRATION_DECREE",
    category: "DISPUTE",
    targetResource: "Order",
    targetId: "ord-dispute-001",
    ipAddress: "127.0.0.1",
    userAgent: "FarmerMarket Web Client",
    details: "Resolved moisture defect dispute with 50/50 partial split under EABC arbitration rules.",
    timestamp: "2026-08-23 11:45 AM"
  },
  {
    id: "log-104",
    actorId: "system-01",
    actorName: "Escrow Manager",
    actorRole: "superadmin",
    action: "HIGH_VALUE_ESCROW_APPROVAL",
    category: "FINANCE",
    targetResource: "PayoutApproval",
    targetId: "payout-appr-001",
    ipAddress: "127.0.0.1",
    userAgent: "FarmerMarket Web Client",
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
    userAgent: "FarmerMarket Web Client",
    details: "Synchronized 6 regional delivery zones & road network topologies across Oromia, Amhara, Sidama, SNNPR, and Tigray.",
    timestamp: "2026-08-23 02:00 PM"
  }
];

export const DEFAULT_DELIVERY_ZONES: DeliveryZoneConfig[] = [
  { id: "zone-1", name: "Oromia East Shewa Hub", nameAm: "ምስራቅ ሸዋ የግብርና ኮሪደር", centerLatitude: 8.7522, centerLongitude: 38.9785, baseRadiusKm: 45, maxRadiusKm: 120, ruralSubsidyEtb: 150, active: true, clusterHubName: "Bishoftu & Mojo Freight Terminal", smallholdersCount: 4200 },
  { id: "zone-2", name: "Addis Ababa Central Wholesale Depot", nameAm: "አዲስ አበባ ማዕከላዊ የጅምላ ዲፖ", centerLatitude: 9.0222, centerLongitude: 38.7468, baseRadiusKm: 25, maxRadiusKm: 60, ruralSubsidyEtb: 0, active: true, clusterHubName: "Merkato & Jan Meda Distribution", smallholdersCount: 850 },
  { id: "zone-3", name: "Amhara Highland Grain Basin", nameAm: "የአማራ ከፍተኛ የጤፍና እህል ተፋሰስ", centerLatitude: 9.6800, centerLongitude: 39.5300, baseRadiusKm: 60, maxRadiusKm: 180, ruralSubsidyEtb: 250, active: true, clusterHubName: "Debre Berhan & Shewa Robit Hub", smallholdersCount: 3100 },
  { id: "zone-4", name: "Sidama Rift Fruit & Vegetable Zone", nameAm: "የሲዳማ ፍራፍሬ እና አትክልት ዞን", centerLatitude: 7.0504, centerLongitude: 38.4955, baseRadiusKm: 50, maxRadiusKm: 150, ruralSubsidyEtb: 200, active: true, clusterHubName: "Hawassa Lakeview Terminal", smallholdersCount: 1950 },
  { id: "zone-5", name: "SNNPR Gedeo Specialty Coffee Zone", nameAm: "የጌዴኦ ስፔሻሊቲ ቡና ዞን", centerLatitude: 6.1628, centerLongitude: 38.2045, baseRadiusKm: 40, maxRadiusKm: 140, ruralSubsidyEtb: 300, active: true, clusterHubName: "Yirgacheffe Washing Station Depot", smallholdersCount: 1400 },
  { id: "zone-6", name: "Tigray Northern Transit Hub", nameAm: "የትግራይ ሰሜናዊ የንግድ ኮሪደር", centerLatitude: 13.4967, centerLongitude: 39.4753, baseRadiusKm: 55, maxRadiusKm: 160, ruralSubsidyEtb: 350, active: true, clusterHubName: "Mekelle Central Depot", smallholdersCount: 1100 }
];

export const DEFAULT_FEATURE_FLAGS: FeatureFlag[] = [
  { key: "advance_harvest", name: "Advance Harvest Pre-Ordering", description: "Allows wholesale buyers to secure future harvests 2-4 weeks prior to field collection.", enabled: true, rolloutPercentage: 100, targetRegions: ["all"], targetRoles: ["farmer", "buyer", "admin", "superadmin"] },
  { key: "voice_note_transcription", name: "Voice Note Audio Memos & AI Transcription", description: "Enables Amharic and Afaan Oromoo audio produce memos with automatic speech-to-text.", enabled: true, rolloutPercentage: 100, targetRegions: ["all"], targetRoles: ["farmer", "agent", "admin", "superadmin"] },
  { key: "dynamic_price_benchmarking", name: "Real-time Wholesale Depot Price Benchmarking", description: "Displays live price comparisons vs Merkato, Sholla, and Adama depots on produce cards.", enabled: true, rolloutPercentage: 100, targetRegions: ["all"], targetRoles: ["buyer", "farmer", "superadmin"] },
  { key: "ussd_offline_gateway", name: "USSD Offline Gateway (*990# / *805#)", description: "Permits feature phone registration, balance checks, and SMS listing fallbacks.", enabled: true, rolloutPercentage: 100, targetRegions: ["all"], targetRoles: ["farmer", "agent"] },
  { key: "multisig_escrow_protection", name: "High-Value Escrow Multi-Sig Authorization", description: "Requires Super Admin dual authorization for payouts exceeding 50,000 ETB.", enabled: true, rolloutPercentage: 100, targetRegions: ["all"], targetRoles: ["admin", "superadmin"] }
];

export const DEFAULT_BLACKLIST: BlacklistEntry[] = [
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

export const DEFAULT_COMMODITY_PRICE_INDICES: CommodityPriceIndex[] = [
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
    weeklyChangePercent: 1.2,
    trendDirection: 'Stable',
    volatilityRating: 'Low',
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

export const DEFAULT_PAYOUTS: PayoutApprovalItem[] = [
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

export const DEFAULT_BUSINESS_RULES: GlobalBusinessRules = {
  minOrderKg: 50,
  maxOrderKg: 50000,
  maxDistanceKm: 850,
  priceFloorVariancePercent: -30,
  priceCeilingVariancePercent: 250,
  requireFaydaForOrdersAboveKg: 500,
  autoArbitrateAfterHours: 48
};

export const DEFAULT_REVIEWS: Review[] = [
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

export const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
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
    messageEn: "💰 [Telebirr Payout Received] 48,200 ETB produce share deposited to your Telebirr wallet for completed deliveries.",
    messageAm: "💰 [የቴሌብር ክፍያ ገቢ ሆነ] ብር 48,200 የምርት ዋጋ ለተጠናቀቁ ትዕዛዞች ወደ ቴሌብር ሂሳብዎ ገብቷል።",
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
