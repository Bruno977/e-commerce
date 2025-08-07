import { PaginationParams } from 'src/lib/common/types/pagination-params';
import { Category } from '../entities/category';

export interface PaginatedCategories {
  categories: Category[];
  totalItems: number;
}

export abstract class CategoryRepository {
  abstract create(category: Category): Promise<void>;
  abstract findAll(params: PaginationParams): Promise<PaginatedCategories>;
  abstract findById(id: string): Promise<Category | null>;
  abstract findByIds(ids: string[]): Promise<Category[] | null>;
  abstract findBySlug(slug: string): Promise<Category | null>;
  abstract remove(categoryId: string): Promise<void>;
  abstract update(category: Category): Promise<void>;
}
