import { User } from 'src/modules/auth/domain/entities/user';
import { UserRepository } from 'src/modules/auth/domain/repositories/user.repository';

import { PrismaUserMapper } from '../mappers/prisma-user.mapper';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/common/infra/database/prisma/prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user);
    await this.prisma.user.create({ data });
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) return null;
    return PrismaUserMapper.toDomain(user);
  }
}
