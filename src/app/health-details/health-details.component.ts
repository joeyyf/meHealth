import { Component, OnInit } from '@angular/core';
import { SmartWatchService } from '../smart-watch.service';
import { HealthModel } from '../healthModel';

@Component({
  selector: 'app-health-details',
  templateUrl: './health-details.component.html',
  styleUrls: ['./health-details.component.css']
})
export class HealthDetailsComponent implements OnInit {

  healthModels: HealthModel[] = [];

  constructor(private smartWatchService: SmartWatchService) { }

  ngOnInit(): void {
    this.getHealthData();
  }

  getHealthData(): void {
    this.smartWatchService.getHealthData()
      .subscribe(healthModels => this.healthModels = healthModels);
  }

}
