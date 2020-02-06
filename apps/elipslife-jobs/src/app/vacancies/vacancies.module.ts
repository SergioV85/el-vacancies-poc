import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { VacanciesListComponent, VacancyDetailsComponent, VacancyApplyComponent } from './components';

export const routes: Routes = [
  {
    path: '',
    component: VacanciesListComponent,
  },
  {
    path: ':di',
    component: VacancyDetailsComponent,
  },
];

@NgModule({
  declarations: [VacanciesListComponent, VacancyDetailsComponent, VacancyApplyComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class VacanciesModule {}
