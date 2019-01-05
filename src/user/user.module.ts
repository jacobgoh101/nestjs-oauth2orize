import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { LocalStrategy } from './local-strategy';
import { AuthService } from './auth/auth.service';

@Module({
  controllers: [UserController],
  providers: [LocalStrategy, AuthService],
})
export class UserModule {}
