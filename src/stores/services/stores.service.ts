import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClipDto } from 'src/clips/dtos/clip.dto';
import { Store } from 'src/stores/entities/store.entity';
import { StoriesService } from 'src/stories/services/stories.service';
import { Master } from 'src/utils/Master';

@Injectable()
export class StoresService extends Master {
  constructor(
    private storiesServices: StoriesService,
    @InjectModel(Store.name) private stores: Model<Store>,
  ) {
    super();
  }

  getAll(): any {
    return this.stores.find().exec();
  }

  getStoreById(id: string): any {
    return this.stores.findById(id).exec();
  }

  getStoriesByStore(id: string) {
    return this.stores.findById(id).exec();
  }

  async addStoryStore(id: string, payload: CreateClipDto) {
    return await this.storiesServices.createStory(id, payload);
  }
}
