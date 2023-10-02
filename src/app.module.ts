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


import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    PassportModule.register({ session: true }),
    SessionModule.forRoot({ session: { secret: process.env.JWT_KEY! } }),
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
