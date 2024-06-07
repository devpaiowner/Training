"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_entity_1 = require("./user.entity");
const user_service_1 = require("./user.service");
const ErrorHandler_1 = require("../../Utils/ErrorHandler");
const MessageConstant_1 = require("../../constants/MessageConstant");
const bcrypt = require("bcrypt");
const HttpConstant_1 = require("../../constants/HttpConstant");
const user_response_1 = require("./user.response");
const user_login_dto_1 = require("./dto/user-login.dto");
let AuthResolver = class AuthResolver {
    constructor(authService) {
        this.authService = authService;
    }
    async signUp(signUpInput) {
        const { username, email, password } = signUpInput;
        try {
            const userExist = await this.authService.findOneByEmail(email);
            if (userExist) {
                return {
                    data: [],
                    status: HttpConstant_1.Status === null || HttpConstant_1.Status === void 0 ? void 0 : HttpConstant_1.Status.STATUS_FALSE,
                    message: email + " " + (MessageConstant_1.MessageConstant === null || MessageConstant_1.MessageConstant === void 0 ? void 0 : MessageConstant_1.MessageConstant.IS_ALREADY_EXITS),
                    status_code: HttpConstant_1.StatusCode === null || HttpConstant_1.StatusCode === void 0 ? void 0 : HttpConstant_1.StatusCode.HTTP_VALIDATION,
                };
            }
            else {
                const hashPassword = await bcrypt.hash(password, HttpConstant_1.CommonConfig.BCRYPTSALT);
                const user = await this.authService.createOne(username, email, hashPassword);
                return {
                    data: [user],
                    status: HttpConstant_1.Status === null || HttpConstant_1.Status === void 0 ? void 0 : HttpConstant_1.Status.STATUS_TRUE,
                    message: MessageConstant_1.MessageConstant === null || MessageConstant_1.MessageConstant === void 0 ? void 0 : MessageConstant_1.MessageConstant.SIGN_UP_SUCCESSFULLY,
                    status_code: HttpConstant_1.StatusCode === null || HttpConstant_1.StatusCode === void 0 ? void 0 : HttpConstant_1.StatusCode.HTTP_CREATED,
                };
            }
        }
        catch (error) {
            console.log('error', error);
            await (0, ErrorHandler_1.CatchErrorResponseHelper)(error);
        }
    }
    async user() {
        const users = await this.authService.listAll();
        return {
            data: users,
            status: HttpConstant_1.Status === null || HttpConstant_1.Status === void 0 ? void 0 : HttpConstant_1.Status.STATUS_TRUE,
            message: MessageConstant_1.MessageConstant === null || MessageConstant_1.MessageConstant === void 0 ? void 0 : MessageConstant_1.MessageConstant.DATA_RETRIEVED_SUCCESSFULLY,
            status_code: HttpConstant_1.StatusCode === null || HttpConstant_1.StatusCode === void 0 ? void 0 : HttpConstant_1.StatusCode.HTTP_OK,
        };
    }
    deleteUser(id) {
        return this.authService.removeOne(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => user_response_1.UserQueryResponse),
    __param(0, (0, graphql_1.Args)('signUp')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_login_dto_1.SignUp]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "signUp", null);
__decorate([
    (0, graphql_1.Query)(() => user_response_1.UserQueryResponse),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "user", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.User),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "deleteUser", null);
AuthResolver = __decorate([
    (0, graphql_1.Resolver)(() => user_entity_1.User),
    __metadata("design:paramtypes", [user_service_1.AuthService])
], AuthResolver);
exports.AuthResolver = AuthResolver;
//# sourceMappingURL=user.resolver.js.map