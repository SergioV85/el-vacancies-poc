import { Module, HttpModule } from '@nestjs/common';

import { VacancyController } from './controllers/vacancy/vacancy.controller';
import { VacancyService } from './services/vacancy/vacancy.service';
import { ServiceNowProxyService } from './services/service-now-proxy/service-now-proxy.service';

@Module({
  imports: [HttpModule],
  controllers: [VacancyController],
  providers: [VacancyService, ServiceNowProxyService],
})
export class AppModule {}
