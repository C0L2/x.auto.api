import { Module } from '@nestjs/common';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
import { Worker } from './worker.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

import * as dotenv from 'dotenv';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { Role } from 'src/role/role.entity';
import { RoleService } from 'src/role/role.service';

dotenv.config();

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'local' }),
    TypeOrmModule.forFeature([Worker, Role]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1200s' },
    }),
  ],
  controllers: [WorkerController],
  providers: [WorkerService, RoleService, AuthService, LocalStrategy],
})
export class WorkerModule { }
