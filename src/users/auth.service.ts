import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Session,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    first_name: string,
    second_name: string,
    father_name: string,
    email: string,
    birth_date: Date,
    role: string,
    password: string,
  ): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user && user.password === password) {
      return user;
    }

    return null;
  }

  async reg(
    first_name: string,
    second_name: string,
    father_name: string,
    email: string,
    birth_date: Date,
    role: string,
    password: string,
  ) {
    const userEmail = await this.usersService.findByEmail(email);

    if (userEmail) {
      throw new BadRequestException('Email is already in use');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    const user = await this.usersService.create(
      first_name,
      second_name,
      father_name,
      email,
      birth_date,
      role,
      result,
    );
    return user;
  }

  async login(email: string, password: string, @Session() session: any) {
    const [user] = await this.usersService.getAllUsers(email);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (hash.toString('hex') !== storedHash) {
      throw new BadRequestException('wrong password');
    }

    const payload = {
      sub: user.id_user,
      user_first_name: user.first_name,
      user_second_name: user.second_name,
      email: user.email,
    };
    const access_token = this.jwtService.sign(payload);

    session.user = {
      id_user: user.id_user,
      user_first_name: user.first_name,
      user_second_name: user.second_name,
      email: user.email,
    };

    session.jwt_token = access_token;
    return access_token;
  }
}
