"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTKeyData = void 0;
const JWTKeyData = (Data) => {
    console.log('Data', Data);
    return {
        id: Data === null || Data === void 0 ? void 0 : Data.id,
        username: Data === null || Data === void 0 ? void 0 : Data.username,
        email: Data === null || Data === void 0 ? void 0 : Data.email,
    };
};
exports.JWTKeyData = JWTKeyData;
//# sourceMappingURL=JSONHelper.js.map