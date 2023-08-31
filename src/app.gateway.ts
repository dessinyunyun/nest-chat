import {
  SubscribeMessage,
  OnGatewayConnection,
  MessageBody,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ChatDto } from './messages/dto/chat.dto';
import { JoinRoomDto } from './room-chat/dto/join-room.dto';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { MessagesService } from './messages/messages.service';
import { AuthService } from './auth/auth.service';
import { RoomChatService } from './room-chat/room-chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway
  implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect
{
  constructor(
    private readonly messagesService: MessagesService,
    private readonly authService: AuthService,
    private readonly roomChatService: RoomChatService,
  ) {}

  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('create_message')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: ChatDto,
  ): Promise<void> {
    const token = client.handshake.auth.token; // Ambil token dari handshake
    try {
      const checkToken = await this.authService.validateAuthentication(token);

      const messages = await this.messagesService.createChat(payload);
      const data = {
        token,
        checkToken,
        messages,
      };
      this.server.emit('response_message', data);
    } catch (error) {
      this.server.emit('response_message', error);
    }
  }

  @SubscribeMessage('join_room')
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any,
  ): Promise<void> {
    const token = client.handshake.auth.token; // Ambil token dari handshake
    try {
      const checkToken = await this.authService.validateAuthentication(token);
      const room = await this.roomChatService.joinRoom(payload);

      const payloadForMessages: any = {
        roomChat_id: payload.room_id,
        sender_id: payload.newMember,
        message: 'new user join',
      };
      const messages = await this.messagesService.createChat(
        payloadForMessages,
      );

      const data = {
        room,
        messages,
      };
      this.server.emit('response_joinroom', data);
    } catch (error) {
      this.server.emit('response_joinroom', error);
    }
  }

  afterInit(server: Server) {
    this.logger.log(server);
    //Do stuffs
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    //Do stuffs
  }

  async handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    //Do stuffs
  }
}
