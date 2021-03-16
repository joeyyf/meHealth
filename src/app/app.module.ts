import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HealthDetailsComponent } from './health-details/health-details.component';
import { MessagesComponent } from './messages/messages.component';

import { ChartsModule } from 'ng2-charts';
import { ChartsComponent } from './charts/charts.component';

import { registerLocaleData } from "@angular/common";
import localeDe from "@angular/common/locales/de";
import { HeaderComponent } from './header/header.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MdbModule } from 'mdb-angular-ui-kit';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { HealthDetailsWeeklyComponent } from './health-details-weekly/health-details-weekly.component';
import { HealthDetailsMonthlyComponent } from './health-details-monthly/health-details-monthly.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HealthDetailsComponent,
    MessagesComponent,
    ChartsComponent,
    HeaderComponent,
    HealthDetailsWeeklyComponent,
    HealthDetailsMonthlyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    MdbModule,
    NoopAnimationsModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "de-DE" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

registerLocaleData(localeDe, "de");
