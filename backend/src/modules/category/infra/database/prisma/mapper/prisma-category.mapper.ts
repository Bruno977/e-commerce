import { Prisma, Category as PrismaCategory } from '@prisma/client';
import { Id } from 'src/lib/common/entities/id';
import { Category } from 'src/modules/category/domain/entities/category';
import { Slug } from 'src/modules/category/domain/value-objects/slug';

export class PrismaCategoryMapper {
  static toPrisma(category: Category): Prisma.CategoryCreateInput {
    return {
      title: category.title,
      slug: category.slug.getValue(),
      description: category.description,
      isActive: category.isActive,
      productCount: category.productCount,
    };
  }
  static toDomain(category: PrismaCategory): Category {
    return new Category(
      {
        title: category.title,
        slug: new Slug(category.slug),
        description: category.description,
        isActive: category.isActive,
        productCount: category.productCount,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      },
      new Id(category.id),
    );
  }
}
