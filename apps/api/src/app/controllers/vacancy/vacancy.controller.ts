import { Controller, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';

import { Vacancy, VacancyDetails } from '@el/api-interfaces';

import { VacancyService } from '../../services/vacancy/vacancy.service';

@Controller()
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @Get('vacancies')
  getVacancies(): Observable<Vacancy[]> {
    return this.vacancyService.getVacancies();
  }

  @Get('vacancy/:id')
  getVacancyDetails(@Param('id') id): Observable<VacancyDetails> {
    return this.vacancyService.getVacancy(id);
  }
}
