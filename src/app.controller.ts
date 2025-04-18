import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

class AddNumbersDto {
  a: number;
  b: number;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
