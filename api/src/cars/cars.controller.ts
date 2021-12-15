import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { ExistCar } from './pipes/ExistCar.pipe';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }

  @Get()
  findAll(@Query('owner') owner: string) {
    if(owner) {
      return this.carsService.findByOwner(owner);
    }
    return this.carsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ExistCar) id: string) {
    return this.carsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ExistCar) id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(id, updateCarDto);
  }

  @Delete(':id')
  remove(@Param('id', ExistCar) id: string) {
    return this.carsService.remove(id);
  }
}
