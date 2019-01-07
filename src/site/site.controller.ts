import { Controller, Get, Post, Render, Query, Req, Res } from '@nestjs/common';
import { DummyUserData } from 'src/dummy.data';
import { Request, Response } from 'express';

@Controller()
export class SiteController {
  @Get()
  @Render('index')
  index(@Req() req: Request): object {
    return { isLoggedIn: !!req.user };
  }

  @Get('login')
  @Render('login-form')
  loginForm(@Query() query): object {
    const { error } = query;
    return {
      ...DummyUserData,
      error: error !== undefined,
    };
  }

  @Post('login')
  login() {
    return;
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout();
    res.redirect('/');
  }

  @Get('account')
  account() {
    return `a sample protected 'my account' page`;
  }
}
