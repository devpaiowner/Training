import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, Matches, Validate } from 'class-validator';
import { IsPassword } from 'src/Utils/validators/password.validator';
import { MessageConstant } from 'src/constants/MessageConstant';
import { commonConfig } from 'src/constants/commonConfig';

@InputType()
export class SignUp {

    @Field()
    @Matches(commonConfig.STRING_REGEX, {
        message: `Username ${MessageConstant.MUST_STRING}`
    })
    @IsString({
        message: `Username ${MessageConstant.MUST_STRING}`
    })
    @IsNotEmpty({
        message: `Username ${MessageConstant.IS_REQUIRED}`,
    })
    username: string;

    @Field()
    @IsEmail({}, { message: `${MessageConstant.VALID_EMAIL_ADDRESS}` })
    @IsNotEmpty({ message: `E-mail ${MessageConstant.IS_REQUIRED}` })
    email: string;

    @Field()
    @IsNotEmpty({ message: `Password ${MessageConstant.IS_REQUIRED}` })
    @Validate(IsPassword)
    password: string;
}
