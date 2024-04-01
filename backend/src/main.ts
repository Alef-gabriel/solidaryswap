import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      methods: 'GET,PUT,POST,DELETE',
      credentials: true,
    },
  });
  await app.listen(3000);
}
bootstrap();
