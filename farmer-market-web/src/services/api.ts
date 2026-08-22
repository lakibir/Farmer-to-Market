import { Listing, Order, User, PlatformStats, PaymentSummary, DriverSummary, UserRole, OrderStatus, NotificationItem } from '../types';
import { signalRService } from './signalr.service';

class ApiService {
  private token: string | null = localStorage.getItem('token') || null;
  private currentUser: User | null = this.loadStoredUser();
  private isUserLoggedIn: boolean = !!this.token && !!this.currentUser;
  private listeners: Array<() => void> = [];

  // Synced state from PostgreSQL
  private listings: Listing[] = [];
  private orders: Order[] = [];
  private notifications: NotificationItem[] = [];
  private farmerSummary: PaymentSummary = {
    totalEarnedEtb: 0,
    pendingEscrowEtb: 0,
    releasedEtb: 0,
    completedOrdersCount: 0,
    pendingOrdersCount: 0
  };
  private driverSummary: DriverSummary = {
    totalEarnedEtb: 0,
    pendingEtb: 0,
    deliveredTripsCount: 0
  };
  private platformStats: PlatformStats = {
    totalUsers: 0,
    totalFarmers: 0,
    totalBuyers: 0,
    totalDrivers: 0,
    totalListings: 0,
    totalOrders: 0,
    totalTransactionVolumeEtb: 0,
    totalPlatformCommissionEtb: 0,
    activeEscrowHeldEtb: 0,
    disputedOrdersCount: 0
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
    if (this.token) {
      await this.fetchMe();
    }
    await this.refreshAllData();
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
      const res = await fetch('/api/auth/me', {
        headers: this.getAuthHeaders()
      });
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

  public async fetchDemoUsers(): Promise<Array<{ phone: string; name: string; nameAm?: string; role: string; region: string }>> {
    try {
      const res = await fetch('/api/auth/demo-users');
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn('Could not fetch demo users', err);
    }
    return [
      { phone: '+251911223344', name: 'Abebe Bekele', nameAm: 'አበበ በቀለ', role: 'Farmer', region: 'Oromia (Bishoftu)' },
      { phone: '+251955667788', name: 'Bethlehem Tilahun', nameAm: 'ቤተልሔም ጥላሁን', role: 'Buyer', region: 'Addis Ababa (Bole)' },
      { phone: '+251977889900', name: 'Dawit Kebede', nameAm: 'ዳዊት ከበደ', role: 'Driver', region: 'Addis Ababa (Kaliti)' },
      { phone: '+251900112233', name: 'Sara Mengistu', nameAm: 'ሳራ መንግስቱ', role: 'Admin', region: 'Addis Ababa' }
    ];
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

  public async fetchListings(category?: string, region?: string, search?: string): Promise<Listing[]> {
    try {
      const params = new URLSearchParams();
      if (category && category !== 'All') params.append('category', category);
      if (region && region !== 'All') params.append('region', region);
      if (search) params.append('search', search);

      const res = await fetch(`/api/listings?${params.toString()}`);
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
          farmerRating: l.farmerRating || 5.0,
          reviewCount: l.reviewCount || 0,
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

  public getListings(category?: string, region?: string, search?: string, maxPrice?: number): Listing[] {
    return this.listings.filter(l => {
      if (l.status !== 'active') return false;
      if (category && category !== 'All' && l.category.toLowerCase() !== category.toLowerCase()) return false;
      if (region && region !== 'All' && !l.region.toLowerCase().includes(region.toLowerCase())) return false;
      if (maxPrice && l.pricePerKg > maxPrice) return false;
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

  public async createListing(data: Omit<Listing, 'id' | 'farmerId' | 'farmerName' | 'farmerPhone' | 'status' | 'farmerRating' | 'reviewCount' | 'createdAt'>): Promise<Listing> {
    const payload = {
      productName: data.productName,
      nameAm: data.nameAm || null,
      category: data.category,
      qtyKg: data.qtyKg,
      pricePerKg: data.pricePerKg,
      minOrderKg: data.minOrderKg,
      latitude: data.latitude,
      longitude: data.longitude,
      photos: data.photos,
      availableFrom: data.availableFrom || new Date().toISOString().split('T')[0]
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
      farmerName: created.farmerName || this.currentUser?.name || 'Farmer',
      farmerNameAm: created.farmerNameAm || this.currentUser?.nameAm,
      farmerPhone: created.farmerPhone || this.currentUser?.phone || '',
      region: created.region || this.currentUser?.region || 'Addis Ababa',
      productName: created.productName,
      nameAm: created.nameAm,
      category: created.category,
      qtyKg: Number(created.qtyKg),
      pricePerKg: Number(created.pricePerKg),
      minOrderKg: Number(created.minOrderKg),
      latitude: created.latitude,
      longitude: created.longitude,
      distanceKm: created.distanceKm,
      photos: created.photos && created.photos.length > 0 ? created.photos : data.photos,
      availableFrom: created.availableFrom,
      status: 'active',
      farmerRating: 5.0,
      reviewCount: 0,
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
      const res = await fetch('/api/orders', {
        headers: this.getAuthHeaders()
      });
      if (res.ok) {
        const items = await res.json();
        this.orders = items.map((o: any) => ({
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
          totalEtb: Number(o.totalEtb),
          farmerCut: Number(o.farmerCut),
          driverCut: Number(o.driverCut),
          platformCut: Number(o.platformCut),
          status: (o.status || 'Pending').toLowerCase() as OrderStatus,
          escrowHeld: o.escrowHeld,
          paymentRef: o.paymentRef,
          pickupPhoto: o.pickupPhoto,
          deliveryAddress: o.deliveryAddress,
          deliveryNotes: o.deliveryNotes,
          confirmedAt: o.confirmedAt,
          createdAt: o.createdAt
        }));
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

  public async placeOrder(listingId: string, qtyKg: number, deliveryAddress?: string): Promise<Order> {
    const listing = this.listings.find(l => l.id === listingId);
    if (!listing) throw new Error("Listing not found");

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({
        listingId,
        qtyKg,
        deliveryAddress: deliveryAddress || this.currentUser?.region || 'Addis Ababa'
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
    await fetch(`/api/orders/${orderId}/pickup`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ pickupPhoto: photo || null })
    });
    await this.fetchOrders();
  }

  public async confirmDeliveryByBuyer(orderId: string) {
    await fetch(`/api/orders/${orderId}/deliver`, {
      method: 'PUT',
      headers: this.getAuthHeaders()
    });
    await this.fetchOrders();
  }

  public async disputeOrder(orderId: string, reason: string) {
    await fetch(`/api/orders/${orderId}/dispute`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ reason })
    });
    await this.fetchOrders();
  }

  public async resolveDispute(orderId: string, resolution: 'ReleaseToFarmer' | 'RefundBuyer') {
    await fetch(`/api/admin/orders/${orderId}/resolve-dispute`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ resolution, notes: 'Resolved by Admin Portal' })
    });
    await this.fetchOrders();
  }

  // ==================== SUMMARIES & STATS ====================

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
            pendingOrdersCount: data.pendingOrdersCount
          };
        }
      } else if (this.currentUser.role === 'driver') {
        const res = await fetch('/api/payments/driver-summary', { headers: this.getAuthHeaders() });
        if (res.ok) {
          const data = await res.json();
          this.driverSummary = {
            totalEarnedEtb: Number(data.totalEarnedEtb),
            pendingEtb: Number(data.pendingEtb),
            deliveredTripsCount: data.deliveredTripsCount
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
            disputedOrdersCount: data.disputedOrdersCount
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
      totalEarnedEtb: totalEarned || this.farmerSummary.totalEarnedEtb,
      pendingEscrowEtb: pendingEscrow || this.farmerSummary.pendingEscrowEtb,
      releasedEtb: totalEarned || this.farmerSummary.releasedEtb,
      completedOrdersCount: farmerOrders.filter(o => o.status === 'delivered').length || this.farmerSummary.completedOrdersCount,
      pendingOrdersCount: farmerOrders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').length || this.farmerSummary.pendingOrdersCount
    };
  }

  public getDriverSummary(): DriverSummary {
    const driverOrders = this.orders.filter(o => o.driverId === this.currentUser?.id);
    const totalEarned = driverOrders.filter(o => o.status === 'delivered').reduce((s, o) => s + o.driverCut, 0);
    const pending = driverOrders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').reduce((s, o) => s + o.driverCut, 0);

    return {
      totalEarnedEtb: totalEarned || this.driverSummary.totalEarnedEtb,
      pendingEtb: pending || this.driverSummary.pendingEtb,
      deliveredTripsCount: driverOrders.filter(o => o.status === 'delivered').length || this.driverSummary.deliveredTripsCount
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
      disputedOrdersCount: disputed || this.platformStats.disputedOrdersCount
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
        body: JSON.stringify({
          messageEn: msgEn,
          messageAm: msgAm,
          targetRole
        })
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
