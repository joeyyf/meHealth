import { Component, OnInit, Input } from '@angular/core';
import { HealthModel } from '../healthModel';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  @Input() healthModels: HealthModel[] = [];

  constructor() { }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{
        type: "time"
        }
      ]
    }
  };

  public barChartLabels = [];
  public barChartType = 'line';
  public barChartLegend = true;
  public barChartData = [];

  ngOnInit(): void {
    this.setChartData();
  }

  setChartData(): void {
    this.barChartLabels = this.healthModels.map(x => x.date);
    this.barChartData = [
      {data: this.healthModels.map(x => x.steps), label: "steps"},
      {data: this.healthModels.map(x => x.heartRate), label: "heartRate"},
      {data: this.healthModels.map(x => x.rawIntensity), label: "rawIntensity"},
      {data: this.healthModels.map(x => x.rawKind), label: "rawKind"},
    ];
  }

}
