import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user.entity';
import { AuthResolver } from './user.resolver';
import { AuthService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthResolver, AuthService],
})
export class UserModule {}
