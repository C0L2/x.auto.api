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
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { RoleService } from 'src/role/role.service';
import { workerData } from 'worker_threads';

@ApiTags('Authentification/Authorization')
@Controller('worker')
export class WorkerController {
  constructor(private authService: AuthService,
    private roleService: RoleService) { }

  @Post('/register')
  @UseInterceptors(SerializeInterceptor)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        worker_name: {
          type: 'string',
          example: 'Vasile'
        },
        worker_surname: {
          type: 'string',
          example: 'Chiron'
        },
        email: {
          type: 'string',
          example: 'vasile@chiron.com'
        },
        password: {
          type: 'string',
          example: '1***'
        },
        role_id: {
          type: 'number',
          example: '1'
        }
      }
    }
  })
  async createWorker(@Body() body: CreateWorkerDto) {
    try {
      const role = await this.roleService.findRoleById(body.role_id);
      if (!role) {
        throw new Error('Role not found');
      }

      const worker = await this.authService.reg(
        body.worker_name,
        body.worker_surname,
        body.email,
        body.password,
        body.role_id
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
      console.log(session.worker)
      return { message: 'Welcome to the protected route!' };
    } else {
      return { message: 'Unauthorized' };
    }
  }
}
