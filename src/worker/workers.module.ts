import { Module, forwardRef } from '@nestjs/common';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
import { Worker } from '../entities/worker.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { Role } from 'src/entities/role.entity';
import { RoleService } from 'src/role/role.service';

import * as dotenv from 'dotenv';
import { WorkerReport } from 'src/entities/worker-report.entity';
import { WorkerReportModule } from 'src/worker-report/worker-report.module';
import { AssignedServices } from 'src/entities/assigned-services.entity';
import { AssignedServicesService } from 'src/assigned-services/assigned-services.service';
import { AssignedServicesModule } from 'src/assigned-services/assigned-services.module';
dotenv.config();

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'local' }),
    TypeOrmModule.forFeature([Worker, Role]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1200s' },
    }),
  ],
  controllers: [WorkerController],
  providers: [WorkerService, RoleService, AuthService, LocalStrategy],
  exports: [WorkerService]
})
export class WorkerModule { }
