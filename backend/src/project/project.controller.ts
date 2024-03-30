import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './createProject.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateProjectDto } from './updateProject.dto';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('create')
  createProject(@Body() createDto: CreateProjectDto) {
    return this.projectService.createProject(createDto);
  }

  @UseGuards(AuthGuard)
  @Post('all')
  getProjects(@Body() id: string) {
    return this.projectService.findAll(id);
  }

  @UseGuards(AuthGuard)
  @Post('backers')
  getUser(@Body() contractId: string) {
    return this.projectService.backersLenght(contractId);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('story')
  updateProject(@Body() data: UpdateProjectDto) {
    return this.projectService.updateProject(data);
  }
}
