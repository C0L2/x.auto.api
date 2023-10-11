import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { Services } from '../entities/services.entity';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Services')
@Controller('services')
export class ServicesController {
  constructor(private service: ServicesService) { }

  @Post('create-new-service')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        service_name: {
          type: 'string',
          example: 'reparatia'
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Service created'
  })
  async createService(@Body() body: CreateServiceDto) {
    const service = await this.service.create(body.service_name);
    return { message: 'Successfully added new service in list', service: body };
  }

  @Get('all-services')
  @ApiOperation({ summary: 'Get all services from the database' })
  @ApiResponse({
    status: 200,
    schema: {
      items: {
        type: 'object',
        properties: {
          service_name: {
            type: 'string',
            example: 'reparatie'
          }
        }
      }
    }
  })
  async getAllRoutes(): Promise<Services[]> {
    return this.service.getAll();
  }

  @Delete('delete-service/:id')
  @Delete('delete-role/:id')
  @ApiOperation({ summary: 'Delete specific service from the database' })
  async removeRole(@Param('id') id: number) {
    await this.service.remove(id);
    return { message: `Successfully deleted service with id of: ${id}` };
  }
}
