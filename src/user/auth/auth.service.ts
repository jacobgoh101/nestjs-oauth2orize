import { Injectable, Logger } from '@nestjs/common';
import { UserEntity } from '../user.entity';
import { UserDTO } from '../user.dto';
import { DummyUserData } from '../dummy-user-data';
import * as _ from 'lodash';

@Injectable()
export class AuthService {
  async validateUser(data: UserDTO): Promise<UserEntity> {
    Logger.log({ DummyUserData, data });
    if (_.isEqual(DummyUserData, data)) {
      return DummyUserData;
    }
    return null;
  }
}
