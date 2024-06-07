import { Resolver, Query } from '@nestjs/graphql';
import { User } from '../schemasmodel/graphql.schema';

@Resolver('User')
export class UserResolver {
  @Query(() => [User])
  async users() {
    return [];
  }
}