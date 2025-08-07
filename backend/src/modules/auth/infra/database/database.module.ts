import { Module } from '@nestjs/common';

import { UserRepository } from 'src/modules/auth/domain/repositories/user.repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user.repository';
import { PrismaService } from 'src/lib/common/infra/database/prisma/prisma.service';

@Module({
  providers: [
    PrismaService,
    { provide: UserRepository, useClass: PrismaUserRepository },
  ],
  exports: [UserRepository],
})
export class DatabaseModule {}
