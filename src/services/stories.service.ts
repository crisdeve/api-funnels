import { Injectable, NotFoundException } from '@nestjs/common';
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

  private messages = {
    notStories: () => {
      throw new NotFoundException('Not found any stories');
    },
    base: (source: string, id: number) => {
      throw new NotFoundException(
        `Not found the ${source} with id: ${id}, Try with another id`,
      );
    },
    notStoryId: (id: number) => this.messages.base('story', id),
    notClipId: (id: number) => this.messages.base('clip', id),
  };

  private findId(array: (Clip | Story)[], id: number): any {
    const item = array.find((item) => item.id === id);
    if (!item) {
      if ((<Story>array[0]).clips !== undefined)
        return this.messages.notStoryId(id);

      return this.messages.notClipId(id);
    }

    return [item, array.indexOf(item)];
  }

  private ids(array: Array<any>) {
    return array.reduce((prev, item) => [...prev, item.id], []);
  }

  private delete(array: (Clip | Story)[], id: number): any {
    if (!array.some((el) => el.id === id)) {
      if ((<Story>array[0]).clips !== undefined)
        return this.messages.notStoryId(id);

      return this.messages.notClipId(id);
    }

    return array.filter((item) => item.id !== id);
  }

  private createId(ids: number[]) {
    if (ids.length === 0) return 0;
    return Math.max(...ids) + 1;
  }

  getAll(): Story[] {
    if (this.stories.length < 1) {
      this.messages.notStories();
    }
    return this.stories;
  }

  getStory(id: number) {
    return this.findId(this.stories, id)[0];
  }

  getClip(id: number, clipId: number) {
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

  addClip(id: number, data) {
    const [story, index] = this.findId(this.stories, id);

    const ids = this.ids(story.clips);
    const newClip: Clip = {
      id: this.createId(ids),
      ...data,
    };
    this.stories[index].clips.push(newClip);

    return newClip;
  }

  updateClip(id: number, clipId: number, data) {
    const [story, index] = this.findId(this.stories, id);
    const [clip, indexClip] = this.findId(story.clips, clipId);

    this.stories[index].clips[indexClip] = {
      ...clip,
      ...data,
    };

    return this.stories[index].clips;
  }

  deleteStory(id: number) {
    return (this.stories = this.delete(this.stories, id));
  }

  deleteClip(id: number, clipId: number) {
    const [story, index] = this.findId(this.stories, id);

    return (this.stories[index].clips = this.delete(story.clips, clipId));
  }
}
