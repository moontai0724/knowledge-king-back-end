import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private configService: ConfigService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const rawResponse = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const error: BaseException = new BaseException(exception.getResponse());
    const response = new ErrorResponse(error);

    if (this.configService.get<boolean>('log.enabled'))
      console.debug('Responsed (error): ', response);
    rawResponse.status(status).json(response);
  }
}

export class ErrorResponse {
  success = false;
  message: string;
  data: string | string[];
  constructor(exception: BaseException) {
    this.message = exception.error;
    this.data =
      typeof exception.message === 'object'
        ? exception.message
        : [exception.message];
  }
}

export class BaseException {
  statusCode: number;
  message: string[];
  error: string;
  constructor(data: any) {
    if (typeof data === 'string')
      throw new Error('Internal Error. Exception is not formed type');
    this.statusCode = data.statusCode;
    this.message = data.message;
    this.error = data.error;
  }
}
