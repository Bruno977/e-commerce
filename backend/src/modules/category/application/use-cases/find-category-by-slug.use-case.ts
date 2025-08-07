import { Either, left, right } from 'src/lib/common/either/either';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { Category } from '../../domain/entities/category';
import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';
import { Injectable } from '@nestjs/common';

type ResponseFindCategoryBySlugUseCase = Promise<
  Either<
    ResourceNotFoundError,
    {
      category: Category | null;
    }
  >
>;
@Injectable()
export class FindCategoryBySlugUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(slug: string): Promise<ResponseFindCategoryBySlugUseCase> {
    const category = await this.categoryRepository.findBySlug(slug);

    if (!category) {
      return left(new ResourceNotFoundError('Category not found'));
    }
    return right({
      category,
    });
  }
}
