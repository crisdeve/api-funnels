import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Clip } from 'src/clips/entities/clip.entity';
import { Store } from 'src/stores/entities/store.entity';

@Schema()
export class Story extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: Store.name })
  storeId: Store | Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: Clip.name }] })
  clips: Types.Array<string>;
}

export const StorySchema = SchemaFactory.createForClass(Story);
