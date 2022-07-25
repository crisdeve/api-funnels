import { Global, Module } from '@nestjs/common';
const API_KEY = '123456';

@Global()
@Module({
  providers: [
    {
      provide: 'api',
      useValue: API_KEY,
    },
  ],
  exports: ['api'],
})
export class DatabaseModule {}
