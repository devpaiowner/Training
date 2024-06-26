import { User } from './user.entity';
import { AuthService } from './user.service';
import { UserLoginResponse, UserQueryResponse } from './user.response';
import { UserSignupInput, UserLoginInput } from './dto/auth.input';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(signUpInput: UserSignupInput): Promise<UserQueryResponse>;
    signIn(signInInput: UserLoginInput): Promise<UserLoginResponse>;
    user(): Promise<UserQueryResponse>;
    deleteUser(id: User['id']): Promise<User>;
}
