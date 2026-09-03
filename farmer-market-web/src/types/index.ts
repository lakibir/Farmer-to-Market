export type UserRole = 'farmer' | 'buyer' | 'driver' | 'agent' | 'admin' | 'superadmin';
export type OrderStatus = 'pending' | 'confirmed' | 'picked_up' | 'delivered' | 'disputed' | 'cancelled';
export type ListingStatus = 'active' | 'sold_out' | 'expired' | 'inactive';
export type VerificationStatus = 'PendingSubmission' | 'UnderReview' | 'Approved' | 'Rejected';
export type RegistrationMethod = 'Self' | 'Agent';
export type DocumentType = 'FaydaId' | 'TinCertificate' | 'BusinessLicense' | 'KebeleId' | 'CoopCertificate' | 'VehicleLogbook';

export interface UserDocument {
  id: string;
  userId: string;
  documentType: DocumentType | string;
  documentNumber: string;
  frontImageUrl?: string;
  backImageUrl?: string;
  fileUrl?: string;
  status: VerificationStatus;
  rejectionReason?: string;
  submittedAt: string;
  reviewedAt?: string;
}

export interface VerificationReview {
  id: string;
  userId: string;
  reviewerName: string;
  actionTaken: 'Approved' | 'Rejected' | 'RequestedChanges' | string;
  notes?: string;
  timestamp: string;
}

export interface Review {
  id: string;
  orderId: string;
  reviewerId: string;
  reviewerName: string;
  reviewerRole?: string;
  revieweeId: string;
  revieweeName: string;
  rating: number; // 1 to 5
  comment?: string;
  quickTags?: string[];
  createdAt: string;
}

export interface User {
  id: string;
  phone: string;
  name: string;
  nameAm?: string;
  email?: string;
  languagePreference?: string;
  savedDeliveryAddress?: string;
  defaultDeliveryLat?: number;
  defaultDeliveryLng?: number;
  role: UserRole;
  region: string;
  verified: boolean;
  status?: 'active' | 'suspended' | 'blacklisted';
  registrationMethod?: RegistrationMethod;
  registeredByAgentId?: string;
  registeredByAgentName?: string;
  verificationStatus?: VerificationStatus;
  rejectionReason?: string;
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
  primaryCrop?: string;
  kebele?: string;
  faydaId?: string;
  permissions?: string[];
  documents?: UserDocument[];
  verificationReviews?: VerificationReview[];
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
  description?: string;
  descriptionAm?: string;
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
  grade?: string;
  ripeness?: string;
  isOrganic?: boolean;
  isAdvanceHarvest?: boolean;
  expectedHarvestDate?: string;
  voiceNoteUrl?: string;
  voiceNoteTranscript?: string;
  marketBenchmarkPrice?: number;
  moderationStatus?: 'Approved' | 'PendingReview' | 'Flagged';
  requiresColdChain?: boolean;
  targetTempMinCelsius?: number;
  targetTempMaxCelsius?: number;
  cooperativeName?: string;
  isAggregatedLot?: boolean;
  aggregatedFarmerCount?: number;
  cooperativeLotId?: string;
  farmerRating: number;
  reviewCount: number;
  repeatBuyerCount?: number;
  onTimeDeliveryRate?: number;
  createdAt: string;
}

export interface RegionalPricePoint {
  regionName: string;
  marketName: string;
  minPriceEtb: number;
  avgPriceEtb: number;
  maxPriceEtb: number;
}

export interface PriceHistoryPoint {
  date: string;
  priceEtb: number;
}

export interface CommodityPriceIndex {
  commodityId: string;
  name: string;
  nameAm: string;
  category: string;
  unit: string;
  nationalAvgPriceEtb: number;
  eczBenchmarkEtb: number;
  weeklyChangePercent: number;
  trendDirection: 'Up' | 'Down' | 'Stable';
  volatilityRating: 'Low' | 'Moderate' | 'High';
  regionalPrices: RegionalPricePoint[];
  historical7Days: PriceHistoryPoint[];
}

