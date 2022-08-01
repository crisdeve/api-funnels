import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateClipDto } from 'src/clips/dtos/clip.dto';
import { StoriesService } from 'src/stories/services/stories.service';

@Controller('stories')
export class StoriesController {
  constructor(private servicesStories: StoriesService) {}

  @Get()
  getStories(): Array<object> {
    return this.servicesStories.getAll();
  }

  @Get(':id')
  getStory(@Param('id', ParseIntPipe) id: number) {
    return this.servicesStories.getStory(id);
  }

  @Post()
  createStory(
    @Body('storeId', ParseIntPipe) storeId: number,
    @Body('data') payload: CreateClipDto,
  ): object {
    return this.servicesStories.createStory(storeId, payload);
  }

  @Put(':id')
  updateStory(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateClipDto,
  ) {
    return this.servicesStories.addClip(id, payload);
  }

  @Delete(':id')
  deleteStory(@Param('id', ParseIntPipe) id: number) {
    return this.servicesStories.deleteStory(id);
  }

  @Delete(':id/clips/:clip')
  deleteClip(
    @Param('id', ParseIntPipe) id: number,
    @Param('clip', ParseIntPipe) clipId: number,
  ) {
    return this.servicesStories.deleteClip(id, clipId);
  }
}
