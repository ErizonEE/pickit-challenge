import { PartialType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { CreateOwnerDto } from './create-owner.dto';

export class UpdateOwnerDto extends PartialType(CreateOwnerDto) {
  @IsOptional()
  @Exclude()
  readonly documentNumber: number;
}
