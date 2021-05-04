import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { User } from '../models/user/user.entity';
import { CreateUserParam, UserPublicOwn } from '../models/user/user.class';
import { RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local/local.guard';
import { LoggedInUser } from './auth.class';
import { JwtRefreshGuard } from './jwt/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body()
    userDto: RegisterDto,
  ) {
    const userToCreate: CreateUserParam = new CreateUserParam(userDto);
    userToCreate.account = userToCreate.account.toLowerCase();
    userToCreate.email = userToCreate.email.toLowerCase();

    const user: User = await this.authService.register(userToCreate);
    return new UserPublicOwn(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request) {
    const user: User = request.user;
    const loggedInUser: LoggedInUser = await this.authService.sign(user);
    return loggedInUser;
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(@Request() request) {
    const user: User = request.user;
    const loggedInUser: LoggedInUser = await this.authService.sign(user);
    return loggedInUser;
  }
}
