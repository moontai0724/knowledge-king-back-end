import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  use(request: Request, response: Response, next: Function) {
    if (this.configService.get<boolean>('log.enabled')) {
      console.log('==================================================');
      console.log('Received Request: ', {
        time: Date.now(),
        method: request.method,
        url: request.originalUrl,
        authorization: request.headers.authorization,
        body: request.body,
      });
    }
    next();
  }
}
