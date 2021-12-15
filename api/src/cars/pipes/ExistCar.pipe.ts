import { ArgumentMetadata, Injectable, BadRequestException, PipeTransform } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Car } from "../entities/car.entity";

@Injectable()
export class ExistCar implements PipeTransform {
  constructor(
    @InjectRepository(Car)
    private carsRepository: Repository<Car>
  ){}
  async transform(value: string, metadata: ArgumentMetadata) {
      const car = await this.carsRepository.findOne(value);

      if(!car) {
        throw new BadRequestException("Car should be exists");
      }

      return value;
  }
}