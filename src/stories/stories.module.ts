import { Module } from '@nestjs/common';
import { StoriesController } from './controllers/stories.controller';
import { StoriesService } from './services/stories.service';

@Module({
  exports: [StoriesService],
  controllers: [StoriesController],
  providers: [StoriesService],
})
export class StoriesModule {}
