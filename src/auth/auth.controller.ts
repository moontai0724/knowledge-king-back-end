import { Body, Controller, Post } from '@nestjs/common';
import { User } from '../models/user/user.entity';
import { CreateUserParam, UserPublicOwn } from '../models/user/user.class';
import { RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';

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
}
