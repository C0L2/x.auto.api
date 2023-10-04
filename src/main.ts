import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';

import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(
    session({
      secret: process.env.JWT_KEY!,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('x.auto-service.md')
    .setDescription('Automatization process for auto-service')
    .setVersion('0.2.6')
    .addTag('API DOCUMENTATION')
    .build()

  const swagger_document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-documentation', app, swagger_document)
  await app.listen(process.env.PORT || 9800);
}
bootstrap();
