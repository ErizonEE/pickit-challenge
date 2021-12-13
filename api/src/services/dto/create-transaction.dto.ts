import { Exclude } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsPositive } from "class-validator";

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  readonly carId: string;

  @IsNumber()
  @IsOptional()
  @Exclude()
  @IsPositive()
  total: number;

  @IsArray()
  @IsNotEmpty()
  servicesId: string[]
}
