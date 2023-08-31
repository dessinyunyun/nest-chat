import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, HttpException } from '@nestjs/common';
import { RoomChatService } from './room-chat.service';
import { getModelToken } from '@nestjs/mongoose';
import { CreateRoomDto } from './dto/create-room.dto';
import mongoose from 'mongoose';
import { RoomChat } from 'src/schemas/room-chat.schema';

describe('RoomChatService', () => {
  let roomChatService: RoomChatService;
  let mockRoomChatModel: mongoose.Model<RoomChat>;

  beforeEach(async () => {
    mockRoomChatModel = {
      create: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomChatService,
        {
          provide: getModelToken('RoomChat'),
          useValue: mockRoomChatModel,
        },
      ],
    }).compile();

    roomChatService = module.get<RoomChatService>(RoomChatService);
  });

  describe('createRoom', () => {
    it('should create a room', async () => {
      const mockRoomDto: any = {
        _id: '64edf5a1cebf4b136cbc1966',
        name: 'Test Room',
        members: [], // Add appropriate members here
        createdAt: '2023-08-29T13:41:53.911Z',
        updatedAt: '2023-08-29T13:41:53.911Z',
        __v: 0,
      };
      jest.spyOn(mockRoomChatModel, 'create').mockResolvedValue(mockRoomDto);
      const result = await roomChatService.createRoom(mockRoomDto);

      expect(result).toEqual(mockRoomDto);
    });
  });

  describe('joinRoom', () => {
    it('should add a new member to the room', async () => {
      const mockRoomDto: any = {
        _id: '64ef22a7d4695071a846b974',
        name: 'teknologi',
        members: [
          '64eecb1eea8cd80c0a1acbc1',
          '64ee0212e95bc6e73eb66755',
          '64edf5a1cebf4b136cbc1966',
          '64ef23a6d4695071a846b9a9',
          '64ef23a6d4695071a846b9a9', //new member
        ],
        createdAt: '2023-08-30T11:06:15.506Z',
        updatedAt: '2023-08-31T02:25:29.633Z',
        __v: 4,
      };

      jest.spyOn(mockRoomChatModel, 'create').mockResolvedValue(mockRoomDto);

      const result = await roomChatService.joinRoom(mockRoomDto);

      expect(result).toEqual(mockRoomDto);
    });
  });
});
