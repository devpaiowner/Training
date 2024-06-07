import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Status, StatusCode } from 'src/constants/HttpConstant';
import { MessageConstant } from 'src/constants/MessageConstant';
import { User } from 'src/schemas/user.schema';
import { CatchErrorResponseHelper, ErrorResponseHelper } from 'src/utils/ErrorHandler';
import * as bcrypt from 'bcrypt';
import { CommonConfig } from 'src/config/CommonConfig';
import { ResponseHelper } from 'src/utils/Response';
// import { JwtService } from '@nestjs/jwt';
import * as qrcode from 'qrcode';
import { decodeData, encodeData } from 'src/utils/Helper';
import { Socket } from 'socket.io';

@Injectable()
export class AuthService {
    constructor(
        // private jwtService: JwtService,
        @InjectModel(User.name) private readonly userModel: Model<User>
    ) { }

    async sign_up(payload: any) {
        try {
            const { name, email, password } = payload?.body;
            return await this.userModel.findOne({ email }).then(async (userExist) => {
                if (userExist) {
                    return ErrorResponseHelper({
                        status_code: StatusCode?.HTTP_VALIDATION_ERROR,
                        message: `E-mail id ${MessageConstant?.IS_ALREADY_EXITS}`,
                    });
                }
                const hashPassword = await bcrypt.hash(password, CommonConfig.BCRYPTSALT);
                const fname = name?.split(' ')[0];
                const lname = name?.replace(fname, '');

                const createData = {
                    fname,
                    lname,
                    email,
                    password: hashPassword,
                };
                if (userExist?.status === false) {
                    await this.userModel.deleteOne({ _id: userExist?._id })
                }
                return await this.userModel.create(createData).then(async (data) => {
                    return await ResponseHelper({
                        status: Status?.STATUS_TRUE,
                        status_code: StatusCode?.HTTP_OK,
                        message: `An 4 digit ${MessageConstant?.OTP_SEND}`
                    });
                })
            })
        } catch (error) {
            await CatchErrorResponseHelper(error);
        }
    }

    async generate_login_qr(payload: any) {
        const { socket_id, device_id } = payload;

        const qrData = {
            socket_id,
            device_id
        }
        const qrCodeDataURL = await qrcode.toDataURL(encodeData(JSON.stringify(qrData)));
        return qrCodeDataURL;
    }

    async verify_login_qr(payload: any, socket:Socket ) {
        const loginToken = JSON.parse(decodeData(payload?.encode_url))
        socket.to(loginToken?.socket_id).emit('verify_login_qr_response')
        console.log('loginToken------------------------>', loginToken);
        return loginToken;

    }
}
