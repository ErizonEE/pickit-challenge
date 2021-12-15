import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Car } from "../entities/car.entity";

@ValidatorConstraint({ name: 'UniquePatent', async: true })
@Injectable()
export class UniquePatentRule implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Car)
    private carsRepository: Repository<Car>) {}

  async validate(value: number) {
    const car = await this.carsRepository.findOne({ where: {patent: value }});
    if (car) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `Patent should be unique`;
  }
}