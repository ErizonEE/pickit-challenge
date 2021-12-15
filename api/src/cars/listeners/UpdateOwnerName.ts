
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from '../../owners/entities/owner.entity';
import { Repository } from 'typeorm';
import { Car } from '../entities/car.entity';

@Injectable()
export class UpdateOwnerName {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>
  ){}
  @OnEvent('owner.updated', {async: true})
  handleOwnerUpdatedEvent(owner: Owner) {
    // simulating eventual data consistency
    setTimeout(
    async () => {
      const cars = await this.carRepository.find({ ownerId: owner.id})
      cars.forEach(car => {
        car.ownerName = `${owner.name} ${owner.lastName};`
        this.carRepository.save(car);
      })
    }, 
    7000)
  }
}