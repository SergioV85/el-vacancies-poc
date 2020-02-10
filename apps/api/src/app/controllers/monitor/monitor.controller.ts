import { Controller, Get } from '@nestjs/common';

@Controller()
export class MonitorController {
  @Get()
  getCheck(): string {
    return `Server is up and running, current time is ${new Date().toUTCString()}`;
  }
}
