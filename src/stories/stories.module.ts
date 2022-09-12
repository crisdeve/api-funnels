import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClipsModule } from 'src/clips/clips.module';
import { StoriesController } from './controllers/stories.controller';
import { Story, StorySchema } from './entities/story.entity';
import { StoriesService } from './services/stories.service';

@Module({
  exports: [StoriesService],
  imports: [
    ClipsModule,
    MongooseModule.forFeature([
      {
        name: Story.name,
        schema: StorySchema,
      },
    ]),
  ],
  controllers: [StoriesController],
  providers: [StoriesService],
})
export class StoriesModule {}
