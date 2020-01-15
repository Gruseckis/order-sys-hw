import { Component, Inject } from '@angular/core';
import { Order, ProductVariationOption } from 'src/app/models/order';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { productVariants } from 'src/app/utils/consts';

@Component({
  selector: 'app-order-item-details',
  templateUrl: './order-item-details.component.html',
  styleUrls: ['./order-item-details.component.css']
})
export class OrderItemDetailsComponent {
  public order: Order;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Order
  ) {}

  public getVariationInfo(variationCode: string): ProductVariationOption {
    return productVariants.find(item => item.code === variationCode);
  }
}
