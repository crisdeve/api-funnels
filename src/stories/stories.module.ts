import { Module } from '@nestjs/common';
import { ClipsModule } from 'src/clips/clips.module';
import { StoriesController } from './controllers/stories.controller';
import { StoriesService } from './services/stories.service';

@Module({
  exports: [StoriesService],
  imports: [ClipsModule],
  controllers: [StoriesController],
  providers: [StoriesService],
})
export class StoriesModule {}
