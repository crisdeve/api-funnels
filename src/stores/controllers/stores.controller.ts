import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Store } from 'src/stores/entities/store.entity';
import { StoresService } from 'src/stores/services/stores.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('store')
@Controller('stores')
export class StoresController {
  constructor(private services: StoresService) {}

  @Get()
  getStores(): Array<Store> {
    return this.services.getAll();
  }

  @Get(':id')
  getStore(@Param('id', ParseIntPipe) id: number) {
    return this.services.getStoreById(id);
  }

  @Get(':id/stories')
  getStoriesByStore(@Param('id', ParseIntPipe) id: number) {
    return this.services.getStoriesStore(id);
  }
}
