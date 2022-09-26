import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Option } from './option.entity';

/* interface ClipI {
  id: number;
  file?: string;
  comment?: string;
  sponsor?: boolean;
  subscription?: boolean;
  viewOptions?: number;
  background?: string;
  orderOptions?: number[];
  options?: Option[];
} */

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

  @Prop()
  options?: Option[];
}

export const ClipSchema = SchemaFactory.createForClass(Clip);
