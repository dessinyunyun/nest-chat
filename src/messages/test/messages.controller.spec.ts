import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, HttpException } from '@nestjs/common';
import { MessagesController } from '../messages.controller';
import { MessagesService } from '../messages.service';
import { ChatDto } from '../dto/chat.dto';

describe('MessagesController', () => {
  let messagesController: MessagesController;
  let messagesService: MessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [
        {
          provide: MessagesService,
          useValue: {
            createChat: jest.fn(),
            getMessagesByIdRoom: jest.fn(),
          },
        },
      ],
    }).compile();

    messagesController = module.get<MessagesController>(MessagesController);
    messagesService = module.get<MessagesService>(MessagesService);
  });

  describe('createChat', () => {
    it('should create a new chat', async () => {
      const chatDto = {
        roomChat_id: '64eeceecfc22d4d53db696b0',
        sender_id: {
          _id: '64edf5a1cebf4b136cbc1966',
          username: 'dessi',
          password:
            '$2a$10$E0BTU9mqJQAx0bv1xndyLuA35IGz2DNat5NICcocV2Yesh1jdr1ke',
          createdAt: '2023-08-29T13:41:53.911Z',
          updatedAt: '2023-08-29T13:41:53.911Z',
          __v: 0,
        },
        message: 'tes aja',
        _id: '64f00ea06aa1ba1089024bc0',
        createdAt: '2023-08-31T03:53:04.090Z',
        updatedAt: '2023-08-31T03:53:04.090Z',
      };

      jest
        .spyOn(messagesService, 'createChat')
        .mockResolvedValue(chatDto as any);

      let newMessage: any = {
        roomChat_id: '64eeceecfc22d4d53db696b0',
        sender_id: '64edf5a1cebf4b136cbc1966',
        message: 'tes aja',
      };

      const result = await messagesController.createChat(newMessage);

      expect(result).toEqual(chatDto);
    });
  });

  describe('getMessageByRoom', () => {
    it('should retrieve messages by room ID', async () => {
      const roomID = 'room123';
      const mockMessages = [
        {
          _id: '64eefbf56efb868bd30df8ec',
          roomChat_id: '64eeceecfc22d4d53db696b0',
          sender_id: {
            _id: '64edf5a1cebf4b136cbc1966',
            username: 'dessi',
            password:
              '$2a$10$E0BTU9mqJQAx0bv1xndyLuA35IGz2DNat5NICcocV2Yesh1jdr1ke',
            createdAt: '2023-08-29T13:41:53.911Z',
            updatedAt: '2023-08-29T13:41:53.911Z',
            __v: 0,
          },
          message: 'hey',
          createdAt: '2023-08-30T08:21:09.093Z',
          updatedAt: '2023-08-30T08:21:09.093Z',
        },
      ];

      jest
        .spyOn(messagesService, 'getMessagesByIdRoom')
        .mockResolvedValue(mockMessages as any);

      const result = await messagesController.getMessageByRoom(roomID);

      expect(result).toEqual(mockMessages);
    });
  });
});
