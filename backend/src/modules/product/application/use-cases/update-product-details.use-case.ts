import { Either, left, right } from 'src/lib/common/either/either';
import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { IUpdateProductDetails } from '../interfaces/update-product-details';
import { Stock } from '../../domain/value-objects/stock';
import { Price } from '../../domain/value-objects/price';
import { Injectable } from '@nestjs/common';

type ResponseUpdateProductDetailsUseCase = Promise<
  Either<ResourceNotFoundError, null>
>;

@Injectable()
export class UpdateProductDetailsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(
    productData: IUpdateProductDetails,
  ): ResponseUpdateProductDetailsUseCase {
    const { id, name, description, price, stock, discount } = productData;
    const product = await this.productRepository.findById(id);

    if (!product) {
      return left(new ResourceNotFoundError(`Product not found`));
    }
    if (name) product.updateName(name);
    if (description) product.updateDescription(description);
    if (stock) product.updateStock(new Stock(stock));

    if (price) {
      product.updatePrice(Price.create(price));
    }
    if (discount && discount > 0) {
      product.applyDiscount(discount);
    } else if (product.discount && product.discount > 0) {
      product.applyDiscount(product.discount);
    }

    await this.productRepository.update(product);

    return right(null);
  }
}
