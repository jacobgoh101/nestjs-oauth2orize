import { Controller, Get, Res, Req, Render, Post } from '@nestjs/common';

@Controller()
export class OauthController {
  @Get('dialog/authorize')
  @Render('dialog')
  authorization(@Req() req, @Res() res) {
    return {
      transactionId: req.oauth2.transactionID,
      user: req.user,
      client: req.oauth2.client,
    };
  }

  @Post('dialog/authorize/decision')
  decision() {
    return;
  }

  @Post('oauth/token')
  token() {
    return;
  }
}
