import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as oauth2orize from 'oauth2orize';
import { DummyClient } from 'src/dummy.data';
import { ClientEntity } from '../client.entity';
import * as cuid from 'cuid';

@Injectable()
export class OauthServerService {
  server = oauth2orize.createServer();
  // for faking DB operation
  grantCodes: {
    [key: string]: { clientId: string; redirectUri: string; username: string };
  } = {};
  accessTokens: {
    [key: string]: { clientId: string; username: string };
  } = {};

  constructor() {
    this.server.serializeClient((client: ClientEntity, done) =>
      done(null, client.clientId),
    );

    this.server.deserializeClient((id, done) => {
      if (id === DummyClient.clientId) {
        done(null, DummyClient);
      }
      done(new UnauthorizedException(`Invalid Client ID`));
    });

    // Grant authorization codes. The callback takes the `client` requesting
    // authorization, the `redirectUri` (which is used as a verifier in the
    // subsequent exchange), the authenticated `user` granting access, and
    // their response, which contains approved scope, duration, etc. as parsed by
    // the application. The application issues a code, which is bound to these
    // values, and will be exchanged for an access token.

    this.server.grant(
      oauth2orize.grant.code((client, redirectUri, user, ares, done) => {
        const code = cuid();

        this.grantCodes[code] = {
          clientId: client.id,
          redirectUri,
          username: user.username,
        };
        return done(null, code);
      }),
    );

    // Exchange authorization codes for access tokens. The callback accepts the
    // `client`, which is exchanging `code` and any `redirectUri` from the
    // authorization request for verification. If these values are validated, the
    // application issues an access token on behalf of the user who authorized the
    // code.

    this.server.exchange(
      oauth2orize.exchange.code((client, code, redirectUri, done) => {
        const grantCode = this.grantCodes[code];
        if (!grantCode) {
          return done(new UnauthorizedException('Invalid Grand Code'));
        }
        if (client.id !== grantCode.clientId) {
          return done(null, false);
        }
        if (redirectUri !== grantCode.redirectUri) {
          return done(null, false);
        }

        const token = cuid();
        this.accessTokens[token] = {
          username: grantCode.username,
          clientId: client.id,
        };
        return done(null, token);
      }),
    );
  }
}
