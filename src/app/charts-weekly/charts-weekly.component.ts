import { Component, ViewChild, OnInit, Input, SimpleChanges } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HealthModel } from '../healthModel';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Component({
  selector: 'app-charts-weekly',
  templateUrl: './charts-weekly.component.html',
  styleUrls: ['./charts-weekly.component.css'],
  providers: [DatePipe]
})
export class ChartsWeeklyComponent implements OnInit {

  @Input() healthModels: HealthModel[] = [];
  @Input() dateToShow: NgbDate;
  @ViewChild('mychart') el:any;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['healthModels']) {
      this.setChartData();
    }
  }

  constructor(
    private datepipe: DatePipe,
    private router: Router,
    private rd: Renderer2
  ) { }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = [];
  public barChartType = 'horizontalBar';
  public barChartLegend = true;
  public barChartStepData = [];
  public barChartHeartRateData = [];
  public barChartRawIntensityData = [];

  ngOnInit(): void {
  }

  showData(evt:any){
  //var data = this.el.getElementsAtEvent(evt)
  console.log(this.el);
  console.log(evt);

  this.router.navigateByUrl(`/daily/${this.dateToShow.year}/${this.dateToShow.month}/${this.dateToShow.day}`);
}

  setChartData(): void {
    this.barChartLabels = this.healthModels.map(x => this.datepipe.transform(x.date, "EEE dd.MM.yy"));
    this.barChartStepData = [
      {
        data: this.healthModels.map(x => x.steps),
        label: "steps"
      }
    ];
    this.barChartHeartRateData = [
      {
        data: this.healthModels.map(x => x.heartRate),
        label: "heartRate",
        //TODO to css
        backgroundColor: "rgba(13, 110, 253, 0.5)"
      }
    ];
    this.barChartRawIntensityData = [
      {
        data: this.healthModels.map(x => x.rawIntensity),
        label: "rawIntensity",
        //TODO to css
        backgroundColor: "rgba(255, 193, 7, 0.5)"
      }
    ];
  }
}
