import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserResolver } from './user.resolver';
import { User } from '../schemasmodel/graphql.schema';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
  ],
  providers: [UserResolver, User],
})
export class UserModule {}
