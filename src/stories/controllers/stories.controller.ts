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
  getStories(): Story[] {
    return this.servicesStories.getAll();
  }

  @Get(':id')
  getStory(@Param('id', ParseIntPipe) id: number): Story {
    return this.servicesStories.getStory(id);
  }

  @Put(':id')
  updateStory(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateClipDto,
  ): Story {
    return this.servicesStories.addClipStory(id, payload);
  }

  @Delete(':id')
  deleteStory(@Param('id', ParseIntPipe) id: number): Story[] {
    return this.servicesStories.deleteStory(id);
  }

  @Delete(':id/clips/:clip')
  deleteClip(
    @Param('id', ParseIntPipe) id: number,
    @Param('clip', ParseIntPipe) clipId: number,
  ): number[] {
    return this.servicesStories.deleteClip(id, clipId);
  }
}
