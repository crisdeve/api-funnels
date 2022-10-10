import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  @IsUrl()
  readonly name: string;
}

export class UpdateStoreDto extends PartialType(CreateStoreDto) {}
