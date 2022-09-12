import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClipDto } from 'src/clips/dtos/clip.dto';
import { Clip } from 'src/clips/entities/clip.entity';
import { ClipsService } from 'src/clips/services/clips.service';
import { Story } from 'src/stories/entities/story.entity';

@Injectable()
export class StoriesService {
  constructor(
    private clipsServices: ClipsService,
    @InjectModel(Story.name) private stories: Model<Story>,
  ) {}

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

  async getAll() {
    return await this.stories.find().exec();
  }

  async getStory(id: number) {
    /* const story = {
      ...this.findId(this.stories, id)[0],
    }; */

    const story = await this.stories.findById(id);

    let clips = [];

    story.clips.map((i) => {
      clips = [...clips, this.clipsServices.getClip(i)];
    });

    story.clips = clips;

    return story;
  }

  /*  createStory(storeId: number, data: CreateClipDto) {
    const ids = this.ids(this.stories);
    const newIdClip: any = this.clipsServices.addClip(data)[1];

    const newStory: Story = {
      id: this.createId(ids),
      storeId: storeId,
      clips: [newIdClip],
    };

    this.stories.push(newStory);

    return newStory;
  }

  addClipStory(id: number, data: CreateClipDto) {
    const index = this.findId(this.stories, id)[1];
    const newIdClip: any = this.clipsServices.addClip(data)[1];

    this.stories[index].clips.push(newIdClip);

    return this.stories[index];
  }

  deleteStory(id: number) {
    const story = this.findId(this.stories, id)[0];
    this.clipsServices.deleteClips(story.clips);

    return (this.stories = this.stories.filter((item) => item.id !== id));
  }

  deleteClip(id: number, clipId: number) {
    const [story, index] = this.findId(this.stories, id);
    this.clipsServices.deleteClip(clipId);

    return (this.stories[index].clips = this.delete(story.clips, clipId));
  } */
}
