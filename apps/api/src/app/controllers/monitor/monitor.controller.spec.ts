import { Test, TestingModule } from '@nestjs/testing';

import { MonitorController } from './monitor.controller';

describe('MonitorController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [MonitorController],
    }).compile();
  });

  describe('getCheck', () => {});
});
