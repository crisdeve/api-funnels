import { Option } from './option.entity';

export class Clip {
  id: number;
  file?: string;
  comment?: string;
  sponsor?: boolean;
  subscription?: boolean;
  viewOptions?: number;
  background?: string;
  orderOptions?: number[];
  options?: Option[];
}
