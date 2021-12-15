import { Module } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnersController } from './owners.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { Car } from 'src/cars/entities/car.entity';
import { UpdateCarAmount } from './listeners/UpdateCarAmount';
import { UniqueDocumentNumberRule } from './validators/UniqueDocumentNumberRule';

@Module({
  imports: [ TypeOrmModule.forFeature([Owner, Car]) ],
  controllers: [OwnersController],
  providers: [OwnersService, UpdateCarAmount, UniqueDocumentNumberRule]
})
export class OwnersModule {}
