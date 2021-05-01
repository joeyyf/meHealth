import { Injectable } from '@angular/core';
import { HealthModel } from './healthModel';
import { HealthWrapperModel } from './healthWrapperModel';
import { DateWrapperModel } from './dateWrapperModel';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SmartWatchService {

  tempHealthModels: HealthModel[] = [];
  private healthDataUrl = 'http://fileserver:8000/api/healthData/';  // URL to web api

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  /**
  * Get health data from REST service api by given date
  */
  getHealthData(dateToShow: Date): Observable<HealthWrapperModel> {

    //get and format date for api call
    var dd = String(dateToShow.getDate()).padStart(2, '0');
    var mm = String(dateToShow.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = dateToShow.getFullYear();

    var formattedDate = yyyy + '-' + mm + '-' + dd;

    return this.http.get<HealthWrapperModel>(this.healthDataUrl.concat(formattedDate))
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

    //get and format date for api call
    var dd = String(dateToShow.getDate()).padStart(2, '0');
    var mm = String(dateToShow.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = dateToShow.getFullYear();

    var formattedDate = yyyy + '-' + mm + '-' + dd;

    return this.http.get<HealthWrapperModel>(this.healthDataUrl.concat("week/", formattedDate))
      .pipe(
        tap((receivedData: HealthWrapperModel) => console.log(receivedData)),
        tap(() => this.log(`getWeeklyHealthData() with date ${formattedDate}`)),
        catchError(this.handleError<HealthWrapperModel>('getWeeklyHealthData'))
    );
  }

  getLastImportDate(): Observable<DateWrapperModel> {

    return this.http.get<DateWrapperModel>(this.healthDataUrl.concat("date/last/"))
      .pipe(
        tap((receivedData: DateWrapperModel) => console.log(receivedData)),
        tap(() => this.log('getLastImportDate()')),
        catchError(this.handleError<DateWrapperModel>('getLastImportDate'))
    );
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
}
