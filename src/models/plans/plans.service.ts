import {
    Injectable,
    NotFoundException,
    Logger,
    UnprocessableEntityException,
  } from '@nestjs/common';
  import { PrismaService } from '../../prisma/prisma.service';
  import { Plan, Prisma } from '@prisma/client';
  
  @Injectable()
  export class PlansService {
    constructor(private prisma: PrismaService) {}
    private readonly logger = new Logger(PlansService.name);
  
    public async findMany(params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.PlanWhereUniqueInput;
      where?: Prisma.PlanWhereInput;
      orderBy?: Prisma.PlanOrderByWithRelationInput;
    }): Promise<Plan[]> {
      const { skip, take, cursor, where, orderBy } = params;
      return this.prisma.plan.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      });
    }
  
    public async findOne(planWhereUniqueInput: Prisma.PlanWhereUniqueInput): Promise<Plan | null> {
      return this.prisma.plan.findUnique({
        where: planWhereUniqueInput,
      });
    }
  
    public async create(data: Prisma.PlanCreateInput): Promise<Plan> {
      const newPlan = this.prisma.plan.create({
        data
      });
  
      return newPlan;
    }
    public async delete(where: Prisma.PlanWhereUniqueInput): Promise<Plan> {
      return this.prisma.plan.delete({
        where
      })
    }
  
    public async update(params: {data: Prisma.PlanUpdateInput, where:Prisma.PlanWhereUniqueInput}): Promise<Plan> {
      const { data, where } = params;
      this.logger.log(`Updating plan with id: ${data.id}`);
      return this.prisma.plan.update({
        where,
        data
      });
    }
  }
  