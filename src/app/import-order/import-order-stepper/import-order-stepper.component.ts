import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImportOrderServiceService } from '../import-order-service/import-order-service.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-import-order-stepper',
  templateUrl: './import-order-stepper.component.html',
  styleUrls: ['./import-order-stepper.component.css']
})
export class ImportOrderStepperComponent implements OnInit, OnDestroy {
  secondFormGroup: FormGroup;
  isEditable = true;
  public completeFindOrder = false;

  private readonly onDestroy$ = new Subject<void>();

  constructor(
    private _formBuilder: FormBuilder,
    private importOrderService: ImportOrderServiceService
  ) {}

  ngOnInit() {
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.importOrderService.orderFound
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(response => {
        this.completeFindOrder = response;
      });
  }

  public steppChange($event) {
    console.log('change', $event);
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
