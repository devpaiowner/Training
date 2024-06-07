import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CommonConfig } from './config/CommonConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  // app.enableCors({
  //   "origin": "*",
  //   "methods": "GET, HEAD, PUT, PATCH, POST, DELETE",
  //   "preflightContinue": false,
  //   "optionsSuccessStatus": 204
  // });
  await app.listen(CommonConfig?.PORT);
}
bootstrap();
