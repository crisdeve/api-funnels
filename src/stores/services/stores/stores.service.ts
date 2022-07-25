import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Store } from 'src/stores/entities/store.entity';
import { StoriesService } from 'src/stories/services/stories.service';

@Injectable()
export class StoresService {
  constructor(
    private storiesServices: StoriesService,
    private config: ConfigService,
  ) {}

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
    return id + ' -- ' + this.config.get('API_KEY');
    /* return this.findId(this.stores, id); */
  }

  getStories(id: number): Store {
    return {
      id,
      name: 'sss',
      stories: this.storiesServices.getAll(),
    };
  }
}
