import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

import * as dotenv from 'dotenv';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

dotenv.config();

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'local' }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1200s' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService, LocalStrategy],
})
export class UsersModule {}
