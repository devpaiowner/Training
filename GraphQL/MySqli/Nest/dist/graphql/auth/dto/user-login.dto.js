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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUp = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const password_validator_1 = require("../../../Utils/validators/password.validator");
const MessageConstant_1 = require("../../../constants/MessageConstant");
const commonConfig_1 = require("../../../constants/commonConfig");
let SignUp = class SignUp {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.Matches)(commonConfig_1.commonConfig.STRING_REGEX, {
        message: `Username ${MessageConstant_1.MessageConstant.MUST_STRING}`
    }),
    (0, class_validator_1.IsString)({
        message: `Username ${MessageConstant_1.MessageConstant.MUST_STRING}`
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: `Username ${MessageConstant_1.MessageConstant.IS_REQUIRED}`,
    }),
    __metadata("design:type", String)
], SignUp.prototype, "username", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsEmail)({}, { message: `${MessageConstant_1.MessageConstant.VALID_EMAIL_ADDRESS}` }),
    (0, class_validator_1.IsNotEmpty)({ message: `E-mail ${MessageConstant_1.MessageConstant.IS_REQUIRED}` }),
    __metadata("design:type", String)
], SignUp.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)({ message: `Password ${MessageConstant_1.MessageConstant.IS_REQUIRED}` }),
    (0, class_validator_1.Validate)(password_validator_1.IsPassword),
    __metadata("design:type", String)
], SignUp.prototype, "password", void 0);
SignUp = __decorate([
    (0, graphql_1.InputType)()
], SignUp);
exports.SignUp = SignUp;
//# sourceMappingURL=user-login.dto.js.map