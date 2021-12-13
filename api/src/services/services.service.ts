import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>
  ){}

  async create(createServiceDto: CreateServiceDto) {
    if(await this.existServiceByName(createServiceDto.name)) {
      throw new BadRequestException("service name should be unique");
    }

    const service = this.serviceRepository.create(createServiceDto);

    return this.serviceRepository.save(service);
  }

  findAll() {
    return this.serviceRepository.find();
  }

  async findOne(id: string) {
    const service = await this.serviceRepository.findOne({ id });

    if(!service) {
      throw new NotFoundException("Service Resource Not Found");
    }

    return service;
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    let service = await this.serviceRepository.findOne({ id });

    if(!service) {
      throw new NotFoundException("Service Resource Not Found");
    }

    service = this.serviceRepository.merge(service, updateServiceDto);

    return this.serviceRepository.save(service);
  }

  async remove(id: string) {
    const service = await this.serviceRepository.findOne({ id });

    if(!service) {
      throw new NotFoundException("Service Resource Not Found");
    }

    return this.serviceRepository.remove(service)
  }

  async existServiceByName(name: string): Promise<Boolean> {
    return await this.serviceRepository.findOne({ name }) ? true : false;
  }
}
