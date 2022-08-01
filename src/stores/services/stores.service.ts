import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Store } from 'src/stores/entities/store.entity';
import { Story } from 'src/stories/entities/story.entity';
import { StoriesService } from 'src/stories/services/stories.service';
import { Master } from 'src/utils/Master';

@Injectable()
export class StoresService extends Master {
  constructor(
    private storiesServices: StoriesService,
    private config: ConfigService,
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

  getStoreById(id: number): any {
    return super.findId(this.stores, id)[0];
  }

  getStoriesStore(id: number): Story[] {
    const allStories: Story[] = this.storiesServices.getAll();

    return allStories.filter(({ storeId }) => storeId === id);
  }
}
