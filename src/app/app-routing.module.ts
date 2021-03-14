import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthDetailsComponent } from './health-details/health-details.component'
import { HealthDetailsWeeklyComponent } from './health-details-weekly/health-details-weekly.component'
import { HealthDetailsMonthlyComponent } from './health-details-monthly/health-details-monthly.component'

const routes: Routes = [
  { path: '', redirectTo: '/daily', pathMatch: 'full' },
  { path: 'daily', component: HealthDetailsComponent },
  { path: 'weekly', component: HealthDetailsWeeklyComponent },
  { path: 'monthly', component: HealthDetailsMonthlyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
