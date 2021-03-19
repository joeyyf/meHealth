import { Component, OnInit } from '@angular/core';
import { SmartWatchService } from '../smart-watch.service';
import { HealthModel } from '../healthModel';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-health-details-weekly',
  templateUrl: './health-details-weekly.component.html',
  styleUrls: ['./health-details-weekly.component.css']
})
export class HealthDetailsWeeklyComponent implements OnInit {

  healthModels: HealthModel[] = [];
  today = new Date();
  dateToShow: NgbDate = new NgbDate(this.today.getFullYear(), this.today.getMonth() + 1, this.today.getUTCDate());

  isLoading = true;

  constructor(
    private smartWatchService: SmartWatchService,
    private calendar: NgbCalendar
  ) { }

  ngOnInit(): void {
    this.getHealthData();
  }

  getHealthData(): void {

    this.isLoading = true;

    this.smartWatchService.getWeeklyHealthData(new Date(this.dateToShow.year, this.dateToShow.month - 1, this.dateToShow.day))
      .subscribe(healthWrapperModel => {
        this.healthModels = healthWrapperModel.data;

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
