import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { CarPartsService } from './car-parts.service';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateCarPart } from './dto/create-car-part.dto';
import { CarParts } from 'src/entities/car-parts.entity';

@ApiTags('Car Parts')
@Controller('car-parts')
export class CarPartsController {

    constructor(private carPartService: CarPartsService) { }

    @Post('/add-new')
    @UseInterceptors(SerializeInterceptor)
    async createCarPart(@Body() body: CreateCarPart) {
        await this.carPartService.create(body.car_part_name);
        return { message: 'Successfully added new car-part', car_part: body };
    }

    @Get('/get-all')
    async getAllCarParts(): Promise<CarParts[]> {
        return this.carPartService.getAllCarParts();
    }

    @Get('/find/:car_part_name')
    async findClient(@Param('car_part_name') car_part_name: string) {
        return this.carPartService.findByName(car_part_name);
    }

    @Delete('/delete/:id')
    async deleteCarPart(@Param('id') id: number) {
        const car_part = await this.carPartService.remove(id)
        return { message: 'Successfully deleted car-part', car_part };
    }

    @Patch('/update/:id')
    async update(@Param('id') id: number, @Body() attrs: Partial<CarParts>) {
        try {
            const updatedCarPart = await this.carPartService.update(id, attrs);
            return { message: 'Sucessfully updated car-part', data: updatedCarPart };
        } catch (error) {
            return { message: error.message };
        }
    }
}
