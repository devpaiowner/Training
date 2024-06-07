import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphqlModule } from './graphql/graphql.module';
import { UserResolver } from './user/user.resolver';

@Module({
  imports: [GraphqlModule],
  controllers: [AppController],
  providers: [AppService, UserResolver],
})
export class AppModule {}
