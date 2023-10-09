import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateFurnizorDto } from './dto/create-furnizot.dto';
import { FurnizorService } from './furnizor.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Furnizori')
@Controller('furnizori')
export class FurnizorController {

    constructor(private providerService: FurnizorService) { }

    @Post('create-provider')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                provider_name: {
                    type: 'string',
                    example: 'AUTO DOCTOR SRL'
                },
                provider_adress: {
                    type: 'string',
                    example: 'str. Stefan cel Mare, 13'
                },
                provider_email: {
                    type: 'string',
                    example: 'auto@doctor.email'
                },
                provider_phone: {
                    type: 'string',
                    example: '+37312345678'
                }
            }
        }
    })
    async createCar(@Body() body: CreateFurnizorDto) {
        await this.providerService.create(
            body.provider_name,
            body.provider_adress,
            body.provider_email,
            body.provider_phone,
        );
        return { message: 'Successfully added new provider', provider: body };
    }
}
