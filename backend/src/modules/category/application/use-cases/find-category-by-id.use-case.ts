import { Either, left, right } from 'src/lib/common/either/either';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { Category } from '../../domain/entities/category';
import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';
import { Injectable } from '@nestjs/common';

type ResponseFindCategoryByIdUseCase = Promise<
  Either<
    ResourceNotFoundError,
    {
      category: Category | null;
    }
  >
>;
@Injectable()
export class FindCategoryByIdUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(id: string): Promise<ResponseFindCategoryByIdUseCase> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      return left(new ResourceNotFoundError('Category not found'));
    }
    return right({
      category,
    });
  }
}
