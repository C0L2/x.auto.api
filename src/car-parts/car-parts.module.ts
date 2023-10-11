import { Module } from '@nestjs/common';
import { CarPartsController } from './car-parts.controller';
import { CarPartsService } from './car-parts.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { CarParts } from 'src/entities/car-parts.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'local' }),
    TypeOrmModule.forFeature([CarParts]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1200s' },
    }),
  ],
  controllers: [CarPartsController],
  providers: [CarPartsService]
})
export class CarPartsModule { }
