import { Controller, Get, Post, Render, Query, Req } from '@nestjs/common';
import { DummyUserData } from 'src/user/dummy-user-data';
import { Request } from 'express';

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
  logout() {
    return null;
  }

  @Get('account')
  account() {
    return null;
  }
}
