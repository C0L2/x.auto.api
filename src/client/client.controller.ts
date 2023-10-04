import { Body, Controller, Get, Post, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { ClientAuthService } from './client-auth/auth.service';
import { RoleService } from 'src/role/role.service';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateClientDto } from './dto/create-client.dto';
import { LoignWorkerDto } from 'src/worker/dto/login-worker.dto';
import { AuthClientGuard } from 'src/guards/auth-client.guard';
import { Client } from './client.entity';
import { ClientService } from './client.service';

@ApiTags('Client-Auth')
@Controller('client')
export class ClientController {
    constructor(private clientAuthService: ClientAuthService,
        private clientService: ClientService,
        private roleService: RoleService) { }

    @Post('/register')
    @UseInterceptors(SerializeInterceptor)
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                nume_client: {
                    type: 'string',
                    example: 'Vasile'
                },
                prenume_client: {
                    type: 'string',
                    example: 'Chiron'
                },
                email: {
                    type: 'string',
                    example: 'vasile@chiron.com'
                },
                numar_telefon: {
                    type: 'string',
                    example: '+37369565000'
                },
                password: {
                    type: 'string',
                    example: '1********erd'
                },
                role_id: {
                    type: 'number',
                    example: '2'
                }
            }
        }
    })

    async createClient(@Body() body: CreateClientDto) {
        try {
            const role = await this.roleService.findRoleById(body.role_id);
            if (!role) {
                throw new Error('Role not found');
            }

            const client = await this.clientAuthService.reg(
                body.nume_client,
                body.prenume_client,
                body.email,
                body.numar_telefon,
                body.password,
                body.role_id,
            );
            return { message: 'Registered successfully', client: body };
        } catch (error) {
            return { message: 'Registration failed', error: error.message };
        }
    }

    @Get('/all-clients')
    async getAllRoutes(): Promise<Client[]> {
        return this.clientService.getAllClients();
    }

    @Post('/login')
    @UseInterceptors(SerializeInterceptor)
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                    example: 'vasile@gmail.com'
                },
                password: {
                    type: 'string',
                    example: 'sju******5*****asd'
                }
            }
        }
    })
    async loginUser(@Body() body: LoignWorkerDto, @Session() session: any) {
        const token = await this.clientAuthService.login(
            body.email,
            body.password,
            session,
        );
        const res = { message: 'Logged in successfully', access_token: token };
        return res;
    }

    @Get('/protected-client')
    @UseGuards(AuthClientGuard)
    getProtectedRoute(@Session() session: any) {
        if (session.client) {
            const clientData = session.client;

            return { message: 'Welcome to the protected client-route!' };
        } else {
            return 'Unauthorized';
        }
    }
}

