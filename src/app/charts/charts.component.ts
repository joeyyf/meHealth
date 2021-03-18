import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HealthModel } from '../healthModel';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
  providers: [DatePipe]
})
export class ChartsComponent implements OnInit {

  @Input() healthModels: HealthModel[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['healthModels']) {
      this.setChartData();
    }
  }

  constructor(private datepipe: DatePipe) { }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = [];
  public barChartType = 'line';
  public barChartLegend = true;
  public barChartData = [];

  ngOnInit(): void {
  }

  setChartData(): void {
    this.barChartLabels = this.healthModels.map(x => this.datepipe.transform(x.date, "HH:mm"));
    this.barChartData = [
      {data: this.healthModels.map(x => x.steps), label: "steps"},
      {data: this.healthModels.map(x => x.heartRate), label: "heartRate"},
      {data: this.healthModels.map(x => x.rawIntensity), label: "rawIntensity"}
    ];
  }

}
