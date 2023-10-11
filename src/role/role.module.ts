import { Module, OnModuleInit } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { Worker } from 'src/entities/worker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Worker])],
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule implements OnModuleInit {

  constructor(private roleService: RoleService) { }

  async onModuleInit() {
    await this.roleService.seed();
  }
}
