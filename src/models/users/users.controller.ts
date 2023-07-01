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
import { UsersService } from './users.service';
//import { UserModel } from './users.interface';
import { User as UserModel } from '@prisma/client';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';

@Controller('users')
@UseFilters(new HttpExceptionFilter())
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  public async getUserById(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.findOne({ id });
  }

  @Get()
  public async getManyUsers(
    @Param('username') username: string,
  ): Promise<UserModel[]> {
    return this.usersService.findMany({
      where: {
        username: { contains: username },
      },
    });
  }

  @Post()
  public async createUser(
    @Body() user: { name?: string; password: string; email: string },
  ): Promise<UserModel> {
    return this.usersService.create(user);
  }

  @Put(':id')
  public async updateUser(
    @Param('id') id: string,
    @Body() user: UserModel,
  ): Promise<UserModel> {
    return this.usersService.update({
      where: { id },
      data: user,
    });
  }

  @Delete(':id')
  public deleteUser(@Param('id') id: string): void {
    this.usersService.delete({ id });
  }
}
