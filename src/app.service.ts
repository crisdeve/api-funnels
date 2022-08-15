import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from 'config';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configData: ConfigType<typeof config>,
  ) {}

  getHello(): string {
    return `Hello World! ${this.configData.apiKey} DB: ${this.configData.database.name}`;
  }
}
