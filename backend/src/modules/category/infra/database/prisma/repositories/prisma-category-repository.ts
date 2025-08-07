import { PrismaService } from 'src/lib/common/infra/database/prisma/prisma.service';
import { Category } from 'src/modules/category/domain/entities/category';
import {
  CategoryRepository,
  PaginatedCategories,
} from 'src/modules/category/domain/repositories/category.repository';
import { PrismaCategoryMapper } from '../mapper/prisma-category.mapper';
import { Injectable } from '@nestjs/common';
import { PaginationParams } from 'src/lib/common/types/pagination-params';

@Injectable()
export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Category): Promise<void> {
    const newCategory = PrismaCategoryMapper.toPrisma(data);
    await this.prisma.category.create({ data: newCategory });
  }

  async findAll(params: PaginationParams): Promise<PaginatedCategories> {
    const { page, perPage } = params;
    const take = perPage;
    const skip = (page - 1) * take;

    const [categories, totalItems] = await Promise.all([
      this.prisma.category.findMany({
        include: {
          _count: {
            select: { products: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        take,
        skip,
      }),
      this.prisma.category.count(),
    ]);

    const domainCategories = categories.map((category) => {
      const domainCategory = PrismaCategoryMapper.toDomain(category);
      domainCategory.updateProductCount(category._count.products);
      return domainCategory;
    });

    return { categories: domainCategories, totalItems };
  }

  async findById(id: string): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!category) {
      return null;
    }
    return PrismaCategoryMapper.toDomain(category);
  }
  async findByIds(ids: string[]): Promise<Category[] | null> {
    const categories = await this.prisma.category.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    if (!categories) {
      return null;
    }
    return categories.map((category) =>
      PrismaCategoryMapper.toDomain(category),
    );
  }
  async findBySlug(slug: string): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({
      where: { slug },
    });
    if (!category) {
      return null;
    }
    return PrismaCategoryMapper.toDomain(category);
  }
  async remove(categoryId: string): Promise<void> {
    await this.prisma.category.delete({
      where: { id: categoryId },
    });
  }
  async update(category: Category): Promise<void> {
    const categoryData = PrismaCategoryMapper.toPrisma(category);
    await this.prisma.category.update({
      where: { id: category.id.toString() },
      data: categoryData,
    });
  }
}
