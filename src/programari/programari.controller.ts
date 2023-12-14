import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { CreateProgramareDto } from './dto/create-programare.dto';
import { ProgramariService } from './programari.service';
import { AuthManagerGuard } from 'src/guards/auth-manager.guard';
import { Programari } from '../entities/programari.entity';
import { GetProgramariBetweenDatesDto } from './dto/get_programari-in-period.dto';
import { CreatedAppointmentRes } from './types';

@ApiTags('Programari')
@Controller('programari')
export class ProgramariController {
    constructor(private progService: ProgramariService) { }

    @Get('find-all-programari')
    @ApiResponse({
        status: HttpStatus.OK,
        schema: {
            properties: {
                message: {
                    type: 'string',
                    example: 'Successfully added new appointment'
                },
                programare: {
                    type: 'object',
                    example: {
                        programare_name: {
                            type: 'string',
                            example: ''
                        },
                        registr_date: {
                            type: 'string',
                            example: 'Something broke in the engine'
                        }
                    }
                }
            }
        },

    })
    @ApiOperation({ description: 'Get all existing appointments in database' })
    async getAllProgramari() {
        return this.progService.getAllProgramari()
    }

    // @UseGuards(AuthManagerGuard)
    @Post('new-programare')
    @ApiOperation({ description: 'Create a new appointment and save it in database' })
    @ApiResponse({
        status: HttpStatus.OK,
        isArray: true,
        schema: {
            type: 'array',
            items: {
                properties: {
                    programare_id: {
                        type: 'number',
                        example: 1
                    },
                    programare_name: {
                        type: 'string',
                        example: 'Something is broke'
                    },
                    registr_date: {
                        type: 'Date',
                        example: "2023-12-14T00:00:00.000Z"
                    }
                }
            }
        },
    })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Successfully added new programare',
        schema: {
            properties: {
                message: {
                    type: 'string',
                    example: 'Successfully added new appointment'
                },
                programare: {
                    type: 'object',
                    example: {
                        programare_name: {
                            type: 'string',
                            example: ''
                        },
                        registr_date: {
                            type: 'string',
                            example: 'Something broke in the engine'
                        }
                    }
                }
            }
        },
    })
    async createProgramare(@Body() body: CreateProgramareDto): Promise<CreatedAppointmentRes> {
        await this.progService.create(
            body.programare_name,
            body.registr_date
        );
        return { message: 'Successfully added new programare', programare: body };
    }

    // @UseGuards(AuthManagerGuard)
    @Post('between-dates')
    @ApiResponse({
        status: HttpStatus.OK,
        isArray: true,
        schema: {
            type: 'array',
            items: {
                properties: {
                    programare_id: {
                        type: 'number',
                        example: 1
                    },
                    programare_name: {
                        type: 'string',
                        example: 'Something is broke'
                    },
                    registr_date: {
                        type: 'Date',
                        example: "2023-12-14T00:00:00.000Z"
                    }
                }
            }
        },
    })
    @ApiOperation({ description: 'Get all existing appointments from database between 2 specifed dates' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                startDate: {
                    type: 'string',
                    example: '2016-09-18T17:34:02.666Z'
                },
                endDate: {
                    type: 'Date',
                    example: '2016-09-18T17:34:02.666Z'
                }
            }
        }
    })
    async getProgramariBetweenDates(
        @Body() body: GetProgramariBetweenDatesDto,
    ): Promise<Programari[]> {
        return this.progService.getProgramariBetweenDates(
            body.startDate,
            body.endDate,
        );
    }

    // @UseGuards(AuthManagerGuard)
    @Delete('delete-programare/:id')
    @ApiOperation({ description: 'Delete an existing specific appointment from database' })
    @ApiResponse({
        status: HttpStatus.OK,
        schema: {
            type: 'object',
            properties: {
                message: {
                    type: 'string',
                    example: 'Appointment deleted successfully'
                }
            }
        }
    })
    async removeRole(@Param('id') id: number) {
        return await this.progService.remove(id);
    }

    // @UseGuards(AuthManagerGuard)
    @Get('programari-for-today')
    @ApiOperation({ description: 'Get all existing in database appointments from today ' })
    @ApiResponse({
        status: HttpStatus.OK,
        isArray: true,
        schema: {
            type: 'array',
            items: {
                properties: {
                    programare_id: {
                        type: 'number',
                        example: 1
                    },
                    programare_name: {
                        type: 'string',
                        example: 'Something is broke'
                    },
                    registr_date: {
                        type: 'Date',
                        example: "2023-12-14T00:00:00.000Z"
                    }
                }
            }
        },
    })
    @ApiResponse({
        status: HttpStatus.OK,
        schema: {
            properties: {
                message: {
                    type: 'string',
                    example: 'Successfully added new appointment'
                },
                programare: {
                    type: 'object',
                    example: {
                        programare_name: {
                            type: 'string',
                            example: ''
                        },
                        registr_date: {
                            type: 'string',
                            example: 'Something broke in the engine'
                        }
                    }
                }
            }
        },

    })
    async getProgramariForToday(): Promise<Programari[]> {
        return await this.progService.getProgramariForToday();
    }
}