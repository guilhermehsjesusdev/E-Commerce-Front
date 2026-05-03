import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Order } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private apiUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  getMyOrders() {
    return this.http.get<Order[]>(this.apiUrl);
  }

  create(items: { productId: string; quantity: number }[]) {
    return this.http.post<{ id: string }>(this.apiUrl, { items });
  }

  updateStatus(id: string, newStatus: number) {
    return this.http.patch(`${this.apiUrl}/${id}/status`, { orderId: id, newStatus });
  }
}