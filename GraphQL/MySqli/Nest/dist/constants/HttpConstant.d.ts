import { HttpStatus } from '@nestjs/common';
export declare const Status: {
    STATUS_TRUE: boolean;
    STATUS_FALSE: boolean;
};
export declare const StatusCode: {
    HTTP_CREATED: HttpStatus;
    HTTP_OK: HttpStatus;
    HTTP_BAD_REQUEST: HttpStatus;
    HTTP_VALIDATION: number;
    HTTP_NOT_FOUND: HttpStatus;
    HTTP_UNAUTHORIZED: HttpStatus;
    HTTP_CONFLICT: HttpStatus;
    HTTP_TOKEN_EXPIRED: number;
    HTTP_VALIDATION_ERROR: number;
    HTTP_INVALID_REQUEST: number;
    HTTP_TOO_MANY_REQUESTS: HttpStatus;
    HTTP_INTERNAL_SERVER_ERROR: HttpStatus;
    HTTP_VALIDATION_EMAIL_VARIFIED: HttpStatus;
};
export declare const StatusMessage: {
    HTTP_CREATED: string;
    HTTP_OK: string;
    HTTP_BAD_REQUEST: string;
    HTTP_VALIDATION: string;
    HTTP_NOT_FOUND: string;
    HTTP_UNAUTHORIZED: string;
    HTTP_CONFLICT: string;
    HTTP_TOKEN_EXPIRED: string;
    HTTP_VALIDATION_ERROR: string;
    HTTP_VALIDATION_LOGIN_PASSWORD: string;
    HTTP_TOO_MANY_REQUESTS: string;
    HTTP_INTERNAL_SERVER_ERROR: string;
};
export declare const CommonConfig: {
    BCRYPTSALT: number;
};
