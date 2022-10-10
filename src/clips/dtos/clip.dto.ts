import {
  IsArray,
  IsBoolean,
  IsHexColor,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Option } from '../entities/option.entity';
import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateOptionDto } from './option.dto';

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
  readonly sponsor: boolean;

  @IsOptional()
  @IsBoolean()
  readonly isSubcriptionSponsor: boolean;

  @Min(1)
  @Max(3)
  @IsNotEmpty()
  readonly viewOptions: number;

  @IsOptional()
  @IsHexColor()
  readonly backgroundColor: string;

  @IsArray()
  @IsOptional()
  readonly orderOptions: number[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateOptionDto)
  readonly options: Option[];
}

export class UpdateClipDto extends PartialType(CreateClipDto) {}
