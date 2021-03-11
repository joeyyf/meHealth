import { Injectable } from '@angular/core';
import { HealthModel } from './healthModel';
import { HEALTHMODELS } from './mock-healthModels';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class SmartWatchService {

  tempHealthModels: HealthModel[] = [];

  constructor(private messageService: MessageService) { }

  getHealthData(): Observable<HealthModel[]> {

    //filter heart rates ... db has several 0 and 255 !?
    var filterHeartRate = function (element: HealthModel, index, array) {
      return (element.heartRate > 20);
    }

    this.tempHealthModels = HEALTHMODELS.filter(filterHeartRate);
    for (var v in this.tempHealthModels)
    {
      //add human readable date time
      this.tempHealthModels[v].date = new Date(this.tempHealthModels[v].timestamp * 1000);  // * 1000 for milli seconds
    }

    //sort by date time
    var compareDate = function (health1: HealthModel, health2: HealthModel) {
      var health1Date = new Date(health1.date).getTime();
      var health2Date = new Date(health2.date).getTime();
      return health1Date > health2Date ? 1 : -1;
    }

    //as observable and sorted
    const healthModels = of(this.tempHealthModels.sort(compareDate));
    this.messageService.add('smartWatchService: fetched health data');
    return healthModels;
  }
}
