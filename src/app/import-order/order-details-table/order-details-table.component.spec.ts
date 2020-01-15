import { TestBed } from '@angular/core/testing';
import { OrderDetailsTableComponent } from './order-details-table.component';
import { ImportOrderServiceService } from '../import-order-service/import-order-service.service';
import { getOrderMock } from 'src/app/order-list/order.mocks.spec';
import { ImportStatus } from 'src/app/models/order';
import { MatRadioChange } from '@angular/material';

describe('OrderDetailsTableComponent', () => {
  let component: OrderDetailsTableComponent;
  let importOrderService: ImportOrderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    importOrderService = TestBed.get(ImportOrderServiceService);
    component = new OrderDetailsTableComponent(importOrderService);
  });

  afterAll(() => {
    component.ngOnDestroy();
  });

  it('should create table with selected product', () => {
    component.ngOnInit();
    importOrderService.selectImportedOrder(getOrderMock());
    expect(component.importStatus).toBe(ImportStatus.OrderSelection);
    expect(component.dataSource.data).toEqual(getOrderMock().products);
    importOrderService.changeImportStatus(ImportStatus.ProductPreparation);
    importOrderService.selectImportedProduct(getOrderMock().products[1]);
    expect(component.dataSource.data).toEqual([getOrderMock().products[1]]);
  });

  it('should select onSelect on correct status', () => {
    spyOn(importOrderService, 'selectImportedProduct');
    component.importStatus = ImportStatus.ProductPreparation;
    component.onSelect(getOrderMock().products[1]);
    expect(importOrderService.selectImportedProduct).not.toHaveBeenCalled();
    component.importStatus = ImportStatus.OrderSelection;
    component.onSelect(getOrderMock().products[1]);
    expect(importOrderService.selectImportedProduct).toHaveBeenCalledWith(getOrderMock().products[1]);
  });

  it('should add product variation', () => {
    const option = new MatRadioChange(null, 'hello');
    spyOn(importOrderService, 'selectProductVariant');
    component.onVariantSelect(option, getOrderMock().products[1]);
    expect(importOrderService.selectProductVariant).toHaveBeenCalled();
  });
});
