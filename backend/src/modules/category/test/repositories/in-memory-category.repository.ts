import { PaginationParams } from 'src/lib/common/types/pagination-params';
import { Category } from '../../domain/entities/category';
import {
  CategoryRepository,
  PaginatedCategories,
} from '../../domain/repositories/category.repository';

export class InMemoryCategoryRepository implements CategoryRepository {
  public categories: Category[] = [];

  async create(category: Category): Promise<void> {
    this.categories.push(category);
  }
  async findAll(params: PaginationParams): Promise<PaginatedCategories> {
    const { page, perPage = 20 } = params;
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;

    const paginatedCategories = this.categories.slice(startIndex, endIndex);
    const totalItems = this.categories.length;

    return {
      categories: paginatedCategories,
      totalItems,
    };
  }

  async findById(id: string): Promise<Category | null> {
    return (
      this.categories.find((category) => category.id.toString() === id) ?? null
    );
  }
  async findBySlug(slug: string): Promise<Category | null> {
    return (
      this.categories.find((category) => category.slug.getValue() === slug) ??
      null
    );
  }
  async remove(id: string): Promise<void> {
    const index = this.categories.findIndex(
      (category) => category.id.toString() === id,
    );
    if (index !== -1) {
      this.categories.splice(index, 1);
    }
  }
  async update(category: Category): Promise<void> {
    const index = this.categories.findIndex(
      (existingCategory) => existingCategory.id === category.id,
    );
    if (index !== -1) {
      this.categories[index] = category;
    }
  }
  async findByIds(ids: string[]): Promise<Category[] | null> {
    const categories = this.categories.filter((category) =>
      ids.includes(category.id.toString()),
    );
    return categories.length > 0 ? categories : null;
  }
}
