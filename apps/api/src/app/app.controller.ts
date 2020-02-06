import { Controller, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';

import { Vacancy, VacancyDetails } from '@el/api-interfaces';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('vacancies')
  getVacancies(): Observable<Vacancy[]> {
    return this.appService.getVacancies();
  }

  @Get('vacancy/:id')
  getVacancyDetails(@Param('id') id): Observable<VacancyDetails> {
    return this.appService.getVacancy(id);
  }
}
