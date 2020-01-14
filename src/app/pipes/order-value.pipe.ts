import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/order';

@Pipe({
  name: 'orderValue'
})
export class OrderValuePipe implements PipeTransform {
  transform(orders: Array<Product>): number {
    if (orders && orders.length) {
      return orders.reduce((accumulated, currentValue) => {
        return accumulated + currentValue.price;
      }, 0);
    }
    return null;
  }
}
