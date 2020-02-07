import { Test, TestingModule } from '@nestjs/testing';

import { VacancyController } from './vacancy.controller';
import { VacancyService } from '../../services/vacancy/vacancy.service';

describe('VacancyController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [VacancyController],
      providers: [VacancyService],
    }).compile();
  });

  describe('getData', () => {});
});
