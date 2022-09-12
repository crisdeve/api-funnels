import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Story extends Document {
  @Prop({ required: true })
  storeId: string;

  @Prop({ required: true })
  clips: number[];
}

export const StorySchema = SchemaFactory.createForClass(Story);
