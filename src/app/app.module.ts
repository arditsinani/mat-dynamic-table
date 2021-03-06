import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatDynamicTable } from 'mat-dynamic-table'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatSortModule, MatInputModule, MatPaginatorModule,
         MatButtonModule, MatSelectModule, MatDatepickerModule,
         MatNativeDateModule, MatProgressSpinnerModule,
         MatListModule, MatFormFieldModule,MatIconModule, MatGridListModule } from '@angular/material';
import { MatMomentDatetimeModule } from '@mat-datetimepicker/moment';
import { MatDatetimepickerModule } from '@mat-datetimepicker/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDynamicTable,
    MatTableModule,
    MatSortModule, 
    MatInputModule, 
    MatPaginatorModule,
    MatButtonModule,
    MatSelectModule, 
    MatDatepickerModule,
    MatNativeDateModule, 
    MatProgressSpinnerModule,
    MatListModule, MatFormFieldModule,
    MatIconModule,
    MatGridListModule,
    BrowserAnimationsModule,
    MatMomentDatetimeModule,
    MatDatetimepickerModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
