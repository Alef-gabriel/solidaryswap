import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';
import { W3upModule } from './w3up/w3up.module';
import { CommentsModule } from './project/comments/comments.module';
import { CommentsController } from './project/comments/comments.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, ProjectModule, UserModule, W3upModule, CommentsModule],
  controllers: [AppController, CommentsController],
  providers: [AppService],
})
export class AppModule {}
