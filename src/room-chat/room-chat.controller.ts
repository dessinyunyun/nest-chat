import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RoomChatService } from './room-chat.service';
import { RoomDto } from './dto/room.dto';
import { JoinRoomDto } from './dto/join-room.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('room-chat')
export class RoomChatController {
  constructor(private readonly roomService: RoomChatService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create-room')
  createRoomChat(@Body() creatRoom: RoomDto) {
    return this.roomService.createRoom(creatRoom);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('join-room')
  joinRoomChat(@Body() joinRoom: JoinRoomDto) {
    return this.roomService.joinRoom(joinRoom);
  }

  @UseGuards(JwtAuthGuard)
  @Get('room-group')
  findAllGroupRoom() {
    return this.roomService.getAllGroupRoom();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findUserRoom(@Param('id') id: string) {
    return this.roomService.getUserRooms(id);
  }
}
