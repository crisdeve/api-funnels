import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';

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

  /* IS_SUBSCRIPTION_SPONSOR: BOOLEAN */

  /* VIEW_OPTIONS: 1|2|3 */

  /* BACKGROUND: #FF00CC */

  /* ORDER_OPTIONS */
}

export class UpdateClipDto extends PartialType(CreateClipDto) {}
