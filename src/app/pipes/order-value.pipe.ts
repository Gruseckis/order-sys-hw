import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/order';

@Pipe({
  name: 'orderValue'
})
export class OrderValuePipe implements PipeTransform {
  transform(orders: Array<Product>): number {
    if (orders.length) {
      return orders.reduce((accamulated, currentValue) => {
        return accamulated + currentValue.price;
      }, 0);
    }
    return null;
  }
}
