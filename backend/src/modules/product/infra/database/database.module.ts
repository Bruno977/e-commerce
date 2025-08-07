import { Module } from '@nestjs/common';
import { PrismaService } from 'src/lib/common/infra/database/prisma/prisma.service';
import { PrismaProductRepository } from './prisma/repositories/prisma-product.repository';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { CategoryRepository } from 'src/modules/category/domain/repositories/category.repository';
import { PrismaCategoryRepository } from 'src/modules/category/infra/database/prisma/repositories/prisma-category-repository';
import { AttachmentRepository } from '../../domain/repositories/attachment.repository';
import { PrismaProductAttachmentRepository } from './prisma/repositories/prisma-product-attachment.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: ProductRepository,
      useClass: PrismaProductRepository,
    },
    {
      provide: CategoryRepository,
      useClass: PrismaCategoryRepository,
    },
    {
      provide: AttachmentRepository,
      useClass: PrismaProductAttachmentRepository,
    },
  ],
  exports: [ProductRepository, CategoryRepository, AttachmentRepository],
})
export class DatabaseModule {}
