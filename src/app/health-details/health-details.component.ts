import { Component, OnInit } from '@angular/core';
import { SmartWatchService } from '../smart-watch.service';
import { HealthModel } from '../healthModel';
import {NgbCalendar, NgbDate} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-health-details',
  templateUrl: './health-details.component.html',
  styleUrls: ['./health-details.component.css']
})
export class HealthDetailsComponent implements OnInit {

  healthModels: HealthModel[] = [];
  heartRateAvg: number;
  stepCountTotal: number;
  rawIntensityAvg : number;
  today = new Date();
  dateToShow: NgbDate = new NgbDate(this.today.getFullYear(), this.today.getMonth() + 1, this.today.getUTCDate());

  constructor(
    private smartWatchService: SmartWatchService,
    private calendar: NgbCalendar
  ) { }

  ngOnInit(): void {
    this.getHealthData();
  }

  getHealthData(): void {
    this.smartWatchService.getHealthData(new Date(this.dateToShow.year, this.dateToShow.month - 1, this.dateToShow.day))
      .subscribe(healthWrapperModel => {
        this.healthModels = healthWrapperModel.data;

        const heartRates = this.healthModels.map(x => x.heartRate);
        const sumHeartRates = heartRates.reduce((a, b) => a + b, 0);
        this.heartRateAvg = (sumHeartRates / heartRates.filter(x => x > 0).length) || 0;

        const rawIntensities = this.healthModels.map(x => x.rawIntensity);
        const sumRawIntensities = rawIntensities.reduce((a, b) => a + b, 0);
        this.rawIntensityAvg = (sumRawIntensities / rawIntensities.filter(x => x > 0).length) || 0;

        const steps = this.healthModels.map(x => x.steps);
        this.stepCountTotal = steps.reduce((a, b) => a + b, 0);
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
