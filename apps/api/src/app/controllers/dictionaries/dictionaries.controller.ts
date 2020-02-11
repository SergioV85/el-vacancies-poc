import { Controller, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';

import { Vacancy, VacancyDetails } from '@el/api-interfaces';

import { DictionariesService } from '../../services/dictionaries/dictionaries.service';

@Controller()
export class DictionariesController {
  constructor(private readonly dictionariesService: DictionariesService) {}

  @Get('dictionaries/vacancy/:id')
  getDictionariesForVacancy(@Param('id') id) {
    return this.dictionariesService.getDictionariesForVacancy(id);
  }
}
