import { Either, left, right } from 'src/lib/common/either/either';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { ICreateCategory } from '../interfaces/create-category';
import { Category } from '../../domain/entities/category';
import { Injectable } from '@nestjs/common';
import { ResourceAlreadyExistsError } from 'src/lib/common/errors/resource-already-exists.error';

type ResponseCreateCategoryUseCase = Promise<
  Either<ResourceAlreadyExistsError, null>
>;

@Injectable()
export class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(
    categoryData: ICreateCategory,
  ): Promise<ResponseCreateCategoryUseCase> {
    const { title, description, isActive } = categoryData;

    const newCategory = Category.create({
      title,
      description,

      isActive,
    });

    const categoryAlreadyExists = await this.categoryRepository.findBySlug(
      newCategory.slug.getValue(),
    );
    if (categoryAlreadyExists) {
      return left(new ResourceAlreadyExistsError('Category already exists'));
    }

    await this.categoryRepository.create(newCategory);

    return right(null);
  }
}
