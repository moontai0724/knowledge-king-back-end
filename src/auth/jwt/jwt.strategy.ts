import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserModelService } from '../../models/user/user.service';
import { AccessTokenPayload, RefreshTokenPayload } from './jwt.class';

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'jwt_access') {
  constructor(
    private configService: ConfigService,
    private userModelService: UserModelService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.secret').concat('-access'),
    });
  }

  async validate(payload: AccessTokenPayload) {
    const user = await this.userModelService.findOne({ id: payload.id });

    if (this.configService.get<boolean>('log.enabled'))
      console.debug('User: ', user);

    return user;
  }
}

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt_refresh') {
  constructor(
    private configService: ConfigService,
    private userModelService: UserModelService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.secret').concat('-refresh'),
    });
  }

  async validate(payload: RefreshTokenPayload) {
    const user = await this.userModelService.findOne({
      account: payload.account,
    });

    if (this.configService.get<boolean>('log.enabled'))
      console.debug('User: ', user);

    return user;
  }
}
