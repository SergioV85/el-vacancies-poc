import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DictionaryItem } from '@el/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class DictionariesService {
  constructor(private readonly http: HttpClient) {}

  public getDictionariesForVacancy(id: string) {
    return this.http.get<DictionaryItem[]>(`/api/dictionaries/vacancy/${id}`);
  }
}
