import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import mongoose, { ObjectId } from 'mongoose';
import { RoomChat } from 'src/schemas/room-chat.schema';
import { RoomDto } from './dto/room.dto';
import { JoinRoomDto } from './dto/join-room.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RoomChatService {
  constructor(
    @InjectModel('RoomChat')
    private chatRoomModel: mongoose.Model<RoomChat>,
  ) {}

  async createRoom(roomData: RoomDto) {
    try {
      return await this.chatRoomModel.create(roomData);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async joinRoom(roomData: JoinRoomDto) {
    try {
      const room = await this.chatRoomModel.findOne({ _id: roomData.room_id });

      if (!room) {
        throw new HttpException(`Room does not exist`, HttpStatus.BAD_REQUEST);
      }

      room.members.push(roomData.newMember);
      await room.save();

      return room;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllGroupRoom() {
    try {
      return await this.chatRoomModel
        .find({ name: { $ne: '' } })
        .populate('members')
        .exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserRooms(id: string) {
    try {
      return await this.chatRoomModel
        .find({ members: id })
        .populate('members')
        .exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
