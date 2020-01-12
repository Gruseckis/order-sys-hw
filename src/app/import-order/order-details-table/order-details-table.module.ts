import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailsTableComponent } from './order-details-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule, //
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatInputModule
  ],
  declarations: [OrderDetailsTableComponent],
  exports: [OrderDetailsTableComponent]
})
export class OrderDetailsTableModule {}
