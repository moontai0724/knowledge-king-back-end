import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserModelService } from '../../models/user/user.service';
import { ConfigService } from '@nestjs/config';
import { ResetPasswordPayload } from '../auth.class';

@Injectable()
export class ResetPasswordStrategy extends PassportStrategy(
  Strategy,
  'reset-password',
) {
  constructor(
    private configService: ConfigService,
    private userModelService: UserModelService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('token'),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.secret').concat('-reset'),
    });
  }

  async validate(payload: ResetPasswordPayload) {
    const user = await this.userModelService.findOne({
      email: payload.email,
    });
    if (payload.password !== user.password)
      throw new UnauthorizedException('password has been reset');

    if (this.configService.get<boolean>('log.enabled'))
      console.debug('User: ', user);

    return user;
  }
}
