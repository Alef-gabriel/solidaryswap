import {
  Body,
  Controller,
  Post,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './comments.dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('incert-comments')
  incertComments(@Body() data: CreateCommentDto) {
    return this.commentsService.incertComments(data);
  }

  @UseGuards(AuthGuard)
  @Get('all')
  profitSharing(@Body() tableName: string) {
    return this.commentsService.findAll(tableName);
  }
}
