import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { UpdateClipDto } from '../dtos/clip.dto';
import { CreateOptionDto, UpdateOptionDto } from '../dtos/option.dto';
import { ClipsService } from '../services/clips.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('clips')
@Controller('clips')
export class ClipsController {
  constructor(private services: ClipsService) {}

  @Get()
  getClips() {
    return this.services.getAll();
  }

  @Get(':id')
  getClipById(@Param('id', ParseIntPipe) id: number) {
    return this.services.getClip(id);
  }

  @Put(':id')
  updateClip(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateClipDto,
  ) {
    return this.services.updateClip(id, payload);
  }

  @Put(':id/options')
  addOption(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateOptionDto,
  ) {
    return this.services.addNewOption(id, payload);
  }

  @Put(':id/options/:idOption')
  updateOption(
    @Param('id', ParseIntPipe) id: number,
    @Param('idOption', ParseIntPipe) idOption: number,
    @Body() payload: UpdateOptionDto,
  ) {
    return this.services.updateOptions(id, idOption, payload);
  }
}
