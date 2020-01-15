import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ImportOrderServiceService } from '../import-order-service/import-order-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  Product,
  ImportStatus,
  ProductVariationOption
} from 'src/app/models/order';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatRadioChange } from '@angular/material/radio';
import { productVariants } from 'src/app/utils/consts';

@Component({
  selector: 'app-order-details-table',
  templateUrl: './order-details-table.component.html',
  styleUrls: ['./order-details-table.component.css']
})
export class OrderDetailsTableComponent implements OnInit, OnDestroy {
  public tableColumns = ['productName', 'SKU', 'selected'];

  public dataSource = new MatTableDataSource<Product>();
  public importState$ = this.importOrderService.importedOrder$;
  public importStatus: ImportStatus;

  public productVariants: Array<ProductVariationOption>;

  private readonly onDestroy$ = new Subject();

  constructor(private importOrderService: ImportOrderServiceService) {}

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public ngOnInit() {
    this.productVariants = productVariants;
    this.importOrderService.importedOrder$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(response => {
        this.importStatus = response.importStatus;
        if (response.importStatus === ImportStatus.ProductPreparation) {
          this.dataSource = new MatTableDataSource<Product>(
            response.selectedProducts
          );
        } else {
          this.dataSource = new MatTableDataSource<Product>(
            response.selectedOrder ? response.selectedOrder.products : []
          );
        }
        this.dataSource.paginator = this.paginator;
      });
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public onSelect(element: Product) {
    if (this.importStatus === ImportStatus.OrderSelection) {
      this.importOrderService.selectImportedProduct(element);
    }
  }

  public onVariantSelect(option: MatRadioChange, product: Product) {
    this.importOrderService.selectProductVariant(option.value, product.SKU);
  }
}
