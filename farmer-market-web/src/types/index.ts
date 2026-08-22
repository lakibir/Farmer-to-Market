export type UserRole = 'farmer' | 'buyer' | 'driver' | 'admin';
export type OrderStatus = 'pending' | 'confirmed' | 'picked_up' | 'delivered' | 'disputed' | 'cancelled';
export type ListingStatus = 'active' | 'sold_out' | 'expired' | 'inactive';

export interface User {
  id: string;
  phone: string;
  name: string;
  nameAm?: string;
  role: UserRole;
  region: string;
  verified: boolean;
  tinNumber?: string;
  businessLicenseNumber?: string;
  vehicleType?: string;
  refrigerationType?: string;
  vehicleCapacityKg?: number;
  kycDocumentType?: string;
  kycDocumentNumber?: string;
  kycStatus?: 'Verified' | 'Pending' | 'Rejected';
  kycTier?: 1 | 2 | 3;
  repeatBuyerCount?: number;
  onTimeDeliveryRate?: number;
  walletBalanceEtb?: number;
  createdAt: string;
}

export interface Listing {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerNameAm?: string;
  farmerPhone: string;
  region: string;
  productName: string;
  nameAm?: string;
  category: string;
  qtyKg: number;
  pricePerKg: number;
  minOrderKg: number;
  latitude: number;
  longitude: number;
  distanceKm?: number;
  photos: string[];
  availableFrom: string;
  status: ListingStatus;
  grade?: string; // "Grade 1", "Grade 2", "Export Grade"
  ripeness?: string; // "Ready Today", "Semi-Ripe", "Green / Storable"
  isOrganic?: boolean;
  isAdvanceHarvest?: boolean;
  expectedHarvestDate?: string;
  voiceNoteUrl?: string;
  voiceNoteTranscript?: string;
  marketBenchmarkPrice?: number;
  moderationStatus?: 'Approved' | 'PendingReview' | 'Flagged';
  farmerRating: number;
  reviewCount: number;
  repeatBuyerCount?: number;
  onTimeDeliveryRate?: number;
  createdAt: string;
}

export interface Order {
  id: string;
  listingId: string;
  productName: string;
  productNameAm?: string;
  category: string;
  farmerId: string;
  farmerName: string;
  farmerNameAm?: string;
  farmerPhone: string;
  farmerRegion: string;
  buyerId: string;
  buyerName: string;
  buyerPhone: string;
  driverId?: string;
  driverName?: string;
  driverPhone?: string;
  qtyKg: number;
  pricePerKg: number;
  totalEtb: number;
  farmerCut: number;
  driverCut: number;
  platformCut: number;
  driverSubsidyEtb?: number;
  withholdingTaxEtb?: number; // 2% Withholding under Ethiopian Tax Proclamation
  platformVatEtb?: number; // 15% VAT on 5% platform service
  status: OrderStatus;
  escrowHeld: boolean;
  paymentRef?: string;
  invoiceNumber?: string;
  waybillNumber?: string;
  contractNumber?: string;
  pickupPhoto?: string;
  deliveryPhoto?: string;
  deliveryGpsLat?: number;
  deliveryGpsLng?: number;
  deliveredAt?: string;
  deliveryAddress?: string;
  deliveryNotes?: string;
  disputeReason?: string;
  disputePhoto?: string;
  requestedRefundPercent?: number;
  disputeStatus?: string; // "None", "PendingReview", "ResolvedReleaseFarmer", "ResolvedRefundBuyer", "ResolvedPartialSplit"
  disputeResolutionNotes?: string;
  arbitrationDecreeNumber?: string;
  isRecurring?: boolean;
  recurringFrequency?: string; // "Weekly", "Bi-Weekly"
  confirmedAt?: string;
  createdAt: string;
}

export interface PaymentSummary {
  totalEarnedEtb: number;
  pendingEscrowEtb: number;
  releasedEtb: number;
  completedOrdersCount: number;
  pendingOrdersCount: number;
  totalWithholdingTaxPaidEtb?: number;
}

export interface DriverSummary {
  totalEarnedEtb: number;
  pendingEtb: number;
  deliveredTripsCount: number;
  ruralBonusEtb?: number;
}

export interface PlatformStats {
  totalUsers: number;
  totalFarmers: number;
  totalBuyers: number;
  totalDrivers: number;
  totalListings: number;
  totalOrders: number;
  totalTransactionVolumeEtb: number;
  totalPlatformCommissionEtb: number;
  activeEscrowHeldEtb: number;
  disputedOrdersCount: number;
  totalMetricTonsMoved?: number;
  middlemanMarginSavedEtb?: number;
  totalVatRemittedEtb?: number;
  totalWithholdingReportedEtb?: number;
}

export interface CartItem {
  listing: Listing;
  qtyKg: number;
}

export interface NotificationItem {
  id: string;
  userId: string;
  type: string;
  channel: string;
  messageEn: string;
  messageAm: string;
  read: boolean;
  sentAt: string;
}

export interface PriceBenchmark {
  cropName: string;
  cropNameAm: string;
  marketName: string;
  minPriceEtb: number;
  avgPriceEtb: number;
  maxPriceEtb: number;
  trend: 'Up' | 'Down' | 'Stable';
  lastUpdated: string;
}

export interface StandingOrder {
  id: string;
  listingId: string;
  productName: string;
  productNameAm?: string;
  farmerName: string;
  qtyKg: number;
  pricePerKg: number;
  frequency: 'Weekly' | 'Bi-Weekly' | 'Monthly';
  nextDeliveryDate: string;
  active: boolean;
  createdAt: string;
}

