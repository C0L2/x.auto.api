import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { CarPartsService } from './car-parts.service';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateCarPart } from './dto/create-car-part.dto';
import { CarParts } from 'src/entities/car-parts.entity';

@ApiTags('Car Parts')
@Controller('car-parts')
export class CarPartsController {

    constructor(private carPartService: CarPartsService) { }

    @Post('/add-ccar-part')
    @UseInterceptors(SerializeInterceptor)
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                car_part_name: {
                    type: 'string',
                    example: 'motor'
                }
            }
        }
    })
    async createCarPart(@Body() body: CreateCarPart) {
        const programare = await this.carPartService.create(body.car_part_name);

        return { message: 'Successfully added new client', programare: body };
    }

    @Get('/all-car_parts')
    async getAllCarParts(): Promise<CarParts[]> {
        return this.carPartService.getAllCarParts();
    }

    @Get('/find-car-parts/:car_part_id')
    async fincClient(@Param('car_part_id') car_part_id: number): Promise<CarParts | undefined> {
        return this.carPartService.findById(car_part_id);
    }
}
