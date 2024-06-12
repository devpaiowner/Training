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
exports.UserLoginResponse = exports.UserQueryResponse = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_entity_1 = require("./user.entity");
let UserQueryResponse = class UserQueryResponse {
};
__decorate([
    (0, graphql_1.Field)(() => [user_entity_1.User]),
    __metadata("design:type", Array)
], UserQueryResponse.prototype, "data", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], UserQueryResponse.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserQueryResponse.prototype, "message", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UserQueryResponse.prototype, "error", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], UserQueryResponse.prototype, "status_code", void 0);
UserQueryResponse = __decorate([
    (0, graphql_1.ObjectType)()
], UserQueryResponse);
exports.UserQueryResponse = UserQueryResponse;
let UserLoginResponse = class UserLoginResponse {
};
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], UserLoginResponse.prototype, "data", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UserLoginResponse.prototype, "token", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], UserLoginResponse.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserLoginResponse.prototype, "message", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UserLoginResponse.prototype, "error", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], UserLoginResponse.prototype, "status_code", void 0);
UserLoginResponse = __decorate([
    (0, graphql_1.ObjectType)()
], UserLoginResponse);
exports.UserLoginResponse = UserLoginResponse;
//# sourceMappingURL=user.response.js.map