import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Service } from "../entities/service.entity";

@ValidatorConstraint({ name: 'ExistServicesRule', async: true })
@Injectable()
export class ExistServicesRule implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>) {}

  async validate(value: Array<string>) {
    const services = await this.servicesRepository.findByIds(value);
    if (!services || value.length != services.length || value.length === 0) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `servicesId should be present and exists`;
  }
}