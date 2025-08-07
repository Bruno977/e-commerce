import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/lib/common/either/either';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';
import { IRemoveCategory } from '../interfaces/remove-category';
import { NotAllowedError } from 'src/lib/common/errors/not-allowed.error';
import { ProductRepository } from 'src/modules/product/domain/repositories/product.repository';

type ResponseRemoveCategoryUseCase = Promise<
  Either<ResourceNotFoundError | NotAllowedError, null>
>;
@Injectable()
export class RemoveCategoryUseCase {
  constructor(
    private categoryRepository: CategoryRepository,
    private productRepository: ProductRepository,
  ) {}

  async execute(
    categoryData: IRemoveCategory,
  ): Promise<ResponseRemoveCategoryUseCase> {
    const { categoryId } = categoryData;

    const category = await this.categoryRepository.findById(categoryId);
    if (!category) {
      return left(new ResourceNotFoundError('Category not found'));
    }

    const products = await this.productRepository.findByCategoryId(categoryId);

    if (products && products.length > 0) {
      return left(
        new NotAllowedError(
          'Category cannot be removed because it has products',
        ),
      );
    }

    await this.categoryRepository.remove(category.id.toString());
    return right(null);
  }
}
