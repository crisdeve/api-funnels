import { Injectable } from '@nestjs/common';
import { CreateClipDto } from 'src/clips/dtos/clip.dto';
import { Store } from 'src/stores/entities/store.entity';
import { Story } from 'src/stories/entities/story.entity';
import { StoriesService } from 'src/stories/services/stories.service';
import { Master } from 'src/utils/Master';

@Injectable()
export class StoresService extends Master {
  constructor(private storiesServices: StoriesService) {
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

  getStoriesByStore(id: number): Story[] {
    const allStories: Story[] = this.storiesServices.getAll();

    return allStories.filter(({ storeId }) => storeId === id);
  }

  addStoryStore(id: number, payload: CreateClipDto): Story {
    return this.storiesServices.createStory(id, payload);
  }
}
