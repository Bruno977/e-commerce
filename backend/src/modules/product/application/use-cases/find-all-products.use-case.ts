import { Either, right } from 'src/lib/common/either/either';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { Product } from '../../domain/entities/product';
import { Injectable } from '@nestjs/common';
import { PaginationResponse } from 'src/lib/common/types/pagination-response';
import { IFindAllProducts } from '../interfaces/find-all-products';

type ResponseFindAllProductsUseCase = Promise<
  Either<null, { products: Product[]; pagination: PaginationResponse }>
>;
@Injectable()
export class FindAllProductsUseCase {
  constructor(private productRepository: ProductRepository) {}
  async execute({
    page = 1,
    perPage = 20,
  }: IFindAllProducts): ResponseFindAllProductsUseCase {
    const { products, totalItems } = await this.productRepository.findAll({
      page: page ?? 1,
      perPage: perPage ?? 20,
    });
    const totalPages = Math.ceil(totalItems / perPage);

    return right({
      products,
      pagination: {
        totalItems,
        currentPage: page,
        perPage: perPage,
        totalPages,
      },
    });
  }
}
