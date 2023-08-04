import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  let usersService: UsersService;
  let findUniqueMock: jest.Mock;
  beforeEach(async () => {
    findUniqueMock = jest.fn();
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: findUniqueMock,
            },
          },
        },
      ],
    }).compile();

    usersService = await module.get(UsersService);
  });
  describe('findOne method returns the user', () => {
    let user: User;
    beforeEach(() => {
      user = {
        id: '',
        createdAt: new Date(),
        username: 'string',
        name: 'string',
        email: 'string',
        password: 'string',
        emailConfirmed: true,
        roleId: 'jk',
        phone: 45,
        planId: 'kj',
      };
      findUniqueMock.mockResolvedValue(user);
    });
    it('should return the user', async () => {
      const result = await usersService.findOne({ id: '' });
      expect(result).toBe(user);
    });
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
