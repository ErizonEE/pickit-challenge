
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from 'src/cars/entities/car.entity';
import { Repository } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';

@Injectable()
export class UpdateTransactionInformation {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(Car)
    private carRepository: Repository<Car>
  ){}
  @OnEvent('transaction.created', {async: true})
  async handleTransactionCreatedEvent(eventTransaction: Transaction) {
    const transaction = await this.transactionRepository.findOne({ id: eventTransaction.id })
    
    const car = await this.carRepository.findOne({ id: transaction.carId });

    transaction.car = `${car.brand} ${car.model} - ${car.year}`;
    
    transaction.ownerId = car.ownerId;

    transaction.ownerName = car.ownerName;

    this.transactionRepository.save(transaction);
  }
}