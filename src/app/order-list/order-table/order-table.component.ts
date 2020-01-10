import {
  Component,
  OnInit,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Order } from 'src/app/models/order';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor() {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes.tableData.firstChange) {
      this.dataSource = new MatTableDataSource(changes.tableData.currentValue);
      this.dataSource.paginator = this.paginator;
    }
  }
}
