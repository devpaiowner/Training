import { ArgumentsHost, HttpException, ExceptionFilter } from '@nestjs/common';
export declare class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void;
}
export declare const ErrorResponseHelper: (payload: any) => Promise<void>;
export declare const CatchErrorResponseHelper: (error: any) => Promise<void>;
