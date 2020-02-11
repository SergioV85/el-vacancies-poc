import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VacanciesListComponent, VacancyDetailsComponent, VacancyApplyComponent } from './components';
import { VacancyDetailsResolver } from './resolvers/vacancy-details/vacancy-details.resolver';
import { VacancyDictionariesResolver } from './resolvers/vacancy-dictionaries/vacancy-dictionaries.resolver';

export const routes: Routes = [
  {
    path: '',
    component: VacanciesListComponent,
  },
  {
    path: ':id',
    component: VacancyDetailsComponent,
    resolve: [VacancyDetailsResolver],
  },
  {
    path: ':id/apply',
    component: VacancyApplyComponent,
    resolve: [VacancyDetailsResolver, VacancyDictionariesResolver],
  },
];

@NgModule({
  declarations: [VacanciesListComponent, VacancyDetailsComponent, VacancyApplyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
  ],
})
export class VacanciesModule {}
