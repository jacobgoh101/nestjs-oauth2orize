import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SiteModule } from './site/site.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [SiteModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
