import { Injectable } from '@nestjs/common';
import { UserEntity } from '../user.entity';
import { UserDTO } from '../user.dto';
import { DummyUserData } from '../../dummy.data';
import * as _ from 'lodash';

@Injectable()
export class AuthService {
  async validateUser(data: UserDTO): Promise<UserEntity> {
    if (_.isEqual(DummyUserData, data)) {
      return DummyUserData;
    }
    return null;
  }
}
