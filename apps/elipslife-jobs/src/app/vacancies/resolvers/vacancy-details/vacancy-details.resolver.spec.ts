import { TestBed, async, inject } from '@angular/core/testing';

import { VacancyDetailsResolverGuard } from './vacancy-details-resolver.guard';

describe('VacancyDetailsResolverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VacancyDetailsResolverGuard]
    });
  });

  it('should ...', inject([VacancyDetailsResolverGuard], (guard: VacancyDetailsResolverGuard) => {
    expect(guard).toBeTruthy();
  }));
});
