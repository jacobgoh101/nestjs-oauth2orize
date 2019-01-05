import { Controller, Get, Post, Body, Render } from '@nestjs/common';

@Controller()
export class SiteController {
  @Get()
  @Render('index')
  index(): object {
    return {};
  }

  @Get('login')
  @Render('login-form')
  loginForm(): object {
    return {
        username: 'bob',
        password: 'password',
    };
  }

  @Post('login')
  login(@Body() body) {
    return JSON.stringify(body);
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
