import { TestBed } from '@angular/core/testing';
import { OrderItemDetailsComponent } from './order-item-details.component';
import { getOrderMock } from '../order.mocks.spec';
import { ProductVariationOption } from 'src/app/models/order';

describe('OrderItemDetailsComponent', () => {
  let component: OrderItemDetailsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderItemDetailsComponent ]
    });
    component = new OrderItemDetailsComponent(getOrderMock());
  });

  it('should return correct variation by code', () => {
    const expectedResult: ProductVariationOption = {
      code: 'CS',
      description: 'Crew Socks',
      icon: 'fa-socks'
    };
    expect(component.getVariationInfo('CS')).toEqual(expectedResult);
  });
});
