import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Client } from './client.entity';
import { Role } from 'src/role/role.entity';
import { RoleService } from 'src/role/role.service';
import { ClientAuthService } from './client-auth/auth.service';
import { ClientLocalStrategy } from './client-auth/client-local.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'local' }),
    TypeOrmModule.forFeature([Client, Role]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1200s' },
    }),
  ],
  controllers: [ClientController],
  providers: [ClientService, RoleService, ClientAuthService, ClientLocalStrategy]
})
export class ClientModule { }
