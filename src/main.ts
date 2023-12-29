import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';

import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'dev'}` });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:5173',
    ],
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true,
  }); app.use(
    session({
      secret: 'secret',
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
    .setVersion('0.0.1')
    .addTag('API DOCUMENTATION')
    .build()

  const swagger_document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, swagger_document)
  await app.listen(process.env.PORT || 9800);
}
bootstrap();
