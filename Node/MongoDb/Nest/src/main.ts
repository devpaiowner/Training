import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CommonConfig } from './config/CommonConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(CommonConfig?.PORT);

  // const eventsGateway = app.get(EventsGateway)
  // setInterval(() => eventsGateway.sendMessage(), 2000)
}
bootstrap();
