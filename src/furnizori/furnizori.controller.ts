import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateFurnizorDto } from './create-furnizor.dto';
import { FurnizorService } from './furnizori.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Furnizori } from './furnnizori.entity';

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
    async createProvider(@Body() body: CreateFurnizorDto) {
        await this.providerService.create(
            body.provider_name,
            body.provider_adress,
            body.provider_email,
            body.provider_phone,
        );
        return { message: 'Successfully added new provider', provider: body };
    }

    @Get('all-providers')
    async getAllProviders(): Promise<Furnizori[]> {
        return this.providerService.getAllProviders();
    }

    /* @Get('find/:provider_name')
    async getProviderByName(@Param('provider_name') provider_name: string): Promise<Furnizori> {
        const provider = await this.providerService.getProviderByName(provider_name);
        if (!provider) throw new BadRequestException('No provider found with this name')
        return provider;
    } */

    @Put('update-provider/:id')
    async updateProvider(@Param('id') id: number, @Body() updatedProviderData: Partial<Furnizori>): Promise<Furnizori> {
        try {
            return await this.providerService.updateProviderById(id, updatedProviderData);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(`Provider with ID ${id} not found`);
            }
            throw error;
        }
    }

    @Delete('delete-provider/:id')
    async deleteProvider(@Param('id') id: number) {
        await this.providerService.remove(id);
        return { message: `Successfully deleted provider with id of ${id}` };
    }
}
