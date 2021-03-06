import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateClipDto, UpdateClipDto } from 'src/stories/dtos/clip.dto';
import { StoriesService } from 'src/stories/services/stories.service';

@Controller('stories')
export class StoriesController {
  constructor(private services: StoriesService) {}

  @Get()
  getStories(): Array<object> {
    return this.services.getAll();
  }

  @Get(':id')
  getStory(@Param('id', ParseIntPipe) id: number) {
    return this.services.getStory(id);
  }

  @Get(':id/clips/:clip')
  @HttpCode(HttpStatus.OK)
  getClip(
    @Param('id', ParseIntPipe) id: number,
    @Param('clip', ParseIntPipe) clipId: number,
  ): object {
    return this.services.getClip(id, clipId);
  }

  @Post()
  createStory(@Body() payload: CreateClipDto): object {
    return this.services.createStory(payload);
  }

  @Put(':id')
  updateStory(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateClipDto,
  ) {
    return this.services.addClip(id, payload);
  }

  @Put(':id/clips/:clip')
  updateClip(
    @Param('id', ParseIntPipe) id: number,
    @Param('clip', ParseIntPipe) clipId: number,
    @Body() payload: UpdateClipDto,
  ) {
    return this.services.updateClip(id, clipId, payload);
  }

  @Delete(':id')
  deleteStory(@Param('id', ParseIntPipe) id: number) {
    return this.services.deleteStory(id);
  }

  @Delete(':id/clips/:clip')
  deleteClip(
    @Param('id', ParseIntPipe) id: number,
    @Param('clip', ParseIntPipe) clipId: number,
  ) {
    return this.services.deleteClip(id, clipId);
  }
}
