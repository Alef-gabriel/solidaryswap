import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ActionsService } from './actions.service';
import { AuthGuard } from '../../auth/auth.guard';
import { WithdrawDto } from './withdraw.dto';
import { ProfitSharingDto } from './profitSharing.dto';

@Controller('actions')
export class ActionsController {
  constructor(private actionsService: ActionsService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('withdraw')
  createWithdraw(@Body() data: WithdrawDto) {
    return this.actionsService.withdraw(data);
  }

  @UseGuards(AuthGuard)
  @Post('profit-sharing')
  profitSharing(@Body() data: ProfitSharingDto) {
    return this.actionsService.profitSharing(data);
  }
}
