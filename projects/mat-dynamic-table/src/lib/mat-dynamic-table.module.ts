import { NgModule } from '@angular/core';
import { MatDynamicTableComponent } from './mat-dynamic-table.component';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatSortModule, MatInputModule, MatPaginatorModule,
         MatButtonModule, MatSelectModule, MatDatepickerModule,
         MatNativeDateModule, MatProgressSpinnerModule,
         MatListModule, MatFormFieldModule,MatIconModule, MatGridListModule } from '@angular/material';
import { MatMomentDatetimeModule } from '@mat-datetimepicker/moment';
import { MatDatetimepickerModule } from '@mat-datetimepicker/core';

@NgModule({
  declarations: [MatDynamicTableComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatDatetimepickerModule,
    MatMomentDatetimeModule,
    MatFormFieldModule,
    MatIconModule,
    MatGridListModule,
    FormsModule
  ],
  exports: [MatDynamicTableComponent]
})
export class MatDynamicTable { }
