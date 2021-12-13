
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner } from '../entities/owner.entity';
import { Car } from '../../cars/entities/car.entity';

@Injectable()
export class UpdateCarAmount {
  constructor(
    @InjectRepository(Owner)
    private ownerRepository: Repository<Owner>
  ){}
  @OnEvent('car.created', {async: true})
  handleCarCreatedEvent(car: Car) {
    // simulating eventual data consistency
    setTimeout(
    async () => {
      const owner = await this.ownerRepository.findOne({ id: car.ownerId })
      owner.totalCars += 1;
      this.ownerRepository.save(owner);
    }, 
    7000)
  }

  @OnEvent('car.deleted', {async: true})
  handleCarDeletedEvent(car: Car) {
    // simulating eventual data consistency
    setTimeout(
    async () => {
      const owner = await this.ownerRepository.findOne({ id: car.ownerId })
      owner.totalCars -= 1;
      this.ownerRepository.save(owner);
    }, 
    7000)
  }
}