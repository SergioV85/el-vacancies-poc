import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { VacancyDetails, DictionaryItem } from '@el/api-interfaces';
import { VacanciesService } from './../../../libs/services/vacancies/vacancies.service';
import { DictionariesService } from '../../../libs/services/dictionaries/dictionaries.service';

@Injectable({
  providedIn: 'root',
})
export class VacancyDictionariesResolver implements Resolve<Observable<DictionaryItem[]>> {
  constructor(private readonly dictionariesService: DictionariesService) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<DictionaryItem[]> {
    return this.dictionariesService.getDictionariesForVacancy(route.params.id);
  }
}
