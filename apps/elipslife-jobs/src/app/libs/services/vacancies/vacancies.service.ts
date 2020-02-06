import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vacancy, VacancyDetails } from '@el/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class VacanciesService {
  constructor(private readonly http: HttpClient) {}

  public getVacancies(): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>('/api/vacancies');
  }

  public getVacancyDetails(id: string): Observable<VacancyDetails> {
    return this.http.get<VacancyDetails>(`/api/vacancy/${id}`);
  }
}
