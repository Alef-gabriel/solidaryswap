import { Controller, Body, Post, UseGuards } from '@nestjs/common';
import { W3upService } from './w3up.service';
import { CreateDelegationDto } from './createDelegation.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('w3up')
export class W3upController {
  constructor(private w3upService: W3upService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  getUser(@Body() createDelegation: CreateDelegationDto) {
    return this.w3upService.delegate(createDelegation);
  }
}
