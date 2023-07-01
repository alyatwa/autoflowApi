import {
    Injectable,
    NotFoundException,
    Logger,
    UnprocessableEntityException,
  } from '@nestjs/common';
  import { PrismaService } from '../../prisma/prisma.service';
  import { Unit, Prisma } from '@prisma/client';
  
  @Injectable()
  export class UnitsService {
    constructor(private prisma: PrismaService) {}
    private readonly logger = new Logger(UnitsService.name);
  
    public async findMany(params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.UnitWhereUniqueInput;
      where?: Prisma.UnitWhereInput;
      orderBy?: Prisma.UnitOrderByWithRelationInput;
    }): Promise<Unit[]> {
      const { skip, take, cursor, where, orderBy } = params;
      return this.prisma.unit.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      });
    }
  
    public async findOne(unitWhereUniqueInput: Prisma.UnitWhereUniqueInput): Promise<Unit | null> {
      return this.prisma.unit.findUnique({
        where: unitWhereUniqueInput,
      });
    }
  
    public async create(data: Unit): Promise<Unit> {
      const newUnit = this.prisma.unit.create({
        data
      });
  
      return newUnit;
    }
    public async delete(where: Prisma.UnitWhereUniqueInput): Promise<Unit> {
      return this.prisma.unit.delete({
        where
      })
    }
  
    public async update(params: {data: Prisma.UnitUpdateInput, where:Prisma.UnitWhereUniqueInput}): Promise<Unit> {
      const { data, where } = params;
      this.logger.log(`Updating unit with id: ${data.id}`);
      return this.prisma.unit.update({
        where,
        data
      });
    }
  }
  