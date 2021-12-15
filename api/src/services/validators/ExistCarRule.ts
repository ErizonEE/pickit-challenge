import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Car } from "../../cars/entities/car.entity";

@ValidatorConstraint({ name: 'ExistCarRule', async: true })
@Injectable()
export class ExistCarRule implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Car)
    private carsRepository: Repository<Car>) {}

  async validate(value: number) {
    const owner = await this.carsRepository.findOne({ where: { id: value }});
    if (!owner) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `Car should be exists`;
  }
}