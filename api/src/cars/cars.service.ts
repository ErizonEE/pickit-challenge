import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './entities/car.entity';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

// TODO: improve validations

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>
  ) {}
  
  async create(createCarDto: CreateCarDto) {
    if(await this.existCarByPatent(createCarDto.patent)) {
      throw new BadRequestException("patent should be unique");
    }

    const car = this.carRepository.create(createCarDto);

    return this.carRepository.save(car);
  }

  findAll() {
    return this.carRepository.find();
  }

  async findOne(id: string) {
    const car = await this.carRepository.findOne({ id });

    if(!car) {
      throw new NotFoundException("Car Resource Not Found");
    }

    return car;
  }

  async update(id: string, updateCarDto: UpdateCarDto) {
    let car = await this.carRepository.findOne({ id });

    if(!car) {
      throw new NotFoundException("Car Resource Not Found");
    }

    car = this.carRepository.merge(car, updateCarDto);

    return this.carRepository.save(car);
  }

  async remove(id: string) {
    const car = await this.carRepository.findOne({ id });

    if(!car) {
      throw new NotFoundException("Car Resource Not Found");
    }

    return this.carRepository.remove(car);
  }

  async existCarByPatent(patent: string): Promise<boolean> {
    return await this.carRepository.findOne({ patent }) ? true : false;
  }
}
