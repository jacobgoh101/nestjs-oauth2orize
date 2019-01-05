import { Controller, Get, Post, Body, Render, UseGuards } from '@nestjs/common';
import { DummyUserData } from 'src/user/dummy-user-data';
import { AuthGuard } from '@nestjs/passport';

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
      ...DummyUserData,
    };
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
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
