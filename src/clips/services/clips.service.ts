import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClipDto, UpdateClipDto } from '../dtos/clip.dto';
import { Master } from 'src/utils/Master';
import { Clip } from '../entities/clip.entity';
import { CreateOptionDto, UpdateOptionDto } from '../dtos/option.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

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
    let errors = [];
    let deleted = [];

    ids.forEach((id) => {
      const deleteExec = this.clips.findByIdAndDelete(id).exec();
      if (!deleteExec) {
        errors = [`The ${id} id not exist !`, ...errors];
      } else {
        deleted = [id, ...deleted];
      }
    });

    if (errors.length > 0) {
      return {
        deleted,
        failed: errors,
      };
    }

    return 'All ids are deleted from DB';
  }

  deleteClip(id: string) {
    return this.clips.findByIdAndDelete(id).exec();
  }

  updateClip(id: string, data: UpdateClipDto) {
    const clip = this.clips.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true },
    );

    if (!clip) return;

    return clip;
  }

  async addNewOption(id: string, data: CreateOptionDto) {
    const clip = await this.clips.findById(id);
    clip.options.push(data);
    clip.save();
  }

  async updateOptions(id: string, idOption: number, data: UpdateOptionDto) {
    const query = {
      _id: id,
      'options._id': idOption,
    };

    const update = {
      $set: {
        'options.$': {
          _id: new ObjectId(idOption),
          ...data,
        },
      },
    };

    const updateClip = await this.clips.updateOne(query, update);
    if (updateClip.modifiedCount > 0) {
      return {
        message: `Update option ${idOption}`,
      };
    }
    return { message: 'You do not have any changes' };
  }
}
