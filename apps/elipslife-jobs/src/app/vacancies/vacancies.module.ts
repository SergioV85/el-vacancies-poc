import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VacanciesListComponent, VacancyDetailsComponent, VacancyApplyComponent } from './components';

export const routes: Routes = [
  {
    path: '',
    component: VacanciesListComponent,
  },
  {
    path: ':id',
    component: VacancyDetailsComponent,
  },
];

@NgModule({
  declarations: [VacanciesListComponent, VacancyDetailsComponent, VacancyApplyComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MatProgressSpinnerModule],
})
export class VacanciesModule {}
