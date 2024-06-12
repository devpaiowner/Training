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
const MessageConstant_1 = require("../../constants/MessageConstant");
const bcrypt = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const HttpConstant_1 = require("../../constants/HttpConstant");
const user_response_1 = require("./user.response");
const auth_input_1 = require("./dto/auth.input");
const commonConfig_1 = require("../../constants/commonConfig");
const JSONHelper_1 = require("../../Utils/JSONHelper");
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
                    status: HttpConstant_1.Status.STATUS_FALSE,
                    message: `${email} ${MessageConstant_1.MessageConstant.IS_ALREADY_EXITS}`,
                    status_code: HttpConstant_1.StatusCode.HTTP_VALIDATION,
                };
            }
            else {
                const hashPassword = await bcrypt.hash(password, HttpConstant_1.CommonConfig.BCRYPTSALT);
                const user = await this.authService.createOne(username, email, hashPassword);
                return {
                    data: [user],
                    status: HttpConstant_1.Status.STATUS_TRUE,
                    message: MessageConstant_1.MessageConstant.SIGN_UP_SUCCESSFULLY,
                    status_code: HttpConstant_1.StatusCode.HTTP_CREATED,
                };
            }
        }
        catch (error) {
            return {
                data: [],
                status: HttpConstant_1.Status.STATUS_FALSE,
                message: error.message,
                status_code: HttpConstant_1.StatusCode.HTTP_INTERNAL_SERVER_ERROR,
            };
        }
    }
    async signIn(signInInput) {
        const { email, password } = signInInput;
        try {
            const userExist = await this.authService.findOneByEmail(email);
            if (!userExist) {
                return {
                    data: null,
                    status: HttpConstant_1.Status.STATUS_FALSE,
                    message: `${email} ${MessageConstant_1.MessageConstant.IS_NOT_EXITS}`,
                    status_code: HttpConstant_1.StatusCode.HTTP_VALIDATION,
                    token: null,
                };
            }
            else {
                const validate_password = await bcrypt.compare(password, userExist.password);
                const token = await jsonwebtoken_1.default.sign((0, JSONHelper_1.JWTKeyData)(userExist), commonConfig_1.commonConfig === null || commonConfig_1.commonConfig === void 0 ? void 0 : commonConfig_1.commonConfig.JWT_KEY);
                console.log('token', token);
                if (validate_password) {
                    return {
                        data: userExist,
                        status: HttpConstant_1.Status.STATUS_TRUE,
                        message: MessageConstant_1.MessageConstant.SIGN_IN_SUCCESSFULLY,
                        status_code: HttpConstant_1.StatusCode.HTTP_OK,
                        token: token,
                    };
                }
                else {
                    return {
                        data: null,
                        status: HttpConstant_1.Status.STATUS_FALSE,
                        message: MessageConstant_1.MessageConstant.WRONG_CREDENTIALS,
                        status_code: HttpConstant_1.StatusCode.HTTP_UNAUTHORIZED,
                        token: null,
                    };
                }
            }
        }
        catch (error) {
            return {
                data: null,
                status: HttpConstant_1.Status.STATUS_FALSE,
                message: error.message,
                status_code: HttpConstant_1.StatusCode.HTTP_INTERNAL_SERVER_ERROR,
                token: null,
            };
        }
    }
    async user() {
        try {
            const users = await this.authService.listAll();
            return {
                data: users,
                status: HttpConstant_1.Status.STATUS_TRUE,
                message: MessageConstant_1.MessageConstant.DATA_RETRIEVED_SUCCESSFULLY,
                status_code: HttpConstant_1.StatusCode.HTTP_OK,
            };
        }
        catch (error) {
            return {
                data: [],
                status: HttpConstant_1.Status.STATUS_FALSE,
                message: error.message,
                status_code: HttpConstant_1.StatusCode.HTTP_INTERNAL_SERVER_ERROR,
            };
        }
    }
    async deleteUser(id) {
        return this.authService.removeOne(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => user_response_1.UserQueryResponse),
    __param(0, (0, graphql_1.Args)('signUp')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_input_1.UserInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "signUp", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_response_1.UserLoginResponse),
    __param(0, (0, graphql_1.Args)('signIn')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_input_1.UserLoginInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "signIn", null);
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
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "deleteUser", null);
AuthResolver = __decorate([
    (0, graphql_1.Resolver)(() => user_entity_1.User),
    __metadata("design:paramtypes", [user_service_1.AuthService])
], AuthResolver);
exports.AuthResolver = AuthResolver;
//# sourceMappingURL=user.resolver.js.map