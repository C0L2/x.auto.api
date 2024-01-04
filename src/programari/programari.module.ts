import { Module } from '@nestjs/common';
import { ProgramariController } from './programari.controller';
import { ProgramariService } from './programari.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Programari } from '../entities/programari.entity';
import { ClientModule } from 'src/client/client.module';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'local' }),
  TypeOrmModule.forFeature([Programari]),
  JwtModule.register({
    secret: 'secret',
    signOptions: { expiresIn: '1200s' },
  }), ClientModule
  ],
  controllers: [ProgramariController],
  providers: [ProgramariService]
})
export class ProgramariModule { }
