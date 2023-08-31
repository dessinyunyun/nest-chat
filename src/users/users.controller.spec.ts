import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn(), // Mocking the UsersService's findAll method
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const users = [
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

      jest.spyOn(service, 'findALl').mockResolvedValue(users);

      expect(await controller.getUsers()).toEqual(users);
    });
  });
});
