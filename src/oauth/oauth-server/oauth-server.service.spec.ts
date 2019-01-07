import { Test, TestingModule } from '@nestjs/testing';
import { OauthServerService } from './oauth-server.service';

describe('OauthServerService', () => {
  let service: OauthServerService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OauthServerService],
    }).compile();
    service = module.get<OauthServerService>(OauthServerService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
