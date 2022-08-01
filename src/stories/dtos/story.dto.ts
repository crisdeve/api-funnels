import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateStoryDto {
  @IsNumber()
  @IsNotEmpty()
  readonly storeId: number;

  @IsNotEmpty()
  readonly clips: number[];
}
