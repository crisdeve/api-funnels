import { Module } from '@nestjs/common';
import { StoriesModule } from 'src/stories/stories.module';
import { StoresController } from './controllers/stores/stores.controller';
import { StoresService } from './services/stores/stores.service';

@Module({
  controllers: [StoresController],
  providers: [StoresService],
  imports: [StoriesModule],
})
export class StoresModule {}
