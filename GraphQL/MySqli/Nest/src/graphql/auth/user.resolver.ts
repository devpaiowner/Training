import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { AuthService } from './user.service';
import { CatchErrorResponseHelper, ErrorResponseHelper } from 'src/Utils/ErrorHandler';
import { MessageConstant } from 'src/constants/MessageConstant';
import * as bcrypt from 'bcrypt';
import { CommonConfig, Status, StatusCode } from 'src/constants/HttpConstant';
import { UserQueryResponse } from './user.response';
import { SignUp } from './dto/user-login.dto';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => UserQueryResponse)
  async signUp(
    @Args('signUp') signUpInput: SignUp,
  ) {
    const { username, email, password } = signUpInput;
    try {
      const userExist = await this.authService.findOneByEmail(email);
      if (userExist) {
        return {
          data: [],
          status: Status?.STATUS_FALSE,
          message: email + " " + MessageConstant?.IS_ALREADY_EXITS,
          status_code: StatusCode?.HTTP_VALIDATION,
        };
      } else {
        const hashPassword = await bcrypt.hash(password, CommonConfig.BCRYPTSALT);
        const user = await this.authService.createOne(username, email, hashPassword);
        return {
          data: [user],
          status: Status?.STATUS_TRUE,
          message: MessageConstant?.SIGN_UP_SUCCESSFULLY,
          status_code: StatusCode?.HTTP_CREATED,
        };
      }
    } catch (error: any) {
      console.log('error', error);
      await CatchErrorResponseHelper(error);
    }
  }

  @Query(() => UserQueryResponse)
  async user(): Promise<UserQueryResponse> {
    const users = await this.authService.listAll();
    return {
      data: users,
      status: Status?.STATUS_TRUE,
      message: MessageConstant?.DATA_RETRIEVED_SUCCESSFULLY,
      status_code: StatusCode?.HTTP_OK,
    };
  }

  @Mutation(() => User)
  deleteUser(@Args('id', { type: () => ID }) id: User['id']) {
    return this.authService.removeOne(id);
  }
}
