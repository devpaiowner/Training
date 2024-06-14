import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Session } from './session.entity';
export declare class AuthService {
    private readonly userRepository;
    private readonly sessionRepository;
    constructor(userRepository: Repository<User>, sessionRepository: Repository<Session>);
    createOne(username: string, email: string, password: string): Promise<User>;
    sessionCreate(userid: string, token: string): Promise<Session>;
    getOne(id: User['id']): Promise<User>;
    listAll(): Promise<User[]>;
    removeOne(id: User['id']): Promise<User>;
    findOneByEmail(email: string): Promise<User>;
}
