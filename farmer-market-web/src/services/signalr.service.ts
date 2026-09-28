import * as signalR from '@microsoft/signalr';
import { OrderStatus } from '../types';

export interface OrderTrackingEvent {
  orderId: string;
  status: OrderStatus;
  message?: string;
  driverName?: string;
  driverPhone?: string;
  estimatedArrivalMin?: number;
  gpsLat?: number;
  gpsLng?: number;
  timestamp: string;
}

export class SignalRService {
  private hubConnection: signalR.HubConnection | null = null;
  private isConnected = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 10;

  // Listeners
  private statusListeners: Array<(orderId: string, status: OrderStatus, message?: string) => void> = [];
  private trackingListeners: Array<(event: OrderTrackingEvent) => void> = [];
  private farmerOrderListeners: Array<(orderId: string, productName: string, qtyKg: number) => void> = [];
  private deliveryConfirmedListeners: Array<(orderId: string, farmerCut: number, driverCut: number) => void> = [];

  // Polling fallback
  private pollingIntervals: Map<string, ReturnType<typeof setInterval>> = new Map();
  private pollingCallback: ((orderId: string) => Promise<void>) | null = null;

  public startConnection(token?: string) {
    if (this.hubConnection) return;

    try {
      const rawBase = (import.meta as any).env?.VITE_API_BASE_URL;
      const base = (rawBase || ((import.meta as any).env?.PROD ? 'https://farmer-to-market-2.onrender.com' : '')).replace(/\/$/, '');
      const hubUrl = base ? `${base}/hubs/orders` : '/hubs/orders';
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(hubUrl, {
          accessTokenFactory: () => token || localStorage.getItem('token') || ''
        })
        .withAutomaticReconnect({
          nextRetryDelayInMilliseconds: (retryContext) => {
            // Exponential backoff: 1s, 2s, 4s, 8s, 16s, max 30s
            const delay = Math.min(1000 * Math.pow(2, retryContext.previousRetryCount), 30000);
            return delay;
          }
        })
        .configureLogging(signalR.LogLevel.Warning)
        .build();

      // ── Event Handlers ──────────────────────────────────────────────

      this.hubConnection.on('OrderStatusChanged', (data: {
        orderId: string; status: string; message?: string
      }) => {
        const event: OrderTrackingEvent = {
          orderId: data.orderId,
          status: data.status as OrderStatus,
          message: data.message,
          timestamp: new Date().toISOString()
        };
        this.statusListeners.forEach(l => l(data.orderId, data.status as OrderStatus, data.message));
        this.trackingListeners.forEach(l => l(event));
      });

      this.hubConnection.on('NewOrderForFarmer', (data: {
        orderId: string; productName: string; qtyKg: number
      }) => {
        this.farmerOrderListeners.forEach(l => l(data.orderId, data.productName, data.qtyKg));
      });

      this.hubConnection.on('DeliveryConfirmed', (data: {
        orderId: string; farmerCut: number; driverCut: number
      }) => {
        this.deliveryConfirmedListeners.forEach(l => l(data.orderId, data.farmerCut, data.driverCut));
      });

      this.hubConnection.on('DriverLocationUpdate', (data: {
        orderId: string; lat: number; lng: number; estimatedMinutes: number
      }) => {
        const event: OrderTrackingEvent = {
          orderId: data.orderId,
          status: 'PickedUp' as OrderStatus,
          message: `Driver is ${data.estimatedMinutes} minutes away`,
          gpsLat: data.lat,
          gpsLng: data.lng,
          estimatedArrivalMin: data.estimatedMinutes,
          timestamp: new Date().toISOString()
        };
        this.trackingListeners.forEach(l => l(event));
      });

      // ── Connection Lifecycle ────────────────────────────────────────

      this.hubConnection.onreconnecting(() => {
        this.isConnected = false;
        this.reconnectAttempts++;
        console.log(`SignalR reconnecting (attempt ${this.reconnectAttempts})...`);
      });

      this.hubConnection.onreconnected(() => {
        this.isConnected = true;
        this.reconnectAttempts = 0;
        console.log('SignalR reconnected successfully');
        // Stop any active polling fallbacks since we're back online
        this.stopAllPolling();
      });

      this.hubConnection.onclose(() => {
        this.isConnected = false;
        console.log('SignalR connection closed. Activating polling fallback.');
        this.activatePollingFallback();
      });

      this.hubConnection.start()
        .then(() => {
          this.isConnected = true;
          this.reconnectAttempts = 0;
          console.log('SignalR connected to OrderHub');
        })
        .catch(err => {
          console.log('SignalR hub connection failed — using polling fallback', err);
          this.activatePollingFallback();
        });
    } catch {
      console.log('SignalR unavailable — running in polling mode');
      this.activatePollingFallback();
    }
  }

