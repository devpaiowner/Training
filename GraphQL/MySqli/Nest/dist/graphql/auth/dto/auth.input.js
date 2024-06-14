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
exports.UserLoginInput = exports.UserSignupInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const MessageConstant_1 = require("../../../constants/MessageConstant");
let UserSignupInput = class UserSignupInput {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)({ message: `Username ${MessageConstant_1.ValidationMessageConstant === null || MessageConstant_1.ValidationMessageConstant === void 0 ? void 0 : MessageConstant_1.ValidationMessageConstant.SHOULD_NOT_EMPTY}` }),
    (0, class_validator_1.Length)(4, 20, { message: 'Username must be between 4 and 20 characters' }),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9_]*$/, { message: 'Username can only contain letters, numbers, and underscores' }),
    __metadata("design:type", String)
], UserSignupInput.prototype, "username", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)({ message: `Email ${MessageConstant_1.ValidationMessageConstant === null || MessageConstant_1.ValidationMessageConstant === void 0 ? void 0 : MessageConstant_1.ValidationMessageConstant.SHOULD_NOT_EMPTY}` }),
    (0, class_validator_1.IsEmail)({}, { message: 'Email must be a valid email address' }),
    __metadata("design:type", String)
], UserSignupInput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)({ message: `Password ${MessageConstant_1.ValidationMessageConstant === null || MessageConstant_1.ValidationMessageConstant === void 0 ? void 0 : MessageConstant_1.ValidationMessageConstant.SHOULD_NOT_EMPTY}` }),
    (0, class_validator_1.Length)(8, 100, { message: 'Password must be at least 8 characters long' }),
    (0, class_validator_1.Matches)(/(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter' }),
    (0, class_validator_1.Matches)(/(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter' }),
    (0, class_validator_1.Matches)(/(?=.*[0-9])/, { message: 'Password must contain at least one number' }),
    (0, class_validator_1.Matches)(/(?=.*[!@#$%^&*])/, { message: 'Password must contain at least one special character (!@#$%^&*)' }),
    __metadata("design:type", String)
], UserSignupInput.prototype, "password", void 0);
UserSignupInput = __decorate([
    (0, graphql_1.InputType)()
], UserSignupInput);
exports.UserSignupInput = UserSignupInput;
let UserLoginInput = class UserLoginInput {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)({ message: `Email ${MessageConstant_1.ValidationMessageConstant === null || MessageConstant_1.ValidationMessageConstant === void 0 ? void 0 : MessageConstant_1.ValidationMessageConstant.SHOULD_NOT_EMPTY}` }),
    (0, class_validator_1.IsEmail)({}, { message: 'Email must be a valid email address' }),
    __metadata("design:type", String)
], UserLoginInput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)({ message: `Password ${MessageConstant_1.ValidationMessageConstant === null || MessageConstant_1.ValidationMessageConstant === void 0 ? void 0 : MessageConstant_1.ValidationMessageConstant.SHOULD_NOT_EMPTY}` }),
    (0, class_validator_1.Length)(8, 100, { message: 'Password must be at least 8 characters long' }),
    (0, class_validator_1.Matches)(/(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter' }),
    (0, class_validator_1.Matches)(/(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter' }),
    (0, class_validator_1.Matches)(/(?=.*[0-9])/, { message: 'Password must contain at least one number' }),
    (0, class_validator_1.Matches)(/(?=.*[!@#$%^&*])/, { message: 'Password must contain at least one special character (!@#$%^&*)' }),
    __metadata("design:type", String)
], UserLoginInput.prototype, "password", void 0);
UserLoginInput = __decorate([
    (0, graphql_1.InputType)()
], UserLoginInput);
exports.UserLoginInput = UserLoginInput;
//# sourceMappingURL=auth.input.js.map