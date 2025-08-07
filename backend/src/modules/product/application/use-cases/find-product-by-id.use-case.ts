import { Either, left, right } from 'src/lib/common/either/either';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { ResourceNotFoundError } from 'src/lib/common/errors/resource-not-found.error';
import { Product } from '../../domain/entities/product';
import { Injectable } from '@nestjs/common';

type ResponseFindProductByIdUseCase = Promise<
  Either<ResourceNotFoundError, { product: Product }>
>;

@Injectable()
export class FindProductByIdUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(productId: string): ResponseFindProductByIdUseCase {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      return left(new ResourceNotFoundError('Product not found'));
    }
    return right({ product });
  }
}
