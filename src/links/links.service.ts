import { Injectable } from '@nestjs/common';
import Hashids from 'hashids/cjs/hashids';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLinkDto } from './dto/create-link.dto';

@Injectable()
export class LinksService {
  constructor(private prisma: PrismaService) {}

  async create(createLinkDto: CreateLinkDto) {
    const link = await this.prisma.link.create({
      data: {
        url: createLinkDto.url,
      },
    });

    const hasher = new Hashids();
    const hashedId = hasher.encode(link.id);

    return hashedId;
  }
}