  public stopConnection() {
    this.stopAllPolling();
    if (this.hubConnection) {
      this.hubConnection.stop();
      this.hubConnection = null;
      this.isConnected = false;
    }
  }

  // ── Group Management ──────────────────────────────────────────────

  public joinOrder(orderId: string) {
    if (this.hubConnection && this.isConnected) {
      this.hubConnection.invoke('JoinOrder', orderId).catch(console.error);
    }
  }

  public leaveOrder(orderId: string) {
    if (this.hubConnection && this.isConnected) {
      this.hubConnection.invoke('LeaveOrder', orderId).catch(console.error);
    }
    this.stopPollingForOrder(orderId);
  }

  // ── Subscribe to Events ───────────────────────────────────────────

  public onOrderStatusChanged(callback: (orderId: string, status: OrderStatus, message?: string) => void) {
    this.statusListeners.push(callback);
    return () => { this.statusListeners = this.statusListeners.filter(l => l !== callback); };
  }

  public onOrderTracking(callback: (event: OrderTrackingEvent) => void) {
    this.trackingListeners.push(callback);
    return () => { this.trackingListeners = this.trackingListeners.filter(l => l !== callback); };
  }

  public onNewFarmerOrder(callback: (orderId: string, productName: string, qtyKg: number) => void) {
    this.farmerOrderListeners.push(callback);
    return () => { this.farmerOrderListeners = this.farmerOrderListeners.filter(l => l !== callback); };
  }

  public onDeliveryConfirmed(callback: (orderId: string, farmerCut: number, driverCut: number) => void) {
    this.deliveryConfirmedListeners.push(callback);
    return () => { this.deliveryConfirmedListeners = this.deliveryConfirmedListeners.filter(l => l !== callback); };
  }

  // ── Simulation (for local dev/sandbox) ────────────────────────────

  public simulateLiveStatusChange(orderId: string, status: OrderStatus, message?: string) {
    this.statusListeners.forEach(listener => listener(orderId, status, message));
    this.trackingListeners.forEach(l => l({
      orderId, status, message,
      timestamp: new Date().toISOString()
    }));
  }

  // ── Polling Fallback ──────────────────────────────────────────────
  // When SignalR is unavailable (no WebSocket support, network issues),
  // fall back to polling the REST API every 15 seconds.

  public setPollingCallback(callback: (orderId: string) => Promise<void>) {
    this.pollingCallback = callback;
  }

  public startPollingForOrder(orderId: string, intervalMs: number = 15000) {
    if (this.pollingIntervals.has(orderId)) return; // Already polling

    const interval = setInterval(async () => {
      if (this.pollingCallback) {
        await this.pollingCallback(orderId);
      }
    }, intervalMs);

    this.pollingIntervals.set(orderId, interval);
  }

  private stopPollingForOrder(orderId: string) {
    const interval = this.pollingIntervals.get(orderId);
    if (interval) {
      clearInterval(interval);
      this.pollingIntervals.delete(orderId);
    }
  }

  private stopAllPolling() {
    this.pollingIntervals.forEach(interval => clearInterval(interval));
    this.pollingIntervals.clear();
  }

  private activatePollingFallback() {
    // If there are tracked orders, start polling for them
    // This will be populated by the app when orders are in active states
  }

  // ── Status Helpers ────────────────────────────────────────────────

  public getConnectionState(): 'connected' | 'reconnecting' | 'disconnected' | 'polling' {
    if (this.isConnected) return 'connected';
    if (this.reconnectAttempts > 0 && this.reconnectAttempts < this.maxReconnectAttempts) return 'reconnecting';
    if (this.pollingIntervals.size > 0) return 'polling';
    return 'disconnected';
  }
}

export const signalRService = new SignalRService();
