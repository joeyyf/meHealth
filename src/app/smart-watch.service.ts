import { Injectable } from '@angular/core';
import { HealthModel } from './healthModel';
import { HealthWrapperModel } from './healthWrapperModel';
import { DateWrapperModel } from './dateWrapperModel';
import { WeightWrapperModel } from './models/weightWrapperModel';
import { WeightModel } from './models/weightModel';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SmartWatchService {

  tempHealthModels: HealthModel[] = [];
  private healthDataUrl = 'http://fileserver:8000/api/';  // URL to web api

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  /**
  * Get health data from REST service api by given date
  */
  getHealthData(dateToShow: Date): Observable<HealthWrapperModel> {

    var formattedDate = this.formatDateForApiCall(dateToShow);

    return this.http.get<HealthWrapperModel>(this.healthDataUrl.concat("healthData/", formattedDate))
      .pipe(
        tap((receivedData: HealthWrapperModel) => console.log(receivedData)),
        tap(() => this.log(`getHealthData() with date ${formattedDate}`)),
        catchError(this.handleError<HealthWrapperModel>('getHealthData'))
    );
  }

  /**
  * Get weekly health data from REST service api by given date (-7 days)
  */
  getWeeklyHealthData(dateToShow: Date): Observable<HealthWrapperModel> {

    var formattedDate = this.formatDateForApiCall(dateToShow);

    return this.http.get<HealthWrapperModel>(this.healthDataUrl.concat("healthData/week/", formattedDate))
      .pipe(
        tap((receivedData: HealthWrapperModel) => console.log(receivedData)),
        tap(() => this.log(`getWeeklyHealthData() with date ${formattedDate}`)),
        catchError(this.handleError<HealthWrapperModel>('getWeeklyHealthData'))
    );
  }

  /*
  * Get last found date, that was imported to server db from watch
  */
  getLastImportDate(): Observable<DateWrapperModel> {

    return this.http.get<DateWrapperModel>(this.healthDataUrl.concat("healthData/date/last/"))
      .pipe(
        tap((receivedData: DateWrapperModel) => console.log(receivedData)),
        tap(() => this.log('getLastImportDate()')),
        catchError(this.handleError<DateWrapperModel>('getLastImportDate'))
    );
  }

  /*
  * Get weight by given date
  */
  getWeight(dateToShow: Date): Observable<WeightWrapperModel> {

    var formattedDate = this.formatDateForApiCall(dateToShow);

    return this.http.get<WeightWrapperModel>(this.healthDataUrl.concat("weight/", formattedDate))
      .pipe(
        tap((receivedData: WeightWrapperModel) => console.log(receivedData)),
        tap(() => this.log('getWeight()')),
        catchError(this.handleError<WeightWrapperModel>('getWeight'))
    );
  }

  /*
  * Set weight for given date
  */
  setWeight(weight: number, dateForUpdate: Date) {

    var formattedDate = this.formatDateForApiCall(dateForUpdate);

    console.info("OnSetWeight for " + this.healthDataUrl.concat("post/"))

    const headers = { 'Content-Type': 'application/json' };
    const body = { weight: weight, date: formattedDate};

    var postId: number;

    this.http.post<any>(this.healthDataUrl.concat("weight/"), body, { headers }).subscribe(data => {
        postId = data.id;
    });

    console.info(postId);
  }

  /**
  * Log a SmartWatchService message with the MessageService
  */
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

  private formatDateForApiCall(dateToFormat: Date) {
    //get and format date for api call
    var dd = String(dateToFormat.getDate()).padStart(2, '0');
    var mm = String(dateToFormat.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = dateToFormat.getFullYear();

    var formattedDate = yyyy + '-' + mm + '-' + dd;
    return formattedDate;
  }
}
