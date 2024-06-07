"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
var sequelize_typescript_1 = require("sequelize-typescript");
var Config_1 = require("./Config");
exports.sequelize = new sequelize_typescript_1.Sequelize({
    host: Config_1.DATABASE_HOST,
    database: Config_1.DATABASE_NAME,
    username: Config_1.DATABASE_USERNAME,
    password: Config_1.DATABASE_PASSWORD,
    logging: true,
    dialect: "mysql",
    storage: ":memory:",
    models: [__dirname + '../../models']
});
