import { Test, TestingModule } from '@nestjs/testing';
import { SiteController } from './site.controller';

describe('Site Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [SiteController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: SiteController = module.get<SiteController>(SiteController);
    expect(controller).toBeDefined();
  });
});
