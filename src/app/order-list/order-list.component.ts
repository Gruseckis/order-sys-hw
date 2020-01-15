import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../http-request/http-request.service';
import produce from 'immer';
import { Order, ImportedOrder } from '../models/order';
import { MatDialog } from '@angular/material/dialog';
import { ImportOrderDialogComponent } from '../import-order/import-order-dialog/import-order-dialog.component';
import { first } from 'rxjs/operators';
import { ImportOrderServiceService } from '../import-order/import-order-service/import-order-service.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  public orders: Array<Order> = [];

  constructor(
    private httpService: HttpRequestService,
    private importOrderService: ImportOrderServiceService,
    private dialog: MatDialog
  ) {}

  public ngOnInit() {
     this.httpService.getOrder()
      .pipe(first())
      .subscribe(response => {
        this.orders = response;
      });
  }

  public onImportOrder() {
    const dialogRef = this.dialog.open(ImportOrderDialogComponent, {
      width: '80vw',
      disableClose: true
    });

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe((result: ImportedOrder)  => {
        if (result) {
          this.httpService.reset();
          this.importOrderService.reset();
          const newOrder: Order = {
            ...result.selectedOrder,
            orderStatus: 'Processing',
            products: [
              ...result.selectedProducts
            ],
            createDate: new Date().toISOString()
          };
          this.httpService.addOrderToInbox(newOrder)
          .pipe(first())
          .subscribe((response: Order) => {
            this.orders = produce(this.orders, draft => {
              draft.push(response);
            });
          });
        }
      });
  }
}
