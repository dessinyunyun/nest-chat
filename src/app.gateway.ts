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
import { Server, Socket } from 'socket.io';
import { Logger, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages/messages.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';

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
      const tes = {
        token,
        checkToken,
        messages,
      };
      this.server.emit('response_message', tes);
    } catch (error) {
      this.server.emit('response_message', error);
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
