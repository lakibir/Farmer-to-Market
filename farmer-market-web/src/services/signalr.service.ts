import * as signalR from '@microsoft/signalr';
import { OrderStatus } from '../types';

export class SignalRService {
  private hubConnection: signalR.HubConnection | null = null;
  private isConnected = false;
  private statusListeners: Array<(orderId: string, status: OrderStatus, message?: string) => void> = [];

  public startConnection(token?: string) {
    if (this.hubConnection) return;

    try {
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl('/hubs/orders', {
          accessTokenFactory: () => token || localStorage.getItem('token') || ''
        })
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Warning)
        .build();

      this.hubConnection.on('OrderStatusChanged', (data: { orderId: string; status: string; message?: string }) => {
        this.statusListeners.forEach(listener => listener(data.orderId, data.status as OrderStatus, data.message));
      });

      this.hubConnection.start()
        .then(() => {
          this.isConnected = true;
          console.log('SignalR connected to OrderHub');
        })
        .catch(err => {
          console.log('SignalR hub connection fallback active (sandbox mode)', err);
        });
    } catch {
      console.log('SignalR running in local simulated mode');
    }
  }

  public joinOrder(orderId: string) {
    if (this.hubConnection && this.isConnected) {
      this.hubConnection.invoke('JoinOrder', orderId).catch(console.error);
    }
  }

  public onOrderStatusChanged(callback: (orderId: string, status: OrderStatus, message?: string) => void) {
    this.statusListeners.push(callback);
    return () => {
      this.statusListeners = this.statusListeners.filter(l => l !== callback);
    };
  }

  public simulateLiveStatusChange(orderId: string, status: OrderStatus, message?: string) {
    this.statusListeners.forEach(listener => listener(orderId, status, message));
  }
}

export const signalRService = new SignalRService();
