import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompleteOrderStepComponent } from './complete-order-step.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatDividerModule
  ],
  declarations: [ CompleteOrderStepComponent ],
  exports: [ CompleteOrderStepComponent ]
})
export class CompleteOrderStepModule { }
