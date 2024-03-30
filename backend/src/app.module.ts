import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';
import { W3upModule } from './w3up/w3up.module';

@Module({
  imports: [ProjectModule, UserModule, W3upModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
