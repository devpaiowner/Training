import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CommonConfig } from 'src/config/CommonConfig';
import { PayloadHelper } from 'src/utils/Payload';
import { AuthService } from './auth.service';

@Controller(`${CommonConfig?.API_URL}auth`)
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('sign-up')
    async sign_up(@Req() request: Request) {
        const getPayload = await PayloadHelper(request);
        return await this.authService.sign_up(getPayload);
    };
}
