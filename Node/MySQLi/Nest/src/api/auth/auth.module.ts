import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { CommonConfig } from 'src/config/CommonConfig';

@Module({
  imports:[
    JwtModule.register({
      secret: CommonConfig.API_ACCESS_TOKEN_SECRET,
      signOptions: CommonConfig.API_ACCESS_TOKEN_SIGNOPTIONS,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
