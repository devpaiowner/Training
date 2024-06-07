import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class AuthService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    createOne(username: string, email: string, password: string): Promise<User>;
    getOne(id: User['id']): Promise<User>;
    listAll(): Promise<User[]>;
    removeOne(id: User['id']): Promise<User>;
    findOneByEmail(email: string): Promise<User>;
}
