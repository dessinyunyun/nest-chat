import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { getModelToken } from '@nestjs/mongoose';
import { Users } from '../../schemas/users.schema';
import mongoose from 'mongoose';
describe('UsersService', () => {
  let service: UsersService;
  let mockUserModel: mongoose.Model<Users>;

  beforeEach(async () => {
    mockUserModel = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('Users'),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return array of users without passwords', async () => {
      const mockUsers = [
        {
          _id: '64eecb1eea8cd80c0a1acbc1',
          username: 'ipang',
          createdAt: '2023-08-30T04:52:46.361Z',
          updatedAt: '2023-08-30T04:52:46.361Z',
          __v: 0,
        },
        {
          _id: '64ef23a6d4695071a846b9a9',
          username: 'dihan',
          createdAt: '2023-08-30T11:10:30.624Z',
          updatedAt: '2023-08-30T11:10:30.624Z',
          __v: 0,
        },
      ];

      jest.spyOn(mockUserModel, 'find').mockResolvedValue(mockUsers);

      const result = await service.findALl();

      expect(result).toEqual(mockUsers);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const mockUser = {
        _id: '64edf5a1cebf4b136cbc1966',
        username: 'dessi',
        password: 'rwrv35v5wvvrwerwe',
        createdAt: '2023-08-29T13:41:53.911Z',
        updatedAt: '2023-08-29T13:41:53.911Z',
        __v: 0,
      };

      jest.spyOn(mockUserModel, 'findOne').mockResolvedValue(mockUser);

      const result = await service.findOne('user1');

      expect(result).toEqual(mockUser);
    });
  });

  describe('createOne', () => {
    it('should create and return a user', async () => {
      const mockUser = {
        _id: '64edf5a1cebf4b136cbc1966',
        username: 'dessi',
        password: 'rwrv35v5wvvrwerwe',
        createdAt: '2023-08-29T13:41:53.911Z',
        updatedAt: '2023-08-29T13:41:53.911Z',
        __v: 0,
      };

      jest.spyOn(mockUserModel, 'create').mockResolvedValue(mockUser as any);

      const newUser = {
        username: 'new_user',
        password: 'new_password',
      };

      const result = await service.createOne(newUser);

      expect(result).toEqual(mockUser);
    });
  });
});
