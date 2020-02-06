import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './libs/components/header/header.component';

export const routes: Routes = [
  {
    path: 'vacancies',
    loadChildren: () => import('./vacancies/vacancies.module').then(m => m.VacanciesModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'vacancies',
  },
];

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: false,
      scrollPositionRestoration: 'disabled',
      anchorScrolling: 'disabled',
    }),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
