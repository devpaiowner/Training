import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonConfig } from './config/CommonConfig';

/*==== Api Imports ====*/
import { AuthModule as ApiAuthModule } from './api/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(CommonConfig?.MONGODB_URI),

    /*==== Api Modules Imports ====*/
    ApiAuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
