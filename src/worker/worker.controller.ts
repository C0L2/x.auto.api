import { CreateWorkerDto } from './dto/create-worker.dto';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Session,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoignWorkerDto } from './dto/login-worker.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleService } from 'src/role/role.service';

@ApiTags('Authentification/Authorization')
@Controller('auth')
export class WorkerController {
  constructor(private authService: AuthService,
    private roleService: RoleService) { }

  @Post('/register')
  @UseInterceptors(SerializeInterceptor)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nume_lucrator: {
          type: 'string',
          example: 'Vasile'
        },
        prenume_lucrator: {
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
        salary: {
          type: 'number',
          example: '1500'
        },
        role_id: {
          type: 'number',
          example: '1'
        },
        password: {
          type: 'string',
          example: '1********erd'
        },
      }
    }
  })

  async createUser(@Body() body: CreateWorkerDto) {
    try {
      const role = await this.roleService.findRoleById(body.role_id);
      if (!role) {
        throw new Error('Role not found');
      }

      const worker = await this.authService.reg(
        body.nume_lucrator,
        body.prenume_lucrator,
        body.email,
        body.numar_telefon,
        body.salary,
        body.role_id,
        body.password,
      );
      return { message: 'Registered successfully', worker: body };
    } catch (error) {
      return { message: 'Registration failed', error: error.message };
    }
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
    const token = await this.authService.login(
      body.email,
      body.password,
      session,
    );
    const res = { message: 'Logged in successfully', access_token: token };
    return res;
  }

  @Get('/protected')
  @UseGuards(AuthGuard)
  getProtectedRoute(@Session() session: any) {
    if (session.worker) {
      const workerData = session.worker;

      return { message: 'Welcome to the protected route!' };
    } else {
      return 'Unauthorized';
    }
  }
}
