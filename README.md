# MaterialDynamicTable

This project was created with Angular and Angular Material
It supports:
-Server side filtering with all fields filtering
-Server side pagination
-Server side sorting, etc.

## Properties

@Input:displayedTypeColumns:{}(required)
 -key:the name of the property
 -value:the type of the property
 -example:{ valid:"boolean", name:"string", surname:"string", age:"number", birthday:"date", details:"special" }
 -supported types:string, array, text, long, int, double, number, date, boolean,special

@Input:sortObject:{}(required)
  -key:string - the name of the default sort property
  -direction:string - direction
  -example: { key:"name", direction:"asc" }
  
@Input:api:string(required)
  -endpoint to make the request for the data
  -requert type : 'POST'
  -passes all the parameters from the columns,the current page index and page size and the sorting key and direction
  
@Output:onSpecial:event(optional)
  -display the details column with a info button
  -the info button when clicked returns the value of the selected row

Getting started
1. Prerequisites:
Angular material: Please follow https://material.angular.io/guide/getting-started

The following modules are required

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatSortModule, MatInputModule, MatPaginatorModule,
         MatButtonModule, MatSelectModule, MatDatepickerModule,
         MatNativeDateModule, MatProgressSpinnerModule,
         MatListModule, MatFormFieldModule,MatIconModule, MatGridListModule } from '@angular/material';
import { MatMomentDatetimeModule } from '@mat-datetimepicker/moment';
import { MatDatetimepickerModule } from '@mat-datetimepicker/core';
import { FormsModule } from '@angular/forms';

The following packages are required from the library to be in the package.json of the application:
  "peerDependencies": {
    "@angular/animations": "~7.2.0",
    "@angular/cdk": "^7.2.0",
    "@angular/common": "~7.2.0",
    "@angular/compiler": "~7.2.0",
    "@angular/core": "~7.2.0",
    "@angular/forms": "~7.2.0",
    "@angular/material": "^7.1.0",
    "@angular/material-moment-adapter": "^7.1.0",
    "@angular/platform-browser": "~7.2.0",
    "@angular/platform-browser-dynamic": "~7.2.0",
    "@mat-datetimepicker/core": "^2.0.1",
    "@mat-datetimepicker/moment": "^2.0.1",
    "core-js": "^2.5.4",
    "moment": "^2.24.0",
    "rxjs": "~6.3.3",
    "tslib": "^1.9.0"
  }


Details column is using material icon, so material icons may be needed in index.html: 
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  
Styles are taken from the styles of the application.
Here is an example:
@import "../node_modules/@angular/material/prebuilt-themes/purple-green.css";
@import '~@mat-datetimepicker/core/datetimepicker/datetimepicker-theme.scss';

$mat-dynamic-table-primary: mat-palette($mat-grey, 700, 300, 900);
$mat-dynamic-table-accent: mat-palette($mat-amber, A400, A100, A800);
$mat-dynamic-table-warn: mat-palette($mat-red);
$mat-dynamic-table-theme: mat-dark-theme($mat-dynamic-table-primary, $mat-dynamic-table-accent, $mat-dynamic-table-warn);

@include mat-datetimepicker-theme($mat-dynamic-table-theme);

2. Install mat-dynamic-table:
npm install mat-dynamic-table --save

3. Import the installed libraries:
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
...

import { MatDynamicTable } from 'mat-dynamic-table';

import { AppComponent } from './app';

@NgModule({
  ...
  imports: [
    ...

    MatDynamicTable
  ],
})
export class AppModule {}

4. Include mat-dynamic-table selector in your component:
 <mat-dynamic-table [sortObject]='{ key:"name", direction:"asc" }' [displayedTypeColumns]='{ valid:"boolean", name:"string", surname:"string", age:"number", birthday:"date", details:"special" }' api="http://localhost:3000/post" (onSpecial)="onSpecialFunc($event)"></mat-dynamic-table>
 
 
 Server Side
 The library support server side filtering,pagination and sorting,but the backend api should support it to.
 The service of the api is build using rxjs.
 IMPORTANT:
 The following attributes are required from response:
 data:Array - containing the objects that has to be displayed
 totals:{
  length:any - the length of the documents with the current filters 
 }
 -example: 
 {
  data:[{},{},{},{}],
  totals:{
    length:4
  }
 }
