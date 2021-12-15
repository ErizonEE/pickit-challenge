import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter'
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Service } from './entities/service.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
    @Inject(forwardRef(() => EventEmitter2))
    private eventEmitter: EventEmitter2
  ){}
  async create(createTransactionDto: CreateTransactionDto) {
    let total:number = 0;

    const transaction = this.transactionRepository.create(createTransactionDto);

    if(createTransactionDto.servicesId.length){
      const services = await this.serviceRepository.findByIds(createTransactionDto.servicesId);

      transaction.services = services;

      services.forEach(service => total += service.cost);
    }

    transaction.total = total;

    await this.transactionRepository.save(transaction);

    this.eventEmitter.emit('transaction.created', transaction);

    return transaction;
  }
  async findByCar(carId: string) {
    return await this.transactionRepository.find({ relations: ['services'], where: {carId} });
  }

  findAll() {
    return this.transactionRepository.find({ relations: ['services'] });
  }
}
