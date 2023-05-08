import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { TableComponent } from '../table/table.component';



@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent {
  chart: any = [];
  data:any
  constructor(private tblComponent: TableComponent) {}

    ngOnInit() {
          this.data = this.tblComponent.data;
          const totals = {};
          this.data.forEach(entry => {
            const name = entry['EmployeeName'];
            const time = entry['TotalTime'];
            if (totals[name]) {
              totals[name] += time;
            } else {
              totals[name] = time;
            }
          });
  
          const labels = Object.keys(totals);
          const values = Object.values(totals);
  
          this.chart = new Chart('canvas', {
            type: 'pie',
            data: {
              labels: labels,
              datasets: [
                {
                  label: '# of Votes',
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