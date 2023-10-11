import { Body, Param, Controller, Get, Post, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateClientDto } from './dto/create-client.dto';
import { LoignWorkerDto } from 'src/worker/dto/login-worker.dto';
import { AuthClientGuard } from 'src/guards/auth-client.guard';
import { Client } from '../entities/client.entity';
import { ClientService } from './client.service';

@ApiTags('Client-Auth')
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
    async createClient(@Body() body: CreateClientDto) {
        const programare = await this.clientService.create(
            body.numar_telefon,
            body.email,
            body.numar_telefon,
        );
        return { message: 'Successfully added new client', programare: body };
    }

    @Get('/all-clients')
    async getAllClients(): Promise<Client[]> {
        return this.clientService.getAllClients();
    }

    @Get('/find-client/:client_id')
    async fincClient(@Param('client_id') client_id: number): Promise<Client | undefined> {
        return this.clientService.findById(client_id);
    }

    @Get('/find-client-id/:email')
    async fincClientId(@Param('email') email: string): Promise<number | undefined> {
        const client: any = await this.clientService.findByEmail(email,);
        return client.client_id
    }
}

