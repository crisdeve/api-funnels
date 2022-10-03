import { IsNumber, IsOptional, IsString } from 'class-validator';

export class Option {
  @IsString()
  label: string;

  @IsString()
  image: string;

  @IsNumber()
  @IsOptional()
  variantId: number;

  @IsNumber()
  @IsOptional()
  frequency: number;
}
