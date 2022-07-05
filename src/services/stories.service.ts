import { Injectable } from '@nestjs/common';
import { Clip, Story } from 'src/entities/story.entity';

@Injectable()
export class StoriesService {
  private stories: Story[] = [
    {
      id: 1,
      clips: [
        {
          id: 1,
          file: 'https://hardcode/video.mp4',
          comment: 'Other comment',
        },
        {
          id: 2,
          file: 'https://hardcode/video_2.mp4',
        },
      ],
    },
  ];

  private findId(array: Array<any>, id: string) {
    const item = array.find((item) => item.id === Number(id));
    return [item, array.indexOf(item)];
  }

  private ids(array: Array<any>) {
    return array.reduce((prev, item) => [...prev, item.id], []);
  }

  private delete(array: Array<any>, id: string) {
    return array.filter((item) => item.id !== Number(id));
  }

  private createId(ids: number[]) {
    if (ids.length === 0) return 0;
    return Math.max(...ids) + 1;
  }

  getAll(): Story[] {
    return this.stories;
  }

  getStory(id: string) {
    return this.findId(this.stories, id)[0];
  }

  getClip(id: string, clipId: string) {
    const clips = this.findId(this.stories, id)[0].clips;
    return this.findId(clips, clipId)[0];
  }

  createStory(data) {
    const ids = this.ids(this.stories);
    const newStory = {
      id: this.createId(ids),
      clips: [
        {
          id: 0,
          ...data,
        },
      ],
    };
    this.stories.push(newStory);

    return newStory;
  }

  addClip(id: string, data) {
    const [story, index] = this.findId(this.stories, id);

    const ids = this.ids(story.clips);
    const newClip: Clip = {
      id: this.createId(ids),
      ...data,
    };
    this.stories[index].clips.push(newClip);

    return newClip;
  }

  updateClip(id: string, clipId: string, data) {
    const [story, index] = this.findId(this.stories, id);
    const indexClip = this.findId(story.clips, clipId)[1];

    this.stories[index].clips[indexClip] = {
      id: Number(clipId),
      ...data,
    };
    if (indexClip === -1) return 'error';
    return this.stories[index].clips;
  }

  deleteStory(id: string) {
    return (this.stories = this.delete(this.stories, id));
  }

  deleteClip(id: string, clipId: string) {
    const [story, index] = this.findId(this.stories, id);

    return (this.stories[index].clips = this.delete(story.clips, clipId));
  }
}
