import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { Car } from './entities/car.entity';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Owner } from 'src/owners/entities/owner.entity';

// TODO: improve validations

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
    @InjectRepository(Owner)
    private ownerRepository: Repository<Owner>,
    @Inject(forwardRef(() => EventEmitter2))
    private eventEmitter: EventEmitter2
  ) {}
  
  async create(createCarDto: CreateCarDto) {
    if(await this.carExistByPatent(createCarDto.patent)) {
      throw new BadRequestException("patent should be unique");
    }
    
    const owner = await this.getOwner(createCarDto.ownerId);

    if(owner == null) {
      throw new BadRequestException("owner should be exists");
    }

    const car = this.carRepository.create({ 
      ...createCarDto, 
      ownerName: `${owner.name} ${owner.lastName}` 
    });

    this.carRepository.save(car);

    this.eventEmitter.emit('car.created', car);

    return car;
  }

  findAll() {
    return this.carRepository.find();
  }
  findByOwner(ownerId: string) {
    return this.carRepository.find({ ownerId });
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

    this.carRepository.remove(car);

    this.eventEmitter.emit('car.deleted', car);

    return car;
  }

  async carExistByPatent(patent: string) {
    return await this.carRepository.findOne({ patent });
  }

  async getOwner(ownerId: string) {
    return await this.ownerRepository.findOne({ id: ownerId });
  }
}
