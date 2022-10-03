import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { CreateClipDto } from 'src/clips/dtos/clip.dto';
import { StoriesService } from 'src/stories/services/stories.service';
import { ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@ApiTags('stories')
@Controller('stories')
export class StoriesController {
  constructor(private servicesStories: StoriesService) {}

  @Get()
  getStories() {
    return this.servicesStories.getAll();
  }

  @Get(':id')
  getStory(@Param('id', MongoIdPipe) id: string) {
    return this.servicesStories.getStory(id);
  }

  @Put(':id')
  updateStory(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: CreateClipDto,
  ) {
    return this.servicesStories.addClipStory(id, payload);
  }

  @Delete(':id')
  deleteStory(@Param('id', MongoIdPipe) id: string) {
    return this.servicesStories.deleteStory(id);
  }

  @Delete(':id/clips/:clip')
  deleteClip(
    @Param('id', MongoIdPipe) id: string,
    @Param('clip', MongoIdPipe) clipId: string,
  ) {
    return this.servicesStories.deleteClip(id, clipId);
  }
}
