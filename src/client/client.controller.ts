import { Body, Param, Controller, Get, Post, UseInterceptors, HttpStatus, Delete, Patch } from '@nestjs/common';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { ApiBody, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateClientDto } from './dto/create-client.dto';
import { ClientService } from './client.service';
import { Client } from 'src/entities/client.entity';

@ApiTags('Client')
@Controller('client')
export class ClientController {
    constructor(private clientService: ClientService) { }

    @Post('/add-client')
    @UseInterceptors(SerializeInterceptor)
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                nume_client: {
                    type: 'string',
                    example: 'Vasile'
                },
                email: {
                    type: 'string',
                    example: 'vasile@chiron.com'
                },
                numar_telefon: {
                    type: 'string',
                    example: '+37369565000'
                }
            }
        }
    })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Successfully added new client',
        schema: {
            properties: {
                message: {
                    type: 'string',
                    example: 'Successfully added new client'
                },
                programare: {
                    type: 'object',
                    example: {
                        nume_client: {
                            type: 'string',
                            example: 'Victor'
                        },
                        email: {
                            type: 'string',
                            example: 'victor@ahlamon.com'
                        },
                        numar_telefon: {
                            type: 'string',
                            example: '+37369565000'
                        }
                    }
                }
            }
        },
    })
    async createClient(@Body() body: CreateClientDto) {
        await this.clientService.create(
            body.client_name,
            body.email,
            body.phone_number,
        );
        return { message: 'Successfully added new client', programare: body };
    }

    @Get('/all-clients')
    @ApiResponse({
        status: HttpStatus.OK,
        isArray: true,
        schema: {
            type: 'object',
            properties: {
                numberOfClients: {
                    type: 'string',
                    example: '43',
                },
                clients: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            client_id: {
                                type: 'number',
                                example: 1,
                            },
                            nume_client: {
                                type: 'string',
                                example: 'Victor',
                            },
                            email: {
                                type: 'string',
                                example: 'victor@ahlamon.com',
                            },
                            numar_telefon: {
                                type: 'string',
                                example: '+37369565000',
                            },
                        },
                    },
                },
            },
        },
    })
    async getAllClients() {
        return this.clientService.getAllClients();
    }

    @Get('/find-client-by-name/:client_name')
    @ApiOperation({ description: 'Get all clients with this specific name' })
    @ApiResponse({
        status: HttpStatus.OK,
        isArray: true,
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    client_id: {
                        type: 'number',
                        example: 3,
                    },
                    nume_client: {
                        type: 'string',
                        example: 'Mihai',
                    },
                    email: {
                        type: 'string',
                        example: 'mihai@ahlamon.com',
                    },
                    numar_telefon: {
                        type: 'string',
                        example: '+37369565000',
                    },
                },
            },
        },
    })
    async findClient(@Param('client_name') client_name: string) {
        return this.clientService.findByName(client_name);
    }

    @Delete('delete-client/:id')
    @ApiOperation({ description: 'Delete an existing specific client from database' })
    @ApiResponse({
        status: HttpStatus.OK,
        schema: {
            type: 'object',
            properties: {
                message: {
                    type: 'string',
                    example: 'Client deleted successfully'
                }
            }
        }
    })
    async removeClient(@Param('id') id: number) {
        return await this.clientService.remove(id);
    }

    @Patch('update-client/:id')
    @ApiOperation({ description: 'Update a client' })
    @ApiResponse({
        status: HttpStatus.OK,
        schema: {
            type: 'object',
            properties: {
                message: {
                    type: 'string',
                    example: 'Successfully updated client',
                },
                data: {
                    type: 'object',
                    properties: {
                        client_id: {
                            type: 'number',
                            example: 4,
                        },
                        nume_client: {
                            type: 'string',
                            example: 'Alexandru',
                        },
                        email: {
                            type: 'string',
                            example: 'mihai@ahlamon.com',
                        },
                        numar_telefon: {
                            type: 'string',
                            example: '+37069565000',
                        },
                    },
                },
            },
        },
    })
    async update(@Param('id') id: number, @Body() attrs: Partial<Client>) {
        try {
            const updatedClient = await this.clientService.update(id, attrs);
            return { message: 'Sucessfully updated client', data: updatedClient };
        } catch (error) {
            return { message: error.message };
        }
    }
}



