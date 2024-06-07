"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonConfig = exports.StatusMessage = exports.StatusCode = exports.Status = void 0;
const common_1 = require("@nestjs/common");
exports.Status = {
    STATUS_TRUE: true,
    STATUS_FALSE: false,
};
exports.StatusCode = {
    HTTP_CREATED: common_1.HttpStatus.CREATED,
    HTTP_OK: common_1.HttpStatus.OK,
    HTTP_BAD_REQUEST: common_1.HttpStatus.BAD_REQUEST,
    HTTP_VALIDATION: 405,
    HTTP_NOT_FOUND: common_1.HttpStatus.NOT_FOUND,
    HTTP_UNAUTHORIZED: common_1.HttpStatus.UNAUTHORIZED,
    HTTP_CONFLICT: common_1.HttpStatus.CONFLICT,
    HTTP_TOKEN_EXPIRED: 403,
    HTTP_VALIDATION_ERROR: 422,
    HTTP_INVALID_REQUEST: 400,
    HTTP_TOO_MANY_REQUESTS: common_1.HttpStatus.TOO_MANY_REQUESTS,
    HTTP_INTERNAL_SERVER_ERROR: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
    HTTP_VALIDATION_EMAIL_VARIFIED: common_1.HttpStatus.OK,
};
exports.StatusMessage = {
    HTTP_CREATED: 'Created',
    HTTP_OK: 'Success',
    HTTP_BAD_REQUEST: 'Bad Request.',
    HTTP_VALIDATION: 'Enter correct details.',
    HTTP_NOT_FOUND: 'Not Found.',
    HTTP_UNAUTHORIZED: 'Unauthorized.',
    HTTP_CONFLICT: 'Conflict error occurred.',
    HTTP_TOKEN_EXPIRED: 'The access token expired.',
    HTTP_VALIDATION_ERROR: 'Validation error occurred.',
    HTTP_VALIDATION_LOGIN_PASSWORD: 'Invalid email address or password.',
    HTTP_TOO_MANY_REQUESTS: 'Too many requests. Please try again in a few minutes.',
    HTTP_INTERNAL_SERVER_ERROR: 'Internal Server Error.',
};
exports.CommonConfig = {
    BCRYPTSALT: 8
};
//# sourceMappingURL=HttpConstant.js.map