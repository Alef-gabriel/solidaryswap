import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './SingInDto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(singInDto: SignInDto) {
    const user = await this.usersService.findOneByEmail(singInDto.email);
    if (!user) throw new NotFoundException();
    if (await bcrypt.compare(singInDto.password, user?.password)) {
      const payload = { sub: user.name, username: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    throw new UnauthorizedException();
  }
}
