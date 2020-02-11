import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { VacancyDetails } from '@el/api-interfaces';
import { VacanciesService } from './../../../libs/services/vacancies/vacancies.service';

@Injectable({
  providedIn: 'root',
})
export class VacancyDetailsResolver implements Resolve<Observable<VacancyDetails>> {
  constructor(private readonly vacanciesService: VacanciesService) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<VacancyDetails> {
    return this.vacanciesService.getVacancyDetails(route.params.id);
  }
}
