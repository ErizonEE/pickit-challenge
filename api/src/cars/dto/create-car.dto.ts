import { IsString, IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  readonly brand: string;

  @IsString()
  @IsNotEmpty()
  readonly model: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly year: number;

  @IsString()
  @IsNotEmpty()
  readonly patent: string;

  @IsString()
  @IsNotEmpty()
  readonly color: string;
}
