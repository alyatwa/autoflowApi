import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseFilters,
  } from '@nestjs/common';
  import { ProjectsService } from './projects.service';
  import { Project as ProjectModel } from '@prisma/client';
  import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
  
  @Controller('projects')
  @UseFilters(new HttpExceptionFilter())
  export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}
  
    @Get(':id')
    public async getProjectById(@Param('id') id: string): Promise<ProjectModel> {
      return this.projectsService.findOne({ id });
    }
  
    @Get()
    public async getManyProjects(
      @Param('name') name: string,
    ): Promise<ProjectModel[]> {
      return this.projectsService.findMany({
        where: {
           name: { contains: name },
        },
      });
    }
  
    @Post()
    public async createProject(
      @Body() project: ProjectModel,
    ): Promise<ProjectModel> {
      return this.projectsService.create(project);
    }
  
    @Put(':id')
    public async updateProject(
      @Param('id') id: string,
      @Body() project: ProjectModel,
    ): Promise<ProjectModel> {
      return this.projectsService.update({
        where: { id },
        data: project,
      });
    }
  
    @Delete(':id')
    public deleteProject(@Param('id') id: string): void {
      this.projectsService.delete({ id });
    }
  }
  