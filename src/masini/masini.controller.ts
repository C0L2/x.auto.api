import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { MasiniService } from './masini.service';
import { AuthManagerGuard } from 'src/guards/auth-manager.guard';
import { CreateMasiniDto } from './dto/create-masini.dto';
import { Masini } from '../entities/masini.entity';

@ApiTags('Masini')
@Controller('cars')
export class MasiniController {
    constructor(private carService: MasiniService) { }

    // @UseGuards(AuthManagerGuard)
    @Post('add-new')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                client_id: {
                    type: 'number',
                    example: '007'
                },
                model: {
                    type: 'string',
                    example: 'Tranzit'
                },
                registration_number: {
                    type: 'string',
                    example: 'CWN 809'
                },
                vin_code: {
                    type: 'string',
                    example: 'ODJGALRP9CJSK'
                },
                culoare: {
                    type: 'string',
                    example: 'culoare'
                },
                km: {
                    type: 'number',
                    example: '85000'
                },
                year: {
                    type: 'number',
                    example: '2001'
                }
            }
        }
    })
    async createCar(@Body() body: CreateMasiniDto) {
        const car = await this.carService.create(body);
        return { message: 'Successfully added new car', car: body };
    }

    // @UseGuards(AuthManagerGuard)
    @Get('all')
    async getAllRoutes(): Promise<Masini[]> {
        return this.carService.getAll();
    }

    @Get('find-by-vincode/:vin_code')
    async findCar(@Param('vin_code') vin_code: string) {
        return this.carService.findCarByVinCode(vin_code)
    }

    // @UseGuards(AuthManagerGuard)
    @Delete('delete/:id')
    async removeRole(@Param('id') id: number) {
        await this.carService.remove(id);
        return { message: `Successfully deleted car with id of: ${id}` };
    }

    @Put(':vin_code/assign-client')
    async updateMasinaWithClientId(
        @Param('vin_code') vin_code: string,
        @Body('client_id') clientId: number,
    ) {
        return this.carService.updateMasinaWithClientId(vin_code, clientId);
    }
}
