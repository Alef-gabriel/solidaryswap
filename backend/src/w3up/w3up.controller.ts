import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { W3upService } from './w3up.service';
import { createDelegationDto } from './createDelegation.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('w3up')
export class W3upController {
  constructor(private w3upService: W3upService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  getUser(@Body() createDelegation: createDelegationDto) {
    return this.w3upService.createDelegation(createDelegation);
  }
}
