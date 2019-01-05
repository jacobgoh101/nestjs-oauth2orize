import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth/auth.service';
import { UserDTO } from './user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super(async (username, password, done) => {
      const data: UserDTO = { username, password };
      const user = await this.authService.validateUser(data);

      if (!user) {
        return done(new UnauthorizedException(), user);
      }
      return done(null, user);
    });
  }
}
