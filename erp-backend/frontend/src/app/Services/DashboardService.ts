import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Order} from '../../models/order.model';
import {Conveyor} from '../../models/conveyor.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private url = 'http://localhost:8083';

  constructor(private http: HttpClient) {
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.url}/orders`);
  }

  createOrder(order: Partial<Order>): Observable<Order> {
    return this.http.post<Order>(`${this.url}/orders`, order);
  }

  updateOrder(id: number, order: Partial<Order>): Observable<Order> {
    return this.http.put<Order>(`${this.url}/orders/${id}`, order);

  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/orders/${id}`);
  }

  getConveyors(): Observable<Conveyor[]> {
    return this.http.get<Conveyor[]>(`${this.url}/conveyors`);

  }
}
