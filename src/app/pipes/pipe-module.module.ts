import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderValuePipe } from './order-value.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [OrderValuePipe],
  exports: [OrderValuePipe]
})
export class MyPipesModule {}
