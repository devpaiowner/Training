import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export async function server(options?: NestApplicationOptions) {
  const app = await NestFactory.create(AppModule, options);
  app.useGlobalPipes(new ValidationPipe());
  return app;
}

if (require.main === module) {
  void server().then((app) => app.listen(3000));
}
