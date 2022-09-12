import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Store } from 'src/stores/entities/store.entity';
import { StoresService } from 'src/stores/services/stores.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateClipDto } from 'src/clips/dtos/clip.dto';
import { Story } from 'src/stories/entities/story.entity';

@ApiTags('store')
@Controller('stores')
export class StoresController {
  constructor(private services: StoresService) {}

  @Get()
  getStores(): Array<Store> {
    return this.services.getAll();
  }

  @Get(':id')
  getStore(@Param('id', ParseIntPipe) id: number): Store {
    return this.services.getStoreById(id);
  }

  /* @Get(':id/stories')
  getStoriesByStore(@Param('id', ParseIntPipe) id: number): Story[] {
    return this.services.getStoriesByStore(id);
  }

  @Post(':id/stories')
  createStory(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateClipDto,
  ): Story {
    return this.services.addStoryStore(id, payload);
  } */

  @Get(':id/test')
  testDB() {
    return this.services.requestDataTest();
  }
}
