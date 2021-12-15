import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Owner } from "../entities/owner.entity";

@ValidatorConstraint({ name: 'UniqueDocumentNumberRule', async: true })
@Injectable()
export class UniqueDocumentNumberRule implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Owner)
    private ownersRepository: Repository<Owner>) {}

  async validate(value: number) {
    const owner = await this.ownersRepository.findOne({ where: { documentNumber: value }});
    if (owner) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `Document number should be unique`;
  }
}