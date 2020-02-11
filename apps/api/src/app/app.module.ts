import { Module, HttpModule } from '@nestjs/common';

import { MonitorController } from './controllers/monitor/monitor.controller';
import { VacancyController } from './controllers/vacancy/vacancy.controller';
import { VacancyService } from './services/vacancy/vacancy.service';
import { ServiceNowProxyService } from './services/service-now-proxy/service-now-proxy.service';
import { DictionariesController } from './controllers/dictionaries/dictionaries.controller';
import { DictionariesService } from './services/dictionaries/dictionaries.service';

@Module({
  imports: [HttpModule],
  controllers: [DictionariesController, MonitorController, VacancyController],
  providers: [DictionariesService, VacancyService, ServiceNowProxyService],
})
export class AppModule {}
