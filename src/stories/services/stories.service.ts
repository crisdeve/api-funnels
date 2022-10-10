import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClipDto } from 'src/clips/dtos/clip.dto';
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

  async getAll() {
    return await this.stories
      .find()
      .populate('storeId')
      .populate('clips')
      .exec();
  }

  async getStory(id: string) {
    const story = await this.stories
      .findById(id)
      .populate('storeId')
      .populate('clips')
      .exec();
    return story;
  }

  async getStoriesByStoreId(id: string) {
    const stories = await this.stories.find({ storeId: id }).populate('clips');

    return stories;
  }

  createStory(storeId: string, data: CreateClipDto) {
    const idClip = this.clipsServices.addClip(data);

    const dataStory = {
      storeId,
      clips: [idClip],
    };

    const createStory = new this.stories(dataStory);

    return createStory.save();
  }

  async addClipStory(id: string, data: CreateClipDto) {
    const idClip = this.clipsServices.addClip(data);

    const storyById = await this.stories.findById(id).exec();

    const newData = {
      clips: [...storyById.clips, idClip],
    };

    const story = this.stories
      .findByIdAndUpdate(id, { $set: newData }, { new: true })
      .populate('storeId')
      .populate('clips')
      .exec();

    if (!story) return;

    return story;
  }

  async deleteStory(id: string) {
    const storyById = await this.stories.findById(id).exec();

    this.clipsServices.deleteClips(storyById.clips);

    return this.stories.findByIdAndDelete(id).exec();
  }
}
