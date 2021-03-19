import { Component, OnInit } from '@angular/core';
import { SmartWatchService } from '../smart-watch.service';
import { HealthModel } from '../healthModel';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-health-details',
  templateUrl: './health-details.component.html',
  styleUrls: ['./health-details.component.css']
})
export class HealthDetailsComponent implements OnInit {

  healthModels: HealthModel[] = [];
  heartRateAvg: number;
  heartRateMax: number = 190; //220 - age = Maximum Heart Rate (MHR) for runners; resting HR 60-100
  heartRatePercent: number;

  stepCountTotal: number;
  stepCountMax: number = 10000;
  stepCountPercent: number;

  rawIntensityAvg : number;
  rawIntensityMax: number = 125;
  rawIntensityPercent: number;

  today = new Date();
  dateToShow: NgbDate = new NgbDate(this.today.getFullYear(), this.today.getMonth() + 1, this.today.getUTCDate());

  isLoading = true;

  constructor(
    private smartWatchService: SmartWatchService,
    private calendar: NgbCalendar,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const year = +this.route.snapshot.paramMap.get('year');
    const month = +this.route.snapshot.paramMap.get('month');
    const day = +this.route.snapshot.paramMap.get('day');

    //if there are parameters, use them, else default to today
    if (year != 0 && month != 0 && day != 0){
        this.dateToShow = new NgbDate(year, month, day);
        console.log(year, month, day);
    }

    this.getHealthData();
  }

  getHealthData(): void {

    this.isLoading = true;

    this.smartWatchService.getHealthData(new Date(this.dateToShow.year, this.dateToShow.month - 1, this.dateToShow.day))
      .subscribe(healthWrapperModel => {
        this.healthModels = healthWrapperModel.data;

        const heartRates = this.healthModels.map(x => x.heartRate);
        const sumHeartRates = heartRates.reduce((a, b) => a + b, 0);
        this.heartRateAvg = (sumHeartRates / heartRates.filter(x => x > 0).length) || 0;
        this.heartRatePercent = this.heartRateAvg/this.heartRateMax;

        const rawIntensities = this.healthModels.map(x => x.rawIntensity);
        const sumRawIntensities = rawIntensities.reduce((a, b) => a + b, 0);
        this.rawIntensityAvg = (sumRawIntensities / rawIntensities.filter(x => x > 0).length) || 0;
        this.rawIntensityPercent = this.rawIntensityAvg/this.rawIntensityMax;

        const steps = this.healthModels.map(x => x.steps);
        this.stepCountTotal = steps.reduce((a, b) => a + b, 0);
        this.stepCountPercent = this.stepCountTotal/this.stepCountMax;

        this.isLoading = false;
      });
  }

  onDateSelect($event): void {
    this.getHealthData();
  }

  selectToday() {
    this.dateToShow = this.calendar.getToday();
    this.getHealthData();
  }

}
