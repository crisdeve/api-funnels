import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateClipDto {
  @IsUrl()
  @IsNotEmpty()
  readonly file: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  readonly comment?: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly isSponsor: boolean;
}

export class UpdateClipDto extends PartialType(CreateClipDto) {}
