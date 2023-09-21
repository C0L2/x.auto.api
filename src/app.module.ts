import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TeamsModule } from './teams/teams.module';
import config from 'config';
import { PassportModule } from '@nestjs/passport';
import { SessionModule } from 'nestjs-session';
import { UserTeamModule } from './user-team/user-team.module';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    SessionModule.forRoot({ session: { secret: process.env.SECRET_KEY! } }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<TypeOrmModuleOptions>("database"),
    }),
    UsersModule,
    TeamsModule,
    UserTeamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
