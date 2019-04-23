import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MatDynamicTableService {

  constructor(private http: HttpClient) { }

  searchFilter(valueColumns, pageSize, pageIndex, api, key, direction){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let valueColumnsParsed = JSON.parse(JSON.stringify(valueColumns))
    if(valueColumnsParsed.hasOwnProperty('details')) {
      delete valueColumnsParsed.details
    }
    const requestBody = {
      columns:valueColumnsParsed,
      pagination:{
        pageSize,
        pageIndex,
      },
      sort:{
        key,
        direction
      }
    }
    return this.http.post(api, requestBody, { headers }).pipe(map((res:any)=>{return res}))
  }
}
