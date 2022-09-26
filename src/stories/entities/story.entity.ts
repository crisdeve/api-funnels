import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Story extends Document {
  @Prop({ required: true })
  storeId: string;

  @Prop([String])
  clips: string[];
}

export const StorySchema = SchemaFactory.createForClass(Story);
