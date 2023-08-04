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
  import { SessionsService } from './sessions.service';
  import { Session as SessionModel } from '@prisma/client';
  import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
  
  @Controller('sessions')
  @UseFilters(new HttpExceptionFilter())
  export class SessionsController {
    constructor(private readonly sessionsService: SessionsService) {}
  
    @Get(':id')
    public async getSessionById(@Param('id') id: string): Promise<SessionModel> {
      return this.sessionsService.findOne({ id });
    }
  
    @Get()
    public async getManySessions(
      @Param('tag') tag: string,
    ): Promise<SessionModel[]> {
      return this.sessionsService.findMany({
        where: {
          tag: { contains: tag }
        },
      });
    }
  
    @Post()
    public async createSession(
      @Body() session: SessionModel,
    ): Promise<SessionModel> {
      return this.sessionsService.create(session);
    }
  
    @Put(':id')
    public async updateSession(
      @Param('id') id: string,
      @Body() session: SessionModel,
    ): Promise<SessionModel> {
      return this.sessionsService.update({
        where: { id },
        data: session,
      });
    }
  
    @Delete(':id')
    public deleteSession(@Param('id') id: string): void {
      this.sessionsService.delete({ id });
    }
  }
  