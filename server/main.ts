import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  let appModule;
  if (process.env.NODE_ENV === 'production') {
    appModule = await import('./app.module.prod');
  } else {
    appModule = await import('./app.module.dev');
  }
  const app = await NestFactory.create(appModule.AppModule);
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT);
  console.log(
    `Application is running on: ${await app.getUrl()} in ${
      process.env.NODE_ENV
    } mode`,
  );
}
bootstrap();
