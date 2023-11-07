import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import {corsConfig} from "./config/cors.config";
import {validationConfig} from "./config/validation.config";
import cookieParser from 'cookie-parser';
import { AppModule } from './app/app.module';



dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors(corsConfig);
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe(validationConfig));

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
