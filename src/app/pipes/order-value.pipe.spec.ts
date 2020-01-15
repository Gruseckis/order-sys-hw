import { OrderValuePipe } from './order-value.pipe';
import { getOrderMock } from '../order-list/order.mocks.spec';

describe('Pipe: OrderValuee', () => {
  let pipe: OrderValuePipe;

  beforeEach(() => {
    pipe = new OrderValuePipe();
  });

  it('should return null if empty array passed', () => {
    expect(pipe.transform([])).toEqual(null);
  });

  it('should return total', () => {
    expect(pipe.transform(getOrderMock().products)).toBe(21.05);
  });
});
