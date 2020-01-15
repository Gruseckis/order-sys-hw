import { TestBed } from '@angular/core/testing';
import { ImportOrderServiceService } from './import-order-service.service';
import { getOrderMock } from 'src/app/order-list/order.mocks.spec';
import { getImportStateMock } from '../import-order.mock.spec';
import { ImportStatus } from 'src/app/models/order';

describe('Service: ImportOrderService', () => {
  let service: ImportOrderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new ImportOrderServiceService();
  });

  it('should reset order if selected is null', () => {
    spyOn(service, 'reset');
    service.selectImportedOrder(null);
    expect(service.reset).toHaveBeenCalled();
  });

  it('should select new order and add it to state', () => {
    spyOn(service, 'reset');
    service.selectImportedOrder(getOrderMock());
    expect(service.importedOrder.selectedOrder).toEqual(getOrderMock());
    expect(service.reset).not.toHaveBeenCalled();
  });

  it('should add new products', () => {
    service.selectImportedOrder(getOrderMock());
    expect(service.importedOrder.selectedProducts.length).toBe(0);
    service.selectImportedProduct(getOrderMock().products[0]);
    expect(service.importedOrder.selectedProducts).toEqual([getOrderMock().products[0]]);
    expect(service.importedOrder.selectedOrder.products[0].isSelected).toBeTruthy();
  });

  it('should remove selected if selected again', () => {
    service.selectImportedOrder(getOrderMock());
    service.selectImportedProduct(getOrderMock().products[0]);
    expect(service.importedOrder.selectedProducts.length).toBe(1);
    expect(service.importedOrder.selectedOrder.products[0].isSelected).toBeTruthy();
    service.selectProductVariant('LS', getOrderMock().products[0].SKU);
    service.selectImportedProduct(getOrderMock().products[0]);
    expect(service.importedOrder.selectedProducts.length).toBe(0);
    expect(service.importedOrder.selectedOrder.products[0].isSelected).toBeFalsy();
  });

  it('should change import status', () => {
    expect(service.importedOrder.importStatus).toBe(ImportStatus.OrderSelection);
    service.changeImportStatus(ImportStatus.ProductPreparation);
    expect(service.importedOrder.importStatus).toBe(ImportStatus.ProductPreparation);
  });

  it('should select product variation', () => {
    service.selectImportedOrder(getOrderMock());
    service.selectImportedProduct(getOrderMock().products[0]);
    service.selectProductVariant('LS', getOrderMock().products[0].SKU);
    expect(service.importedOrder.productVariation).toEqual([{SKU: getOrderMock().products[0].SKU, variation: 'LS'}]);
    service.selectProductVariant('HWS', getOrderMock().products[0].SKU);
    expect(service.importedOrder.productVariation).toEqual([{SKU: getOrderMock().products[0].SKU, variation: 'HWS'}]);
  });

  it('should reset state on reset', () => {
    service.selectImportedOrder(getOrderMock());
    expect(service.importedOrder.selectedOrder).toEqual(getOrderMock());
    service.reset();
    expect(service.importedOrder).toEqual(getImportStateMock());
  });
});
