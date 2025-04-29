import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config(
    {
      origin: ['https://chat-app-git-main-ramiros-projects-0e046e07.vercel.app/'],
      credentials: true,
    },
  );
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
