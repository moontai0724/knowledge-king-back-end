import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserModelService } from '../../models/user/user.service';
import { User } from '../../models/user/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userModelService: UserModelService) {
    super({
      usernameField: 'account',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.userModelService.findOne({
      account: username,
    });

    const passwordCorrect = bcrypt.compareSync(password, user.password);
    if (!passwordCorrect) {
      throw new ForbiddenException('username or password not correct');
    }
    return user;
  }
}
