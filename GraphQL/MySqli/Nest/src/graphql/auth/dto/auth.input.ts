import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { ValidationMessageConstant } from 'src/constants/MessageConstant';

@InputType()
export class UserInput {
  @Field()
  @IsNotEmpty({ message: `Username ${ValidationMessageConstant?.SHOULD_NOT_EMPTY}` })
  @Length(4, 20, { message: 'Username must be between 4 and 20 characters' })
  @Matches(/^[a-zA-Z0-9_]*$/, { message: 'Username can only contain letters, numbers, and underscores' })
  username: string;

  @Field()
  @IsNotEmpty({ message: `Email ${ValidationMessageConstant?.SHOULD_NOT_EMPTY}` })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @Field()
  @IsNotEmpty({ message: `Password ${ValidationMessageConstant?.SHOULD_NOT_EMPTY}` })
  @Length(8, 100, { message: 'Password must be at least 8 characters long' })
  @Matches(/(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter' })
  @Matches(/(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter' })
  @Matches(/(?=.*[0-9])/, { message: 'Password must contain at least one number' })
  @Matches(/(?=.*[!@#$%^&*])/, { message: 'Password must contain at least one special character (!@#$%^&*)' })
  password: string;
}

@InputType()
export class UserLoginInput {
  @Field()
  @IsNotEmpty({ message: `Email ${ValidationMessageConstant?.SHOULD_NOT_EMPTY}` })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @Field()
  @IsNotEmpty({ message: `Password ${ValidationMessageConstant?.SHOULD_NOT_EMPTY}` })
  @Length(8, 100, { message: 'Password must be at least 8 characters long' })
  @Matches(/(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter' })
  @Matches(/(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter' })
  @Matches(/(?=.*[0-9])/, { message: 'Password must contain at least one number' })
  @Matches(/(?=.*[!@#$%^&*])/, { message: 'Password must contain at least one special character (!@#$%^&*)' })
  password: string;
}