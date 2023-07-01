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
  import { UnitsService } from './units.service';
  import { Unit as UnitModel } from '@prisma/client';
  import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
  
  @Controller('units')
  @UseFilters(new HttpExceptionFilter())
  export class UnitsController {
    constructor(private readonly unitsService: UnitsService) {}
  
    @Get(':id')
    public async getUnitById(@Param('id') id: string): Promise<UnitModel> {
      return this.unitsService.findOne({ id });
    }
  
    @Get()
    public async getManyUnits(
      @Param('name') name: string,
    ): Promise<UnitModel[]> {
      return this.unitsService.findMany({
        where: {
           name: { contains: name },
        },
      });
    }
  
    @Post()
    public async createUnit(
      @Body() unit: UnitModel,
    ): Promise<UnitModel> {
      return this.unitsService.create(unit);
    }
  
    @Put(':id')
    public async updateUnit(
      @Param('id') id: string,
      @Body() unit: UnitModel,
    ): Promise<UnitModel> {
      return this.unitsService.update({
        where: { id },
        data: unit,
      });
    }
  
    @Delete(':id')
    public deleteUnit(@Param('id') id: string): void {
      this.unitsService.delete({ id });
    }
  }
  