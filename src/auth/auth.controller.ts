import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { User } from '../models/user/user.entity';
import { CreateUserParam, UserPublicOwn } from '../models/user/user.class';
import { ForgotPasswordDto, RegisterDto, ResetPasswordDto } from './auth.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local/local.guard';
import { LoggedInUser } from './auth.class';
import { JwtRefreshGuard } from './jwt/jwt.guard';
import { AuthGuard } from '@nestjs/passport';
import { Public } from '../decorators/public.decorator';
import * as md5 from 'md5';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() userDto: RegisterDto) {
    const userToCreate: CreateUserParam = new CreateUserParam(userDto);
    userToCreate.account = userToCreate.account.toLowerCase();
    userToCreate.email = userToCreate.email.toLowerCase();
    userToCreate.profile_photo =
      'https://www.gravatar.com/avatar/' + md5(userToCreate.email);

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
    return this.login(request);
  }

  @Post('forgot')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @UseGuards(AuthGuard('reset-password'))
  @Post('reset')
  async resetPassword(
    @Request() request,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    await this.authService.setPassword(request.user, resetPasswordDto.password);
  }
}
