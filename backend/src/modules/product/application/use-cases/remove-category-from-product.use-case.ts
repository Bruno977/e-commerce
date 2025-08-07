import { Either, left, right } from 'src/lib/common/either/either';
import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { CategoryRepository } from 'src/modules/category/domain/repositories/category.repository';
import { IRemoveCategoryFromProduct } from '../interfaces/remove-category-from-product';
import { Id } from 'src/lib/common/entities/id';
import { Injectable } from '@nestjs/common';

type ResponseRemoveCategoryFromProductUseCase = Promise<
  Either<ResourceNotFoundError, null>
>;
@Injectable()
export class RemoveCategoryFromProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute({
    productId,
    categoryIds,
  }: IRemoveCategoryFromProduct): ResponseRemoveCategoryFromProductUseCase {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      return left(new ResourceNotFoundError('Product not found'));
    }

    const category = await this.categoryRepository.findByIds(categoryIds);
    if (!category) {
      return left(new ResourceNotFoundError('Category not found'));
    }

    const categoriesToRemove = category.map((category) => {
      return Id.create(category.id.toString());
    });

    product.removeCategoriesFromProduct(categoriesToRemove);

    await this.productRepository.update(product);

    return right(null);
  }
}
