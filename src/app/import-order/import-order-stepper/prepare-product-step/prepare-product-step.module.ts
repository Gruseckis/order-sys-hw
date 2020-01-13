import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrepareProductStepComponent } from './prepare-product-step.component';
import { OrderDetailsTableModule } from '../../order-details-table/order-details-table.module';

@NgModule({
  imports: [CommonModule, OrderDetailsTableModule],
  declarations: [PrepareProductStepComponent],
  exports: [PrepareProductStepComponent]
})
export class PrepareProductStepModule {}
