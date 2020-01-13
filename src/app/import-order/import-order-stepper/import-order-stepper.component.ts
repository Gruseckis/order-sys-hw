import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ImportOrderServiceService } from '../import-order-service/import-order-service.service';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ImportedOrder, ImportStatus } from 'src/app/models/order';
import { MatDialogRef } from '@angular/material/dialog';
import { ImportOrderDialogComponent } from '../import-order-dialog/import-order-dialog.component';
import { HttpRequestService } from 'src/app/http-request/http-request.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-import-order-stepper',
  templateUrl: './import-order-stepper.component.html',
  styleUrls: ['./import-order-stepper.component.css']
})
export class ImportOrderStepperComponent implements OnInit, OnDestroy {
  @Input()
  public dialogRef: MatDialogRef<ImportOrderDialogComponent>;

  public searchInput = new FormControl('');

  public importState$: Observable<ImportedOrder> = this.importOrderService
    .importedOrder$;

  private readonly onDestroy$ = new Subject<void>();

  constructor(
    private httpRequestService: HttpRequestService,
    private importOrderService: ImportOrderServiceService
  ) {}

  ngOnInit() {
    this.importOrderService.importedOrder$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(response => {
        console.log(response);
      });
    this.httpRequestService.importOrderSearch('');
  }

  public onDialogClose() {
    this.dialogRef.close('Cancel');
  }

  public steppChange($event) {
    console.log('change', $event);
  }

  public onOrderDeselect(stepper: MatStepper) {
    this.importOrderService.selectImportedOrder(null);
    if (stepper) {
      stepper.reset();
    }
  }

  public onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.searchInput.valid) {
      this.httpRequestService.importOrderSearch(this.searchInput.value);
    }
  }

  public onStepChange(status: ImportStatus) {
    this.importOrderService.changeImportStatus(status);
  }

  public onImportFinalize() {
    this.dialogRef.close(this.importOrderService.importedOrder);
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
