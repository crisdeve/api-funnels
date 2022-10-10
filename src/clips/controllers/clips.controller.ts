import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { UpdateClipDto } from '../dtos/clip.dto';
import { CreateOptionDto, UpdateOptionDto } from '../dtos/option.dto';
import { ClipsService } from '../services/clips.service';
import { ApiTags } from '@nestjs/swagger';
import { Clip } from '../entities/clip.entity';
import { Option } from '../entities/option.entity';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@ApiTags('clips')
@Controller('clips')
export class ClipsController {
  constructor(private services: ClipsService) {}

  @Get()
  getClips() {
    return this.services.getAll();
  }

  @Get(':id')
  getClipById(@Param('id', MongoIdPipe) id: string) {
    return this.services.getClip(id);
  }

  @Put(':id')
  updateClip(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateClipDto,
  ) {
    return this.services.updateClip(id, payload);
  }

  @Put(':id/options')
  addOption(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: CreateOptionDto,
  ) {
    return this.services.addNewOption(id, payload);
  }

  @Put(':id/options/:idOption')
  updateOption(
    @Param('id', MongoIdPipe) id: string,
    @Param('idOption', MongoIdPipe) idOption: number,
    @Body() payload: UpdateOptionDto,
  ) {
    return this.services.updateOptions(id, idOption, payload);
  }

  @Delete(':id')
  deleteClip(@Param('id', MongoIdPipe) id: string) {
    return this.services.deleteClip(id);
  }
}