export interface FairPriceRecommendationRequest {
  commodityName: string;
  category: string;
  region: string;
  grade: string;
  qtyKg: number;
  requiresColdChain?: boolean;
}

export interface FairPriceRecommendationResult {
  commodityName: string;
  region: string;
  grade: string;
  recommendedMinEtb: number;
  recommendedFairPriceEtb: number;
  recommendedMaxEtb: number;
  ecxBenchmarkEtb: number;
  supplyCondition: string;
  volatility: string;
  guidanceMessageEn: string;
  guidanceMessageAm: string;
  coldChainPremiumPercent: number;
  cooperativeBulkDiscountPercent: number;
}

export interface UssdRequest {
  sessionId: string;
  phoneNumber: string;
  text: string;
  serviceCode?: string;
  language?: string;
}

export interface UssdResponse {
  sessionId: string;
  message: string;
  action: 'CON' | 'END';
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
  withholdingTaxEtb?: number;
  platformVatEtb?: number;
  status: OrderStatus;
  escrowHeld: boolean;
  paymentRef?: string;
  invoiceNumber?: string;
  waybillNumber?: string;
  contractNumber?: string;
  arbitrationDecreeNumber?: string;
  pickupPhoto?: string;
  deliveryPhoto?: string;
  deliveryGpsLat?: number;
  deliveryGpsLng?: number;
  deliveredAt?: string;
  deliveryAddress?: string;
  disputeReason?: string;
  disputePhoto?: string;
  requestedRefundPercent?: number;
  disputeStatus?: string;
  disputeResolutionNotes?: string;
  isRecurring?: boolean;
  recurringFrequency?: string;
  isRated?: boolean;
  reviewRating?: number;
  reviewComment?: string;
  reviewQuickTags?: string[];
  reviewedAt?: string;
  createdAt: string;
}

export interface CartItem {
  listing: Listing;
  qtyKg: number;
}

export interface PaymentSummary {
  totalEarnedEtb: number;
  pendingEscrowEtb: number;
  releasedEtb: number;
  completedOrdersCount: number;
  pendingOrdersCount: number;
  totalWithholdingTaxPaidEtb: number;
}

export type FarmerSummary = PaymentSummary;

export interface DriverSummary {
  totalEarnedEtb: number;
  pendingEtb?: number;
  deliveredTripsCount: number;
  activeTripsCount?: number;
  totalWeightDeliveredKg?: number;
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
  totalMetricTonsDelivered?: number;
  totalMetricTonsMoved?: number;
  middlemanSavingsEtb?: number;
  middlemanMarginSavedEtb?: number;
  totalVatRemittedEtb?: number;
  totalWithholdingReportedEtb?: number;
}

export interface PriceBenchmark {
  productName?: string;
  cropName?: string;
  nameAm?: string;
  cropNameAm?: string;
  marketName: string;
  minPricePerKg?: number;
  minPriceEtb?: number;
  avgPricePerKg?: number;
  avgPriceEtb?: number;
  maxPricePerKg?: number;
  maxPriceEtb?: number;
  trend: 'Up' | 'Down' | 'Stable';
  lastUpdated: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  type: string;
  channel: 'sms' | 'in_app';
  messageEn: string;
  messageAm: string;
  read: boolean;
  createdAt?: string;
  sentAt?: string;
}

