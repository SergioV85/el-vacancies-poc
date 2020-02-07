import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './libs/components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './libs/components/footer/footer.component';

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
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: false,
      scrollPositionRestoration: 'disabled',
      anchorScrolling: 'disabled',
    }),
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
