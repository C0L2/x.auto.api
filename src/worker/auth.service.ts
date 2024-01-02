import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Session,
} from '@nestjs/common';
import { WorkerService } from './worker.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import { RoleService } from 'src/role/role.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private workersService: WorkerService,
    private readonly jwtService: JwtService,
    private roleService: RoleService
  ) { }

  // used in local.strategy.ts do not delete or commit
  async validateUser(
    email: string,
    password: string,
  ): Promise<any> {
    const worker = await this.workersService.findByEmail(email);

    if (worker && worker.password === password) {
      return worker;
    }
    return null;
  }

  async reg(
    worker_name: string,
    worker_surname: string,
    email: string,
    password: string,
    role_id: number
  ) {
    const workerEmail = await this.workersService.findByEmail(email);

    if (workerEmail) {
      throw new BadRequestException('Email is already in use');
    }

    const role = await this.roleService.findRoleById(role_id);
    if (!role) {
      throw new NotFoundException('Role not found');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    const worker = await this.workersService.create(
      worker_name,
      worker_surname,
      email,
      result,
      role.role_id,
    );

    return worker;
  }


  async login(email: string, password: string, @Session() session: any) {
    const worker = await this.workersService.findByEmail(email);

    if (!worker) {
      throw new NotFoundException('worker not found');
    }

    const [salt, storedHash] = worker.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (hash.toString('hex') !== storedHash) {
      throw new BadRequestException('wrong password');
    }

    const payload = {
      sub: worker.worker_id,
      worker_name: worker.worker_name,
      worker_surname: worker.worker_surname,
      email: worker.email,
      role: worker.role_id
    };
    const access_token = this.jwtService.sign(payload);

    session.worker = {
      sub: worker.worker_id,
      worker_name: worker.worker_name,
      worker_surname: worker.worker_surname,
      email: worker.email,
      role: worker.role_id
    };

    session.jwt_token = access_token;
    return access_token
  }

  async logout(@Session() session: any): Promise<void> {
    if (session.worker) {
      delete session.worker;
      delete session.jwt_token;
    }
  }
}
