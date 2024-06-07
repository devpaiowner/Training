import { Controller, Post, Req } from '@nestjs/common';
import { CommonConfig } from 'src/config/CommonConfig';
import { AuthService } from './auth.service';

@Controller(`${CommonConfig?.API_URL}auth`)
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    /* ==== Login start ===== */
    @Post('sign-in')
    async login(@Req() request: Request) {
        return await this.authService.login(request)
    }
    /* ==== Login end ===== */

    /* ==== Register start ===== */
    @Post('register')
    async register(@Req() request: Request) {
        return await this.authService.register(request)
    }
    /* ==== Login end ===== */
}