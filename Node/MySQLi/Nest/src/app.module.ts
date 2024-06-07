import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommonConfig } from './config/CommonConfig';
import { UserModel } from './models/users.model';
import { AuthModule } from './api/auth/auth.module';
import { ChatsModule } from './api/chats/chats.module';
import { ChatModel } from './models/chats.model';
import { MessageModel } from './models/messages.model';
import { GroupModel } from './models/groups.model';

@Module({
  imports: [
    EventsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: CommonConfig?.DATABASE_HOST,
      port: <any>CommonConfig?.DATABASE_PORT,
      username: CommonConfig?.DATABASE_USER,
      password: CommonConfig?.DATABASE_PWD,
      database: CommonConfig?.DATABASE_NAME,
      dialectOptions: {
        options: {
          useUTC: true
        }
      },
      autoLoadModels:true,
      pool: {
        max: CommonConfig.SQLZR_POOL_SETTING.POOL_MAX,
        min: CommonConfig.SQLZR_POOL_SETTING.POOL_MIN,
        idle: CommonConfig.SQLZR_POOL_SETTING.POOL_IDLE,
        acquire: CommonConfig.SQLZR_POOL_SETTING.POOL_ACQUIRE,
        evict: CommonConfig.SQLZR_POOL_SETTING.POOL_EVICT
      },
      models: [
        UserModel,
        ChatModel,
        MessageModel,
        GroupModel,
        
      ]
    }),

    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
