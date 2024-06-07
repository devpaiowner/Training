"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const apollo_1 = require("@nestjs/apollo");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("@nestjs/typeorm");
const node_path_1 = require("node:path");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const orm_config_1 = require("./config/orm.config");
const user_module_1 = require("./graphql/auth/user.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                expandVariables: true,
                isGlobal: true,
                load: [orm_config_1.default],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory(config) {
                    return config.getOrThrow('orm');
                },
            }),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: (0, node_path_1.join)(process.cwd(), 'schema.gql'),
                path: '/auth',
                playground: true,
            }),
            user_module_1.UserModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map