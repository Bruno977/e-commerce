import { Either, left, right } from 'src/lib/common/either/either';
import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { Injectable } from '@nestjs/common';

type ResponseRemoveProduct = Promise<Either<ResourceNotFoundError, null>>;

@Injectable()
export class RemoveProductUseCase {
  constructor(private productRepository: ProductRepository) {}
  async execute(productId: string): ResponseRemoveProduct {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      return left(new ResourceNotFoundError('Product not found'));
    }
    await this.productRepository.remove(productId);
    return right(null);
  }
}
