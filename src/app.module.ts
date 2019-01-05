import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SiteModule } from './site/site.module';

@Module({
  imports: [SiteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
