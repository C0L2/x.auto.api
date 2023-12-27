import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Client } from '../entities/client.entity';
import { WorkerReportModule } from 'src/worker-report/worker-report.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'local' }),
    TypeOrmModule.forFeature([Client]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1200s' },
    }),
  ],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService]
})
export class ClientModule { }
