import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CarsModule } from './cars/cars.module';
import { OwnersModule } from './owners/owners.module';
import { ServicesModule } from './services/services.module';

import config from './config';

@Module({
  imports: [
    CarsModule, 
    DatabaseModule, 
    ConfigModule.forRoot({
    envFilePath: '.env',
    load: [config],
    isGlobal: true
    }), 
    EventEmitterModule.forRoot(),
    OwnersModule,
    ServicesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
