import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
  BadRequestException,
  UnauthorizedException,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Status, StatusCode, StatusMessage } from '../constants/HttpConstant';
import { Request, Response } from 'express';


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    response.status(status).json({
      status: exception.getResponse(),
      status_code: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}

export const ErrorResponseHelper = async (payload: any) => {
  const statusCode = payload?.status_code || payload?.custom_code;
  const customMessage = payload?.custom_message || payload?.message;
  const errorMessage = payload?.error?.message;

  switch (statusCode) {
    case StatusCode?.HTTP_INTERNAL_SERVER_ERROR:
      throw new InternalServerErrorException({
        status_code: StatusCode?.HTTP_INTERNAL_SERVER_ERROR,
        status: Status?.STATUS_FALSE,
        message: StatusMessage?.HTTP_INTERNAL_SERVER_ERROR,
        error: errorMessage,
      });
    case StatusCode?.HTTP_VALIDATION_ERROR:
      throw new UnprocessableEntityException({
        status: Status?.STATUS_FALSE,
        status_code: StatusCode?.HTTP_VALIDATION_ERROR,
        message: customMessage,
      });
    case StatusCode?.HTTP_BAD_REQUEST:
      throw new BadRequestException({
        status: Status?.STATUS_FALSE,
        status_code: StatusCode?.HTTP_BAD_REQUEST,
        message: customMessage || StatusMessage?.HTTP_BAD_REQUEST,
        error: errorMessage,
      });
    case StatusCode?.HTTP_UNAUTHORIZED:
      throw new UnauthorizedException({
        status: Status?.STATUS_FALSE,
        status_code: StatusCode?.HTTP_UNAUTHORIZED,
        message: customMessage || StatusMessage?.HTTP_UNAUTHORIZED,
      });
    case StatusCode?.HTTP_TOKEN_EXPIRED:
      throw new UnauthorizedException({
        status: Status?.STATUS_FALSE,
        status_code: StatusCode?.HTTP_TOKEN_EXPIRED,
        message: StatusMessage?.HTTP_TOKEN_EXPIRED,
      });
    case StatusCode?.HTTP_VALIDATION_EMAIL_VARIFIED:
      throw new UnprocessableEntityException({
        status: Status?.STATUS_FALSE,
        status_code: StatusCode?.HTTP_VALIDATION_EMAIL_VARIFIED,
        message: customMessage,
        error: 'not-verified'
      });
  }
};

export const CatchErrorResponseHelper = async (error: any) => {
  return ErrorResponseHelper({
    status_code: error?.response?.status_code || StatusCode?.HTTP_INTERNAL_SERVER_ERROR,
    custom_message: error?.response?.message || error?.message,
    error: error,
  });
}
