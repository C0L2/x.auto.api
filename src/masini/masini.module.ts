import { Module } from '@nestjs/common';
import { MasiniController } from './masini.controller';
import { MasiniService } from './masini.service';
import { Role } from 'src/role/role.entity';
import { Client } from 'src/entities/client.entity';
import { Masini } from './masini.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { ClientService } from 'src/client/client.service';
import { AuthManagerGuard } from 'src/guards/auth-manager.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'local' }),
  TypeOrmModule.forFeature([Masini, Client, Role]),
  JwtModule.register({
    secret: 'secret',
    signOptions: { expiresIn: '1200s' },
  }),],
  controllers: [MasiniController],
  providers: [MasiniService, ClientService, AuthManagerGuard]
})
export class MasiniModule { }