export interface AnomalyAlert {
  id: string;
  severity: 'High' | 'Medium' | 'Low';
  type: 'DuplicateProofPhoto' | 'PriceManipulation' | 'UnusualVolume' | 'FakeAccount';
  title: string;
  description: string;
  entityType: string;
  entityId: string;
  detectedAt: string;
}

export interface KycVerificationItem {
  userId: string;
  userName: string;
  userRole: string;
  phone: string;
  region: string;
  documentType: string;
  documentNumber: string;
  tinNumber?: string;
  kycTier?: 1 | 2 | 3;
  status: 'Pending' | 'Verified' | 'Rejected';
  submittedAt: string;
}

export interface RegionalAnalytics {
  region: string;
  smallholdersCount: number;
  volumeMetricTons: number;
  totalGmvEtb: number;
  topCrop: string;
}

export interface RouteStop {
  stopNumber: number;
  type: 'pickup' | 'dropoff';
  locationName: string;
  contactName: string;
  phone: string;
  cargoDetails: string;
  weightKg: number;
  completed: boolean;
}

export interface OptimizedRoute {
  id: string;
  title: string;
  totalDistanceKm: number;
  estimatedHours: number;
  totalWeightKg: number;
  driverCommissionEtb: number;
  ruralSubsidyEtb: number;
  stops: RouteStop[];
}

export interface OfflineAction {
  id: string;
  type: 'pickup' | 'delivery';
  orderId: string;
  timestamp: string;
  data: any;
  synced: boolean;
}

// ==================== LEGAL & COMPLIANCE DOCUMENT MODELS ====================

export interface TaxInvoice {
  invoiceNumber: string;
  orderId: string;
  issueDate: string;
  paymentRef: string;
  
  // Seller / Farmer Details
  sellerName: string;
  sellerTin: string;
  sellerRegion: string;
  sellerPhone: string;
  sellerType: string;

  // Buyer Details
  buyerName: string;
  buyerTin: string;
  buyerRegion: string;
  buyerPhone: string;

  // Produce & Fiscal Line Items
  productName: string;
  productNameAm?: string;
  grade: string;
  qtyKg: number;
  unitPriceEtb: number;
  grossAmountEtb: number;
  farmerPayoutEtb: number; // 90%
  driverFreightEtb: number; // 5%
  platformServiceFeeEtb: number; // 5%
  platformVatEtb: number; // 15% VAT on platform fee
  withholdingTaxEtb: number; // 2% Withholding
  totalPaidViaTelebirr: number;
  
  // Regulatory & QR Code Verification
  regulatoryAct: string;
  qrVerificationCode: string;
  isVatExemptAgriculturalGoods: boolean;
}

export interface TransportWaybill {
  waybillNumber: string;
  orderId: string;
  dispatchDate: string;
  
  // Consignor & Consignee
  consignorName: string;
  consignorFarmLocation: string;
  consignorPhone: string;
  consigneeName: string;
  consigneeDepotAddress: string;
  consigneePhone: string;

  // Carrier & Vehicle Specifications
  carrierDriverName: string;
  driverLicenseNumber: string;
  vehiclePlateNumber: string;
  vehicleModel: string;
  refrigerationStatus: string;
  insurancePolicyNumber: string;

  // Cargo & Weight Manifest
  cargoDescription: string;
  packageCount: number;
  netWeightKg: number;
  grossWeightKg: number;
  tareWeightKg: number;
  temperatureLogCelsius?: number;

  // Signatures & Timestamp Seals
  farmerHandoffTimestamp: string;
  driverSignatureRef: string;
  buyerReceivedTimestamp?: string;
  transitStatus: 'Dispatched' | 'InTransit' | 'DeliveredWithGPS';
}

export interface LegalContract {
  contractNumber: string;
  orderId: string;
  agreementDate: string;
  effectiveDate: string;

  // Parties
  sellerName: string;
  sellerIdNumber: string;
  sellerLocation: string;
  buyerName: string;
  buyerTinNumber: string;
  buyerLocation: string;

  // Subject Matter
  cropType: string;
  contractedQuantityKg: number;
  agreedPricePerKg: number;
  totalContractValueEtb: number;
  qualityStandardClause: string;
  deliveryTimeline: string;
  
  // Binding Legal Clauses
  escrowClauseText: string;
  forceMajeureClauseText: string;
  disputeJurisdiction: string;
  eSignatures: {
    sellerSigned: boolean;
    sellerSignDate: string;
    buyerSigned: boolean;
    buyerSignDate: string;
    platformWitnessHash: string;
  };
}

export interface DisputeMediationRecord {
  caseNumber: string;
  orderId: string;
  filingDate: string;
  resolutionDate?: string;
  status: 'UnderInvestigation' | 'Settled';

  // Parties
  claimantBuyer: string;
  respondentFarmer: string;
  freightCarrier: string;
  totalDisputedAmountEtb: number;

  // Claims & Evidence
  disputeReason: string;
  claimedDefectPercentage: number;
  inspectionReport: string;
  photoEvidenceUrl?: string;

  // Arbitrator Legal Determination
  leadArbitratorName: string;
  legalFindingSummary: string;
  arbitrationVerdict: 'FullReleaseToFarmer' | 'FullRefundToBuyer' | 'FiftyFiftySplit';
  farmerSettlementEtb: number;
  buyerRefundEtb: number;
  platformDecreeHash: string;
}
