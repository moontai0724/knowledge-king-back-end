import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserParam } from '../models/user/user.class';
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
    const userToCreate = new CreateUserParam(userDto);
    userToCreate.account = userToCreate.account.toLowerCase();
    userToCreate.email = userToCreate.email.toLowerCase();
    return this.authService.register(userToCreate);
  }
}
