import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { SiteController } from './site.controller';
import passport = require('passport');

@Module({
  controllers: [SiteController],
})
export class SiteModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        passport.authenticate('local', {
          successReturnToOrRedirect: '/',
          failureRedirect: '/login?error',
        }),
      )
      .forRoutes({ path: 'login', method: RequestMethod.POST });
    return;
  }
}
