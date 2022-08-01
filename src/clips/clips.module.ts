import { Module } from '@nestjs/common';
import { ClipsController } from './controllers/clips.controller';
import { ClipsService } from './services/clips.service';

@Module({
  exports: [ClipsService],
  controllers: [ClipsController],
  providers: [ClipsService],
})
export class ClipsModule {}
