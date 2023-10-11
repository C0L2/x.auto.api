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
import { ProgramariModule } from './programari/programari.module';
import { MasiniModule } from './masini/masini.module';
import { CarPartsModule } from './car-parts/car-parts.module';
import { WorkerReportModule } from './worker-report/worker-report.module';


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
    ProgramariModule,
    MasiniModule,
    CarPartsModule,
    WorkerReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
