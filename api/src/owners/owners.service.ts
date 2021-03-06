import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner)
    private ownerRepository: Repository<Owner>,
    // Move to repository
    @Inject(forwardRef(() => EventEmitter2))
    private eventEmitter: EventEmitter2
  ){}
  
  create(createOwnerDto: CreateOwnerDto) {
    const owner= this.ownerRepository.create(createOwnerDto);

    return this.ownerRepository.save(owner);
  }

  findAll() {
    return this.ownerRepository.find();
  }

  async findOne(id: string) {
    return await this.ownerRepository.findOne({id});
  }

  async update(id: string, updateOwnerDto: UpdateOwnerDto) {
    let owner = await this.ownerRepository.findOne({id});

    owner = this.ownerRepository.merge(owner, updateOwnerDto);

    this.ownerRepository.save(owner);

    this.eventEmitter.emit("owner.updated", owner);

    return owner;
  }

  async remove(id: string) {
    const owner = await this.ownerRepository.findOne({ id });

    return this.ownerRepository.remove(owner);
  }
}
