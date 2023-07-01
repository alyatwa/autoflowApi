import {
  Injectable,
  NotFoundException,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import {ROLE, PLAN} from '../../../prisma'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger(UsersService.name);

  public async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  public async findOne(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  public async create(params: { name?: string; password: string; email: string }): Promise<User> {
    const {name, email, password} = params
    const userEmail = this.prisma.user.findUnique({
      where: {
        email
      },
    });
    if (userEmail) {
      throw new UnprocessableEntityException('User email already exists.');
    }
    
    const newUser = this.prisma.user.create({
      data:{
        ...params,
        roleId: ROLE.user.id,
        planId: PLAN.free.id
      }
    });

    return newUser;
  }
  public async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where
    })
  }

  public async update(params: {data: Prisma.UserUpdateInput, where:Prisma.UserWhereUniqueInput}): Promise<User> {
    const { data, where } = params;
    this.logger.log(`Updating user with email: ${data.email}`);
    return this.prisma.user.update({
      where,
      data
    });
  }
}
