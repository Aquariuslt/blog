import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const port = 5000;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  await app.close();
}

bootstrap().then();
