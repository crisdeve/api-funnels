/* import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator'; */
import { PartialType } from '@nestjs/swagger';

export class CreateOptionDto {
  /* :ID */
  /* LABEL */
  /* IMAGE */
  /* ORDER */
  /* VARIANT_ID (op) */
  /* IS_OPTION_SUBSCRIPTION */
  /* FREQUENCY (op) */
}

export class UpdateClipDto extends PartialType(CreateOptionDto) {}
