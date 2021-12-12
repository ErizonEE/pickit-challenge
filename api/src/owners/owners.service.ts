import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner)
    private ownerRepository: Repository<Owner>
  ){}
  
  create(createOwnerDto: CreateOwnerDto) {
    const owner= this.ownerRepository.create(createOwnerDto);

    return this.ownerRepository.save(owner);
  }

  findAll() {
    return this.ownerRepository.find();
  }

  async findOne(id: string) {
    const owner = await this.ownerRepository.findOne({id});

    if(!owner) {
      throw new NotFoundException("Owner Resource Not Found");
    }

    return owner;
  }

  async update(id: string, updateOwnerDto: UpdateOwnerDto) {
    let owner = await this.ownerRepository.findOne({id});

    if(!owner) {
      throw new NotFoundException("Owner Resource Not Found");
    }

    owner = this.ownerRepository.merge(owner, updateOwnerDto);

    return await this.ownerRepository.save(owner);
  }

  async remove(id: string) {
    const owner = await this.ownerRepository.findOne({ id });

    if(!owner) {
      throw new NotFoundException("Owner Resource Not Found");
    }

    return this.ownerRepository.remove(owner);
  }
}
