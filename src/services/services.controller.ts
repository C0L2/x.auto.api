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
import { Services } from './services.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Services')
@Controller('services')
export class ServicesController {
  constructor(private service: ServicesService) { }

  @Post('create-new-service')
  async createUser(@Body() body: CreateServiceDto) {
    const isRole = await this.service.findByName(body.service_name);

    if (isRole) {
      throw new BadRequestException('This service already exists');
    }

    const service = await this.service.create(
      body.service_name,
      body.service_price,
    );
    return { message: 'Successfully added new service in list', service: body };
  }

  @Get('all-services')
  async getAllRoutes(): Promise<Services[]> {
    return this.service.getAll();
  }

  @Delete('delete-service/:id')
  async removeRole(@Param('id') id: number) {
    await this.service.remove(id);
    return { message: `Successfully deleted service with id of: ${id}` };
  }
}
