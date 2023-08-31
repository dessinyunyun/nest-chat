import { HttpStatus, HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { MessagesService } from '../messages.service';
import { Message } from '../../schemas/messages.schema';

describe('MessagesService', () => {
  let messagesService: MessagesService;
  let messageModelMock: any;

  const mockMessages = [
    { sender_id: 'user1', content: 'Hello' },
    { sender_id: 'user2', content: 'Hi there' },
  ];

  beforeEach(async () => {
    messageModelMock = {
      create: jest.fn(),
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        {
          provide: getModelToken('Message'),
          useValue: messageModelMock,
        },
      ],
    }).compile();

    messagesService = module.get<MessagesService>(MessagesService);
  });

  describe('createChat', () => {
    it('should create a new chat', async () => {
      const chatDto = {
        roomChat_id: ['64eeceecfc22d4d53db696b0'],
        sender_id: '64edf5a1cebf4b136cbc1966',
        message: 'tes',
      };

      messageModelMock.create.mockResolvedValue(chatDto);

      const result = await messagesService.createChat(chatDto);

      expect(result).toEqual(chatDto);
    });
  });

  describe('getMessagesByIdRoom', () => {
    it('should retrieve messages by room ID', async () => {
      const roomID = 'room123';
      messageModelMock.find.mockResolvedValue(mockMessages);

      const result = await messagesService.getMessagesByIdRoom(roomID);

      expect(result).toEqual(mockMessages);
    });

    it('should throw an HttpException if an error occurs', async () => {
      messageModelMock.find.mockRejectedValue(new Error('Database error'));

      await expect(
        messagesService.getMessagesByIdRoom('room123'),
      ).rejects.toThrowError(
        new HttpException('Database error', HttpStatus.INTERNAL_SERVER_ERROR),
      );
    });
  });
});
