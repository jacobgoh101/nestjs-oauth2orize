import { Test, TestingModule } from '@nestjs/testing';
import { OauthController } from './oauth.controller';

describe('Oauth Controller', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [OauthController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: OauthController = module.get<OauthController>(OauthController);
    expect(controller).toBeDefined();
  });
});
