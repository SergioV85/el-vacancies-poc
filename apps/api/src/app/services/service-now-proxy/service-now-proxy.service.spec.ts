import { Test } from '@nestjs/testing';

import { ServiceNowProxyService } from './service-now-proxy.service';

describe('ServiceNowProxyService', () => {
  let service: ServiceNowProxyService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [ServiceNowProxyService],
    }).compile();

    service = app.get<ServiceNowProxyService>(ServiceNowProxyService);
  });

  describe('getData', () => {});
});
