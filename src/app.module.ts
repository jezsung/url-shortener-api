import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LinksModule } from './links/links.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, LinksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
