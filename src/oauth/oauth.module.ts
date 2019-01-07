import {
  Module,
  MiddlewareConsumer,
  RequestMethod,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { OauthServerService } from './oauth-server/oauth-server.service';
import { OauthController } from './oauth.controller';
import { ensureLoggedIn } from 'connect-ensure-login';
import { DummyClient } from 'src/dummy.data';
import { Request, Response } from 'express';

@Module({
  providers: [OauthServerService],
  controllers: [OauthController],
})
export class OauthModule {
  constructor(private oauthServerService: OauthServerService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        ensureLoggedIn(),
        this.oauthServerService.server.authorization(
          (clientId, redirectUri, done) => {
            if (clientId === DummyClient.clientId) {
              return done(null, DummyClient, redirectUri);
            }
            return done(new UnauthorizedException('Invalid Client'));
          },
          (client, user, done: any) => {
            // Check if grant request qualifies for immediate approval

            const accessToken: string = Object.keys(
              this.oauthServerService.accessTokens,
            ).find(token => {
              return (
                this.oauthServerService.accessTokens[token].clientId ===
                  client.clientId &&
                this.oauthServerService.accessTokens[token].username ===
                  user.username
              );
            });
            // Auto-approve
            if (accessToken) {
              return done(null, true);
            }

            // Otherwise ask user
            return done(null, false);
          },
        ),
      )
      .forRoutes({ path: 'dialog/authorize', method: RequestMethod.GET });

    consumer
      .apply(ensureLoggedIn(), this.oauthServerService.server.decision())
      .forRoutes({
        path: 'dialog/authorize/decision',
        method: RequestMethod.POST,
      });

    consumer
      .apply(
        (req: Request, res: Response, next) => {
          Logger.log(req.body, req.query);
          next(false);
        },
        this.oauthServerService.server.token(),
        this.oauthServerService.server.errorHandler(),
      )
      .forRoutes({
        path: 'oauth/token',
        method: RequestMethod.POST,
      });

    return;
  }
}
