import { User } from './user.entity';
export declare class UserQueryResponse {
    data: User[];
    status: boolean;
    message: string;
    status_code: number;
}
