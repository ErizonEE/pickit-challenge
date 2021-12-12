import { IsString, IsNotEmpty, IsNumber, IsPositive, IsOptional } from "class-validator";

export class CreateOwnerDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly documentNumber: number;
}
