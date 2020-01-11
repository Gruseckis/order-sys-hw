import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../import-order/import-order-stepper/find-order-step/find-order-step.component';

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
