import { Component, ViewChild, Output, Input, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, ProgressSpinnerMode, DateAdapter } from '@angular/material';
import { merge, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import {
  DatetimeAdapter,
  MAT_DATETIME_FORMATS,
  MatDatetimepickerFilterType
} from '@mat-datetimepicker/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MomentDatetimeAdapter } from '@mat-datetimepicker/moment';
import {
  Moment,
  utc
} from 'moment/moment';
import { MatDynamicTableService } from './mat-dynamic-table.service';

@Component({
  selector: 'mat-dynamic-table',
  templateUrl: './mat-dynamic-table.component.html',
  styleUrls: ['./mat-dynamic-table.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter
    },
    {
      provide: DatetimeAdapter,
      useClass: MomentDatetimeAdapter
    },
    {
      provide: MAT_DATETIME_FORMATS,
      useValue: {
        parse: {
          dateInput: 'L',
          monthInput: 'MMMM',
          yearInput: 'YYYY',
          timeInput: 'LT',
          datetimeInput: 'L LT'
        },
        display: {
          dateInput: 'L',
          monthInput: 'MMMM',
          yearInput: 'YYYY',
          datetimeInput: 'L LT',
          timeInput: 'LT',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
          popupHeaderDateLabel: 'ddd, DD MMM'
        }
      }
    }
  ]
})

export class MatDynamicTableComponent implements OnInit, AfterViewInit {

  datePipe: DatePipe;

  today: Moment;
  tomorrow: Moment;
  min: Moment;
  max: Moment;
  start: Moment;
  filter: (date: Moment, type: MatDatetimepickerFilterType) => boolean;
  transitions: any[];
  transition: any;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Output() onSpecial: EventEmitter<any> = new EventEmitter();
  @Input() mode: ProgressSpinnerMode;

  @Input() displayedTypeColumns: any = {};
  @Input() api: string;
  @Input() sortObject: any = {};
  

  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;
  dataStatus = 'loaded';

  typeColumns:any={};
  columnsObject:any={};
  valueColumns:any={};

  error:Error;

  constructor(public backendApi: MatDynamicTableService) {
    this.datePipe = new DatePipe("en");

    this.today = utc().year(1929);
    this.tomorrow = utc().date(utc().date() + 1);
    this.min = this.today.clone().year(2018).month(10).date(3).hour(11).minute(10);
    this.max = this.min.clone().date(4).minute(45);
    this.start = this.today.clone().year(1930).month(9).date(28);
    this.filter = (date: Moment, type: MatDatetimepickerFilterType) => {
      switch (type) {
        case MatDatetimepickerFilterType.DATE:
          return date.year() % 2 === 0 &&
            date.month() % 2 === 0 &&
            date.date() % 2 === 0;
        case MatDatetimepickerFilterType.HOUR:
          return date.hour() % 2 === 0;
        case MatDatetimepickerFilterType.MINUTE:
          return date.minute() % 2 === 0;
      }
    }; 
  }

  ngOnInit() {
    this.typeColumns = this.displayedTypeColumns;      
    this.columnsObject=this.displayedTypeColumns;
    this.getHeaderKeys();
    if(Object.entries(this.sortObject).length === 0){
      this.error = new Error('sortObject is required')
      this.dataStatus = 'error'
      throw this.error
    }
    if(Object.entries(this.typeColumns).length === 0){
      this.error = new Error('displayedTypeColumns is required')
      this.dataStatus = 'error'
      throw this.error
    }
    if(!this.api){
      this.error = new Error('api is required')
      this.dataStatus = 'error'
      throw this.error
    }
  }

  ngAfterViewInit(){ 
    setTimeout(() => {
      this.searchFilter();
    });
  }

