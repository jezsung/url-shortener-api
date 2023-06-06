import { BadRequestException, Injectable } from '@nestjs/common';
import Hashids from 'hashids/cjs/hashids';
import { NumberLike } from 'hashids/cjs/util';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getOriginUrl(hashedId: string): Promise<string> {
    let id: NumberLike[];

    try {
      const hasher = new Hashids();
      id = hasher.decode(hashedId);
    } catch {
      throw new BadRequestException('The provided ID is not valid');
    }

    const link = await this.prisma.link.findUnique({ where: { id: +id } });
    return link.url;
  }
}
