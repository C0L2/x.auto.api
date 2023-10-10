import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Worker } from 'src/worker/worker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Worker])],
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule { }
