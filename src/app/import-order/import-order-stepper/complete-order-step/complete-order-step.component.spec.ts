
import { TestBed } from '@angular/core/testing';
import { CompleteOrderStepComponent } from './complete-order-step.component';
import { ImportOrderServiceService } from '../../import-order-service/import-order-service.service';
import { productVariants } from '../../../utils/consts';
import { getOrderMock } from '../../../order-list/order.mocks.spec';

describe('SearchResultTableComponent', () => {
  let component: CompleteOrderStepComponent;
  let importOrderService: ImportOrderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    importOrderService = TestBed.get(ImportOrderServiceService);
    component = new CompleteOrderStepComponent(importOrderService);
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should find item by code', () => {
    expect(component.getVariationBy('CS')).toEqual(productVariants[1]);
  });

  it('should subscribe and get total price', () => {
    component.ngOnInit();
    importOrderService.selectImportedOrder(getOrderMock());
    importOrderService.selectImportedProduct(getOrderMock().products[0]);
    expect(component.totalPrice).toEqual(10.05);
  });
});
