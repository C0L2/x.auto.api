import { Body, Controller, Delete, Get, HttpStatus, Param, Post, } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags, } from '@nestjs/swagger';
import { CreateProgramareDto } from './dto/create-programare.dto';
import { ProgramariService } from './programari.service';
import { AuthManagerGuard } from 'src/guards/auth-manager.guard';
import { Programari } from '../entities/programari.entity';
import { GetProgramariBetweenDatesDto } from './dto/get_programari-in-period.dto';
import { CreatedAppointmentRes } from './types';

@ApiTags('Appointments')
@Controller('appointments')
export class ProgramariController {
    constructor(private progService: ProgramariService) { }

    // @UseGuards(AuthManagerGuard)
    @Post('new-appointment')
    @ApiOperation({ description: 'Create a new appointment and save it in database' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                programare_name: {
                    type: 'string',
                    example: 'Something is broke'
                },
                registr_date: {
                    type: 'Date',
                    example: "2023-12-14"
                }
            }
        },
    })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Successfully added new appointment',
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
        await this.progService.create(body);
        return { message: 'Successfully added new appointment', programare: body };
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
    @Delete('delete-appointment/:id')
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
    @Get('appointments-for-today')
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

    @Get('find-all-appointments')
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


    @Get('appointments-for-tomorow')
    @ApiOperation({ description: 'Get all existing in database appointments from tomorrow ' })
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
    async getProgramariForTomorew(): Promise<Programari[]> {
        return await this.progService.getProgramariForTomorrow();
    }

    @Get('appointments-for-current-week')
    async getProgramariForCurrentWeek(): Promise<Programari[]> {
        return await this.progService.getProgramariForCurrentWeek();
    }

    @Get('appointments-for-next-week')
    async getProgramariForNextWeek(): Promise<Programari[]> {
        return await this.progService.getProgramariForNextWeek();
    }

    @Get('appointments-for-current-month')
    async getProgramariForCurrentMonth(): Promise<Programari[]> {
        return await this.progService.getProgramariForCurrentMonth();
    }
}