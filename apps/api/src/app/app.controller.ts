import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';

import { Vacancy } from '@el/api-interfaces';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('vacancies')
  getVacancies(): Observable<Vacancy[]> {
    return this.appService.getVacancies('', []);
  }
}
