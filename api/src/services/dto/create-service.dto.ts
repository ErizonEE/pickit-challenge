import { IsString, MaxLength, IsNumber, IsPositive } from "class-validator";

export class CreateServiceDto {
  @IsString()
  @MaxLength(255)
  readonly name: string;

  @IsNumber()
  @IsPositive()
  readonly cost: number;  
}

