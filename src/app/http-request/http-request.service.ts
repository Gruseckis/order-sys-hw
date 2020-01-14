import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { first } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  private baseUrl = 'http://localhost:3000/';
  private _importOrderSearch$ = new BehaviorSubject<Array<Order>>([]);

  public readonly importOrderSearch$ = this._importOrderSearch$.asObservable();

  constructor(private http: HttpClient) {}

  private setImportOrderSearch(results: Array<Order>) {
    this._importOrderSearch$.next(results);
  }

  public getOrder(): Observable<Array<Order>> {
    return this.http.get<Array<Order>>(`${this.baseUrl}inbox`).pipe(first());
  }

  public searchOrder(orderNumber: number): Observable<Array<Order>> {
    return this.http
      .get<Array<Order>>(
        `${this.baseUrl}importOrders?id_like=${orderNumber}`
      )
      .pipe(first());
  }

  public reset() {
    this.setImportOrderSearch([]);
  }

  public importOrderSearch(orderNumber: number | string) {
    this.http
      .get<Array<Order>>(
        `${this.baseUrl}importOrders?id_like=${orderNumber}`
      )
      .pipe(first())
      .subscribe(result => {
        this.setImportOrderSearch(result);
      });
  }

  public addOrderToInbox(order: Order) {
    this.http.post(`${this.baseUrl}inbox`, order, { headers: {
      'Content-Type': 'application/json'
    }}).pipe(first()).subscribe(res => { console.log(res); } );
  }

  public getOrderNumber() {
    return this.http.get(`${this.baseUrl}inboxInfo`).pipe(first());
  }
}
