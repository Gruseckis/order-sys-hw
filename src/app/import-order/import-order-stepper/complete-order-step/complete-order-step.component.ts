import { Component, OnInit, OnDestroy } from '@angular/core';
import { ImportOrderServiceService } from '../../import-order-service/import-order-service.service';
import { Observable, Subject } from 'rxjs';
import { ImportedOrder, ProductVariationOption } from 'src/app/models/order';
import { productVariants } from 'src/app/utils/consts';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-complete-order-step',
  templateUrl: './complete-order-step.component.html',
  styleUrls: ['./complete-order-step.component.css']
})
export class CompleteOrderStepComponent implements OnInit, OnDestroy {
  public importState$: Observable<ImportedOrder> = this.importOrderService
    .importedOrder$;
  public totalPrice: number;

  private readonly onDestroy$ = new Subject<void>();

  constructor(private importOrderService: ImportOrderServiceService ) { }

  public ngOnInit() {
    this.importState$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(response => {
        this.totalPrice = response.selectedProducts.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.price;
        }, 0);
      });
  }

  public getVariationBy(variationCode: string): ProductVariationOption {
    return productVariants.find(item => item.code === variationCode);
  }

  public ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
