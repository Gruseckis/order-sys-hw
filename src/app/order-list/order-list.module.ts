import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list.component';
import { MatButtonModule } from '@angular/material/button';
import { OrderTableComponent } from './order-table/order-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { ImportOrderModule } from '../import-order/import-order.module';
import { MyPipesModule } from '../pipes/pipe-module.module';
import { OrderItemDetailsComponent } from './order-item-details/order-item-details.component';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    HttpClientModule,
    ImportOrderModule,
    MyPipesModule,
    MatListModule,
    MatDividerModule,
    MatIconModule
  ],
  declarations: [OrderListComponent, OrderTableComponent, OrderItemDetailsComponent],
  exports: [OrderListComponent],
  entryComponents: [OrderItemDetailsComponent]
})
export class OrderListModule {}
