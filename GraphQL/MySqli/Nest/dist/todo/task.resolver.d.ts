import { Task } from './task.entity';
import { TaskService } from './task.service';
import { UpdateTask } from './update-task.dto';
export declare class TaskResolver {
    private readonly taskService;
    constructor(taskService: TaskService);
    addTask(title: string): Promise<Task>;
    tasks(): Promise<Task[]>;
    updateTask(id: Task['id'], changes: UpdateTask): Promise<Task>;
    deleteTask(id: Task['id']): Promise<Task>;
}
