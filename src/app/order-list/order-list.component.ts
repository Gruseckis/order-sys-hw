import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../http-request/http-request.service';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { ImportOrderDialogComponent } from '../import-order/import-order-dialog/import-order-dialog.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  public orders$: Observable<Array<Order>>;

  constructor(
    private httpService: HttpRequestService,
    private dialog: MatDialog
  ) {}

  public ngOnInit() {
    this.orders$ = this.httpService.getOrder();
  }

  public onImportOrder() {
    const dialogRef = this.dialog.open(ImportOrderDialogComponent, {
      width: '80vw',
      data: { name: 'Name', animal: 'Animal' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}
