import { User } from './user.entity';
export declare class UserQueryResponse {
    data: User[];
    status: boolean;
    message: string;
    error?: string;
    status_code: number;
}
export declare class UserLoginResponse {
    data?: {
        User: any;
    };
    token: String;
    status: boolean;
    message: string;
    error?: string;
    status_code: number;
}
