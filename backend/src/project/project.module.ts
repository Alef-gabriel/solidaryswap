import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Controller } from './.controller';

@Module({
  providers: [ProjectService],
  controllers: [Controller]
})
export class ProjectModule {}
