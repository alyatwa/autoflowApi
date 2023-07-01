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
  import { FlowsService } from './flows.service';
  import { Flow as FlowModel } from '@prisma/client';
  import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
  
  @Controller('flows')
  @UseFilters(new HttpExceptionFilter())
  export class FlowsController {
    constructor(private readonly flowsService: FlowsService) {}
  
    @Get(':id')
    public async getFlowById(@Param('id') id: string): Promise<FlowModel> {
      return this.flowsService.findOne({ id });
    }
  
    @Get()
    public async getManyFlows(
      @Param('title') title: string,
    ): Promise<FlowModel[]> {
      return this.flowsService.findMany({
        where: {
           title: { contains: title },
        },
      });
    }
  
    @Post()
    public async createFlow(
      @Body() flow: FlowModel,
    ): Promise<FlowModel> {
      return this.flowsService.create(flow);
    }
  
    @Put(':id')
    public async updateFlow(
      @Param('id') id: string,
      @Body() flow: FlowModel,
    ): Promise<FlowModel> {
      return this.flowsService.update({
        where: { id },
        data: flow,
      });
    }
  
    @Delete(':id')
    public deleteFlow(@Param('id') id: string): void {
      this.flowsService.delete({ id });
    }
  }
  