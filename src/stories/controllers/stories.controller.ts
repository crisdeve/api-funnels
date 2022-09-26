import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateClipDto } from 'src/clips/dtos/clip.dto';
import { StoriesService } from 'src/stories/services/stories.service';
import { ApiTags } from '@nestjs/swagger';
import { Story } from '../entities/story.entity';

@ApiTags('stories')
@Controller('stories')
export class StoriesController {
  constructor(private servicesStories: StoriesService) {}

  @Get()
  getStories() {
    return this.servicesStories.getAll();
  }

  @Get(':id')
  getStory(@Param('id') id: string) {
    return this.servicesStories.getStory(id);
  }

  @Put(':id')
  updateStory(@Param('id') id: string, @Body() payload: CreateClipDto) {
    return this.servicesStories.addClipStory(id, payload);
  }

  @Delete(':id')
  deleteStory(@Param('id') id: string) {
    return this.servicesStories.deleteStory(id);
  }

  @Delete(':id/clips/:clip')
  deleteClip(@Param('id') id: string, @Param('clip') clipId: string) {
    return this.servicesStories.deleteClip(id, clipId);
  }
}
