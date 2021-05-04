import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserParam } from '../models/user/user.class';
import { User } from '../models/user/user.entity';
import { UserModelService } from '../models/user/user.service';
import { LoggedInUser } from './auth.class';
import {
  AccessTokenPayload,
  JWTInfo,
  RefreshTokenPayload,
} from './jwt/jwt.class';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private userModelService: UserModelService,
    private jwtService: JwtService,
  ) {}

  async register(userToCreate: CreateUserParam): Promise<User> {
    try {
      const existingUser = await this.userModelService.findOne([
        { email: userToCreate.email },
        { account: userToCreate.account },
      ]);

      const keys = ['email', 'account'];
      const conflictedAttributes = [];

      keys.forEach((key) => {
        if (existingUser[key] === userToCreate[key]) {
          conflictedAttributes.push(key + ' already exists');
        }
      });

      throw new ConflictException(conflictedAttributes);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
    }

    return this.userModelService.create(userToCreate);
  }

  async sign(user: User): Promise<LoggedInUser> {
    const accessToken = await this.issueAccessToken(user);
    const refreshToken = await this.issueRefreshToken(user);
    const jwt = new JWTInfo(accessToken, refreshToken);

    return new LoggedInUser(user, jwt);
  }

  async issueAccessToken(user: User): Promise<string> {
    const payload: AccessTokenPayload = {
      id: user.id,
    };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('jwt.secret').concat('-access'),
      expiresIn: '1d',
    });

    return token;
  }

  async issueRefreshToken(user: User): Promise<string> {
    const payload: RefreshTokenPayload = {
      account: user.account,
    };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('jwt.secret').concat('-refresh'),
      expiresIn: '30d',
    });

    return token;
  }
}
