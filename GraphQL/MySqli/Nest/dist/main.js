"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function server(options) {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, options);
    app.useGlobalPipes(new common_1.ValidationPipe());
    return app;
}
exports.server = server;
if (require.main === module) {
    void server().then((app) => app.listen(3000));
}
//# sourceMappingURL=main.js.map