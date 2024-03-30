import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { CommentsModule } from './comments/comments.module';
import { ActionsModule } from './actions/actions.module';

@Module({
  providers: [ProjectService],
  controllers: [ProjectController],
  imports: [CommentsModule, ActionsModule],
})
export class ProjectModule {}
