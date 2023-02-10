import { Body, Controller, Headers, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateLinkDto } from './dto/create-link.dto';
import { LinksService } from './links.service';

@Controller('links')
export class LinksController {
  constructor(
    private readonly linksService: LinksService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  async create(
    @Headers('host') host: string,
    @Body() createLinkDto: CreateLinkDto,
  ) {
    const isProd =
      this.configService.get<'development' | 'production'>('NODE_ENV') ===
      'production';

    const hashedId = await this.linksService.create(createLinkDto);

    return {
      shortenedUrl: `http${isProd ? 's' : ''}://${host}/${hashedId}`,
    };
  }
}
