import { Test, TestingModule } from '@nestjs/testing';

import { DictionariesController } from './dictionaries.controller';
import { DictionariesService } from '../../services/dictionaries/dictionaries.service';

describe('DictionariesController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [DictionariesController],
      providers: [DictionariesService],
    }).compile();
  });

  describe('getData', () => {});
});
