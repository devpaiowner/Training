import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { AuthService } from './user.service';
import { MessageConstant } from 'src/constants/MessageConstant';
import * as bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import { CommonConfig, Status, StatusCode } from 'src/constants/HttpConstant';
import { UserLoginResponse, UserQueryResponse } from './user.response';
import { UserInput, UserLoginInput } from './dto/auth.input';
import { commonConfig } from 'src/constants/commonConfig';
import { JWTKeyData } from 'src/Utils/JSONHelper';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => UserQueryResponse)
  async signUp(@Args('signUp') signUpInput: UserInput): Promise<UserQueryResponse> {
    const { username, email, password } = signUpInput;
    try {
      const userExist = await this.authService.findOneByEmail(email);
      if (userExist) {
        return {
          data: [],
          status: Status.STATUS_FALSE,
          message: `${email} ${MessageConstant.IS_ALREADY_EXITS}`,
          status_code: StatusCode.HTTP_VALIDATION,
        };
      } else {
        const hashPassword = await bcrypt.hash(password, CommonConfig.BCRYPTSALT);
        const user = await this.authService.createOne(username, email, hashPassword);
        return {
          data: [user],
          status: Status.STATUS_TRUE,
          message: MessageConstant.SIGN_UP_SUCCESSFULLY,
          status_code: StatusCode.HTTP_CREATED,
        };
      }
    } catch (error: any) {
      return {
        data: [],
        status: Status.STATUS_FALSE,
        message: error.message,
        status_code: StatusCode.HTTP_INTERNAL_SERVER_ERROR,
      };
    }
  }

  @Mutation(() => UserLoginResponse)
  async signIn(@Args('signIn') signInInput: UserLoginInput): Promise<UserLoginResponse> {
    const { email, password } = signInInput;
    try {
      const userExist = await this.authService.findOneByEmail(email);
      if (!userExist) {
        return {
          data: null,
          status: Status.STATUS_FALSE,
          message: `${email} ${MessageConstant.IS_NOT_EXITS}`,
          status_code: StatusCode.HTTP_VALIDATION,
          token: null,
        };
      } else {
        const validate_password = await bcrypt.compare(password, userExist.password);
        const token = await jwt.sign(JWTKeyData(userExist), commonConfig?.JWT_KEY)
        console.log('token', token);

        if (validate_password) {
          return {
            data: userExist,
            status: Status.STATUS_TRUE,
            message: MessageConstant.SIGN_IN_SUCCESSFULLY,
            status_code: StatusCode.HTTP_OK,
            token: token,
          };
        } else {
          return {
            data: null,
            status: Status.STATUS_FALSE,
            message: MessageConstant.WRONG_CREDENTIALS,
            status_code: StatusCode.HTTP_UNAUTHORIZED,
            token: null,
          };
        }
      }
    } catch (error: any) {
      return {
        data: null,
        status: Status.STATUS_FALSE,
        message: error.message,
        status_code: StatusCode.HTTP_INTERNAL_SERVER_ERROR,
        token: null,
      };
    }
  }

  @Query(() => UserQueryResponse)
  async user(): Promise<UserQueryResponse> {
    try {
      const users = await this.authService.listAll();
      return {
        data: users,
        status: Status.STATUS_TRUE,
        message: MessageConstant.DATA_RETRIEVED_SUCCESSFULLY,
        status_code: StatusCode.HTTP_OK,
      };
    } catch (error: any) {
      return {
        data: [],
        status: Status.STATUS_FALSE,
        message: error.message,
        status_code: StatusCode.HTTP_INTERNAL_SERVER_ERROR,
      };
    }
  }

  @Mutation(() => User)
  async deleteUser(@Args('id', { type: () => ID }) id: User['id']): Promise<User> {
    return this.authService.removeOne(id);
  }
}
