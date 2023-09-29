// local.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(
    first_name: string,
    second_name: string,
    father_name: string,
    email: string,
    birth_date: Date,
    role: string,
    password: string,
  ): Promise<any> {
    const user = await this.authService.validateUser(
      first_name,
      second_name,
      father_name,
      email,
      birth_date,
      role,
      password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
