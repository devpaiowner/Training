import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/models/users.model';
import * as bcrypt from 'bcrypt';
import { CatchErrorResponseHelper, ErrorResponseHelper } from 'src/utils/ErrorHandler';
import { Status, StatusCode, StatusMessage } from 'src/constants/HttpConstant';
import { ResponseHelper } from 'src/utils/Response';
import { MessageConstant } from 'src/constants/MessageConstant';
import { JwtService } from '@nestjs/jwt';
import { CommonConfig } from 'src/config/CommonConfig';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
    ) { }

    /* ==== Generate access token start ===== */
    async generate_access_token(user: any) {
        const payload = {
            id: user?.id,
            email: user?.email,
        };
        return await this.jwtService.sign(payload, {
            secret: CommonConfig?.API_ACCESS_TOKEN_SECRET,
            expiresIn: CommonConfig?.API_ACCESS_TOKEN_EXPIRATION,
        });
    }
    /* ==== Generate access token end ===== */

    /* ==== Login start ===== */
    async login(payload: any) {
        try {
            const { email, password } = payload?.body;

            return await UserModel.findOne({
                where: { email: email }
            }).then(async (user: any) => {
                if (user) {
                    const passwordMatch = await bcrypt.compare(password, user?.password);
                    if (passwordMatch) {
                        const access_token = await this.generate_access_token(user);
                        return await ResponseHelper({
                            status: Status?.STATUS_TRUE,
                            status_code: StatusCode?.HTTP_OK,
                            message: MessageConstant?.LOGIN_SUCCESS,
                            data: user,
                            access_token: access_token,
                        });
                    } else {
                        return ErrorResponseHelper({
                            status_code: StatusCode?.HTTP_VALIDATION_ERROR,
                            custom_message: StatusMessage?.HTTP_VALIDATION_LOGIN_PASSWORD,
                        });
                    }
                } else {
                    return ErrorResponseHelper({
                        status_code: StatusCode?.HTTP_VALIDATION_ERROR,
                        custom_message: StatusMessage?.HTTP_VALIDATION_LOGIN_PASSWORD,
                    });
                }
            })

        } catch (error) {
            await CatchErrorResponseHelper(error);
        }
    }
    /* ==== Login end ===== */
    
    /* ==== Register start ===== */
    async register(payload: any) {
        try {
            const { name, email, password } = payload?.body;

            return await UserModel.findOne({ where: { email: email } }).then(async (user_exist: any) => {
                if (user_exist) {
                    return ErrorResponseHelper({
                        status_code: StatusCode?.HTTP_VALIDATION_ERROR,
                        custom_message: `E-mail id ${MessageConstant?.IS_ALREADY_EXITS}`,
                    });
                }
                // const fname = name.split(' ')[0];
                // const lname = name.replace(fname, '');
                const hashPassword = await bcrypt.hash(password, CommonConfig.BCRYPTSALT);

                const createData = {
                    // name, email, password:hashPassword, fname, lname
                    name, email, password:hashPassword
                }
                await UserModel.create(createData)

                return await ResponseHelper({
                    status: Status?.STATUS_TRUE,
                    status_code: StatusCode?.HTTP_OK,
                    // message: `An 4 digit ${MessageConstant?.OTP_SEND}`,
                    message: `Registered ${MessageConstant?.SUCCESSFULLY}`,
                });

            })

        } catch (error) {
            await CatchErrorResponseHelper(error);
        }
    }
    /* ==== Register end ===== */

}
