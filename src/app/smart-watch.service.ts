import { Injectable } from '@angular/core';
import { HealthModel } from './healthModel';
import { HealthWrapperModel } from './healthWrapperModel';
import { HEALTHMODELS } from './mock-healthModels';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SmartWatchService {

  tempHealthModels: HealthModel[] = [];
  private healthDataUrl = 'http://localhost:8000/api/healthData';  // URL to web api

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  getHealthData(): Observable<HealthWrapperModel> {
    return this.http.get<HealthWrapperModel>(this.healthDataUrl)
      .pipe(
        tap((receivedData: HealthWrapperModel) => console.log(receivedData)),
        catchError(this.handleError<HealthWrapperModel>('getHealthData'))
    );
  }

  getMockHealthData(): Observable<HealthModel[]> {
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

  /** Log a SmartWatchService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`SmartWatchService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
