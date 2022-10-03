import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

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
        label: { type: String },
        image: { type: String },
        variantId: { type: Number },
        frequency: { type: Number },
      },
    ],
  })
  options?: Types.Array<Record<string, any>>;
}

export const ClipSchema = SchemaFactory.createForClass(Clip);