  async searchFilter() {
    this.dataSource.data = []
    this.dataStatus = 'loading';

    // Boolean Columns parse
    Object.keys(this.valueColumns).forEach((x) => {
      if(this.valueColumns[x]==='true'){
        this.valueColumns[x]=true;
      }else if(this.valueColumns[x]==='false'){
        this.valueColumns[x]=false;
      };
      if(this.valueColumns[x]===null){
        this.valueColumns[x] ='';
      }
    });

    let key;
    let direction;

    //Default sort
    if (this.sort.active === undefined || this.sort.direction === '') {
      key=this.sortObject.key;
      direction = this.sortObject.direction
    } else {
      key = this.sort.active;
      direction = this.sort.direction;
    }
    
    this.dataSource.sort = this.sort;
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge()
    .pipe(
      startWith({}),
      switchMap(() => {
        return this.backendApi.searchFilter(this.valueColumns,this.paginator.pageSize, this.paginator.pageIndex, this.api,key,direction);    
      }),
      map(data => {
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        this.resultsLength = data.totals.length

        return data;
      }),
      catchError(() => {
        this.isLoadingResults = false;
        this.isRateLimitReached = true;
        return of([]);
      })
    ).subscribe((data: any) => {
        if(!data.data || !data.totals){
          this.error = new Error('data and totals are required')
          this.dataStatus = 'error'
          throw this.error
        }   
        this.dataSource.data = data.data
        if(this.dataSource.data.length == 0){
          this.dataStatus = 'noData';
        }
        if(this.dataSource.data.length > 0){
          this.dataStatus = 'loaded';
        }
      });
  }

  formatHeader(header){
    if(header.includes('.')){
      let splited = header.split(".")
      var result = splited[1].replace( /([A-Z])/g, " $1" );
      var finalResult = result.charAt(0).toUpperCase() + result.slice(1); 
      return finalResult;
      
    }else{
      var result = header.replace( /([A-Z])/g, " $1" );
      var finalResult = result.charAt(0).toUpperCase() + result.slice(1); 
      return finalResult;
    }
  }

  getHeaderKeys(){    
    // Iterating and setting static types e.g. type "date/text/number/boolean" else delete
    Object.keys(this.typeColumns).forEach((key) => {
        if(this.typeColumns[key].toLowerCase()=="string" || this.typeColumns[key].toLowerCase()=="array" || this.typeColumns[key].toLowerCase()=="text"){
          this.typeColumns[key]="text";
        }else if(this.typeColumns[key].toLowerCase()=="long" || this.typeColumns[key].toLowerCase()=="int" || this.typeColumns[key].toLowerCase()=="double" || this.typeColumns[key].toLowerCase()=="number"){
          this.typeColumns[key]="number";
        }else if(this.typeColumns[key].toLowerCase()=="date" || this.typeColumns[key].toLowerCase()=="boolean" || this.typeColumns[key].toLowerCase()=="special"){
          this.typeColumns[key] = this.typeColumns[key].toLowerCase()
        }else { 
          console.log(`Unsuported type ${key}:${this.typeColumns[key]}, column has been deleted`)
          delete this.typeColumns[key];
        }
      });
    this.displayedColumns=Object.keys(this.typeColumns);

    Object.keys(this.typeColumns).forEach((key) => {
      this.valueColumns[key]='';        
    });
  }

  formatDate(date: any) {
    if(date){
      const newDate = this._formatDate(date);
      return newDate;
    }else{
      return 'No Date';
    }
  }

  _formatDate(date: Date, format?: string) {
    if (format) {
      return this.datePipe.transform(date, format);
    } else {
      return this.datePipe.transform(date, 'MMM d, y, HH:mm:ss');
    }
  }

  spliceWord(word,element){
    if(word != null && word.includes('.')){
      let splited = word.split(".")
      let first = splited[0];
      let second = splited[1];
      let result;
      if(element[first]===null || element[first].length < 1){
        result = 'No Data'
        return result;
      }else{
        result = element[first][0][second];
        return result;
      }
    }else{
      let result;
      if(element[word]==null){
        result='No Data';
        return result;
      }else{
        result=element[word]
        return result;
      }
    }
  }

  onSpecialClick(element) {
      this.onSpecial.emit(element);
  }

}
