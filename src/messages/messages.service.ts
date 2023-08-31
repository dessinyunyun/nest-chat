import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { ChatDto } from './dto/chat.dto';
import { Message } from 'src/schemas/messages.schema';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class MessagesService {
  constructor(
    @InjectModel('Message')
    private messagesModel: mongoose.Model<Message>,
  ) {}

  async createChat(createChat: ChatDto) {
    try {
      return (await this.messagesModel.create(createChat)).populate(
        'sender_id',
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getMessagesByIdRoom(id: string) {
    try {
      return await this.messagesModel
        .find({ roomChat_id: id })
        .populate('sender_id')
        .exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
