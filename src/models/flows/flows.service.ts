import {
  Injectable,
  NotFoundException,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Flow, Prisma } from '@prisma/client';

@Injectable()
export class FlowsService {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger(FlowsService.name);

  public async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.FlowWhereUniqueInput;
    where?: Prisma.FlowWhereInput;
    orderBy?: Prisma.FlowOrderByWithRelationInput;
  }): Promise<Flow[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.flow.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  public async findOne(
    flowWhereUniqueInput: Prisma.FlowWhereUniqueInput,
  ): Promise<Flow | null> {
    return this.prisma.flow.findUnique({
      where: flowWhereUniqueInput,
    });
  }

  public async create(data: Prisma.FlowCreateWithoutSessionInput, where:{unitId:string, tag:string}): Promise<Flow> {
    const session = await this.prisma.session.findFirst({
      where: {
        AND: [{ unitId: where.unitId }, { tag: where.tag }],
      },
    });
    if (session) {
      const newFlow = this.prisma.flow.create({
        data:{
          ...data,
          sessionId: session.id
        },
        
      });
      return newFlow;
    }else {
      const session = await this.prisma.session.create({
        data:{
          tag:where.tag,
          unitId: where.unitId
        }
      });
      const newFlow = this.prisma.flow.create({
        data:{
          ...data,
          sessionId: session.id
        },
      });
      return newFlow;
    }
  }
  public async delete(where: Prisma.FlowWhereUniqueInput): Promise<Flow> {
    return this.prisma.flow.delete({
      where,
    });
  }

  public async update(params: {
    data: Prisma.FlowUpdateInput;
    where: Prisma.FlowWhereUniqueInput;
  }): Promise<Flow> {
    const { data, where } = params;
    this.logger.log(`Updating flow with id: ${data.id}`);
    return this.prisma.flow.update({
      where,
      data,
    });
  }
}


