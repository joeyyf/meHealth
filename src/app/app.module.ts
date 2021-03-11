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

@NgModule({
  declarations: [
    AppComponent,
    HealthDetailsComponent,
    MessagesComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "de-DE" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

registerLocaleData(localeDe, "de");
