import { Inject, Injectable } from '@nestjs/common';
import { async } from 'rxjs';
import { CreateClipDto } from 'src/clips/dtos/clip.dto';
import { Store } from 'src/stores/entities/store.entity';
import { Story } from 'src/stories/entities/story.entity';
import { StoriesService } from 'src/stories/services/stories.service';
import { Master } from 'src/utils/Master';

@Injectable()
export class StoresService extends Master {
  constructor(
    private storiesServices: StoriesService,
    @Inject('mongo') private db,
  ) {
    super();
  }

  private stores: Store[] = [
    {
      id: 1,
      name: 'my-store.com',
    },
    {
      id: 2,
      name: 'adidas.com',
    },
  ];

  getAll(): Store[] {
    return this.stores;
  }

  getStoreById(id: number): Store {
    return super.findId(this.stores, id)[0];
  }

  /*   getStoriesByStore(id: number): Story[] {
    const allStories: Story[] = this.storiesServices.getAll();

    return allStories.filter(({ storeId }) => storeId === id);
  }
   */

  async addStoryStore(id: number, payload: CreateClipDto) {
    return await this.storiesServices.createStory(id, payload);
  }

  requestDataTest() {
    const stories = this.db.collection('stories');
    const data = stories.find().toArray();

    return data;
  }
}
