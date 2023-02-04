import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':hashedId')
  async redirectToOriginUrl(
    @Param('hashedId') hashedId: string,
    @Res() res: Response,
  ) {
    const url = await this.appService.getOriginUrl(hashedId);
    res.status(301).redirect(url);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
