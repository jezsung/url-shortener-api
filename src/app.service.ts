import { Injectable } from '@nestjs/common';
import Hashids from 'hashids/cjs/hashids';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getOriginUrl(hashedId: string): Promise<string> {
    const hasher = new Hashids();
    const id = hasher.decode(hashedId);
    const link = await this.prisma.link.findUnique({ where: { id: +id } });
    return link.url;
  }

  getHello(): string {
    return 'Hello World!';
  }
}
