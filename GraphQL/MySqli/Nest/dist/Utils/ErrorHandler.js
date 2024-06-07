"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatchErrorResponseHelper = exports.ErrorResponseHelper = exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const HttpConstant_1 = require("../constants/HttpConstant");
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        response.status(status).json({
            status: exception.getResponse(),
            status_code: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: exception.message,
        });
    }
};
HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], HttpExceptionFilter);
exports.HttpExceptionFilter = HttpExceptionFilter;
const ErrorResponseHelper = async (payload) => {
    var _a;
    const statusCode = (payload === null || payload === void 0 ? void 0 : payload.status_code) || (payload === null || payload === void 0 ? void 0 : payload.custom_code);
    const customMessage = (payload === null || payload === void 0 ? void 0 : payload.custom_message) || (payload === null || payload === void 0 ? void 0 : payload.message);
    const errorMessage = (_a = payload === null || payload === void 0 ? void 0 : payload.error) === null || _a === void 0 ? void 0 : _a.message;
    switch (statusCode) {
        case HttpConstant_1.StatusCode === null || HttpConstant_1.StatusCode === void 0 ? void 0 : HttpConstant_1.StatusCode.HTTP_INTERNAL_SERVER_ERROR:
            throw new common_1.InternalServerErrorException({
                status_code: HttpConstant_1.StatusCode === null || HttpConstant_1.StatusCode === void 0 ? void 0 : HttpConstant_1.StatusCode.HTTP_INTERNAL_SERVER_ERROR,
                status: HttpConstant_1.Status === null || HttpConstant_1.Status === void 0 ? void 0 : HttpConstant_1.Status.STATUS_FALSE,
                message: HttpConstant_1.StatusMessage === null || HttpConstant_1.StatusMessage === void 0 ? void 0 : HttpConstant_1.StatusMessage.HTTP_INTERNAL_SERVER_ERROR,
                error: errorMessage,
            });
        case HttpConstant_1.StatusCode === null || HttpConstant_1.StatusCode === void 0 ? void 0 : HttpConstant_1.StatusCode.HTTP_VALIDATION_ERROR:
            throw new common_1.UnprocessableEntityException({
                status: HttpConstant_1.Status === null || HttpConstant_1.Status === void 0 ? void 0 : HttpConstant_1.Status.STATUS_FALSE,
                status_code: HttpConstant_1.StatusCode === null || HttpConstant_1.StatusCode === void 0 ? void 0 : HttpConstant_1.StatusCode.HTTP_VALIDATION_ERROR,
                message: customMessage,
            });
        case HttpConstant_1.StatusCode === null || HttpConstant_1.StatusCode === void 0 ? void 0 : HttpConstant_1.StatusCode.HTTP_BAD_REQUEST:
            throw new common_1.BadRequestException({
                status: HttpConstant_1.Status === null || HttpConstant_1.Status === void 0 ? void 0 : HttpConstant_1.Status.STATUS_FALSE,
                status_code: HttpConstant_1.StatusCode === null || HttpConstant_1.StatusCode === void 0 ? void 0 : HttpConstant_1.StatusCode.HTTP_BAD_REQUEST,
                message: customMessage || (HttpConstant_1.StatusMessage === null || HttpConstant_1.StatusMessage === void 0 ? void 0 : HttpConstant_1.StatusMessage.HTTP_BAD_REQUEST),
                error: errorMessage,
            });
        case HttpConstant_1.StatusCode === null || HttpConstant_1.StatusCode === void 0 ? void 0 : HttpConstant_1.StatusCode.HTTP_UNAUTHORIZED:
            throw new common_1.UnauthorizedException({
                status: HttpConstant_1.Status === null || HttpConstant_1.Status === void 0 ? void 0 : HttpConstant_1.Status.STATUS_FALSE,
                status_code: HttpConstant_1.StatusCode === null || HttpConstant_1.StatusCode === void 0 ? void 0 : HttpConstant_1.StatusCode.HTTP_UNAUTHORIZED,
                message: customMessage || (HttpConstant_1.StatusMessage === null || HttpConstant_1.StatusMessage === void 0 ? void 0 : HttpConstant_1.StatusMessage.HTTP_UNAUTHORIZED),
            });
        case HttpConstant_1.StatusCode === null || HttpConstant_1.StatusCode === void 0 ? void 0 : HttpConstant_1.StatusCode.HTTP_TOKEN_EXPIRED:
            throw new common_1.UnauthorizedException({
                status: HttpConstant_1.Status === null || HttpConstant_1.Status === void 0 ? void 0 : HttpConstant_1.Status.STATUS_FALSE,
                status_code: HttpConstant_1.StatusCode === null || HttpConstant_1.StatusCode === void 0 ? void 0 : HttpConstant_1.StatusCode.HTTP_TOKEN_EXPIRED,
                message: HttpConstant_1.StatusMessage === null || HttpConstant_1.StatusMessage === void 0 ? void 0 : HttpConstant_1.StatusMessage.HTTP_TOKEN_EXPIRED,
            });
        case HttpConstant_1.StatusCode === null || HttpConstant_1.StatusCode === void 0 ? void 0 : HttpConstant_1.StatusCode.HTTP_VALIDATION_EMAIL_VARIFIED:
            throw new common_1.UnprocessableEntityException({
                status: HttpConstant_1.Status === null || HttpConstant_1.Status === void 0 ? void 0 : HttpConstant_1.Status.STATUS_FALSE,
                status_code: HttpConstant_1.StatusCode === null || HttpConstant_1.StatusCode === void 0 ? void 0 : HttpConstant_1.StatusCode.HTTP_VALIDATION_EMAIL_VARIFIED,
                message: customMessage,
                error: 'not-verified'
            });
    }
};
exports.ErrorResponseHelper = ErrorResponseHelper;
const CatchErrorResponseHelper = async (error) => {
    var _a, _b;
    return (0, exports.ErrorResponseHelper)({
        status_code: ((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.status_code) || (HttpConstant_1.StatusCode === null || HttpConstant_1.StatusCode === void 0 ? void 0 : HttpConstant_1.StatusCode.HTTP_INTERNAL_SERVER_ERROR),
        custom_message: ((_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.message) || (error === null || error === void 0 ? void 0 : error.message),
        error: error,
    });
};
exports.CatchErrorResponseHelper = CatchErrorResponseHelper;
//# sourceMappingURL=ErrorHandler.js.map