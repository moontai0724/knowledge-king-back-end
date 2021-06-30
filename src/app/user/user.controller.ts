import { Controller, Get, Request } from '@nestjs/common';
import { UserPublicOwn } from '../../models/user/user.class';

@Controller('user')
export class UserController {
  @Get()
  async getProfile(@Request() request) {
    let user: UserPublicOwn = new UserPublicOwn(request.user);
    return user;
  }
}
