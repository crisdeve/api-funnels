import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateOptionDto {
  @IsString()
  @IsNotEmpty()
  readonly label: string;

  @IsUrl()
  @IsNotEmpty()
  @IsOptional()
  readonly image: string;

  @IsNumber()
  @IsOptional()
  readonly variantID: number;

  @IsNumber()
  @IsOptional()
  readonly frequencyID: number;
}

export class UpdateOptionDto extends PartialType(CreateOptionDto) {}
