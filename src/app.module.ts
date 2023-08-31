import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { RoomChatModule } from './room-chat/room-chat.module';
import { MessagesModule } from './messages/messages.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './config/jwt-config';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    UsersModule,
    AuthModule,
    RoomChatModule,
    MessagesModule,
    AuthModule,
    JwtModule.register(jwtConfig),
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
