import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Option extends Document {
  @Prop()
  label: string;

  @Prop()
  image: string;

  @Prop()
  variantId: number;

  @Prop()
  frequency: number;
}

export const OptionSchema = SchemaFactory.createForClass(Option);
