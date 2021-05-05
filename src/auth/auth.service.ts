import { MailerService } from '@nestjs-modules/mailer';
import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserParam } from '../models/user/user.class';
import { User } from '../models/user/user.entity';
import { UserModelService } from '../models/user/user.service';
import { ResetPasswordPayload, LoggedInUser } from './auth.class';
import { ForgotPasswordDto } from './auth.dto';
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
    private mailerService: MailerService,
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

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.userModelService
      .findOne({ email: forgotPasswordDto.email })
      .catch(() => null);
    if (!user) return;

    this.sendResetPasswordToken(user);
  }

  async sendResetPasswordToken(user: User): Promise<boolean> {
    const payload: ResetPasswordPayload = {
      email: user.email,
      password: user.password,
    };
    const resetToken = this.jwtService.sign(payload, {
      secret: this.configService.get('jwt.secret').concat('-reset'),
      expiresIn: '1h',
    });

    const result = await this.mailerService.sendMail({
      to: user.email,
      subject: '[知識王] 密碼重置申請信',
      template: './reset-password',
      context: {
        userName: user.name,
        baseUrl: this.configService.get('host'),
        resetToken: resetToken,
      },
    });

    return result.accepted.includes(user.email);
  }

  async setPassword(user: User, password: string): Promise<boolean> {
    return !!(await this.userModelService.update(user, { password }));
  }
}
