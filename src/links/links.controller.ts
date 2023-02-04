import { Body, Controller, Headers, Post, Req } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { LinksService } from './links.service';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post()
  async create(
    @Headers('host') host: string,
    @Body() createLinkDto: CreateLinkDto,
  ) {
    const hashedId = await this.linksService.create(createLinkDto);

    return {
      shortenUrl: `http://${host}/${hashedId}`,
    };
  }
}
