import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Appointment } from '../entities/appointment.entity';
import { ClientModule } from 'src/client/client.module';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'local' }),
  TypeOrmModule.forFeature([Appointment]),
  JwtModule.register({
    secret: 'secret',
    signOptions: { expiresIn: '1200s' },
  }), ClientModule
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService]
})
export class AppointmentModule { }
