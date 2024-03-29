import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { WorkerModule } from './worker/workers.module';
import { AppController } from './app.controller';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from 'config';
import { PassportModule } from '@nestjs/passport';
import { SessionModule } from 'nestjs-session';
import { RoleModule } from './role/role.module';
import { ServicesModule } from './services/services.module';
import { ClientModule } from './client/client.module';
import { AppointmentModule } from './programari/appointment.module';
import { MasiniModule } from './masini/masini.module';
import { CarPartsModule } from './car-parts/car-parts.module';
import { WorkerReportModule } from './worker-report/worker-report.module';
import { AssignedServicesModule } from './assigned-services/assigned-services.module';
import { AssignedCarPartsModule } from './assigned-carparts/assigned-carparts.module';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    PassportModule.register({ session: true }),
    SessionModule.forRoot({ session: { secret: 'secret' } }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get<TypeOrmModuleOptions>('database')
    }),
    WorkerModule,
    RoleModule,
    ServicesModule,
    ClientModule,
    AppointmentModule,
    MasiniModule,
    CarPartsModule,
    WorkerReportModule,
    AssignedServicesModule,
    AssignedCarPartsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
