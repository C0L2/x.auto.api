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
import { Role } from '../entities/role.entity';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) { }

  @Post('create-new-role')
  @ApiOperation({ summary: 'Create a new role and save in the database' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        role_name: {
          type: 'string',
          example: 'admin'
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Role created'
  })
  async createUser(@Body() body: CreateRoleDto) {
    const isRole = await this.roleService.findRoleByName(body.role_name);

    if (isRole) {
      throw new BadRequestException('This role already exists');
    }

    const role = await this.roleService.create(body.role_name);
    return { message: 'Successfully added new role', role: body };
  }

  @Get('all-roles')
  @ApiOperation({ summary: 'Get all roles from the database' })
  @ApiResponse({
    status: 200,
    schema: {
      items: {
        type: 'object',
        properties: {
          role_id: {
            type: 'number',
            example: 65
          },
          role_name: {
            type: 'string',
            example: 'admin'
          }
        }
      }
    }
  })
  async getAllRoutes(): Promise<Role[]> {
    return this.roleService.getAll();
  }

  @Delete('delete-role/:id')
  @ApiOperation({ summary: 'Delete specific role from the database' })
  async removeRole(@Param('id') id: number) {
    await this.roleService.remove(id);
    return { message: `Successfully deleted role with id of: ${id}` };
  }
}
