import {
    Injectable,
    NotFoundException,
    Logger,
    UnprocessableEntityException,
  } from '@nestjs/common';
  import { PrismaService } from '../../prisma/prisma.service';
  import { Session, Prisma } from '@prisma/client';
  
  @Injectable()
  export class SessionsService {
    constructor(private prisma: PrismaService) {}
    private readonly logger = new Logger(SessionsService.name);
  
    public async findMany(params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.SessionWhereUniqueInput;
      where?: Prisma.SessionWhereInput;
      orderBy?: Prisma.SessionOrderByWithRelationInput;
    }): Promise<Session[]> {
      const { skip, take, cursor, where, orderBy } = params;
      return this.prisma.session.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      });
    }
  
    public async findOne(sessionWhereUniqueInput: Prisma.SessionWhereUniqueInput): Promise<Session | null> {
      return this.prisma.session.findFirst({
        where: sessionWhereUniqueInput,
      });
    }
  
    public async create(data: Session): Promise<Session> {
      const newSession = this.prisma.session.create({
        data
      });
  
      return newSession;
    }
    public async delete(where: Prisma.SessionWhereUniqueInput): Promise<Session> {
      return this.prisma.session.delete({
        where
      })
    }
  
    public async update(params: {data: Prisma.SessionUpdateInput, where:Prisma.SessionWhereUniqueInput}): Promise<Session> {
      const { data, where } = params;
      this.logger.log(`Updating session with id: ${data.id}`);
      return this.prisma.session.update({
        where,
        data
      });
    }
  }
  