import {
  Component,
  OnInit,
  Input,
  ViewChild,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { SearchResult } from '../find-order-step.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ImportOrderServiceService } from 'src/app/import-order/import-order-service/import-order-service.service';

@Component({
  selector: 'app-search-result-table',
  templateUrl: './search-result-table.component.html',
  styleUrls: ['./search-result-table.component.css']
})
export class SearchResultTableComponent implements OnChanges {
  @Input()
  public tableData: Array<SearchResult>;

  public dataSource = new MatTableDataSource<SearchResult>();
  public searchTableColumns = [
    'orderNumber',
    'customerName',
    'productAmount',
    'orderVolume',
    'sku'
  ];

  constructor(private importOrderService: ImportOrderServiceService) {}

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes.tableData.firstChange) {
      this.dataSource = new MatTableDataSource(changes.tableData.currentValue);
      this.dataSource.paginator = this.paginator;
    }
  }

  public onRowClick(row) {
    this.importOrderService.orderFound.next(true);
    console.log(row);
  }
}
