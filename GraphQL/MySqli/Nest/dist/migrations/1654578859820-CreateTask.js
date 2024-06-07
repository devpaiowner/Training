"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CreateTask1654578859820_tableName;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTask1654578859820 = void 0;
const typeorm_1 = require("typeorm");
class CreateTask1654578859820 {
    constructor() {
        this.name = 'CreateTask1654578859820';
        _CreateTask1654578859820_tableName.set(this, 'task');
    }
    async up(queryRunner) {
        const todoTable = new typeorm_1.Table({
            name: __classPrivateFieldGet(this, _CreateTask1654578859820_tableName, "f"),
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'title',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'completed',
                    type: 'boolean',
                    isNullable: false,
                    default: false,
                },
                {
                    name: 'createdAt',
                    type: 'datetime',
                    isNullable: false,
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'datetime',
                    isNullable: false,
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                },
            ],
        });
        await queryRunner.createTable(todoTable, true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable(__classPrivateFieldGet(this, _CreateTask1654578859820_tableName, "f"));
    }
}
exports.CreateTask1654578859820 = CreateTask1654578859820;
_CreateTask1654578859820_tableName = new WeakMap();
//# sourceMappingURL=1654578859820-CreateTask.js.map