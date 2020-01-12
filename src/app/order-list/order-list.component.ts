import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../http-request/http-request.service';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
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
  public orders$: Observable<Array<Order>>;

  constructor(
    private httpService: HttpRequestService,
    private importOrderService: ImportOrderServiceService,
    private dialog: MatDialog
  ) {}

  public ngOnInit() {
    this.orders$ = this.httpService.getOrder();
  }

  public onImportOrder() {
    const dialogRef = this.dialog.open(ImportOrderDialogComponent, {
      width: '80vw',
      disableClose: true
    });

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe(result => {
        this.httpService.reset();
        this.importOrderService.reset();
        console.log('The dialog was closed', result);
      });
  }
}
