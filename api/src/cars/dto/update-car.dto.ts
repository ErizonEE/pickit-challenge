import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';
import { CreateCarDto } from './create-car.dto';

export class UpdateCarDto extends PartialType(CreateCarDto) {
  @IsOptional()
  @Exclude()
  readonly ownerId: string;
}
