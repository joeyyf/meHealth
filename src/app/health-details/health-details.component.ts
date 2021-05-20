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

  stepCountTotal: number;
  stepCountMax: number = 10000;
  stepCountMaxHelper: string = "10k";
  stepCountPercent: number;

  rawIntensityAvg : number;

  today = new Date();
  dateToShow: NgbDate = new NgbDate(this.today.getFullYear(), this.today.getMonth() + 1, this.today.getUTCDate());
  lastFoundDate = new Date();

  weight: number;
  weightTarget: number = 80;
  weightPercent: number;
  weightInput: number;

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

    this.refreshData();
    this.setLastImportDate();
  }

  getHealthData(): void {

    this.isLoading = true;

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
        this.stepCountPercent = this.stepCountTotal/this.stepCountMax;

        this.isLoading = false;
      });
  }

  getWeightData(): void {

    this.weightInput = null;

    this.smartWatchService.getWeight(new Date(this.dateToShow.year, this.dateToShow.month - 1, this.dateToShow.day))
      .subscribe(weightWrapperModel => {
        if (weightWrapperModel.data && weightWrapperModel.data.weight) {
          this.weight = weightWrapperModel.data.weight;
          this.weightPercent = 2 - (this.weight / this.weightTarget);

          //pre set input for modal popup
          this.weightInput = this.weight;
        }
        else {
          this.weight = 0;
          this.weightPercent = 0;
        }
      });
  }

  setLastImportDate(): void {

    this.smartWatchService.getLastImportDate()
      .subscribe(dateWrapperModel => {
        this.lastFoundDate = dateWrapperModel.data.date;
      });
  }

  onDateSelect($event): void {
    this.refreshData();
  }

  selectToday() {
    this.dateToShow = this.calendar.getToday();
    this.refreshData();
  }

  saveAndUpdateWeight() {
    //TODO validation
    this.smartWatchService.setWeight(this.weightInput, new Date(this.dateToShow.year, this.dateToShow.month - 1, this.dateToShow.day));
    this.weight = this.weightInput;
    this.weightInput = null;
  }

  refreshData() {
    this.getHealthData();
    this.getWeightData();
  }
}
