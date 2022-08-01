import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClipDto } from 'src/clips/dtos/clip.dto';
import { Clip } from 'src/clips/entities/clip.entity';
import { ClipsService } from 'src/clips/services/clips.service';
import { Story } from 'src/stories/entities/story.entity';

@Injectable()
export class StoriesService {
  constructor(private clipsServices: ClipsService) {}

  private stories: Story[] = [
    {
      id: 1,
      storeId: 1,
      clips: [1, 2],
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

  private delete(array: (number | Story)[], id: number): any {
    if (!array.some((el) => el === id)) {
      if ((<Story>array[0]).clips !== undefined)
        return this.messages.notStoryId(id);

      return this.messages.notClipId(id);
    }

    return array.filter((item) => item !== id);
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

  /* getClip(id: number, clipId: number) {
    const clips = this.findId(this.stories, id)[0].clips;
    return this.findId(clips, clipId)[0];
  } */

  createStory(id: number, data: CreateClipDto) {
    const ids = this.ids(this.stories);
    const newIdClip: any = this.clipsServices.addClip(data)[1];

    const newStory: Story = {
      id: this.createId(ids),
      storeId: id,
      clips: [newIdClip],
    };

    this.stories.push(newStory);

    return newStory;
  }

  addClip(id: number, data: CreateClipDto) {
    const index = this.findId(this.stories, id)[1];
    const newIdClip: any = this.clipsServices.addClip(data)[1];

    this.stories[index].clips.push(newIdClip);

    return this.stories[index];
  }

  /* updateClip(id: number, clipId: number, data: UpdateClipDto) {
    const [story, index] = this.findId(this.stories, id);
    const [clip, indexClip] = this.findId(story.clips, clipId);

    this.stories[index].clips[indexClip] = {
      ...clip,
      ...data,
    };

    return this.stories[index].clips;
  } */

  deleteStory(id: number) {
    return (this.stories = this.delete(this.stories, id));
  }

  deleteClip(id: number, clipId: number) {
    const [story, index] = this.findId(this.stories, id);
    this.clipsServices.deleteClip(clipId);

    return (this.stories[index].clips = this.delete(story.clips, clipId));
  }
}
