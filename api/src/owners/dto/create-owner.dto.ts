import { IsString, IsNotEmpty, IsNumber, IsPositive, IsOptional, Validate } from "class-validator";
import { UniqueDocumentNumberRule } from "../validators/UniqueDocumentNumberRule";

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
  @Validate(UniqueDocumentNumberRule)
  readonly documentNumber: number;
}
