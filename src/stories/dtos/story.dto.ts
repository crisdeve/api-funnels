import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateStoryDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly storeId: string;

  @IsNotEmpty()
  readonly clips: string[];
}
