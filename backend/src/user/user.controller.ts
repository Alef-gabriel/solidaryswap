import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './createUser.dto';
import { AuthGuard } from '../auth/auth.guard';
import { updateUserDto } from './updateUser.dto';

@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Post('create')
  createUser(@Body() createDto: CreateUserDto) {
    return this.usersService.create(createDto);
  }

  @UseGuards(AuthGuard)
  @Post('create')
  getUser(@Body() id: string) {
    return this.usersService.findOneById(id);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('create')
  updateUser(@Body() updateUser: updateUserDto) {
    return this.usersService.updateUser(updateUser);
  }
}
