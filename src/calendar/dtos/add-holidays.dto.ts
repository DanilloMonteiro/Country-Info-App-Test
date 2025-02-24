import {
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsString,
} from '@nestjs/class-validator';

export class AddHolidaysDto {
  @IsString()
  countryCode: string;

  @IsNumber()
  year: number;

  @IsArray()
  @ArrayNotEmpty()
  holidays: string[];
}
