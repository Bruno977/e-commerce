import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { IUpdateCategoryDetails } from '../interfaces/update-category-details';
import { Either, left, right } from 'src/lib/common/either/either';
import { Category } from '../../domain/entities/category';
import { Injectable } from '@nestjs/common';

type ResponseUpdateCategoryDetailsUseCase = Promise<
  Either<ResourceNotFoundError, { category: Category }>
>;

@Injectable()
export class UpdateCategoryDetailsUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute({
    id,
    title,
    description,
    isActive,
  }: IUpdateCategoryDetails): ResponseUpdateCategoryDetailsUseCase {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      return left(new ResourceNotFoundError('Category not found'));
    }

    if (title) category.updateTitle(title);
    if (description) category.updateDescription(description);
    if (isActive !== undefined) category.updateIsActive(isActive);

    await this.categoryRepository.update(category);

    return right({ category });
  }
}
