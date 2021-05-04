import { IsJWT } from 'class-validator';

export class AccessTokenPayload {
  id: number;
}

export class RefreshTokenPayload {
  account: string;
}

export class JWTInfo {
  constructor(accessToken: string, refreshToken: string) {
    this.access_token = accessToken;
    this.refresh_token = refreshToken;
  }

  @IsJWT()
  access_token: string;

  @IsJWT()
  refresh_token: string;
}
