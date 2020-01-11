import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportOrderComponent } from './import-order.component';
import { ImportOrderDialogComponent } from './import-order-dialog/import-order-dialog.component';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { ImportOrderStepperComponent } from './import-order-stepper/import-order-stepper.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [
    ImportOrderComponent,
    ImportOrderDialogComponent,
    ImportOrderStepperComponent
  ],
  exports: [ImportOrderDialogComponent],
  entryComponents: [ImportOrderDialogComponent]
})
export class ImportOrderModule {}
