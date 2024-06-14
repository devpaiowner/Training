import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthResolver } from './user.resolver';
import { AuthService } from './user.service';
import { Session } from './session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Session])],
  providers: [AuthResolver, AuthService],
})
export class UserModule { }
