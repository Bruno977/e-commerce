import { Either, left, right } from 'src/lib/common/either/either';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { ICreateProduct } from '../interfaces/create-product';
import { NotAllowedError } from 'src/lib/common/errors/not-allowed.error';
import { Price } from '../../domain/value-objects/price';
import { Product } from '../../domain/entities/product';
import { CategoryRepository } from 'src/modules/category/domain/repositories/category.repository';
import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';
import { Injectable } from '@nestjs/common';
import { Stock } from '../../domain/value-objects/stock';
import { Id } from 'src/lib/common/entities/id';

type ResponseCreateProductUseCase = Promise<Either<NotAllowedError, null>>;

@Injectable()
export class CreateProductUseCase {
  constructor(
    private productRepository: ProductRepository,
    private categoryRepository: CategoryRepository,
  ) {}
  async execute({
    name,
    description,
    categoryIds,
    price,
    stock,
    discount,
  }: ICreateProduct): Promise<ResponseCreateProductUseCase> {
    const existsCategories =
      await this.categoryRepository.findByIds(categoryIds);
    if (!existsCategories) {
      return left(new ResourceNotFoundError('Category not found'));
    }
    const productCategories = categoryIds.map((category) => new Id(category));

    const newProduct = Product.create({
      name,
      description,
      categoryIds: [],
      price: Price.createWithDiscount(price, discount ?? 0),
      stock: new Stock(stock),
    });

    newProduct.addCategoriesToProduct(productCategories);

    if (discount) {
      newProduct.applyDiscount(discount);
    }
    await this.productRepository.create(newProduct);

    return right(null);
  }
}
