import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Req, Res,
  Session
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
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

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user && user.password === password) {
      return user;
    }

    return null;
  }

  async reg(nickname: string, email: string, password: string) {
    const userEmail = await this.usersService.findByEmail(email);
    const userNickname = await this.usersService.findByNickname(nickname);

    if (userEmail) {
      throw new BadRequestException('Email is already in use');
    }

    if (userNickname) {
      throw new BadRequestException('Nickname is already in use');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    const user = await this.usersService.create(nickname, email, result);
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

    const payload = { sub: user.id_user, user: user.nickname, email: user.email };
    const access_token = this.jwtService.sign(payload);

    session.user = {
      id_user: user.id_user,
      nickname: user.nickname,
      email: user.email,
    };

    session.jwt_token = access_token;
    return access_token;
  }
}
