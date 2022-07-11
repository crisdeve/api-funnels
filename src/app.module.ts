import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoriesModule } from './stories/stories.module';
import { StoresModule } from './stores/stores.module';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [StoriesModule, StoresModule, CustomersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
