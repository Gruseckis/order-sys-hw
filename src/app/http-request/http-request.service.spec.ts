/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpRequestService } from './http-request.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { getOrderMock } from '../order-list/order.mocks.spec';
import { first } from 'rxjs/operators';

const baseUrl = 'http://localhost:3000/';

describe('Service: HttpRequest', () => {
  let service: HttpRequestService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    http = TestBed.get(HttpClient);
    service = new HttpRequestService(http);
  });

  it('should get order', () => {
    spyOn(http, 'get').and.returnValue(of([]));
    service.getOrder();
    expect(http.get).toHaveBeenCalledWith(`${baseUrl}inbox`);
  });

  it('should get orders when searched and reset', () => {
    spyOn(http, 'get').and.returnValue(of([getOrderMock()]));
    const orderNumber = '1234';

    service.importOrderSearch(orderNumber);
    expect(http.get).toHaveBeenCalledWith(
      `${baseUrl}importOrders?id_like=${orderNumber}`
    );
    service.importOrderSearch$
    .pipe(first()).subscribe(result => {
      expect(result).toEqual([getOrderMock()]);
    });
    service.reset();
    service.importOrderSearch$
    .pipe(first()).subscribe(result => {
      expect(result).toEqual([]);
    });
  });

  it('should addOrderTo and return it', () => {
    spyOn(http, 'get').and.returnValue(of({currentOrderNumber: 1}));
    spyOn(http, 'put').and.returnValue(of({}));
    spyOn(http, 'post').and.returnValue(of(getOrderMock()));
    service.addOrderToInbox(getOrderMock())
    .pipe(first()).subscribe(result => {
      expect(result).toEqual(getOrderMock());
    });
    expect(http.get).toHaveBeenCalledWith(`${baseUrl}inboxInfo`);
    expect(http.put).toHaveBeenCalled();
    expect(http.post).toHaveBeenCalled();
  });
});
