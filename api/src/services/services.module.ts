import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Transaction } from './entities/transaction.entity';
import { UpdateTransactionInformation } from './listeners/UpdateTransactionInformation';
import { Car } from 'src/cars/entities/car.entity';
import { ExistCarRule } from './validators/ExistCarRule';
import { ExistServicesRule } from './validators/ExistServicesRule';
@Module({
  imports: [ TypeOrmModule.forFeature([Service, Transaction, Car])],
  controllers: [TransactionsController ,ServicesController],
  providers: [TransactionsService, ServicesService, UpdateTransactionInformation, ExistCarRule, ExistServicesRule]
})
export class ServicesModule {}
