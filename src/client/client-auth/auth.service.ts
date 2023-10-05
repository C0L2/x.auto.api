import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Session,
} from '@nestjs/common';
import { ClientService } from '../client.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import { RoleService } from 'src/role/role.service';
const scrypt = promisify(_scrypt);

@Injectable()
export class ClientAuthService {
  constructor(
    private clientsService: ClientService,
    private readonly jwtService: JwtService,
    private roleService: RoleService
  ) { }

  // used in client-local.strategy.ts do not delete or commit
  async validateUser(
    email: string,
    password: string,
  ): Promise<any> {
    const client = await this.clientsService.findByEmail(email);

    if (client && client.password === password) {
      return client;
    }
    return null;
  }

  async reg(
    nume_client: string,
    email: string,
    numar_telefon: string,
    password: string,
    role_id: number,
  ) {
    const clientEmail = await this.clientsService.findByEmail(email);

    if (role_id !== 5) {
      throw new BadRequestException('You cannot register in with anything but with id = 5 ')
    }

    if (clientEmail) {
      throw new BadRequestException('Email is already in use');
    }

    const role = await this.roleService.findRoleById(role_id);
    if (!role) {
      throw new NotFoundException('Role not found');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    const client = await this.clientsService.create(
      nume_client,
      email,
      numar_telefon,
      result,
      role.role_id,
    );
    return client;
  }


  async login(email: string, password: string, @Session() session: any) {
    const [client] = await this.clientsService.getAllClientsByEmail(email);

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    const [salt, storedHash] = client.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (hash.toString('hex') !== storedHash) {
      throw new BadRequestException('Wrong password');
    }

    const payload = {
      sub: client.client_id,
      client_name: client.nume_client,
      email: client.email,
      role_id: client.role_id
    };
    const access_token = this.jwtService.sign(payload);

    session.client = {
      client_id: client.client_id,
      client_name: client.nume_client,
      email: client.email,
      role_id: client.role_id
    };

    session.jwt_token = access_token;
    console.log(session)
    return access_token;
  }
}
