import { TestBed } from '@angular/core/testing';
import { OrderListComponent } from './order-list.component';
import { HttpRequestService } from '../http-request/http-request.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ImportOrderServiceService } from '../import-order/import-order-service/import-order-service.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { getOrderMock } from './order.mocks.spec';
import { getMockDialogRef } from '../utils/helper.spec';
import { ImportOrderDialogComponent } from '../import-order/import-order-dialog/import-order-dialog.component';
import { getImportStateMock } from '../import-order/import-order.mock.spec';

describe('OrderListComponent', () => {
  let component: OrderListComponent;
  let httpService: HttpRequestService;
  let importOrderService: ImportOrderServiceService;
  let dialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule]
    });
    httpService = TestBed.get(HttpRequestService);
    importOrderService = TestBed.get(ImportOrderServiceService);
    dialog = TestBed.get(MatDialog);
    component = new OrderListComponent(httpService, importOrderService, dialog);
  });

  it('should call service and assign value for table on Init', () => {
    expect(component.orders.length).toBe(0);
    spyOn(httpService, 'getOrder').and.returnValue(of([getOrderMock()]));
    component.ngOnInit();
    expect(httpService.getOrder).toHaveBeenCalled();
    expect(component.orders.length).toBe(1);
  });

  it('should open dialog on Import button click and call service on close', () => {
    spyOn(dialog, 'open').and.returnValue(getMockDialogRef());
    component.onImportOrder();
    expect(dialog.open).toHaveBeenCalledWith(ImportOrderDialogComponent, {
      width: '80vw', disableClose: true
    });
  });

  it('should save record when dialog is closed', () => {
    spyOn(dialog, 'open').and.returnValue(getMockDialogRef({
      afterClosed: jasmine.createSpy().and.returnValue(of(getImportStateMock()))
    }));
    spyOn(httpService, 'reset');
    spyOn(importOrderService, 'reset');
    spyOn(httpService, 'addOrderToInbox').and.returnValue(of(getOrderMock()));
    component.onImportOrder();
    expect(httpService.reset).toHaveBeenCalled();
    expect(importOrderService.reset).toHaveBeenCalled();
    expect(httpService.addOrderToInbox).toHaveBeenCalled();
    expect(component.orders).toEqual([getOrderMock()]);
  });
});
