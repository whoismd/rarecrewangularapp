import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { empData } from '../models/empData';


@Injectable({
  providedIn: 'root'
})



export class EmployeeService {

  private url = 'https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ=='
  constructor(private http: HttpClient) { }

  getTotalTime(time1:string, time2:string){
    let date1:any = new Date(time1).getHours();
    let date2:any = new Date(time2).getHours();
    return (date2-date1);
  }

  getEmployeeData(){
    return this.http.get(this.url)
    
  }

  processData(data1:any):empData[]{
     let res:empData[] = []
    for(let x of data1){
      let cont = new empData() ;
      cont.EmployeeName = x.EmployeeName
      cont.StartTimeUtc = x.StartTimeUtc
      cont.EndTimeUtc = x.EndTimeUtc
      cont.TotalTime = this.getTotalTime(x.StartTimeUtc,x.EndTimeUtc)
      res.push(cont)
    }
    return res;
  }
}
