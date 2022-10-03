import { Injectable } from '@nestjs/common';
import { CreateClipDto, UpdateClipDto } from '../dtos/clip.dto';
import { Master } from 'src/utils/Master';
import { Clip } from '../entities/clip.entity';
import { CreateOptionDto, UpdateOptionDto } from '../dtos/option.dto';
import { Option } from '../entities/option.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ClipsService extends Master {
  constructor(@InjectModel(Clip.name) private clips: Model<Clip>) {
    super();
  }

  async getAll() {
    return await this.clips.find().exec();
  }

  async getClip(id: string) {
    const clipById = await this.clips.findById(id).exec();
    return clipById;
  }

  addClip(data: CreateClipDto) {
    const createClip = new this.clips(data);
    createClip.save();

    return createClip._id.toString();
  }

  deleteClips(ids: string[]) {
    let allDelete = true;

    ids.forEach((id) => {
      const deleteExec = this.clips.findByIdAndDelete(id).exec();
      if (!deleteExec) allDelete = false;
    });

    return allDelete;
  }

  deleteClip(id: string) {
    return this.clips.findByIdAndDelete(id).exec();
  }

  /*
  updateClip(id: number, data: UpdateClipDto) {
    const [clip, index] = this.findId(this.clips, id);

    this.clips[index] = {
      ...clip,
      ...data,
    };

    return this.clips[index];
  }

  addNewOption(id: number, data: CreateOptionDto): Option[] {
    const [clip, index] = this.findId(this.clips, id);
    const idOption: number = super.createId(clip.orderOptions);

    const newOption = {
      id: idOption,
      ...data,
    };

    this.clips[index].options.push(newOption);
    this.clips[index].orderOptions.push(idOption);

    return this.clips[index].options;
  }

  updateOptions(id: number, idOption: number, data: UpdateOptionDto): Option[] {
    const [clip, index] = this.findId(this.clips, id);
    const [option, indexOp] = this.findId(clip.options, idOption);

    const update = {
      ...option,
      ...data,
    };

    this.clips[index].options[indexOp] = update;

    return this.clips[index].options;
  }
  */
}
