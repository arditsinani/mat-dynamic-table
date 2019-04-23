# MaterialDynamicTable

This project was created with Angular and Angular Material
It supports:
-Server side filtering with all fields filtering
-Server side pagination
-Server side sorting

## Properties

@Input:displayedTypeColumns:{}
 -key:the name of the property
 -value:the type of the property
 -example:{ valid:"boolean", name:"string", surname:"string", age:"number", birthday:"date", details:"special" }
 -supported types:string, array, text, long, int, double, number, date, boolean,special

@Input:sortObject:{}
  -key:string - the name of the default sort property
  -direction:string - direction
  -example: { key:"name", direction:"asc" }
  
@Input:api:string
  -endpoint to make the request for the data
  -requert type : 'POST'
  -passes all the parameters from the columns,the current page index and page size and the sorting key and direction
  
@Output:onSpecial:event
  -display the details column with a info button
  -the info button when clicked returns the value of the selected row

