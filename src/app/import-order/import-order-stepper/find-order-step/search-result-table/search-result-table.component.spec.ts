import { TestBed } from '@angular/core/testing';
import { SearchResultTableComponent } from './search-result-table.component';
import { ImportOrderServiceService } from 'src/app/import-order/import-order-service/import-order-service.service';
import { HttpRequestService } from 'src/app/http-request/http-request.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { getOrderMock } from 'src/app/order-list/order.mocks.spec';

const httpClientStub = {
  get() {
    return of([getOrderMock()]);
  }
};

describe('SearchResultTableComponent', () => {
  let component: SearchResultTableComponent;
  let importOrderService: ImportOrderServiceService;
  let httpService: HttpRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{
        provide: HttpClient,
        useValue: httpClientStub
      }]
    });
    importOrderService = TestBed.get(ImportOrderServiceService);
    httpService = TestBed.get(HttpRequestService);
    component = new SearchResultTableComponent(importOrderService, httpService);
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should subscribe and set table value when search is done', () => {
    component.ngOnInit();
    httpService.importOrderSearch('123');
    expect(component.dataSource.data).toEqual([getOrderMock()]);
  });

  it('should select order on row click', () => {
    spyOn(importOrderService, 'selectImportedOrder');
    component.onRowClick(getOrderMock());
    expect(importOrderService.selectImportedOrder).toHaveBeenCalledWith(getOrderMock());
  });
});
