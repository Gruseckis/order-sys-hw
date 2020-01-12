import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order, SearchResult } from '../models/order';
import { first } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  private baseUrl = 'http://localhost:3000/';
  private _importOrderSearch$ = new BehaviorSubject<Array<SearchResult>>([]);

  public readonly importOrderSearch$ = this._importOrderSearch$.asObservable();

  constructor(private http: HttpClient) {}

  private setImportOrderSearc(results: Array<SearchResult>) {
    this._importOrderSearch$.next(results);
  }

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

  public reset() {
    this.setImportOrderSearc([]);
  }

  public importOrderSearch(orderNumber: number) {
    this.http
      .get<Array<SearchResult>>(
        `${this.baseUrl}importOrders?id_like=${orderNumber}`
      )
      .pipe(first())
      .subscribe(result => {
        this.setImportOrderSearc(result);
      });
  }
}
