"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPassword = exports.IsPasswordConstraint = void 0;
const class_validator_1 = require("class-validator");
let IsPasswordConstraint = class IsPasswordConstraint {
    validate(password, args) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }
    defaultMessage(args) {
        return 'Password must be at least 8 characters long and include uppercase letters, lowercase letters, and numbers or special characters.';
    }
};
IsPasswordConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: false })
], IsPasswordConstraint);
exports.IsPasswordConstraint = IsPasswordConstraint;
function IsPassword(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsPasswordConstraint,
        });
    };
}
exports.IsPassword = IsPassword;
//# sourceMappingURL=password.validator.js.map