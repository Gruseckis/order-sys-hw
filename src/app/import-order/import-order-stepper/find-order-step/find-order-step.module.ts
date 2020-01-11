import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindOrderStepComponent } from './find-order-step.component';
import { MatInputModule } from '@angular/material/input';
import { MyPipesModule } from 'src/app/pipes/pipe-module.module';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { SearchResultTableComponent } from './search-result-table/search-result-table.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    MatPaginatorModule,
    MatTableModule,
    CommonModule,
    MatInputModule,
    MyPipesModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  declarations: [FindOrderStepComponent, SearchResultTableComponent],
  exports: [FindOrderStepComponent],
  providers: []
})
export class FindOrderStepModule {}
