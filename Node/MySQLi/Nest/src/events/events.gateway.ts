import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatsService } from 'src/api/chats/chats.service';

@WebSocketGateway({ cors: true })
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatsService: ChatsService) { }

  @WebSocketServer()
  server: Server;

  connectedClients: string[] = [];

  afterInit(server: Server) {
    console.log('Socket Gateway initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    if (client?.handshake?.query?.user_id) {
      this.chatsService.user_join(client)
    }
  }

  handleDisconnect(client: Socket) {
    this.chatsService.user_leave(client)
  }

  @SubscribeMessage('send_message')
  async handleMessage(client: Socket, payload: any) {
    await this.chatsService.send_message(client, payload)
  }

  @SubscribeMessage('all_users')
  async all_users(client: Socket, payload: any) {
     await this.chatsService.all_users(client, payload)
  }

  @SubscribeMessage('add_friend')
  async addFriend(client: Socket, payload: any) {
     await this.chatsService.add_friend(client, payload)
  }


}


