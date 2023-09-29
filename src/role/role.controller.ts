import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Role } from './role.entity';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post('create-new-role')
  async createUser(@Body() body: CreateRoleDto) {
    const isRole = await this.roleService.findRoleByName(body.role_name);

    if (isRole) {
      throw new BadRequestException('This role already exists');
    }

    const role = await this.roleService.create(body.role_name);
    return { message: 'Successfully added new role', role: body };
  }

  @Get('all-roles')
  async getAllRoutes(): Promise<Role[]> {
    return this.roleService.getAll();
  }

  @Delete(':id')
  async removeRole(@Param('id') id: number) {
    await this.roleService.remove(id);
    return { message: `Successfully deleted role with id of: ${id}` };
  }
}
