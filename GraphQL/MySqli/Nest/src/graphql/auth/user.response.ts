import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
export class UserQueryResponse {
  @Field(() => [User])
  data: User[];

  @Field()
  status: boolean;

  @Field()
  message: string;

  @Field({ nullable: true })
  error?: string;

  @Field(() => Int)
  status_code: number;
}


@ObjectType()
export class UserLoginResponse {
  @Field(() => User, { nullable: true })
  data?: {User};

  @Field({ nullable: true })
  token: String;

  @Field()
  status: boolean;

  @Field()
  message: string;

  @Field({ nullable: true })
  error?: string;

  @Field(() => Int)
  status_code: number;
}