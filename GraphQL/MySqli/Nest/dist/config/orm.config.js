"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const user_entity_1 = require("../graphql/auth/user.entity");
const mainOptions = {
    type: 'mysql',
    url: 'mysql://root:root@localhost:3306/test',
    synchronize: true,
    entities: [user_entity_1.User],
};
exports.default = (0, config_1.registerAs)('orm', () => mainOptions);
//# sourceMappingURL=orm.config.js.map