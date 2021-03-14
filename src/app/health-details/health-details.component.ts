import { Component, OnInit } from '@angular/core';
import { SmartWatchService } from '../smart-watch.service';
import { HealthModel } from '../healthModel';
import { HealthWrapperModel } from '../healthWrapperModel';

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

  constructor(private smartWatchService: SmartWatchService) { }

  ngOnInit(): void {
    this.getHealthData();
  }

  getHealthData(): void {
    this.smartWatchService.getHealthData()
      .subscribe(healthWrapperModel => {
        this.healthModels = healthWrapperModel.data;

        const heartRates = this.healthModels.map(x => x.heartRate);
        const sumHeartRates = heartRates.reduce((a, b) => a + b, 0);
        this.heartRateAvg = (sumHeartRates / heartRates.length) || 0;

        const rawIntensities = this.healthModels.map(x => x.rawIntensity);
        const sumRawIntensities = rawIntensities.reduce((a, b) => a + b, 0);
        this.rawIntensityAvg = (sumRawIntensities / rawIntensities.length) || 0;

        const steps = this.healthModels.map(x => x.steps);
        this.stepCountTotal = steps.reduce((a, b) => a + b, 0);
      });
  }

}
