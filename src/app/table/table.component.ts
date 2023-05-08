import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { empData } from '../models/empData';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  res:any
  data:empData[] = [];
  sortedData:empData[] = [];
  chart:any = {}
  constructor(private service:EmployeeService) {}
  getData(){
    this.service.getEmployeeData().subscribe((response:any) => {
      this.res = response;
      console.log(response)
      for(let x of response){
      let cont = new empData();
      cont.EmployeeName = x.EmployeeName
      cont.StartTimeUtc = x.StarTimeUtc
      cont.EndTimeUtc = x.EndTimeUtc
      cont.TotalTime = this.service.getTotalTime(x.StarTimeUtc,x.EndTimeUtc)
      this.data.push(cont)
      }
    });
    this.sortedData = this.data
    console.log(this.sortedData);
    console.log(this.data);
  }
  ngOnInit(): void {
      this.getData()
      console.log(this.data)
      let totals = {};
      for(let entry of this.data) {
        const time = entry.TotalTime;
        console.log(time)
        const name = time.toString()
        if (totals[name]) {
          totals[name]++;
        } else {
          totals[name] = 1;
        }
      };
      let str:string[] = []
      console.log(totals)

      const labels = Object.keys(totals);
      const values = Object.values(totals);
      console.log(labels)
      console.log(values)
      this.chart = new Chart('canvas', {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Frequency',
              data: values,
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
  }
}
