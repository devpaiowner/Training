import type { NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

export async function server(options?: NestApplicationOptions) {
  return NestFactory.create(AppModule, options);
}

if (require.main === module) {
  void server().then((app) => app.listen(3000));
}
