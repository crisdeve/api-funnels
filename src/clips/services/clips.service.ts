import { Injectable } from '@nestjs/common';
import { CreateClipDto, UpdateClipDto } from '../dtos/clip.dto';
import { Master } from 'src/utils/Master';
import { Clip } from '../entities/clip.entity';
import { CreateOptionDto, UpdateOptionDto } from '../dtos/option.dto';
import { Option } from '../entities/option.entity';

@Injectable()
export class ClipsService extends Master {
  constructor() {
    super();
  }

  private clips: Clip[] = [
    {
      id: 1,
      file: 'https://hardcode/video.mp4',
      comment: `What's your favorite food ?`,
      sponsor: true,
      subscription: false,
      viewOptions: 1,
      orderOptions: [0, 3, 5],
      options: [
        {
          id: 0,
          label: 'Every 1 months',
        },
        {
          id: 5,
          label: 'Every 2 months',
        },
        {
          id: 3,
          label: 'Every 3 months',
        },
      ],
    },
    {
      id: 2,
      file: 'https://hardcode/video_2.mp4',
      sponsor: false,
      subscription: false,
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

    return this.clips[index];
  }

  deleteClip(id: number) {
    return (this.clips = super.delete(this.clips, id));
  }

  deleteClips(ids: number[]) {
    return (this.clips = this.clips.filter((clip) => {
      if (ids.some((id) => id === clip.id)) return;
      return clip;
    }));
  }

  /**
   * options services
   */
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
}
