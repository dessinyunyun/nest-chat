import { Module } from '@nestjs/common';
import { RoomChatController } from './room-chat.controller';
import { RoomChatService } from './room-chat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomChat, RoomChatSchema } from 'src/schemas/room-chat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RoomChat.name, schema: RoomChatSchema },
    ]),
  ],
  controllers: [RoomChatController],
  providers: [RoomChatService],
  exports: [RoomChatService],
})
export class RoomChatModule {}
