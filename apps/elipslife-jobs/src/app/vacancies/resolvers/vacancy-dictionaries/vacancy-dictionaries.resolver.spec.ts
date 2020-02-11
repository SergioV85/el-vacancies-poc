import { TestBed, async, inject } from '@angular/core/testing';

import { VacancyDictionariesResolver } from './vacancy-dictionaries.resolver';

describe('VacancyDictionariesResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VacancyDictionariesResolver],
    });
  });

  it('should ...', inject([VacancyDictionariesResolver], (guard: VacancyDictionariesResolver) => {
    expect(guard).toBeTruthy();
  }));
});
