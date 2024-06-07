import { User } from './user.entity';
import { AuthService } from './user.service';
import { UserQueryResponse } from './user.response';
import { UserInput } from './dto/auth.input';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(signUpInput: UserInput): Promise<void | {
        data: any[];
        status: boolean;
        message: string;
        status_code: number;
    } | {
        data: User[];
        status: boolean;
        message: string;
        status_code: import("@nestjs/common").HttpStatus;
    }>;
    user(): Promise<UserQueryResponse>;
    deleteUser(id: User['id']): Promise<User>;
}
