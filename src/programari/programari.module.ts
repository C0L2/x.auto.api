import { Module } from '@nestjs/common';
import { ProgramariController } from './programari.controller';
import { ProgramariService } from './programari.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Programari } from './programari.entity';
import { RoleService } from 'src/role/role.service';
import { Role } from 'src/role/role.entity';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'local' }),
  TypeOrmModule.forFeature([Programari, Role]),
  JwtModule.register({
    secret: 'secret',
    signOptions: { expiresIn: '1200s' },
  }),
  ],
  controllers: [ProgramariController],
  providers: [ProgramariService, RoleService]
})
export class ProgramariModule { }
