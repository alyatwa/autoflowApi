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
  import { PlansService } from './plans.service';
  import { Plan as PlanModel } from '@prisma/client';
  import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
  
  @Controller('plans')
  @UseFilters(new HttpExceptionFilter())
  export class PlansController {
    constructor(private readonly plansService: PlansService) {}
  
    @Get(':id')
    public async getPlanById(@Param('id') id: string): Promise<PlanModel> {
      return this.plansService.findOne({ id });
    }
  
    @Get()
    public async getManyPlans(
      @Param('name') name: string,
    ): Promise<PlanModel[]> {
      return this.plansService.findMany({
        where: {
           name: { contains: name },
        },
      });
    }
  
    @Post()
    public async createPlan(
      @Body() plan: PlanModel,
    ): Promise<PlanModel> {
      return this.plansService.create(plan);
    }
  
    @Put(':id')
    public async updatePlan(
      @Param('id') id: string,
      @Body() plan: PlanModel,
    ): Promise<PlanModel> {
      return this.plansService.update({
        where: { id },
        data: plan,
      });
    }
  
    @Delete(':id')
    public deletePlan(@Param('id') id: string): void {
      this.plansService.delete({ id });
    }
  }
  