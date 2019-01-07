import { UserEntity } from './user/user.entity';
import { ClientEntity } from './oauth/client.entity';

export const DummyUserData: UserEntity = {
  username: 'bob',
  password: 'secret',
};

export const DummyClient: ClientEntity = {
  clientId: 'abc123',
  clientSecret: null,
  name: 'dummy client',
};
