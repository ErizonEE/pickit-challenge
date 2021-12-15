import { Exclude } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsPositive, Validate } from "class-validator";
import { ExistCarRule } from '../validators/ExistCarRule';
import { ExistServicesRule } from "../validators/ExistServicesRule";

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  @Validate(ExistCarRule)
  readonly carId: string;

  @IsNumber()
  @IsOptional()
  @Exclude()
  @IsPositive()
  total: number;

  @IsArray()
  @IsNotEmpty()
  @Validate(ExistServicesRule)
  servicesId: string[]
}