export interface StandingOrder {
  id: string;
  buyerId?: string;
  buyerName?: string;
  buyerPhone?: string;
  listingId: string;
  productName: string;
  productNameAm?: string;
  farmerName: string;
  farmerRegion?: string;
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

export interface VerificationQueueItem {
  userId: string;
  userName: string;
  userNameAm?: string;
  userRole: string;
  phone: string;
  region: string;
  registrationMethod: RegistrationMethod;
  registeredByAgentName?: string;
  verificationStatus: VerificationStatus;
  rejectionReason?: string;
  tinNumber?: string;
  registeredAt: string;
  documents: UserDocument[];
  reviews: VerificationReview[];
}

export interface AgentRegisteredFarmer {
  id: string;
  name: string;
  nameAm?: string;
  phone: string;
  region: string;
  kebele?: string;
  primaryCrop?: string;
  faydaId?: string;
  tinNumber?: string;
  status: VerificationStatus;
  registeredAt: string;
  faydaFrontImageUrl?: string;
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

export interface TaxInvoice {
  invoiceNumber: string;
  issueDate?: string;
  issuedDate?: string;
  paymentRef?: string;
  fiscalReceiptNumber?: string;
  orderId: string;
  sellerName?: string;
  sellerType?: string;
  sellerTin?: string;
  sellerRegion?: string;
  sellerPhone?: string;
  supplierName?: string;
  supplierNameAm?: string;
  supplierPhone?: string;
  supplierTin?: string;
  supplierRegion?: string;
  buyerName: string;
  buyerPhone?: string;
  buyerTin: string;
  buyerRegion?: string;
  buyerAddress?: string;
  carrierName?: string;
  carrierPlateNumber?: string;
  productName: string;
  productNameAm?: string;
  category?: string;
  grade?: string;
  qtyKg: number;
  unitPriceEtb: number;
  grossAmountEtb?: number;
  goodsGrossTotalEtb?: number;
  isAgricultureTaxExempt?: boolean;
  isVatExemptAgriculturalGoods?: boolean;
  withholdingTaxRatePercent?: number;
  withholdingTaxAmountEtb?: number;
  withholdingTaxEtb?: number;
  platformServiceFeeEtb?: number;
  platformVatRatePercent?: number;
  platformVatAmountEtb?: number;
  platformVatEtb?: number;
  farmerPayoutEtb?: number;
  driverFreightEtb?: number;
  freightFeeEtb?: number;
  netPayableToFarmerEtb?: number;
  totalInvoiceAmountEtb?: number;
  totalPaidViaTelebirr?: number;
  qrVerificationCode?: string;
  paymentMethod?: string;
  morFiscalStamp?: string;
  regulatoryAct?: string;
}

export interface TransportWaybill {
  waybillNumber: string;
  orderId: string;
  issueDate?: string;
  dispatchDate?: string;
  consignorName: string;
  consignorPhone?: string;
  consignorFarmLocation?: string;
  pickupLocation?: string;
  consigneeName: string;
  consigneePhone?: string;
  consigneeDestination?: string;
  consigneeDepotAddress?: string;
  deliveryLocation?: string;
  carrierDriverName?: string;
  transporterName?: string;
  transporterPhone?: string;
  driverLicenseNumber?: string;
  vehiclePlateNumber: string;
  vehicleModel?: string;
  vehicleType?: string;
  refrigerationStatus?: string;
  temperatureLogCelsius?: number;
  cargoDescription?: string;
  packageCount?: number;
  netWeightKg?: number;
  tareWeightKg?: number;
  grossWeightKg?: number;
  farmerHandoffTimestamp?: string;
  buyerReceivedTimestamp?: string;
  productName?: string;
  cargoWeightGrossKg?: number;
  cargoWeightTareKg?: number;
  cargoWeightNetKg?: number;
  cargoTemperatureAtDispatch?: string;
  chainOfCustodyStatus?: string;
  transitInsurancePolicyNumber?: string;
  insurancePolicyNumber?: string;
  transitStatus?: string;
  driverSignatureRef?: string;
  ftaPermitNumber?: string;
}

export interface LegalContract {
  contractNumber: string;
  orderId: string;
  agreementDate?: string;
  effectiveDate?: string;
  executionDate?: string;
  governingLaw?: string;
  arbitrationVenue?: string;
  sellerName: string;
  sellerIdNumber?: string;
  sellerLocation?: string;
  sellerTin?: string;
  sellerPhone?: string;
  buyerName: string;
  buyerTinNumber?: string;
  buyerLocation?: string;
  buyerTin?: string;
  buyerPhone?: string;
  contractedQuantityKg?: number;
  cropType?: string;
  agreedPricePerKg?: number;
  productDescription?: string;
  quantityKg?: number;
  unitPriceEtb?: number;
  totalContractValueEtb: number;
  qualityStandardClause?: string;
  qualityStandardSpecification?: string;
  escrowClauseText?: string;
  paymentEscrowClause?: string;
  deliveryTimeline?: string;
  forceMajeureClauseText?: string;
  disputeJurisdiction?: string;
  disputeResolutionClause?: string;
  forceMajeureClause?: string;
  eSignatures?: {
    sellerSignDate?: string;
    sellerSigned?: boolean;
    buyerSignDate?: string;
    buyerSigned?: boolean;
    platformWitnessHash?: string;
  };
}

export interface DisputeMediationRecord {
  caseNumber: string;
  orderId: string;
  filingDate: string;
  resolutionDate?: string;
  status?: string;
  totalDisputedAmountEtb?: number;
  leadArbitratorName?: string;
  claimantBuyer?: string;
  claimedDefectPercentage?: number;
  disputeReason?: string;
  respondentFarmer?: string;
  freightCarrier?: string;
  inspectionReport?: string;
  legalFindingSummary?: string;
  arbitrationVerdict?: string;
  farmerSettlementEtb?: number;
  buyerRefundEtb?: number;
  platformDecreeHash?: string;
  photoEvidenceUrl?: string;
  complainantName?: string;
  complainantRole?: string;
  respondentName?: string;
  respondentRole?: string;
  disputeSubject?: string;
  inspectionFindingNotes?: string;
  arbitrationDetermination?: string;
  financialRemedyDescription?: string;
  arbitratorName?: string;
  bindingEnforcementSeal?: string;
}

// ==================== SUPER ADMIN GOVERNANCE INTERFACES ====================

export interface AdminPermission {
  id: string;
  name: string;
  category: 'User Management' | 'Financials' | 'Moderation' | 'Configuration' | 'Emergency';
  description: string;
}

export interface PlatformConfig {
  farmerSharePercent: number;        // Default: 90
  driverSharePercent: number;        // Default: 5
  platformFeePercent: number;        // Default: 5
  withholdingTaxPercent: number;     // Default: 2
  vatOnCommissionPercent: number;    // Default: 15
  highValuePayoutThresholdEtb: number; // Default: 50,000
  emergencyEscrowFrozen: boolean;
  telebirrAppId: string;
  telebirrShortCode: string;
  telebirrApiKey: string;
  telebirrEscrowVaultKey: string;
  twilioAccountSid: string;
  twilioAuthToken: string;
  twilioFromNumber: string;
  mapsGeocodingApiKey: string;
  postgisSpatialIndexEnabled: boolean;
}

export interface SystemAuditLog {
  id: string;
  actorId: string;
  actorName: string;
  actorRole: UserRole | string;
  action: string;
  category: 'AUTH' | 'USER_CRUD' | 'FINANCE' | 'CONFIG' | 'DISPUTE' | 'EMERGENCY' | 'IMPERSONATION';
  targetResource: string;
  targetId?: string;
  ipAddress: string;
  userAgent: string;
  details: string;
  preState?: any;
  postState?: any;
  timestamp: string;
}

export interface DeliveryZoneConfig {
  id: string;
  name: string;
  nameAm?: string;
  centerLatitude: number;
  centerLongitude: number;
  baseRadiusKm: number;
  maxRadiusKm: number;
  ruralSubsidyEtb: number;
  active: boolean;
  clusterHubName: string;
  smallholdersCount: number;
}

export interface FeatureFlag {
  key: string;
  name: string;
  description: string;
  enabled: boolean;
  rolloutPercentage: number;
  targetRegions: string[];
  targetRoles: UserRole[];
}

export interface PayoutApprovalItem {
  id: string;
  recipientId: string;
  recipientName: string;
  recipientPhone: string;
  recipientRole: UserRole;
  amountEtb: number;
  walletBalanceBefore: number;
  riskScore: 'Low' | 'Medium' | 'High';
  triggerReason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  requestedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface GlobalBusinessRules {
  minOrderKg: number;
  maxOrderKg: number;
  maxDistanceKm: number;
  priceFloorVariancePercent: number;   // -30%
  priceCeilingVariancePercent: number; // +250%
  requireFaydaForOrdersAboveKg: number; // 500 kg
  autoArbitrateAfterHours: number;      // 48 hours
}

export interface BlacklistEntry {
  id: string;
  type: 'Phone' | 'NationalId' | 'IpAddress' | 'TinNumber';
  value: string;
  reason: string;
  blacklistedBy: string;
  blacklistedAt: string;
  active: boolean;
}

export interface CreateUserDto {
  name: string;
  nameAm?: string;
  phone: string;
  role: UserRole;
  region: string;
  verified?: boolean;
  status?: 'active' | 'suspended';
  tinNumber?: string;
  businessLicenseNumber?: string;
  vehicleType?: string;
  refrigerationType?: string;
  vehicleCapacityKg?: number;
  primaryCrop?: string;
  kebele?: string;
  faydaId?: string;
  permissions?: string[];
}

export interface Banner {
  id: string;
  title: string;
  titleAm?: string;
  subtitle?: string;
  subtitleAm?: string;
  badgeText?: string;
  badgeTextAm?: string;
  imageUrl?: string;
  targetAudience: 'All' | 'Buyer' | 'Farmer' | 'Driver' | 'Agent';
  targetRegion: string;
  ctaText?: string;
  ctaTextAm?: string;
  ctaLink?: string;
  themeGradient?: string;
  priority: number;
  isActive: boolean;
  createdAt: string;
  createdBy: string;
}

export type CreateBannerDto = Omit<Banner, 'id' | 'createdAt' | 'createdBy'>;

export interface UpdateListingDto {
  productName?: string;
  nameAm?: string;
  description?: string;
  descriptionAm?: string;
  category?: string;
  qtyKg?: number;
  pricePerKg?: number;
  minOrderKg?: number;
  region?: string;
  grade?: string;
  ripeness?: string;
  isOrganic?: boolean;
  isAdvanceHarvest?: boolean;
  moderationStatus?: 'Approved' | 'PendingReview' | 'Flagged';
}

export type PermissionKey =
  // Governance & Root (Super Admin Exclusive by default)
  | 'MANAGE_USERS'
  | 'MANAGE_RBAC_PERMISSIONS'
  | 'MANAGE_PLATFORM_CONFIG'
  | 'EMERGENCY_ESCROW_FREEZE'
  | 'APPROVE_HIGH_VALUE_PAYOUTS'
  | 'IMPERSONATE_USERS'
  | 'VIEW_AUDIT_LOGS'
  | 'MANAGE_TRADE_ZONES'
  | 'MANAGE_BLACKLIST'
  // Operational Moderation (Admin & Super Admin)
  | 'MODERATE_LISTINGS'
  | 'MANAGE_BANNERS'
  | 'RESOLVE_DISPUTES'
  | 'VERIFY_KYC'
  | 'BROADCAST_SMS'
  | 'VIEW_ANOMALY_ALERTS'
  | 'VIEW_TAX_COMPLIANCE'
  | 'VIEW_REGIONAL_ANALYTICS'
  // Field Extension Operations (Agent & Admin)
  | 'FIELD_AGENT_ONBOARDING'
  | 'EXECUTE_USSD'
  // Farmer Operations
  | 'PUBLISH_PRODUCE'
  | 'MANAGE_FARM_ORDERS'
  | 'REQUEST_WALLET_WITHDRAWAL'
  // Driver Operations
  | 'VIEW_DELIVERY_ROUTES'
  | 'SUBMIT_DELIVERY_PROOF'
  | 'OFFLINE_TRIP_SYNC'
  // Buyer Operations
  | 'PLACE_ORDERS'
  | 'TELEBIRR_CHECKOUT'
  | 'CREATE_STANDING_ORDERS'
  | 'FILE_DISPUTES';

export interface PermissionDefinition {
  key: PermissionKey;
  label: string;
  labelAm: string;
  category: 'Governance & Root' | 'Operational Moderation' | 'Field & Logistics' | 'Marketplace & Trade';
  description: string;
}

export type RolePermissionsMap = Record<UserRole, Record<PermissionKey, boolean>>;



