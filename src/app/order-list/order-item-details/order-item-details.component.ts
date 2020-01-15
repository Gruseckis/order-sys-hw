import { Component, OnInit, Inject } from '@angular/core';
import { Order, ProductVariationOption } from 'src/app/models/order';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { productVariants } from 'src/app/utils/consts';

@Component({
  selector: 'app-order-item-details',
  templateUrl: './order-item-details.component.html',
  styleUrls: ['./order-item-details.component.css']
})
export class OrderItemDetailsComponent implements OnInit {
  public order: Order;

  constructor(
    public dialogRef: MatDialogRef<OrderItemDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order
  ) {}

  public ngOnInit() {
    console.log(this.data);
  }

  public onCloseClick() {}

  public getVariationInfo(variationCode: string): ProductVariationOption {
    return productVariants.find(item => item.code === variationCode);
  }

  public onOkClick() {}
}
