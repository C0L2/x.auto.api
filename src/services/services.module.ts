import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { Services } from '../entities/services.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Services])],
  providers: [ServicesService],
  controllers: [ServicesController],
})
export class ServicesModule { }
