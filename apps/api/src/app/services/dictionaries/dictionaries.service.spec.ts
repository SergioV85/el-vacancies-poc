import { Test } from '@nestjs/testing';

import { DictionariesService } from './dictionaries.service';

describe('DictionariesService', () => {
  let service: DictionariesService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [DictionariesService],
    }).compile();

    service = app.get<DictionariesService>(DictionariesService);
  });

  describe('getData', () => {});
});
