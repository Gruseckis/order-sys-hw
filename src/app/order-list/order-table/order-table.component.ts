import {
  Component,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Order } from 'src/app/models/order';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { OrderItemDetailsComponent } from '../order-item-details/order-item-details.component';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css']
})
export class OrderTableComponent implements OnChanges {
  @Input()
  public tableData: Array<Order>;

  public dataSource = new MatTableDataSource<Order>();
  public displayedColumns = [
    'orderNumber',
    'customerName',
    'created',
    'revenue',
    'cost',
    'price',
    'fulfillment'
  ];

  constructor(private dialog: MatDialog) {}

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(changes.tableData.currentValue);
    this.dataSource.paginator = this.paginator;
  }

  public onItemClick(row: Order) {
    console.log(row);
    this.dialog.open(OrderItemDetailsComponent, {
      width: '60vw',
      data: row,
    });
  }
}
