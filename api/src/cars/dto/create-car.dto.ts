import { IsString, IsNotEmpty, IsNumber, IsPositive, MaxLength } from "class-validator";

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly brand: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly model: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly year: number;

  @IsString({ })
  @IsNotEmpty()
  @MaxLength(10)
  readonly patent: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly color: string;
}
