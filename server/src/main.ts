import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  dotenv.config();
  let appModule;
  if (process.env.NODE_ENV !== 'production') {
    appModule = await import('./app.module.dev');
  } else {
    appModule = await import('./app.module.prod');
  }
  const app = await NestFactory.create(appModule.AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(process.env.PORT);
  console.log(
    `Application is running on: ${await app.getUrl()} in ${
      process.env.NODE_ENV
    } mode`,
  );
}
bootstrap();
