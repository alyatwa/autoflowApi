import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './models/users/users.module';
import { ProjectsModule } from './models/projects/projects.module';
import { PlansModule } from './models/plans/plans.module';
import { FlowsModule } from './models/flows/flows.module';
import { UnitsModule } from './models/units/units.module';
import { SessionsModule } from './models/sessions/sessions.module';

@Module({
  imports: [UsersModule, ProjectsModule, PlansModule, UnitsModule, FlowsModule, SessionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
