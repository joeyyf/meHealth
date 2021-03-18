import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthDetailsComponent } from './health-details/health-details.component'
import { HealthDetailsWeeklyComponent } from './health-details-weekly/health-details-weekly.component'

const routes: Routes = [
  { path: '', redirectTo: '/daily', pathMatch: 'full' },
  { path: 'daily', component: HealthDetailsComponent },
  { path: 'daily/:year/:month/:day', component: HealthDetailsComponent },
  { path: 'weekly', component: HealthDetailsWeeklyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
