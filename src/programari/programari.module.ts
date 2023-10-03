import { Module } from '@nestjs/common';
import { ProgramariController } from './programari.controller';
import { ProgramariService } from './programari.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Client } from 'src/client/client.entity';
import { ClientService } from 'src/client/client.service';
import { ClientAuthService } from 'src/client/client-auth/auth.service';
import { ClientLocalStrategy } from 'src/client/client-auth/client-local.strategy';
import { Programari } from './programari.entity';
import { RoleService } from 'src/role/role.service';
import { Role } from 'src/role/role.entity';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'local' }),
  TypeOrmModule.forFeature([Programari, Client, Role]),
  JwtModule.register({
    secret: 'secret',
    signOptions: { expiresIn: '1200s' },
  }),
  ],
  controllers: [ProgramariController],
  providers: [ProgramariService, ClientService, ClientAuthService, ClientLocalStrategy, RoleService]
})
export class ProgramariModule { }
