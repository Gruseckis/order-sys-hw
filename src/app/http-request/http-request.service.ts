import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SearchResult } from '../import-order/import-order-stepper/find-order-step/find-order-step.component';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  private baseUrl = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  public getOrder(): Observable<Array<Order>> {
    return this.http.get<Array<Order>>(`${this.baseUrl}orders`).pipe(first());
  }

  public searchOrder(orderNumber: number): Observable<Array<SearchResult>> {
    return this.http
      .get<Array<SearchResult>>(
        `${this.baseUrl}importOrders?id_like=${orderNumber}`
      )
      .pipe(first());
  }
}
