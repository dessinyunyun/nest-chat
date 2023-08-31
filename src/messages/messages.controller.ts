import { Body, Controller, Post, UseGuards, Param, Get } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { ChatDto } from './dto/chat.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getMessageByRoom(@Param('id') id: string) {
    return this.messagesService.getMessagesByIdRoom(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('send-message')
  createChat(@Body() createChatDto: ChatDto) {
    return this.messagesService.createChat(createChatDto);
  }
}
