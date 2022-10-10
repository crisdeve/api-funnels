import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StoresService } from 'src/stores/services/stores.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateClipDto } from 'src/clips/dtos/clip.dto';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { CreateStoreDto } from '../dtos/store.dto';

@ApiTags('store')
@Controller('stores')
export class StoresController {
  constructor(private services: StoresService) {}

  @Get()
  getStores(): Array<any> {
    return this.services.getAll();
  }

  @Post()
  createStore(@Body() payload: CreateStoreDto) {
    return this.services.createStore(payload);
  }

  @Get(':id')
  getStore(@Param('id', MongoIdPipe) id: string) {
    return this.services.getStoreById(id);
  }

  @Get(':id/stories')
  getStoriesByStore(@Param('id', MongoIdPipe) id: string) {
    return this.services.getStoriesByStore(id);
  }

  @Post(':id/stories')
  createStory(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: CreateClipDto,
  ) {
    return this.services.addStoryStore(id, payload);
  }
}
