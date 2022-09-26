import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClipsController } from './controllers/clips.controller';
import { Clip, ClipSchema } from './entities/clip.entity';
import { ClipsService } from './services/clips.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Clip.name,
        schema: ClipSchema,
      },
    ]),
  ],
  exports: [ClipsService],
  controllers: [ClipsController],
  providers: [ClipsService],
})
export class ClipsModule {}
