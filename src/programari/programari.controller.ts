import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProgramareDto } from './dto/create-programare.dto';
import { ProgramariService } from './programari.service';
import { AuthManagerGuard } from 'src/guards/auth-manager.guard';
import { Programari } from '../entities/programari.entity';
import { GetProgramariBetweenDatesDto } from './dto/get_programari-in-period.dto';

@ApiTags('Programari')
@Controller('programari')
export class ProgramariController {
    constructor(private progService: ProgramariService) { }

    @UseGuards(AuthManagerGuard)
    @Post('new-programare-manager')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                programare_name: {
                    type: 'string',
                    example: 'something was broke'
                },
                registr_date: {
                    type: 'Date',
                    example: 'Tue Oct 03 2023 03:09:53 GMT+0300 (Eastern European Summer Time)'
                }
            }
        }
    })
    async createProgramare(@Body() body: CreateProgramareDto) {
        const programare = await this.progService.create(
            body.programare_name,
            body.registr_date
        );
        return { message: 'Successfully added new programare', programare: body };
    }

    // @UseGuards(AuthManagerGuard)
    @Post('between-dates')
    async getProgramariBetweenDates(
        @Body() body: GetProgramariBetweenDatesDto,
    ): Promise<Programari[]> {
        return this.progService.getProgramariBetweenDates(
            body.startDate,
            body.endDate,
        );
    }

    // @UseGuards(AuthManagerGuard)
    @Get('programari-for-today')
    async getProgramariForToday(): Promise<Programari[]> {
        return this.progService.getProgramariForToday();
    }

    /* @UseGuards(AuthClientGuard)
    @Get('get-clients-programari/:id')
    async getAllClientsRoutes(@Param('id') id: number): Promise<Programari[]> {
        return await this.progService.findProgramareByClientId(id);
    }*/

    // @UseGuards(AuthManagerGuard)
    @Delete('delete-programare/:id')
    async removeRole(@Param('id') id: number) {
        await this.progService.remove(id);
        return { message: `Successfully deleted programare with id of: ${id}` };
    }
}