import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { MasiniService } from './masini.service';
import { AuthManagerGuard } from 'src/guards/auth-manager.guard';
import { CreateMasiniDto } from './dto/create-masini.dto';
import { Masini } from '../entities/masini.entity';

@ApiTags('Masini')
@Controller('masini')
export class MasiniController {
    constructor(private carService: MasiniService) { }

    // @UseGuards(AuthManagerGuard)
    @Post('add-new-one')
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
                }
            }
        }
    })
    async createCar(@Body() body: CreateMasiniDto) {
        const car = await this.carService.create(
            body.client_id,
            body.model,
            body.registration_number,
            body.vin_code,
            body.culoare,
            body.km
        );
        return { message: 'Successfully added new car', car: body };
    }

    // @UseGuards(AuthManagerGuard)
    @Get('all-cars')
    async getAllRoutes(): Promise<Masini[]> {
        return this.carService.getAll();
    }

    // @UseGuards(AuthManagerGuard)
    @Delete('delete-car/:id')
    async removeRole(@Param('id') id: number) {
        await this.carService.remove(id);
        return { message: `Successfully deleted car with id of: ${id}` };
    }
}
