import { Test } from '@nestjs/testing';

import { VacancyService } from './vacancy.service';

describe('VacancyService', () => {
  let service: VacancyService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [VacancyService],
    }).compile();

    service = app.get<VacancyService>(VacancyService);
  });

  describe('getData', () => {});
});
