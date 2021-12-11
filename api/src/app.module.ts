import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CarsModule } from './cars/cars.module';

import config from './config';

@Module({
  imports: [CarsModule, DatabaseModule, ConfigModule.forRoot({
    envFilePath: '.env',
    load: [config],
    isGlobal: true
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
