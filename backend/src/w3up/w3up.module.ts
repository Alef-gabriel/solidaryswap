import { Module } from '@nestjs/common';
import { W3upService } from './w3up.service';
import { W3upController } from './w3up.controller';

@Module({
  providers: [W3upService],
  controllers: [W3upController],
})
export class W3upModule {}
