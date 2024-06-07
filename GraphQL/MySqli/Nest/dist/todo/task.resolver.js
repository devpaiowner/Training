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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const task_entity_1 = require("./task.entity");
const task_service_1 = require("./task.service");
const update_task_dto_1 = require("./update-task.dto");
let TaskResolver = class TaskResolver {
    constructor(taskService) {
        this.taskService = taskService;
    }
    addTask(title) {
        return this.taskService.createOne(title);
    }
    tasks() {
        return this.taskService.listAll();
    }
    updateTask(id, changes) {
        return this.taskService.updateOne(id, changes);
    }
    deleteTask(id) {
        return this.taskService.removeOne(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => task_entity_1.Task),
    __param(0, (0, graphql_1.Args)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TaskResolver.prototype, "addTask", null);
__decorate([
    (0, graphql_1.Query)(() => [task_entity_1.Task]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TaskResolver.prototype, "tasks", null);
__decorate([
    (0, graphql_1.Mutation)(() => task_entity_1.Task),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('updateTaskInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_task_dto_1.UpdateTask]),
    __metadata("design:returntype", void 0)
], TaskResolver.prototype, "updateTask", null);
__decorate([
    (0, graphql_1.Mutation)(() => task_entity_1.Task),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TaskResolver.prototype, "deleteTask", null);
TaskResolver = __decorate([
    (0, graphql_1.Resolver)(() => task_entity_1.Task),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskResolver);
exports.TaskResolver = TaskResolver;
//# sourceMappingURL=task.resolver.js.map