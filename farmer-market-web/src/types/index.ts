export type UserRole = 'farmer' | 'buyer' | 'driver' | 'admin';
export type OrderStatus = 'pending' | 'confirmed' | 'picked_up' | 'delivered' | 'disputed' | 'cancelled';
export type ListingStatus = 'active' | 'sold_out' | 'expired';

export interface User {
  id: string;
  phone: string;
  name: string;
  nameAm?: string;
  role: UserRole;
  region: string;
  verified: boolean;
  vehicleType?: string;
  refrigerationType?: string;
  vehicleCapacityKg?: number;
  kycDocumentType?: string;
  kycDocumentNumber?: string;
  kycStatus?: 'Verified' | 'Pending' | 'Rejected';
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
  status: OrderStatus;
  escrowHeld: boolean;
  paymentRef?: string;
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
