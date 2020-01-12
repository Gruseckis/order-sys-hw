import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ImportOrderServiceService } from 'src/app/import-order/import-order-service/import-order-service.service';
import { SearchResult } from 'src/app/models/order';
import { HttpRequestService } from 'src/app/http-request/http-request.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search-result-table',
  templateUrl: './search-result-table.component.html',
  styleUrls: ['./search-result-table.component.css']
})
export class SearchResultTableComponent implements OnInit, OnDestroy {
  public dataSource = new MatTableDataSource<SearchResult>();
  public searchTableColumns = [
    'orderNumber',
    'customerName',
    'productAmount',
    'orderVolume',
    'sku'
  ];

  private readonly onDestroy$ = new Subject<void>();

  constructor(
    private importOrderService: ImportOrderServiceService,
    private httpRequstService: HttpRequestService
  ) {}

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public ngOnInit(): void {
    this.httpRequstService.importOrderSearch$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(response => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
      });
  }

  public onRowClick(row: SearchResult) {
    this.importOrderService.selectImportedOrder(row);
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
