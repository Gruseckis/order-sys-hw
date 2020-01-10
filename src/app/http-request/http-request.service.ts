import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  constructor(private http: HttpClient) {}

  public getOrder(): Observable<Array<Order>> {
    return this.http
      .get<Array<Order>>('http://localhost:3000/orders')
      .pipe(first());
  }
}
