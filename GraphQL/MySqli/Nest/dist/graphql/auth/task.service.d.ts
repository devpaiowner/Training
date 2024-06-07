import { Repository } from 'typeorm';
import { Task } from './user.entity';
export declare class TaskService {
    private readonly taskRepository;
    constructor(taskRepository: Repository<Task>);
    createOne(title: string): Promise<Task>;
    getOne(id: Task['id']): Promise<Task>;
    listAll(): Promise<Task[]>;
    updateOne(id: Task['id'], changes: Partial<Pick<Task, 'title' | 'completed'>>): Promise<Task>;
    removeOne(id: Task['id']): Promise<Task>;
}
