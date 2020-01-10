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
import { ImportOrderDialogComponent } from './import-order-dialog/import-order-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    HttpClientModule
  ],
  declarations: [
    OrderListComponent,
    OrderTableComponent,
    ImportOrderDialogComponent
  ],
  exports: [OrderListComponent],
  entryComponents: [ImportOrderDialogComponent]
})
export class OrderListModule {}
