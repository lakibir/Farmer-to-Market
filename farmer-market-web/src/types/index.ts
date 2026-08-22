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
  farmerRating: number;
  reviewCount: number;
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
  status: OrderStatus;
  escrowHeld: boolean;
  paymentRef?: string;
  pickupPhoto?: string;
  deliveryAddress?: string;
  deliveryNotes?: string;
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
