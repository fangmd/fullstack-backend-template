import { BizException } from '../utils/BizException';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * 全局异常捕获
 */
@Catch()
export class AllExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // const status = exception.getStatus();
    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let msg =
      exception instanceof HttpException ? exception.message : '系统异常';

    if (exception instanceof BizException) {
      status = exception.getResponse()['code'];
      msg = exception.getResponse()['msg'];
    }
    // 发送响应
    response.status(HttpStatus.OK).json({
      code: status,
      msg: msg,
    });
  }
}
