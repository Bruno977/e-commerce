import { Either, right } from 'src/lib/common/either/either';
import { Category } from '../../domain/entities/category';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { Injectable } from '@nestjs/common';
import { PaginationResponse } from 'src/lib/common/types/pagination-response';
import { IFindAllCategories } from '../interfaces/find-all-categories';

type ResponseFindCategoryByIdUseCase = Promise<
  Either<
    null,
    {
      categories: Category[];
      pagination: PaginationResponse;
    }
  >
>;
@Injectable()
export class FindAllCategoriesUseCase {
  constructor(private categoryRepository: CategoryRepository) {}
  async execute({
    page = 1,
    perPage = 20,
  }: IFindAllCategories): ResponseFindCategoryByIdUseCase {
    const { categories, totalItems } = await this.categoryRepository.findAll({
      page: page ?? 1,
      perPage: perPage ?? 20,
    });

    const totalPages = Math.ceil(totalItems / perPage);

    return right({
      categories,
      pagination: {
        totalItems,
        currentPage: page,
        perPage: perPage,
        totalPages,
      },
    });
  }
}
