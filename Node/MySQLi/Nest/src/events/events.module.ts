import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { ChatsService } from 'src/api/chats/chats.service';

@Module({
  providers: [EventsGateway, ChatsService]
})
export class EventsModule { }
