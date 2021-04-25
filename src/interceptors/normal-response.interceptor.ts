import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class NormalResponseInterceptor implements NestInterceptor {
  constructor(private configService: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const response = {
          success: true,
          message: 'SUCCESS',
          data: data,
        };

        if (this.configService.get<boolean>('log.enabled'))
          console.debug('Responsed (success): ', response);
        return response;
      }),
    );
  }
}
