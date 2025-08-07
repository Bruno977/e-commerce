import { Module } from '@nestjs/common';
import { PrismaService } from 'src/lib/common/infra/database/prisma/prisma.service';
import { PrismaCategoryRepository } from './prisma/repositories/prisma-category-repository';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { ProductRepository } from 'src/modules/product/domain/repositories/product.repository';
import { PrismaProductRepository } from 'src/modules/product/infra/database/prisma/repositories/prisma-product.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: CategoryRepository,
      useClass: PrismaCategoryRepository,
    },
    { provide: ProductRepository, useClass: PrismaProductRepository },
  ],
  exports: [CategoryRepository, ProductRepository],
})
export class DatabaseModule {}
