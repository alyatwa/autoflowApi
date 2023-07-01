import {
    Injectable,
    NotFoundException,
    Logger,
    UnprocessableEntityException,
  } from '@nestjs/common';
  import { PrismaService } from '../../prisma/prisma.service';
  import { Project, Prisma } from '@prisma/client';
  
  @Injectable()
  export class ProjectsService {
    constructor(private prisma: PrismaService) {}
    private readonly logger = new Logger(ProjectsService.name);
  
    public async findMany(params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.ProjectWhereUniqueInput;
      where?: Prisma.ProjectWhereInput;
      orderBy?: Prisma.ProjectOrderByWithRelationInput;
    }): Promise<Project[]> {
      const { skip, take, cursor, where, orderBy } = params;
      return this.prisma.project.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      });
    }
  
    public async findOne(projectWhereUniqueInput: Prisma.ProjectWhereUniqueInput): Promise<Project | null> {
      return this.prisma.project.findUnique({
        where: projectWhereUniqueInput,
      });
    }
  
    public async create(data: Prisma.ProjectCreateInput): Promise<Project> {
      const newProject = this.prisma.project.create({
        data
      });
  
      return newProject;
    }
    public async delete(where: Prisma.ProjectWhereUniqueInput): Promise<Project> {
      return this.prisma.project.delete({
        where
      })
    }
  
    public async update(params: {data: Prisma.ProjectUpdateInput, where:Prisma.ProjectWhereUniqueInput}): Promise<Project> {
      const { data, where } = params;
      this.logger.log(`Updating project with id: ${data.id}`);
      return this.prisma.project.update({
        where,
        data
      });
    }
  }
  