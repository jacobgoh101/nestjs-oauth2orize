import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { SiteController } from './site.controller';

@Module({
  controllers: [SiteController],
})
export class SiteModule {
  configure(consumer: MiddlewareConsumer) {
    return;
  }
}
