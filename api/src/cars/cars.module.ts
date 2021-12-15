import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { Car } from './entities/car.entity';
import { Owner } from 'src/owners/entities/owner.entity';
import { UpdateOwnerName } from './listeners/UpdateOwnerName';
import { UniquePatentRule } from './validators/UniquePatentRule';

@Module({
  imports: [ TypeOrmModule.forFeature([Car, Owner]) ],
  controllers: [CarsController],
  providers: [CarsService, UpdateOwnerName, UniquePatentRule]
})
export class CarsModule {}
