import { Injectable } from '@nestjs/common';
import { CreateClipDto, UpdateClipDto } from '../dtos/clip.dto';
import { Master } from 'src/utils/Master';
import { Clip } from '../entities/clip.entity';

@Injectable()
export class ClipsService extends Master {
  constructor() {
    super();
  }

  private clips: Clip[] = [
    {
      id: 1,
      file: 'https://hardcode/video.mp4',
      comment: 'Other comment',
    },
    {
      id: 2,
      file: 'https://hardcode/video_2.mp4',
    },
  ];

  getAll() {
    return this.clips;
  }

  getClip(id: number) {
    return super.findId(this.clips, id)[0];
  }

  addClip(data: CreateClipDto): (Clip | number)[] {
    const ids = super.ids(this.clips);
    const id = super.createId(ids);

    const newClip: Clip = {
      id: id,
      ...data,
    };

    this.clips.push(newClip);

    return [newClip, id];
  }

  updateClip(id: number, data: UpdateClipDto) {
    const [clip, index] = this.findId(this.clips, id);

    this.clips[index] = {
      ...clip,
      ...data,
    };

    return this.clips;
  }

  deleteClip(id: number) {
    return (this.clips = super.delete(this.clips, id));
  }
}
