import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoriesModule } from 'src/stories/stories.module';
import { StoresController } from './controllers/stores.controller';
import { Store, storeSchema } from './entities/store.entity';
import { StoresService } from './services/stores.service';

@Module({
  controllers: [StoresController],
  imports: [
    StoriesModule,
    MongooseModule.forFeature([
      {
        name: Store.name,
        schema: storeSchema,
      },
    ]),
  ],
  providers: [StoresService],
})
export class StoresModule {}
