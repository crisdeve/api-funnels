import { Injectable } from '@nestjs/common';
import { Store } from 'src/stores/entities/store.entity';
import { StoriesService } from 'src/stories/services/stories.service';

@Injectable()
export class StoresService {
  constructor(private storiesServices: StoriesService) {}
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

  getStories(id: number): Store {
    return {
      id,
      name: 'sss',
      stories: this.storiesServices.getAll(),
    };
  }
}
