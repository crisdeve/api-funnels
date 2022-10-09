import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Option, OptionSchema } from './option.entity';

@Schema()
export class Clip extends Document {
  @Prop()
  file?: string;

  @Prop()
  comment?: string;

  @Prop()
  sponsor?: boolean;

  @Prop()
  isSubcriptionSponsor?: boolean;

  @Prop()
  viewOptions?: number;

  @Prop()
  background?: string;

  @Prop([Number])
  orderOptions?: number[];

  @Prop({
    type: [
      {
        type: OptionSchema,
        ref: Option.name,
      },
    ],
  })
  options?: Types.Array<Option>;
}

export const ClipSchema = SchemaFactory.createForClass(Clip);
